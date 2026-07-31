// scripts/check-sentence-stems.mts
//
// Gate: `check:duplication` is exhaustive at the *page* level -- it finds a
// shared 160-character passage no matter where it lands. It cannot see a
// shared *sentence* that is surrounded by different text on every page,
// because the neighbouring text on each side breaks up any 160-character
// window that would otherwise span the repeat. That is exactly how 49 of
// this corpus's 116 pages ended up opening their honesty section with one
// of two near-identical sentences ("None of the above makes a fast cash
// sale the obvious/default answer for a seller in...") -- each page's
// surrounding paragraph was different, so no 160-character window matched,
// but the sentence itself was a template with the city or county name
// swapped in.
//
// This gate closes that gap by working at sentence granularity instead of
// page granularity: split every page's body into sentences, strip the
// `[MO]`/`[KS]` state tags and any punctuation-only differences (via
// whitespace collapsing and case folding), and take the first STEM_LENGTH
// characters of each sentence as its "stem". A stem shared by more than
// STEM_PAGE_THRESHOLD pages is a template, not a coincidence -- see the
// constant below for why that specific number was chosen.
import { contentRegistries } from "../src/data/content-registry.js";
import { sentenceStemAllowlist } from "../src/data/sentence-stem-allowlist.js";
import type { StemAllowlistEntry } from "../src/data/sentence-stem-allowlist.js";

/**
 * How many leading characters of a sentence count as its "stem". Chosen to
 * match the sentence-level audit that found this corpus's actual failure:
 * "none of the above makes a fast cash sale the obvious answer for a sell"
 * is 70 characters wide before the seller's location differs from page to
 * page. A shorter window (e.g. 40) would over-match on short, genuinely
 * generic sentence openings ("An owner with real equity..." appears at the
 * start of many honestly-independent sentences); a longer window (e.g. 120)
 * would under-match, since the county or city name usually appears well
 * before character 120 and would fragment an otherwise-identical template
 * into several "different" stems. 70 is long enough to require several
 * words of genuine sentence structure to coincide, not just a shared noun
 * phrase.
 */
const STEM_LENGTH = 70;

/**
 * A stem is only a problem once it stops looking like a coincidence and
 * starts looking like an unedited template. The corpus's own legitimate
 * repetition sets the floor for that line: several Kansas statutes (the
 * K.S.A. 60-2415 sale-confirmation requirement, the K.S.A. 60-2301
 * uncapped-homestead exemption) are described in matching technical
 * language on up to 5 pages each, because restating a statute's own
 * operative language *is* the accurate way to cite it -- see
 * `docs/DUPLICATION-POLICY.md` for the same judgment call made about
 * page-level duplication. A stem appearing on 6 or more pages has no such
 * justification: no single statute or fixed legal test in this corpus is
 * ever described identically by more than 5 pages, so 6 is the first count
 * that cannot be explained as citation overlap. The three stems this gate
 * was built to catch appeared on 33, 10, and 6 pages respectively -- all
 * comfortably past this line; the genuine citation clusters top out at 5,
 * comfortably under it.
 */
const STEM_PAGE_THRESHOLD = 5;

const STATE_TAG = /\[MO\]|\[KS\]/g;

/** Collapses whitespace and strips the leading `[MO]`/`[KS]` state tag so it can't hide -- or fake -- a shared stem. */
export function normalizeSentence(text: string): string {
  return text.replace(STATE_TAG, " ").replace(/\s+/g, " ").trim();
}

/**
 * Splits a page's full body text into sentences. Deliberately joins the
 * body first (like `pageText` in check-duplication.mts) rather than
 * splitting paragraph by paragraph, so a sentence is never accidentally
 * merged with the next paragraph's opening words.
 */
export function splitSentences(bodyText: string): string[] {
  return bodyText
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"\[])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** The first STEM_LENGTH characters of a normalized, case-folded sentence. Returns undefined for a sentence too short to produce a full-length stem, since a short match is a coincidence of common words, not a template. */
export function sentenceStem(sentence: string): string | undefined {
  const normalized = normalizeSentence(sentence).toLowerCase();
  if (normalized.length < STEM_LENGTH) return undefined;
  return normalized.slice(0, STEM_LENGTH);
}

export interface PageInput {
  slug: string;
  text: string;
}

export interface StemMatch {
  stem: string;
  slugs: string[];
}

/** Pure detector: groups every page's sentences by stem and returns any stem shared by more than `threshold` distinct pages. Counts each page once per stem even if that page repeats the same sentence internally. */
export function findRepeatedStems(
  pages: PageInput[],
  threshold: number = STEM_PAGE_THRESHOLD
): StemMatch[] {
  const stemSlugs = new Map<string, Set<string>>();
  for (const { slug, text } of pages) {
    for (const sentence of splitSentences(text)) {
      const stem = sentenceStem(sentence);
      if (!stem) continue;
      let slugs = stemSlugs.get(stem);
      if (!slugs) {
        slugs = new Set();
        stemSlugs.set(stem, slugs);
      }
      slugs.add(slug);
    }
  }

  const matches: StemMatch[] = [];
  for (const [stem, slugs] of stemSlugs) {
    if (slugs.size > threshold) {
      matches.push({ stem, slugs: [...slugs].sort() });
    }
  }
  return matches.sort((a, b) => b.slugs.length - a.slugs.length);
}

/** Pure lookup, decoupled from the real allowlist so it can be exercised with known-bad input in tests. */
export function isStemAllowlisted(
  stem: string,
  allowlist: StemAllowlistEntry[]
): StemAllowlistEntry | undefined {
  return allowlist.find((e) => e.stem === stem);
}

export interface StemAudit {
  pagesCompared: number;
  stemsRepeated: number;
  stemsAllowlisted: number;
  stemsFailing: StemMatch[];
}

export function auditSentenceStems(): StemAudit {
  const pages: PageInput[] = [];
  for (const map of contentRegistries) {
    for (const page of Object.values(map)) {
      pages.push({ slug: page.slug, text: page.body.join(" ") });
    }
  }
  const matches = findRepeatedStems(pages);
  const failing = matches.filter((m) => !isStemAllowlisted(m.stem, sentenceStemAllowlist));
  return {
    pagesCompared: pages.length,
    stemsRepeated: matches.length,
    stemsAllowlisted: matches.length - failing.length,
    stemsFailing: failing,
  };
}

function main(): void {
  const { pagesCompared, stemsRepeated, stemsAllowlisted, stemsFailing } = auditSentenceStems();
  console.log(
    `check:sentence-stems scanned ${pagesCompared} page(s), stem length ${STEM_LENGTH} chars, threshold >${STEM_PAGE_THRESHOLD} pages`
  );
  console.log(
    `  stems repeated past threshold: ${stemsRepeated} -- allowlisted: ${stemsAllowlisted} -- failing: ${stemsFailing.length}`
  );

  if (stemsFailing.length) {
    for (const m of stemsFailing) {
      console.error(`\nTEMPLATE  "${m.stem}..."  (${m.slugs.length} pages)`);
      console.error(`  ${m.slugs.join(", ")}`);
    }
    console.error(
      `\ncheck:sentence-stems FAILED — ${stemsFailing.length} unallowlisted repeated sentence stem(s)`
    );
    process.exit(1);
  }

  console.log(
    `check:sentence-stems OK — ${stemsRepeated} stem(s) past threshold, all allowlisted or none found`
  );
}

if (process.argv[1]?.includes("check-sentence-stems")) main();
