// tests/county-content-metro.test.ts
//
// The content contract (docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md,
// Task 8, and the Wave 0C county brief) is mechanically checkable, so this test
// checks it mechanically rather than trusting a read-through. Every assertion
// here is designed to fail against broken content, not just pass against
// correct content -- see the addendum in docs/CITATION-LEDGER.md on why a
// clean sweep deserves scrutiny.
//
// These eight pages are the first county hubs in the footprint, children of
// the two state hubs. Each is exactly one state throughout: a Missouri county
// page must never carry a [KS] label, and a Kansas county page must never
// carry a [MO] label, regardless of whether the page mentions the other
// state's name for orientation (e.g. Wyandotte County's two-Kansas-Citys
// clarification names Missouri without asserting Missouri law).
import { describe, expect, it } from "vitest";
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

const COUNTY_MIN_WORDS = 900;

// Mirrors the gate's own patterns (scripts/check-state-claims.mts) so a
// mislabeled paragraph fails here even if it happens to dodge the gate.
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const EXPECTED_SLUGS = [
  "sell-my-house-fast-jackson-county-mo",
  "sell-my-house-fast-johnson-county-ks",
  "sell-my-house-fast-clay-county-mo",
  "sell-my-house-fast-shawnee-county-ks",
  "sell-my-house-fast-wyandotte-county-ks",
  "sell-my-house-fast-douglas-county-ks",
  "sell-my-house-fast-platte-county-mo",
  "sell-my-house-fast-cass-county-mo",
];

