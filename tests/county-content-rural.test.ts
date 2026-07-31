// tests/county-content-rural.test.ts
//
// Twelve more county hub pages (Wave 0C, counties 21-32), the smallest and
// most rural batch yet -- every county here sits under 22,000 people, and
// most sit 60-97 miles from the metro core. Same mechanical contract as the
// metro and outer batches' tests, mirrored here rather than imported so a
// change to one gate is a deliberate edit to both, not a silent divergence.
//
// This batch carries two name traps of its own: Jefferson County, Kansas
// (north of Lawrence) shares its name with Jefferson Counties in many other
// states, and Atchison County, Kansas is a different county from Atchison
// County, Missouri, which sits outside this site's 53-county footprint and
// has no page. Both pages below say so explicitly.
import { describe, expect, it } from "vitest";
import { countyContentRural } from "../src/data/county-content-rural";
import { countyContentMetro } from "../src/data/county-content-metro";
import { countyContentOuter } from "../src/data/county-content-outer";
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

const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax|contract for deed)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const EXPECTED_SLUGS = [
  "sell-my-house-fast-clinton-county-mo",
  "sell-my-house-fast-nodaway-county-mo",
  "sell-my-house-fast-benton-county-mo",
  "sell-my-house-fast-vernon-county-mo",
  "sell-my-house-fast-jefferson-county-ks",
  "sell-my-house-fast-andrew-county-mo",
  "sell-my-house-fast-cooper-county-mo",
  "sell-my-house-fast-bates-county-mo",
  "sell-my-house-fast-atchison-county-ks",
  "sell-my-house-fast-osage-county-ks",
  "sell-my-house-fast-livingston-county-mo",
  "sell-my-house-fast-bourbon-county-ks",
];

const pages = Object.values(countyContentRural);
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("county content -- rural Wave 0C (counties 21-32)", () => {
  it("defines exactly the twelve expected county slugs", () => {
    expect(Object.keys(countyContentRural).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real county in geography.ts", () => {
    for (const [key, page] of Object.entries(countyContentRural)) {
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
      expect(text, page.slug).toContain(county.population.toLocaleString("en-US"));
    }
  });

  it("says when selling to us is the wrong move, specific to each county", () => {
    const WRONG_MOVE =
      /obvious answer for a seller|is not (?:who|the seller) a fast cash sale is built for|is the stronger move|usually beats a fast cash sale|rarely serves|rarely needs|rarely the right call|comes out ahead (?:bringing|listing)|usually favors (?:bringing|listing)|toward a conventional listing|usually better served|gains (?:little|more)|outperform(?:s)? a fast cash sale|changes the (?:answer|calculation)|calculation changes|better than a fast cash sale|than taking a cash offer|does better working with a local realtor|sells for more/i;
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

  it("never reuses the exact same substantive no-legal-advice sentence twice across this batch", () => {
    const closings = pages.map((p) => {
      const match = p.body.find((para) => /None of this is legal advice/i.test(para));
      return match ?? "";
    });
    const unique = new Set(closings);
    expect(unique.size, "every page's closing disclaimer sentence should be distinct").toBe(closings.length);
  });

  it("covers the thin-market reality honestly, both directions, on every page", () => {
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(text, page.slug).toMatch(/sit (for|unsold|on the market)/i);
      expect(text, page.slug).toMatch(/land(s)? lower|come in lower|lower than/i);
    }
  });

  it("mentions farm-credit or cash buyers as part of the rural buyer pool on every page", () => {
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(text, page.slug).toMatch(/farm-credit/i);
    }
  });

  it("Jefferson County, Kansas page is explicit that this is the county north of Lawrence, not a same-named county elsewhere", () => {
    const page = countyContentRural["sell-my-house-fast-jefferson-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/north of Lawrence/);
    expect(text).toMatch(/shared by dozens of counties|other Jefferson Count/i);
  });

  it("Atchison County, Kansas page explicitly disambiguates from Atchison County, Missouri, which has no page", () => {
    const page = countyContentRural["sell-my-house-fast-atchison-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Atchison County, Missouri/);
    expect(text).toMatch(/outside this site's 53-county footprint|no page/i);
  });

  it("covers Livingston County's distinguishing story: Chillicothe, Home of Sliced Bread", () => {
    const page = countyContentRural["sell-my-house-fast-livingston-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Sliced Bread/);
    expect(text).toMatch(/Chillicothe/);
  });

  it("covers Bourbon County's distinguishing story: Fort Scott National Historic Site", () => {
    const page = countyContentRural["sell-my-house-fast-bourbon-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Fort Scott National Historic Site/);
  });

  it("covers Nodaway County's distinguishing story: Northwest Missouri State University and rental turnover", () => {
    const page = countyContentRural["sell-my-house-fast-nodaway-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Northwest Missouri State University/);
    expect(text).toMatch(/rental/i);
  });

  it("covers Benton County's distinguishing story: the Truman Lake / Lake of the Ozarks gateway at Warsaw", () => {
    const page = countyContentRural["sell-my-house-fast-benton-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Truman/);
    expect(text).toMatch(/Warsaw/);
  });

  it("covers Jefferson County, Kansas's Perry Lake distinguishing story", () => {
    const page = countyContentRural["sell-my-house-fast-jefferson-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Perry Lake/);
  });

  it("covers Vernon and Bourbon County's shared state-line pairing, each naming the other state", () => {
    const vernon = countyContentRural["sell-my-house-fast-vernon-county-mo"];
    const bourbon = countyContentRural["sell-my-house-fast-bourbon-county-ks"];
    expect(vernon.body.join(" ")).toMatch(/Bourbon County, Kansas/);
    expect(bourbon.body.join(" ")).toMatch(/Vernon County, Missouri/);
  });

  it("has zero duplicate 160-character windows within this county map itself", () => {
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

  it("has zero duplicate 160-character windows against the metro, outer, foreclosure, money, transaction, and state-hub content", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(countyContentMetro),
      ...Object.values(countyContentOuter),
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

  it("registers all twelve pages in the merged content registry", () => {
    for (const slug of Object.keys(countyContentRural)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all twelve pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(countyContentRural)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
