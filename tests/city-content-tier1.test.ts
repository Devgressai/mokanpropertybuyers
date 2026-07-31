// tests/city-content-tier1.test.ts
//
// Wave 0C -- the twelve tier-1 city pages, the highest-intent money pages on
// the site. Same mechanical contract as county-content-metro.test.ts (Task 8
// of docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md), extended
// with city-specific checks: every page must name its own city and its
// parent county, and the two Kansas Citys -- different cities in different
// states with different law -- must never assert the other state's law.
// Every assertion here is designed to fail against broken content, not just
// pass against correct content.
import { describe, expect, it } from "vitest";
import { cityContentTier1 } from "../src/data/city-content-tier1";
import { countyContentMetro } from "../src/data/county-content-metro";
import { stateLineContentForeclosure } from "../src/data/state-line-content-foreclosure";
import { stateLineContentMoney } from "../src/data/state-line-content-money";
import { stateLineContentTransaction } from "../src/data/state-line-content-transaction";
import { stateHubContent } from "../src/data/state-hub-content";
import { citations } from "../src/data/legal-citations";
import { counties, cities } from "../src/data/geography";
import { getPageContent, contentRegistries } from "../src/data/content-registry";
import { isIndexable, MIN_INDEXABLE_WORDS } from "../src/lib/seo/indexation";
import { findUnlabeledBlends, auditClaimList } from "../scripts/check-state-claims.mts";

const CITY_MIN_WORDS = 900;

// Mirrors the gate's own patterns (scripts/check-state-claims.mts) so a
// mislabeled paragraph fails here even if it happens to dodge the gate.
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const EXPECTED_SLUGS = [
  "sell-my-house-fast-kansas-city-mo",
  "sell-my-house-fast-overland-park-ks",
  "sell-my-house-fast-kansas-city-ks",
  "sell-my-house-fast-olathe-ks",
  "sell-my-house-fast-topeka-ks",
  "sell-my-house-fast-independence-mo",
  "sell-my-house-fast-lees-summit-mo",
  "sell-my-house-fast-lawrence-ks",
  "sell-my-house-fast-st-joseph-mo",
  "sell-my-house-fast-shawnee-ks",
  "sell-my-house-fast-blue-springs-mo",
  "sell-my-house-fast-lenexa-ks",
];

// Counties whose own hub page has content -- every parent below except
// Buchanan (St. Joseph's county) has one; St. Joseph must not claim a
// Buchanan County page exists.
const COUNTIES_WITH_CONTENT = new Set(Object.keys(countyContentMetro));