const pages = Object.values(countyContentMetro);
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("county content -- metro Wave 0C", () => {
  it("defines exactly the eight expected county slugs", () => {
    expect(Object.keys(countyContentMetro).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real county in geography.ts", () => {
    for (const [key, page] of Object.entries(countyContentMetro)) {
      expect(page.slug).toBe(key);
      expect(countyBySlug.get(key), key).toBeDefined();
    }
  });

  it("clears the 900-word floor on every page, well above the 600-word site floor", () => {
    expect(COUNTY_MIN_WORDS).toBeGreaterThan(MIN_INDEXABLE_WORDS);
    for (const page of pages) {
      expect(wordCount(page.body), page.slug).toBeGreaterThanOrEqual(COUNTY_MIN_WORDS);
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

  it("carries only the label matching its own county's state -- no [KS] on a Missouri county, no [MO] on a Kansas county", () => {
    for (const page of pages) {
      const county = countyBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      if (county.state === "MO") {
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

  it("keeps every claim's state consistent with its own county's state", () => {
    for (const page of pages) {
      const county = countyBySlug.get(page.slug)!;
      for (const claim of page.claims ?? []) {
        expect(claim.state, `${page.slug}: claim state ${claim.state} on a ${county.state} county`).toBe(
          county.state
        );
      }
    }
  });

  it("names at least one real city from its own county's citySlugs", () => {
    for (const page of pages) {
      const county = countyBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      const namedCity = county.citySlugs.some((slug) => {
        const city = cityBySlug.get(slug);
        return city && text.includes(city.name);
      });
      expect(namedCity, `${page.slug}: no city from citySlugs (${county.citySlugs.join(", ")}) found in body`).toBe(
        true
      );
    }
  });

  it("names multiple real cities from its own county's citySlugs, not just one token city", () => {
    for (const page of pages) {
      const county = countyBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      const namedCount = county.citySlugs.filter((slug) => {
        const city = cityBySlug.get(slug);
        return city && text.includes(city.name);
      }).length;
      expect(namedCount, page.slug).toBeGreaterThanOrEqual(Math.min(3, county.citySlugs.length));
    }
  });

  it("references the county's own real population figure from footprint data", () => {
    for (const page of pages) {
      const county = countyBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      // Rendered as "roughly N people" using the exact integer from geography.ts.
      expect(text, page.slug).toContain(county.population.toLocaleString("en-US"));
    }
  });

  it("says when selling to us is the wrong move, specific to each county", () => {
    const WRONG_MOVE =
      /adds up to a reason to take a fast cash offer|automatically right for a [\w\s]+ seller|obvious answer for a seller|right move just because|is not selling to us at all|genuinely good candidate for a fast cash sale|default answer for a seller|is not (?:who|the seller) a fast cash sale is built for|is the stronger move|usually beats a fast cash sale|rarely serves|rarely needs|rarely the right call|comes out ahead (?:bringing|listing)|usually favors (?:bringing|listing)|toward a conventional listing|usually better served|gains (?:little|more)|outperform(?:s)? a fast cash sale|changes the (?:answer|calculation)|calculation changes|better than a fast cash sale|than taking a cash offer|does better working with a local realtor|sells for more/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(WRONG_MOVE.test(text), page.slug).toBe(true);
    }
  });

  it("frames each page with a no-legal-advice closing", () => {
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(text, page.slug).toMatch(/None of this is legal advice/i);
    }
  });

  it("covers Jackson County's distinguishing story: the 2023 reassessment and the KCMO earnings tax", () => {
    const page = countyContentMetro["sell-my-house-fast-jackson-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/reassessment/i);
    expect(text).toMatch(/may (go forward|proceed)/i);
    expect(text).not.toMatch(/the Commission (won|prevailed)\b/i);
    expect(text).toMatch(/earnings tax/i);
    expect(page.claims).toContainEqual(citations["jackson-county-reassessment"]);
    expect(page.claims).toContainEqual(citations["kcmo-earnings-tax"]);
  });

  it("covers Johnson County's distinguishing story: uncapped homestead plus the three-year tax-sale holding period", () => {
    const page = countyContentMetro["sell-my-house-fast-johnson-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/three years?/i);
    expect(text).toMatch(/no dollar limit|uncapped|no cap/i);
    expect(text).toMatch(/frequently|often better off not selling/i);
    expect(page.claims).toContainEqual(citations["ks-tax-sale-county-holding-period"]);
    expect(page.claims).toContainEqual(citations["ks-homestead"]);
  });

  it("covers Wyandotte County's distinguishing story: explicit on which state governs Kansas City, Kansas", () => {
    const page = countyContentMetro["sell-my-house-fast-wyandotte-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Kansas City, Kansas/);
    expect(text).toMatch(/Kansas City, Missouri/);
    expect(text).toMatch(/Kansas law.*governs|governs.*Kansas law/i);
  });

  it("covers Shawnee County's distinguishing story: Topeka and the farthest large-county distance", () => {
    const page = countyContentMetro["sell-my-house-fast-shawnee-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Topeka/);
    expect(text).toMatch(/63 miles|farthest/i);
  });

  it("covers Douglas County's distinguishing story: Lawrence, the university, and a rental-heavy homestead caveat", () => {
    const page = countyContentMetro["sell-my-house-fast-douglas-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/University of Kansas|Lawrence/);
    expect(text).toMatch(/rental|tenant|landlord/i);
    expect(text).toMatch(/should not assume the same uncapped protection/i);
  });

  it("covers Clay and Platte County's shared Northland identity and their own 50,000-population notice threshold", () => {
    const clay = countyContentMetro["sell-my-house-fast-clay-county-mo"];
    const platte = countyContentMetro["sell-my-house-fast-platte-county-mo"];
    for (const page of [clay, platte]) {
      const text = page.body.join(" ");
      expect(text, page.slug).toMatch(/Northland/);
      expect(text, page.slug).toMatch(/50,000/);
    }
  });

  it("covers Cass County's distinguishing story: the southern growth corridor, still clearing the 50,000 notice line", () => {
    const page = countyContentMetro["sell-my-house-fast-cass-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/southern/i);
    expect(text).toMatch(/50,000/);
  });

  it("has zero duplicate 160-character windows within the county map itself", () => {
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

  it("has zero duplicate 160-character windows against the foreclosure, money, transaction, and state-hub content", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
      ...Object.values(stateLineContentTransaction),
      ...Object.values(stateHubContent),
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

  it("registers all eight pages in the merged content registry", () => {
    for (const slug of Object.keys(countyContentMetro)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all eight pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(countyContentMetro)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
