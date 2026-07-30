// tests/state-line-content-transaction.test.ts
//
// The content contract (docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md,
// Tasks 5-7) is mechanically checkable, so this test checks it mechanically rather
// than trusting a read-through. Every assertion here is designed to fail against
// broken content, not just pass against correct content -- see the addendum in
// docs/CITATION-LEDGER.md on why a clean sweep deserves scrutiny.
//
// This cluster is deliberately NOT held to the same "every page has a claim" or
// "every page clears 900 words" bar as the foreclosure and money clusters: the
// ledger has no verified Kansas tax-sale claim and no verified claim at all for
// contract for deed or seller disclosure in either state. Two of these four pages
// therefore carry zero `claims` on purpose -- asserting a floor here would have
// meant inventing law to clear it, which is the one outcome worse than a short,
// honest page. See the Task 7 report for the reasoning.
import { describe, expect, it } from "vitest";
import { stateLineContentTransaction } from "../src/data/state-line-content-transaction";
import { stateLineContentForeclosure } from "../src/data/state-line-content-foreclosure";
import { stateLineContentMoney } from "../src/data/state-line-content-money";
import { citations } from "../src/data/legal-citations";
import { getPageContent, contentRegistries } from "../src/data/content-registry";
import { isIndexable, MIN_INDEXABLE_WORDS } from "../src/lib/seo/indexation";
import { findUnlabeledBlends, auditClaimList } from "../scripts/check-state-claims.mts";

const FLAGSHIP_MIN_WORDS = 900;

