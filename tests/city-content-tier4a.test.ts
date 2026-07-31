// tests/city-content-tier4a.test.ts
//
// Wave 0C, batch 4 -- the fourteen tier-4 city pages, the eleventh content
// map. Same mechanical contract as city-content-tier3b.test.ts. This batch
// carries its own two name traps: North Kansas City, Missouri is a separate,
// independently incorporated city in Clay County, entirely surrounded by (but
// not part of) Kansas City, Missouri, and distinct as well from Kansas City,
// Kansas across the state line -- a confusion this site has already shipped
// as a live factual error once before. Richmond, Missouri (Ray County) shares
// its name with the much smaller Richmond, Kansas (Franklin County), which
// carries no page of its own in this site's footprint. Every assertion here
// is designed to fail against broken content, not just pass against correct
// content.
import { describe, expect, it } from "vitest";
import { cityContentTier4a } from "../src/data/city-content-tier4a";
import { cityContentTier3a } from "../src/data/city-content-tier3a";
import { cityContentTier3b } from "../src/data/city-content-tier3b";
import { cityContentTier1 } from "../src/data/city-content-tier1";
import { cityContentTier2 } from "../src/data/city-content-tier2";
import { countyContentMetro } from "../src/data/county-content-metro";
import { countyContentOuter } from "../src/data/county-content-outer";
import { stateLineContentForeclosure } from "../src/data/state-line-content-foreclosure";
import { stateLineContentMoney } from "../src/data/state-line-content-money";
import { stateLineContentTransaction } from "../src/data/state-line-content-transaction";
import { stateHubContent } from "../src/data/state-hub-content";
import { citations } from "../src/data/legal-citations";
import { counties, cities } from "../src/data/geography";
import { contentRegistries } from "../src/data/content-registry";
import { MIN_INDEXABLE_WORDS } from "../src/lib/seo/indexation";
import { findUnlabeledBlends, auditClaimList } from "../scripts/check-state-claims.mts";

const CITY_MIN_WORDS = 900;

// Mirrors the gate's own patterns (scripts/check-state-claims.mts) so a
// mislabeled paragraph fails here even if it happens to dodge the gate.
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const EXPECTED_SLUGS = [
  "sell-my-house-fast-peculiar-mo",
  "sell-my-house-fast-richmond-mo",
  "sell-my-house-fast-paola-ks",
  "sell-my-house-fast-odessa-mo",
  "sell-my-house-fast-trenton-mo",
  "sell-my-house-fast-north-kansas-city-mo",
  "sell-my-house-fast-iola-ks",
  "sell-my-house-fast-louisburg-ks",
  "sell-my-house-fast-savannah-mo",
  "sell-my-house-fast-baldwin-city-ks",
  "sell-my-house-fast-wamego-ks",
  "sell-my-house-fast-platte-city-mo",
  "sell-my-house-fast-higginsville-mo",
  "sell-my-house-fast-edwardsville-ks",
];

// Counties whose own hub page has content as of this map's commit -- checked
// against the live registry (a concurrent agent may have added more since
// this file was drafted) rather than a hardcoded snapshot.
const COUNTIES_WITH_CONTENT = new Set([
  ...Object.keys(countyContentMetro),
  ...Object.keys(countyContentOuter),
  ...contentRegistries
    .flatMap((r) => Object.keys(r))
    .filter((slug) => slug.includes("-county-")),
]);
// Grundy (Trenton) and Allen (Iola) are the two counties this map itself
// knows to have no hub page. Andrew County (Savannah) is covered by a
// concurrently landing county map, so it is deliberately NOT listed here --
// the test below asserts its content dynamically instead of hardcoding it.
const NO_CONTENT_COUNTY_SLUGS = new Set([
  "sell-my-house-fast-trenton-mo", // Grundy
  "sell-my-house-fast-iola-ks", // Allen
]);

// Wamego straddles Pottawatomie (has content) and Wabaunsee (does not).
const WAMEGO_SLUG = "sell-my-house-fast-wamego-ks";
const WAMEGO_SECONDARY_COUNTY_SLUG = "sell-my-house-fast-wabaunsee-county-ks";