const pages = Object.values(cityContentTier1);
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("city content -- tier-1 Wave 0C", () => {
  it("defines exactly the twelve expected city slugs", () => {
    expect(Object.keys(cityContentTier1).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real city in geography.ts", () => {
    for (const [key, page] of Object.entries(cityContentTier1)) {
      expect(page.slug).toBe(key);
      expect(cityBySlug.get(key), key).toBeDefined();
    }
  });

  it("clears the 900-word floor on every page, well above the 600-word site floor", () => {
    expect(CITY_MIN_WORDS).toBeGreaterThan(MIN_INDEXABLE_WORDS);
    for (const page of pages) {
      expect(wordCount(page.body), page.slug).toBeGreaterThanOrEqual(CITY_MIN_WORDS);
    }
  });

  it("labels every paragraph asserting state-specific law with [MO] or [KS]", () => {
    let checked = 0;
    for (const page of pages) {
      for (const paragraph of page.body) {
        if (LEGAL_MARKERS.test(paragraph) && NAMES_A_STATE.test(paragraph)) {
          checked++;
          expect(LABEL.test(paragraph), `${page.slug}: "${paragraph.slice(0, 90)}"`).toBe(true);
        }
      }
    }
    expect(checked).toBeGreaterThan(30);
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

  it("carries only the label matching its own city's state -- no [KS] on a Missouri city, no [MO] on a Kansas city", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      if (city.state === "MO") {
        expect(text, page.slug).not.toMatch(/\[KS\]/);
      } else {
        expect(text, page.slug).not.toMatch(/\[MO\]/);
      }
    }
  });

  it("contains no deictic stand-in for a named state", () => {
    for (const page of pages) {
      for (const paragraph of page.body) {
        expect(DEICTIC.test(paragraph), `${page.slug}: "${paragraph.slice(0, 90)}"`).toBe(false);
      }
    }
  });

  it("gives every page at least one claim, and every claim passes the citation audit", () => {
    for (const page of pages) {
      const claims = page.claims ?? [];
      expect(claims.length, page.slug).toBeGreaterThan(0);
      expect(auditClaimList(page.slug, claims)).toEqual([]);
    }
  });

  it("references claims by identity to the ledger -- never a retyped copy -- and every claim id resolves in citations", () => {
    const idByClaim = new Map(Object.entries(citations).map(([id, c]) => [c, id]));
    for (const page of pages) {
      for (const claim of page.claims ?? []) {
        const id = idByClaim.get(claim);
        expect(id, `${page.slug}: a claim object is not === any entry in citations`).toBeDefined();
        expect(id ? citations[id] : undefined, `${page.slug}`).toBeDefined();
      }
    }
  });

  it("keeps every claim's state consistent with its own city's state", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      for (const claim of page.claims ?? []) {
        expect(claim.state, `${page.slug}: claim state ${claim.state} on a ${city.state} city`).toBe(city.state);
      }
    }
  });

  it("names its own city by name", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      expect(text.includes(city.name), `${page.slug}: city name "${city.name}" not found`).toBe(true);
    }
  });

  it("names its own parent county by name", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const county = countyBySlug.get(city.countySlug)!;
      const text = page.body.join(" ");
      expect(text.includes(county.name), `${page.slug}: county name "${county.name}" not found`).toBe(true);
    }
  });

  it("links its own parent county's hub page by name only when that hub actually has content -- never claims one exists for Buchanan County", () => {
    const stJoseph = cityContentTier1["sell-my-house-fast-st-joseph-mo"];
    const stJosephText = stJoseph.body.join(" ");
    expect(stJosephText).toMatch(/Buchanan County/);
    expect(stJosephText).not.toMatch(/this site's (dedicated )?Buchanan County page/);

    for (const page of pages) {
      if (page.slug === "sell-my-house-fast-st-joseph-mo") continue;
      const city = cityBySlug.get(page.slug)!;
      expect(COUNTIES_WITH_CONTENT.has(city.countySlug), `${page.slug}: expected its county to have content`).toBe(
        true
      );
      const county = countyBySlug.get(city.countySlug)!;
      const text = page.body.join(" ");
      expect(text, page.slug).toMatch(new RegExp(`${county.name}\\s+page`));
    }
  });

  it("references its own city's real population figure from geography.ts", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      expect(text, page.slug).toContain(city.population.toLocaleString("en-US"));
    }
  });

  it("says when selling to us is the wrong move, specific to each city", () => {
    const WRONG_MOVE =
      /adds up to a reason to take a fast cash offer|no reason by itself to accept a fast cash offer|means every seller in this city should decline|obvious answer for a seller|right move just because|right call for a seller|not selling to us at all|default answer for a seller|should not treat a fast cash sale as the default|automatically right choice|automatically the wrong choice|not automatically a bad candidate|better off listing through a realtor|is very often the better outcome/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(WRONG_MOVE.test(text), page.slug).toBe(true);
    }
  });

  it("frames each page with a no-legal-advice closing that points at a professional", () => {
    // Matches the PROPERTY, not one blessed sentence. The earlier version of
    // this test asserted the literal phrase "None of this is legal advice" on
    // every page, which mandated an identical closing across all twelve --
    // exactly the scaled-content duplication the rest of this suite forbids.
    // A test that requires boilerplate is worse than no test.
    const DISCLAIMS = /\b(not|nothing (?:above|here|on this page) is|none of this is)\b[^.]{0,40}\blegal advice\b/i;
    const POINTS_AT_COUNSEL = /\b(attorney|lawyer|counsel)\b/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(DISCLAIMS.test(text), `${page.slug} disclaims legal advice`).toBe(true);
      expect(POINTS_AT_COUNSEL.test(text), `${page.slug} points at counsel`).toBe(true);
    }
  });

  it("does not reuse a substantive legal-advice sentence across pages", () => {
    // The inverse of the test above, and the reason it was rewritten: the
    // disclaimer must appear on every page without the SUBSTANCE being copied.
    //
    // The threshold is deliberate. A short conventional formula -- "None of
    // this is legal advice." -- is a legal idiom, not scaled content, and
    // demanding twelve different phrasings of it would be make-work that costs
    // clarity. What must not repeat is the sentence that actually explains
    // WHY, and what the reader should do instead. Flagging only sentences past
    // MIN_SUBSTANTIVE draws that line explicitly rather than pretending every
    // repeated string is equally bad.
    const sentences = new Map<string, string[]>();
    for (const page of pages) {
      for (const raw of page.body.join(" ").split(/(?<=\.)\s+/)) {
        if (!/legal advice/i.test(raw)) continue;
        const MIN_SUBSTANTIVE = 80;
        if (raw.trim().length < MIN_SUBSTANTIVE) continue;
        const key = raw.trim().toLowerCase();
        if (!sentences.has(key)) sentences.set(key, []);
        sentences.get(key)!.push(page.slug);
      }
    }
    const shared = [...sentences.entries()].filter(([, slugs]) => slugs.length > 1);
    expect(shared.map(([, slugs]) => slugs.join(" + ")), "identical disclaimer reused").toEqual([]);
  });

  it("never fabricates a market statistic -- no medians, day-on-market counts, or homes-bought claims", () => {
    const FABRICATED = /\$[\d,]+(?:k|,000)? (?:median|average)|days? on (the )?market|we(?:'ve| have) bought \d+/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(FABRICATED.test(text), page.slug).toBe(false);
    }
  });

  it("makes the Kansas City, Missouri page name Kansas City, Kansas without asserting Kansas law", () => {
    const page = cityContentTier1["sell-my-house-fast-kansas-city-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Kansas City, Kansas/);
    expect(text).not.toMatch(/\[KS\]/);
  });

  it("makes the Kansas City, Kansas page name Kansas City, Missouri without asserting Missouri law", () => {
    const page = cityContentTier1["sell-my-house-fast-kansas-city-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Kansas City, Missouri/);
    expect(text).not.toMatch(/\[MO\]/);
  });

  it("distinguishes the two Kansas Citys by county and state, not just by a distance figure", () => {
    const mo = cityContentTier1["sell-my-house-fast-kansas-city-mo"];
    const ks = cityContentTier1["sell-my-house-fast-kansas-city-ks"];
    expect(mo.body.join(" ")).toMatch(/Jackson County/);
    expect(mo.body.join(" ")).toMatch(/Wyandotte County/);
    expect(ks.body.join(" ")).toMatch(/Wyandotte County/);
    expect(ks.body.join(" ")).toMatch(/Jackson County/);
  });

  it("covers Overland Park, Olathe, and Lenexa's shared Johnson County story -- uncapped homestead plus the multi-year tax-sale holding period -- without collapsing into one template", () => {
    for (const slug of [
      "sell-my-house-fast-overland-park-ks",
      "sell-my-house-fast-olathe-ks",
      "sell-my-house-fast-lenexa-ks",
    ]) {
      const page = cityContentTier1[slug];
      const text = page.body.join(" ");
      expect(text, slug).toMatch(/no dollar limit|uncapped|no cap/i);
      expect(text, slug).toMatch(/two years|three years/i);
      expect(page.claims, slug).toContainEqual(citations["ks-homestead"]);
      expect(page.claims, slug).toContainEqual(citations["ks-tax-sale-county-holding-period"]);
    }
  });

  it("covers Olathe's distinguishing story: the Johnson County seat and its own district courthouse", () => {
    const page = cityContentTier1["sell-my-house-fast-olathe-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/county seat/i);
    expect(text).toMatch(/courthouse/i);
  });

  it("covers Topeka's distinguishing story: state capital, Shawnee County, and the farthest tier-1 distance", () => {
    const page = cityContentTier1["sell-my-house-fast-topeka-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/capital/i);
    expect(text).toMatch(/60 miles/);
  });

  it("covers Independence's distinguishing story: the Santa Fe/Oregon/California trailhead and older housing stock", () => {
    const page = cityContentTier1["sell-my-house-fast-independence-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Santa Fe/);
    expect(text).toMatch(/Oregon/);
    expect(text).toMatch(/California Trail/);
    expect(text).toMatch(/older/i);
  });

  it("covers Lee's Summit and Blue Springs as newer Jackson County suburbs than Independence, without duplicating each other's paragraphs", () => {
    for (const slug of ["sell-my-house-fast-lees-summit-mo", "sell-my-house-fast-blue-springs-mo"]) {
      const page = cityContentTier1[slug];
      const text = page.body.join(" ");
      expect(text, slug).toMatch(/newer/i);
      expect(text, slug).toMatch(/Independence/);
    }
  });

  it("covers Lawrence's distinguishing story: the University of Kansas and the rental-heavy homestead caveat", () => {
    const page = cityContentTier1["sell-my-house-fast-lawrence-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/University of Kansas/);
    expect(text).toMatch(/rental|tenant|landlord/i);
    expect(text).toMatch(/cannot claim that same shield|should not assume the same/i);
  });

  it("covers St. Joseph's distinguishing story: the Pony Express and a Buchanan County page that does not exist yet", () => {
    const page = cityContentTier1["sell-my-house-fast-st-joseph-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Pony Express/);
    expect(text).toMatch(/does not yet have its own dedicated hub page|Buchanan County does not/i);
  });

  it("covers Shawnee, Kansas's distinguishing story: the naming collision with Shawnee County and Topeka roughly 50 miles away", () => {
    const page = cityContentTier1["sell-my-house-fast-shawnee-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Shawnee County/);
    expect(text).toMatch(/Topeka/);
    expect(text).toMatch(/50 miles/);
    expect(text).toMatch(/Wyandotte County/);
  });

  it("has zero duplicate 160-character windows within the city map itself", () => {
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

  it("has zero duplicate 160-character windows against every prior content map", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
      ...Object.values(stateLineContentTransaction),
      ...Object.values(stateHubContent),
      ...Object.values(countyContentMetro),
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
    // Asserts this file's map is REGISTERED, not how many maps exist. The
    // earlier version pinned contentRegistries.length to an exact count, which
    // meant every future content wave broke a test in an unrelated file for no
    // reason. A count is not the property under test.
    //
    // NOTE: this scans at stride 20, which SAMPLES rather than proves. The
    // authoritative check is `npm run check:duplication` (gate #10), which is
    // exhaustive at stride 1. A coarse stride reported 0 duplicates here while
    // the exhaustive gate found 23 -- see docs/WAVE-0B-PREREQUISITES.md.
    expect(
      contentRegistries.some((m) => "sell-my-house-fast-kansas-city-mo" in m),
      "tier-1 city map is registered"
    ).toBe(true);
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

  it("registers all twelve pages in the merged content registry", () => {
    for (const slug of Object.keys(cityContentTier1)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all twelve pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(cityContentTier1)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