// Mirrors the gate's own patterns (scripts/check-state-claims.mts) so a
// mislabeled paragraph fails here even if it happens to dodge the gate.
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const pages = Object.values(stateLineContentTransaction);

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("state-line transaction cluster content", () => {
  it("defines exactly the four transaction-cluster slugs", () => {
    expect(Object.keys(stateLineContentTransaction).sort()).toEqual([
      "contract-for-deed-missouri-vs-kansas",
      "probate-missouri-vs-kansas",
      "seller-disclosure-missouri-vs-kansas",
      "tax-sale-missouri-vs-kansas",
    ]);
  });

  it("keeps each entry's slug field matching its registry key", () => {
    for (const [key, page] of Object.entries(stateLineContentTransaction)) {
      expect(page.slug).toBe(key);
    }
  });

  // Word counts are reported per page, not asserted against an invented floor.
  // The ledger backs probate and tax-sale (partially); it backs neither state
  // for contract-for-deed or seller-disclosure. Padding either of the last two
  // to 900 words would have required unsourced law -- the one thing this task
  // was explicitly told not to do. Each assertion below reflects what the page
  // actually, honestly reaches, with headroom trimmed just enough that this
  // test still fails if a future edit quietly shrinks a page instead of only
  // ever growing one.
  it("clears the flagship 900-word floor: probate (fully backed by the ledger)", () => {
    expect(FLAGSHIP_MIN_WORDS).toBeGreaterThan(MIN_INDEXABLE_WORDS);
    const page = stateLineContentTransaction["probate-missouri-vs-kansas"];
    expect(wordCount(page.body)).toBeGreaterThanOrEqual(FLAGSHIP_MIN_WORDS);
  });

  it("clears the site's 600-word indexable floor on the three pages the ledger only partly or doesn't cover", () => {
    const partial = [
      "tax-sale-missouri-vs-kansas",
      "contract-for-deed-missouri-vs-kansas",
      "seller-disclosure-missouri-vs-kansas",
    ] as const;
    for (const slug of partial) {
      const page = stateLineContentTransaction[slug];
      expect(wordCount(page.body), slug).toBeGreaterThanOrEqual(MIN_INDEXABLE_WORDS);
      // None of these three should be mistaken for having cleared the flagship
      // bar honestly -- if one ever does, that is a fact worth re-checking
      // against the ledger, not silently accepting.
    }
  });

  it("reports the actual word count of every page (regression guard against silent shrinkage)", () => {
    // These are the real counts measured when this cluster was written. A
    // meaningful future edit can grow a page; this test exists to catch one
    // quietly losing content, not to freeze the copy in place.
    const minimums: Record<string, number> = {
      "probate-missouri-vs-kansas": 1000,
      "tax-sale-missouri-vs-kansas": 700,
      "contract-for-deed-missouri-vs-kansas": 700,
      "seller-disclosure-missouri-vs-kansas": 700,
    };
    for (const [slug, min] of Object.entries(minimums)) {
      const page = stateLineContentTransaction[slug];
      expect(wordCount(page.body), slug).toBeGreaterThanOrEqual(min);
    }
  });

  it("labels every paragraph asserting state-specific law with [MO] or [KS]", () => {
    // A paragraph that names neither state, or names a state but asserts no
    // law (e.g. the honest statement that Kansas's tax-sale process is not
    // covered here), makes no jurisdictional claim and needs no label. One
    // that names a state AND uses a legal-marker word IS an assertion of that
    // state's law and must be labeled.
    let checked = 0;
    for (const page of pages) {
      for (const paragraph of page.body) {
        if (LEGAL_MARKERS.test(paragraph) && NAMES_A_STATE.test(paragraph)) {
          checked++;
          expect(LABEL.test(paragraph), `${page.slug}: "${paragraph.slice(0, 90)}"`).toBe(true);
        }
      }
    }
    // Guards against the test being vacuously true if content ever stopped
    // asserting law at all. Lower bar than the other two clusters (7, not 20)
    // because two of these four pages assert no state law by design.
    expect(checked).toBeGreaterThan(6);
  });

  it("never carries both the [MO] and [KS] label on the same paragraph", () => {
    for (const page of pages) {
      for (const paragraph of page.body) {
        const both = paragraph.includes("[MO]") && paragraph.includes("[KS]");
        expect(both, `${page.slug}: "${paragraph.slice(0, 90)}"`).toBe(false);
      }
    }
  });

  it("passes the site's unlabeled-blend gate on every page", () => {
    for (const page of pages) {
      expect(findUnlabeledBlends(page.body), page.slug).toEqual([]);
    }
  });

  it("contains no deictic stand-in for a named state", () => {
    for (const page of pages) {
      for (const paragraph of page.body) {
        expect(DEICTIC.test(paragraph), `${page.slug}: "${paragraph.slice(0, 90)}"`).toBe(false);
      }
    }
  });

  it("gives probate and tax-sale at least one claim, each passing the citation audit", () => {
    for (const slug of ["probate-missouri-vs-kansas", "tax-sale-missouri-vs-kansas"] as const) {
      const page = stateLineContentTransaction[slug];
      const claims = page.claims ?? [];
      expect(claims.length, slug).toBeGreaterThan(0);
      expect(auditClaimList(slug, claims)).toEqual([]);
    }
  });

  it("leaves contract-for-deed and seller-disclosure with zero claims -- the ledger has none for either state", () => {
    // This is the honest outcome the task brief asked for, not an omission.
    // If either of these ever gains a claims entry, it must come from a
    // ledger id, exercised by the identity-reference test below -- never a
    // retyped statute number.
    for (const slug of [
      "contract-for-deed-missouri-vs-kansas",
      "seller-disclosure-missouri-vs-kansas",
    ] as const) {
      const page = stateLineContentTransaction[slug];
      expect(page.claims ?? []).toEqual([]);
    }
  });

  it("references claims by identity to the ledger -- never a retyped copy", () => {
    const idByClaim = new Map(Object.entries(citations).map(([id, c]) => [c, id]));
    for (const page of pages) {
      for (const claim of page.claims ?? []) {
        const id = idByClaim.get(claim);
        expect(id, `${page.slug}: a claim object is not === any entry in citations`).toBeDefined();
      }
    }
  });

  it("cites the Missouri tax-sale redemption right distinctly from the mortgage-foreclosure redemption right", () => {
    // The whole point of pulling in `mo-redemption` alongside
    // `mo-tax-sale-redemption` on this page is to contrast two different
    // Missouri redemption rights, not conflate them. Guard that both ids are
    // actually present and distinct.
    const page = stateLineContentTransaction["tax-sale-missouri-vs-kansas"];
    const claims = page.claims ?? [];
    expect(claims).toContainEqual(citations["mo-tax-sale-redemption"]);
    expect(claims).toContainEqual(citations["mo-redemption"]);
    expect(citations["mo-tax-sale-redemption"]).not.toBe(citations["mo-redemption"]);
  });

  it("states plainly that the Kansas tax-sale process is not covered, rather than guessing at it", () => {
    const page = stateLineContentTransaction["tax-sale-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/does not describe how Kansas handles/i);
    expect(text).toMatch(/takes no position on what actually does apply/i);
    // The page must not assert a specific Kansas tax-sale redemption period
    // anywhere -- that would be exactly the unsourced assertion this task was
    // told to avoid.
    expect(text).not.toMatch(/Kansas[^.]{0,80}(twelve|12|three|3)[^.]{0,20}months? to redeem/i);
  });

  it("states plainly, twice, that neither state's contract-for-deed default rule is covered", () => {
    const page = stateLineContentTransaction["contract-for-deed-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/has not checked.*exactly what Missouri does with a defaulted contract for deed/i);
    expect(text).toMatch(/exactly what Kansas does/i);
  });

  it("states plainly, twice, that neither state's seller-disclosure requirement is covered", () => {
    const page = stateLineContentTransaction["seller-disclosure-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/has not verified.*exactly what Missouri requires a seller to put in writing/i);
    expect(text).toMatch(/exactly what Kansas requires/i);
  });

  it("frames probate and disclosure as areas where a lawyer is often genuinely necessary", () => {
    const probate = stateLineContentTransaction["probate-missouri-vs-kansas"].body.join(" ");
    const disclosure = stateLineContentTransaction["seller-disclosure-missouri-vs-kansas"].body.join(" ");
    expect(probate).toMatch(/lawyer is often genuinely necessary|probate attorney/i);
    expect(disclosure).toMatch(/attorney.*often genuinely necessary|genuinely necessary/i);
  });

  it("says when selling to us is the wrong move, on every page", () => {
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(
        /better off (not selling|listed|continuing|making those repairs|exploring)|not (the obvious|a reason)|obviously right move|far more than accepting a cash offer|worth serious consideration/i.test(text),
        page.slug
      ).toBe(true);
    }
  });

  it("says a cooperative estate with time and a decent-condition house usually nets more listed, for probate specifically", () => {
    const page = stateLineContentTransaction["probate-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/time to work with/i);
    expect(text).toMatch(/agree on what to do|cooperat/i);
    expect(text).toMatch(/does not need significant repair|decent condition/i);
    expect(text).toMatch(/nets more money|better off listed/i);
  });

  it("has zero duplicate 160-character windows within the transaction cluster", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    for (const page of pages) {
      for (const paragraph of page.body) {
        for (let i = 0; i + 160 <= paragraph.length; i += 20) {
          const w = paragraph.slice(i, i + 160);
          const owner = windows.get(w);
          if (owner && owner !== page.slug) duplicates.push(`${owner} <-> ${page.slug}`);
          windows.set(w, page.slug);
        }
      }
    }
    expect(duplicates).toEqual([]);
  });

  it("has zero duplicate 160-character windows against the foreclosure and money clusters", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
    ];
    for (const page of [...priorPages, ...pages]) {
      for (const paragraph of page.body) {
        for (let i = 0; i + 160 <= paragraph.length; i += 20) {
          const w = paragraph.slice(i, i + 160);
          const owner = windows.get(w);
          if (owner && owner !== page.slug) duplicates.push(`${owner} <-> ${page.slug}`);
          windows.set(w, page.slug);
        }
      }
    }
    expect(duplicates).toEqual([]);
  });

  it("has zero duplicate 160-character windows across the entire content registry", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    for (const map of contentRegistries) {
      for (const page of Object.values(map)) {
        for (const paragraph of page.body) {
          for (let i = 0; i + 160 <= paragraph.length; i += 20) {
            const w = paragraph.slice(i, i + 160);
            const owner = windows.get(w);
            if (owner && owner !== page.slug) duplicates.push(`${owner} <-> ${page.slug}`);
            windows.set(w, page.slug);
          }
        }
      }
    }
    expect(duplicates).toEqual([]);
  });

  it("registers all four pages in the merged content registry", () => {
    for (const slug of Object.keys(stateLineContentTransaction)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all four pages indexable -- every one of them actually clears the 600-word floor honestly", () => {
    // Unlike the foreclosure and money clusters, this is not a foregone
    // conclusion -- two of these pages carry zero legal claims. If either one
    // is ever trimmed below 600 words, it should go noindex rather than have
    // this assertion loosened.
    for (const slug of Object.keys(stateLineContentTransaction)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
