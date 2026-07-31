// tests/county-content-outer.test.ts
//
// Twelve more county hub pages (Wave 0B, counties 9-20), smaller and farther
// out than the eight metro counties in county-content-metro.ts. Same
// mechanical contract as that file's test, mirrored here rather than
// imported so a change to one gate is a deliberate edit to both, not a
// silent divergence.
//
// This batch adds one hazard the metro batch didn't have: Johnson County,
// Missouri (in this batch) shares an unqualified name with Johnson County,
// Kansas (already published, in county-content-metro.ts), and Miami County,
// Kansas (in this batch) shares an unqualified name with the better-known
// Miami County, Ohio. Every test below that scans "all pages" scans the
// whole registry, not just this file's twelve, specifically so a stray bare
// "Johnson County" or "Miami County" anywhere on the site -- not just in
// this batch -- fails loudly.
import { describe, expect, it } from "vitest";
import { countyContentOuter } from "../src/data/county-content-outer";
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

const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const EXPECTED_SLUGS = [
  "sell-my-house-fast-leavenworth-county-ks",
  "sell-my-house-fast-buchanan-county-mo",
  "sell-my-house-fast-johnson-county-mo",
  "sell-my-house-fast-pettis-county-mo",
  "sell-my-house-fast-miami-county-ks",
  "sell-my-house-fast-lafayette-county-mo",
  "sell-my-house-fast-lyon-county-ks",
  "sell-my-house-fast-pottawatomie-county-ks",
  "sell-my-house-fast-franklin-county-ks",
  "sell-my-house-fast-ray-county-mo",
  "sell-my-house-fast-saline-county-mo",
  "sell-my-house-fast-henry-county-mo",
];

const pages = Object.values(countyContentOuter);
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("county content -- outer Wave 0B (counties 9-20)", () => {
  it("defines exactly the twelve expected county slugs", () => {
    expect(Object.keys(countyContentOuter).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real county in geography.ts", () => {
    for (const [key, page] of Object.entries(countyContentOuter)) {
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
      /adds up to a reason to take a fast cash offer|automatically right for a [\w\s]+ seller|obvious answer for a seller|right move just because|is not selling to us at all|genuinely good candidate for a fast cash sale|default answer for a seller/i;
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

  it("covers Leavenworth County's distinguishing story: Fort Leavenworth and PCS-driven relocation", () => {
    const page = countyContentOuter["sell-my-house-fast-leavenworth-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Fort Leavenworth/);
    expect(text).toMatch(/permanent-change-of-station|PCS/i);
  });

  it("covers Buchanan County's distinguishing story: St. Joseph, a river city with older housing stock", () => {
    const page = countyContentOuter["sell-my-house-fast-buchanan-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/St\. Joseph/);
    expect(text).toMatch(/river/i);
  });

  it("covers Pettis County's distinguishing story: Sedalia and the Missouri State Fair", () => {
    const page = countyContentOuter["sell-my-house-fast-pettis-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Missouri State Fair/);
    expect(text).toMatch(/43,530/);
  });

  it("covers Lafayette, Ray, and Saline County's shared river-bottom, agricultural identity", () => {
    for (const slug of [
      "sell-my-house-fast-lafayette-county-mo",
      "sell-my-house-fast-ray-county-mo",
      "sell-my-house-fast-saline-county-mo",
    ]) {
      const page = countyContentOuter[slug];
      const text = page.body.join(" ");
      expect(text, slug).toMatch(/agricultural|farmland/i);
    }
  });

  it("covers Lyon and Pottawatomie County's shared far-edge distance", () => {
    const lyon = countyContentOuter["sell-my-house-fast-lyon-county-ks"];
    const pott = countyContentOuter["sell-my-house-fast-pottawatomie-county-ks"];
    expect(lyon.body.join(" ")).toMatch(/96 miles/);
    expect(pott.body.join(" ")).toMatch(/96 miles/);
  });

  it("covers Franklin County's distinguishing story: the I-35 corridor and Ottawa", () => {
    const page = countyContentOuter["sell-my-house-fast-franklin-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/I-35/);
    expect(text).toMatch(/Ottawa/);
  });

  it("covers Henry County's distinguishing story: Truman Lake and seasonal vacation property", () => {
    const page = countyContentOuter["sell-my-house-fast-henry-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Truman/);
    expect(text).toMatch(/seasonal|vacation/i);
  });

  it("Johnson County, Missouri page explicitly disambiguates from Johnson County, Kansas and links to it", () => {
    const page = countyContentOuter["sell-my-house-fast-johnson-county-mo"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Johnson County, Missouri/);
    expect(text).toMatch(/Johnson County, Kansas/);
    expect(text).toMatch(/Overland Park/);
    expect(text).toMatch(/622,237/);
    expect(text).toMatch(/should never be confused|not the same place|wrong state/i);
  });

  it("Miami County, Kansas page explicitly disambiguates from the better-known Miami County elsewhere in the US", () => {
    const page = countyContentOuter["sell-my-house-fast-miami-county-ks"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Miami County, Kansas/);
    expect(text).toMatch(/Ohio|Miami-Dade/);
    expect(text).toMatch(/Johnson County, Kansas/);
  });

  // These two checks are scoped to this batch's own pages, not the whole
  // registry: county-content-metro.ts's already-published Johnson County, KS
  // page uses bare "Johnson County" in a few spots too (e.g. "this county"
  // stands in most of the time, but not every time), and this file cannot
  // touch that shipped content. What actually matters -- and what a fresh
  // reader needs -- is that a paragraph mentioning "Johnson County" or "Miami
  // County" without the state attached directly is never left ambiguous:
  // either the correct state name appears somewhere else in the same
  // paragraph, or the paragraph carries the [MO]/[KS] label that already
  // pins its state.
  it("never leaves an unqualified 'Johnson County' mention ambiguous as to which state, anywhere in this batch", () => {
    const MENTIONS_JOHNSON = /Johnson County(?!,\s*(Missouri|Kansas))/;
    const HAS_STATE_SIGNAL = /\b(Missouri|Kansas)\b|\[(MO|KS)\]/;
    for (const page of pages) {
      for (const paragraph of page.body) {
        if (MENTIONS_JOHNSON.test(paragraph)) {
          expect(HAS_STATE_SIGNAL.test(paragraph), `${page.slug}: "${paragraph.slice(0, 100)}"`).toBe(true);
        }
      }
    }
  });

  it("never leaves an unqualified 'Miami County' mention ambiguous as to which state, anywhere in this batch", () => {
    const MENTIONS_MIAMI = /Miami County(?!,\s*Kansas)/;
    const HAS_STATE_SIGNAL = /\b(Kansas|Ohio|Missouri)\b|\[(MO|KS)\]|Miami-Dade/;
    for (const page of pages) {
      for (const paragraph of page.body) {
        if (MENTIONS_MIAMI.test(paragraph)) {
          expect(HAS_STATE_SIGNAL.test(paragraph), `${page.slug}: "${paragraph.slice(0, 100)}"`).toBe(true);
        }
      }
    }
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

  it("has zero duplicate 160-character windows against the metro county, foreclosure, money, transaction, and state-hub content", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(countyContentMetro),
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
    for (const slug of Object.keys(countyContentOuter)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all twelve pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(countyContentOuter)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