const pages = Object.values(cityContentTier4a);
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("city content -- tier-4 Wave 0C, batch 4", () => {
  it("defines exactly the fourteen expected city slugs", () => {
    expect(Object.keys(cityContentTier4a).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real city in geography.ts", () => {
    for (const [key, page] of Object.entries(cityContentTier4a)) {
      expect(page.slug).toBe(key);
      expect(cityBySlug.get(key), key).toBeDefined();
    }
  });

  it("verifies every city's parent county against geography.ts -- CityDef.countySlug is authoritative", () => {
    const expectedCounty: Record<string, string> = {
      "sell-my-house-fast-peculiar-mo": "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-richmond-mo": "sell-my-house-fast-ray-county-mo",
      "sell-my-house-fast-paola-ks": "sell-my-house-fast-miami-county-ks",
      "sell-my-house-fast-odessa-mo": "sell-my-house-fast-lafayette-county-mo",
      "sell-my-house-fast-trenton-mo": "sell-my-house-fast-grundy-county-mo",
      "sell-my-house-fast-north-kansas-city-mo": "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-iola-ks": "sell-my-house-fast-allen-county-ks",
      "sell-my-house-fast-louisburg-ks": "sell-my-house-fast-miami-county-ks",
      "sell-my-house-fast-savannah-mo": "sell-my-house-fast-andrew-county-mo",
      "sell-my-house-fast-baldwin-city-ks": "sell-my-house-fast-douglas-county-ks",
      "sell-my-house-fast-wamego-ks": "sell-my-house-fast-pottawatomie-county-ks",
      "sell-my-house-fast-platte-city-mo": "sell-my-house-fast-platte-county-mo",
      "sell-my-house-fast-higginsville-mo": "sell-my-house-fast-lafayette-county-mo",
      "sell-my-house-fast-edwardsville-ks": "sell-my-house-fast-wyandotte-county-ks",
    };
    for (const slug of EXPECTED_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe(expectedCounty[slug]);
    }
  });

  it("confirms Wamego's straddle of Pottawatomie and Wabaunsee County against geography.ts's countiesAll", () => {
    const wamego = cityBySlug.get(WAMEGO_SLUG)!;
    expect(wamego.countiesAll).toEqual(
      expect.arrayContaining([
        "sell-my-house-fast-pottawatomie-county-ks",
        "sell-my-house-fast-wabaunsee-county-ks",
      ])
    );
  });

  it("clears the 900-word floor on every page, well above the 600-word site floor", () => {
    expect(CITY_MIN_WORDS).toBeGreaterThan(MIN_INDEXABLE_WORDS);
    for (const page of pages) {
      expect(wordCount(page.body), page.slug).toBeGreaterThanOrEqual(CITY_MIN_WORDS);
    }
  });

  it('never writes the generic phrase "this city" as a stand-in for a named place', () => {
    for (const page of pages) {
      expect(page.body.join(" "), page.slug).not.toMatch(/\bthis city\b/i);
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

  it("references its own city's real population figure from geography.ts", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      expect(text, page.slug).toContain(city.population.toLocaleString("en-US"));
    }
  });

  it("names its own parent county by name, and correctly flags Trenton and Iola as sitting in counties with no hub page", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const county = countyBySlug.get(city.countySlug)!;
      const text = page.body.join(" ");
      expect(text.includes(county.name), `${page.slug}: county name "${county.name}" not found`).toBe(true);
      if (NO_CONTENT_COUNTY_SLUGS.has(page.slug)) {
        expect(COUNTIES_WITH_CONTENT.has(city.countySlug), `${page.slug}: expected its county to have NO content`).toBe(false);
        expect(text, page.slug).toMatch(/no\b.{0,40}hub page/i);
      } else {
        expect(COUNTIES_WITH_CONTENT.has(city.countySlug), `${page.slug}: expected its county to have content`).toBe(true);
      }
    }
  });

  it("names Wabaunsee County explicitly on Wamego's page and flags it as having no hub page, distinct from Pottawatomie which does", () => {
    const text = cityContentTier4a[WAMEGO_SLUG].body.join(" ");
    expect(text).toMatch(/Wabaunsee County/);
    expect(text).toMatch(/no\b.{0,40}hub page/i);
    expect(COUNTIES_WITH_CONTENT.has(WAMEGO_SECONDARY_COUNTY_SLUG), "Wabaunsee County unexpectedly has content").toBe(false);
    const pottawatomieCounty = countyBySlug.get("sell-my-house-fast-pottawatomie-county-ks")!;
    expect(text).toContain(pottawatomieCounty.name);
    expect(COUNTIES_WITH_CONTENT.has("sell-my-house-fast-pottawatomie-county-ks")).toBe(true);
  });

  it("says when selling to us is the wrong move, specific to each city", () => {
    const WRONG_MOVE =
      /not the obvious (move|answer|move for a seller)|not automatically the right call|not the default answer|not the automatic (answer|right call)|doesn't (automatically )?make a fast cash sale the (obvious|automatic|default)\b|doesn't automatically make a fast cash sale the right call/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(WRONG_MOVE.test(text), page.slug).toBe(true);
    }
  });

  it("frames each page with a no-legal-advice closing that points at a professional", () => {
    const DISCLAIMS = /\b(not|nothing (?:above|here|on this page) is|none of (the above|this) is)\b[^.]{0,80}\blegal advice\b/i;
    const POINTS_AT_COUNSEL = /\b(attorney|lawyer|counsel)\b/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(DISCLAIMS.test(text), `${page.slug} disclaims legal advice`).toBe(true);
      expect(POINTS_AT_COUNSEL.test(text), `${page.slug} points at counsel`).toBe(true);
    }
  });

  it("does not reuse a substantive legal-advice sentence across pages (this map or any prior map)", () => {
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
      ...Object.values(stateLineContentTransaction),
      ...Object.values(stateHubContent),
      ...Object.values(countyContentMetro),
      ...Object.values(countyContentOuter),
      ...Object.values(cityContentTier1),
      ...Object.values(cityContentTier2),
      ...Object.values(cityContentTier3a),
      ...Object.values(cityContentTier3b),
    ];
    const sentences = new Map<string, string[]>();
    for (const page of [...priorPages, ...pages]) {
      for (const raw of page.body.join(" ").split(/(?<=\.)\s+/)) {
        if (!/legal advice/i.test(raw)) continue;
        const MIN_SUBSTANTIVE = 80;
        if (raw.trim().length < MIN_SUBSTANTIVE) continue;
        const key = raw.trim().toLowerCase();
        if (!sentences.has(key)) sentences.set(key, []);
        sentences.get(key)!.push(page.slug);
      }
    }
    const shared = [...sentences.entries()]
      .filter(([, slugs]) => new Set(slugs).size > 1)
      // Only fail on collisions that involve this map -- a prior map
      // repeating itself is that map's own test's job to catch.
      .filter(([, slugs]) => slugs.some((s) => Object.prototype.hasOwnProperty.call(cityContentTier4a, s)));
    expect(shared.map(([, slugs]) => slugs.join(" + ")), "identical disclaimer reused").toEqual([]);
  });

  it("never fabricates a market statistic -- no medians, day-on-market counts, or homes-bought claims", () => {
    const FABRICATED = /\$[\d,]+(?:k|,000)? (?:median|average)|days? on (the )?market|we(?:'ve| have) bought \d+/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(FABRICATED.test(text), page.slug).toBe(false);
    }
  });

  // --- The North Kansas City trap ----------------------------------------

  it("has North Kansas City explicitly distinguish itself from both Kansas City, Missouri and Kansas City, Kansas", () => {
    const text = cityContentTier4a["sell-my-house-fast-north-kansas-city-mo"].body.join(" ");
    expect(text).toMatch(/not (a neighborhood or district of|part of) (that larger city|Kansas City, Missouri)/i);
    expect(text).toMatch(/not Kansas City, Kansas/i);
    expect(text).toMatch(/entirely surrounded/i);
    expect(text).toMatch(/separately incorporated|separate,? independently incorporated|separate incorporated/i);
  });

  it("has North Kansas City belong to Clay County, not Jackson (Kansas City, MO) or Wyandotte (Kansas City, KS)", () => {
    const nkc = cityBySlug.get("sell-my-house-fast-north-kansas-city-mo")!;
    expect(nkc.countySlug).toBe("sell-my-house-fast-clay-county-mo");
    const kcmo = cityBySlug.get("sell-my-house-fast-kansas-city-mo")!;
    const kck = cityBySlug.get("sell-my-house-fast-kansas-city-ks")!;
    expect(kcmo.countySlug).toBe("sell-my-house-fast-jackson-county-mo");
    expect(kck.countySlug).toBe("sell-my-house-fast-wyandotte-county-ks");
    expect(nkc.countySlug).not.toBe(kcmo.countySlug);
    expect(nkc.countySlug).not.toBe(kck.countySlug);
  });

  it("has North Kansas City name both Jackson County and Wyandotte County explicitly, pointing a reader away from the wrong page", () => {
    const text = cityContentTier4a["sell-my-house-fast-north-kansas-city-mo"].body.join(" ");
    expect(text).toMatch(/Jackson County/);
    expect(text).toMatch(/Wyandotte County/);
  });

  it("has North Kansas City use only Clay County's own claims, never Jackson County's reassessment claim", () => {
    const nkcPage = cityContentTier4a["sell-my-house-fast-north-kansas-city-mo"];
    expect(nkcPage.claims ?? []).not.toContain(citations["jackson-county-reassessment"]);
  });

  it("has North Kansas City explain that Kansas City, Missouri's earnings tax stops at its own boundary", () => {
    const text = cityContentTier4a["sell-my-house-fast-north-kansas-city-mo"].body.join(" ");
    expect(text).toMatch(/earnings tax/i);
    expect(text).toMatch(/not reached by Kansas City, Missouri'?s earnings tax/i);
    const nkcPage = cityContentTier4a["sell-my-house-fast-north-kansas-city-mo"];
    expect(nkcPage.claims).toContain(citations["kcmo-earnings-tax"]);
  });

  // --- The Richmond, MO / Richmond, KS trap ------------------------------

  it("has Richmond, Missouri explicitly name and distinguish itself from Richmond, Kansas", () => {
    const text = cityContentTier4a["sell-my-house-fast-richmond-mo"].body.join(" ");
    expect(text).toMatch(/Richmond, Kansas/);
    expect(text).toMatch(/Franklin County/);
    expect(text).toMatch(/Ray County/);
  });

  it("keeps Richmond, Missouri's claims exclusively Missouri, anchored to Ray County", () => {
    const richmond = cityBySlug.get("sell-my-house-fast-richmond-mo")!;
    expect(richmond.countySlug).toBe("sell-my-house-fast-ray-county-mo");
    const page = cityContentTier4a["sell-my-house-fast-richmond-mo"];
    for (const claim of page.claims ?? []) {
      expect(claim.state).toBe("MO");
    }
  });

  // --- Distinguishing facts, one per city --------------------------------

  it("covers Peculiar's distinguishing story: Cass County, I-49 growth corridor, the novelty of its own name", () => {
    const text = cityContentTier4a["sell-my-house-fast-peculiar-mo"].body.join(" ");
    expect(text).toMatch(/I-49|Interstate 49/);
    expect(text).toMatch(/Cass County/);
  });

  it("covers Paola and Louisburg's shared Miami County context without collapsing into one template", () => {
    const paola = cityContentTier4a["sell-my-house-fast-paola-ks"].body.join(" ");
    expect(paola).toMatch(/courthouse/i);
    const louisburg = cityContentTier4a["sell-my-house-fast-louisburg-ks"].body.join(" ");
    expect(louisburg).toMatch(/Cider Mill/);
  });

  it("covers Odessa and Higginsville's shared Lafayette County context without collapsing into one template", () => {
    const odessa = cityContentTier4a["sell-my-house-fast-odessa-mo"].body.join(" ");
    expect(odessa).toMatch(/Black Sea|Ukrainian/i);
    const higginsville = cityContentTier4a["sell-my-house-fast-higginsville-mo"].body.join(" ");
    expect(higginsville).toMatch(/Confederate Memorial/);
  });

  it("covers Trenton, Iola, and Savannah as genuinely small outstate markets, honestly both ways", () => {
    for (const slug of ["sell-my-house-fast-trenton-mo", "sell-my-house-fast-iola-ks", "sell-my-house-fast-savannah-mo"]) {
      const text = cityContentTier4a[slug].body.join(" ");
      expect(text, slug).toMatch(/thinner|thinness|thin market|considerably (smaller|slower)/i);
      expect(text, slug).toMatch(/cuts (two directions|both ways)|removes (any )?pressure/i);
    }
  });

  it("covers Baldwin City's Baker University angle and Wamego's Oz Museum angle distinctly", () => {
    const baldwin = cityContentTier4a["sell-my-house-fast-baldwin-city-ks"].body.join(" ");
    expect(baldwin).toMatch(/Baker University/);
    const wamego = cityContentTier4a["sell-my-house-fast-wamego-ks"].body.join(" ");
    expect(wamego).toMatch(/Oz Museum/);
  });

  it("covers Platte City as the Platte County seat, distinct from Parkville, Riverside, and Weston", () => {
    const text = cityContentTier4a["sell-my-house-fast-platte-city-mo"].body.join(" ");
    expect(text).toMatch(/county seat/i);
    expect(text).toMatch(/Parkville/);
    expect(text).toMatch(/Weston/);
  });

  it("covers Edwardsville's small scale between Kansas City, Kansas and Bonner Springs", () => {
    const text = cityContentTier4a["sell-my-house-fast-edwardsville-ks"].body.join(" ");
    expect(text).toMatch(/Bonner Springs/);
    expect(text).toMatch(/Kansas City, Kansas/);
  });
});
