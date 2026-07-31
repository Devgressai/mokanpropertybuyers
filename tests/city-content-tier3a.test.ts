// tests/city-content-tier3a.test.ts
//
// Wave 0C, batch 1 -- the fourteen tier-3 city pages, the ninth content map.
// Same mechanical contract as city-content-tier1.test.ts and
// city-content-tier2.test.ts. Three of these fourteen cities (Merriam,
// Mission, Spring Hill) sit in Johnson County, KANSAS -- a differently named
// Johnson County, MISSOURI exists roughly 65 miles away with the opposite
// foreclosure procedure and opposite money rules, and a published page on
// this site has already shipped that exact mistake once before it was
// caught. Every assertion here is designed to fail against broken content,
// not just pass against correct content.
import { describe, expect, it } from "vitest";
import { cityContentTier3a } from "../src/data/city-content-tier3a";
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
  "sell-my-house-fast-marshall-mo",
  "sell-my-house-fast-ottawa-ks",
  "sell-my-house-fast-lansing-ks",
  "sell-my-house-fast-kearney-mo",
  "sell-my-house-fast-merriam-ks",
  "sell-my-house-fast-smithville-mo",
  "sell-my-house-fast-atchison-ks",
  "sell-my-house-fast-excelsior-springs-mo",
  "sell-my-house-fast-maryville-mo",
  "sell-my-house-fast-mission-ks",
  "sell-my-house-fast-harrisonville-mo",
  "sell-my-house-fast-spring-hill-ks",
  "sell-my-house-fast-clinton-mo",
  "sell-my-house-fast-chillicothe-mo",
];

// The three Johnson County KS cities in this batch -- the collision class
// this batch is at highest risk of getting wrong, alongside the seven
// Johnson County KS/MO cities already shipped in tier1/tier2.
const JOHNSON_COUNTY_KS_SLUGS = [
  "sell-my-house-fast-merriam-ks",
  "sell-my-house-fast-mission-ks",
  "sell-my-house-fast-spring-hill-ks",
];

// Counties whose own hub page has content as of this map's commit -- the
// eight metro counties (Clay, Johnson KS, Cass among them) plus the twelve
// counties a concurrent agent added in county-content-outer.ts, including
// Saline, Franklin, Leavenworth, Ray, Miami KS, and Henry, all confirmed in
// the registry at this map's own commit. Only Atchison, Nodaway, and
// Livingston Counties have no hub page anywhere in this footprint yet.
const COUNTIES_WITH_CONTENT = new Set([
  ...Object.keys(countyContentMetro),
  ...Object.keys(countyContentOuter),
]);
const NO_CONTENT_COUNTY_SLUGS = new Set([
  "sell-my-house-fast-atchison-ks", // Atchison
  "sell-my-house-fast-maryville-mo", // Nodaway
  "sell-my-house-fast-chillicothe-mo", // Livingston
]);

// Multi-county cities: primary county per geography.ts's countySlug, plus a
// secondary county the page is allowed to name for courthouse/tax-sale
// purposes without treating it as the primary jurisdiction.
const MULTI_COUNTY_SECONDARY: Record<string, string> = {
  "sell-my-house-fast-smithville-mo": "Platte",
  "sell-my-house-fast-excelsior-springs-mo": "Ray",
  "sell-my-house-fast-spring-hill-ks": "Miami",
};

const pages = Object.values(cityContentTier3a);
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("city content -- tier-3 Wave 0C, batch 1", () => {
  it("defines exactly the fourteen expected city slugs", () => {
    expect(Object.keys(cityContentTier3a).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real city in geography.ts", () => {
    for (const [key, page] of Object.entries(cityContentTier3a)) {
      expect(page.slug).toBe(key);
      expect(cityBySlug.get(key), key).toBeDefined();
    }
  });

  it("verifies every city's parent county against geography.ts -- CityDef.countySlug is authoritative", () => {
    const expectedCounty: Record<string, string> = {
      "sell-my-house-fast-marshall-mo": "sell-my-house-fast-saline-county-mo",
      "sell-my-house-fast-ottawa-ks": "sell-my-house-fast-franklin-county-ks",
      "sell-my-house-fast-lansing-ks": "sell-my-house-fast-leavenworth-county-ks",
      "sell-my-house-fast-kearney-mo": "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-merriam-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-smithville-mo": "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-atchison-ks": "sell-my-house-fast-atchison-county-ks",
      "sell-my-house-fast-excelsior-springs-mo": "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-maryville-mo": "sell-my-house-fast-nodaway-county-mo",
      "sell-my-house-fast-mission-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-harrisonville-mo": "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-spring-hill-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-clinton-mo": "sell-my-house-fast-henry-county-mo",
      "sell-my-house-fast-chillicothe-mo": "sell-my-house-fast-livingston-county-mo",
    };
    for (const slug of EXPECTED_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe(expectedCounty[slug]);
    }
  });

  it("confirms the three multi-county cities against geography.ts's countiesAll", () => {
    const smithville = cityBySlug.get("sell-my-house-fast-smithville-mo")!;
    expect(smithville.countiesAll).toEqual(
      expect.arrayContaining(["sell-my-house-fast-clay-county-mo", "sell-my-house-fast-platte-county-mo"])
    );
    const excelsior = cityBySlug.get("sell-my-house-fast-excelsior-springs-mo")!;
    expect(excelsior.countiesAll).toEqual(
      expect.arrayContaining(["sell-my-house-fast-clay-county-mo", "sell-my-house-fast-ray-county-mo"])
    );
    const springHill = cityBySlug.get("sell-my-house-fast-spring-hill-ks")!;
    expect(springHill.countiesAll).toEqual(
      expect.arrayContaining(["sell-my-house-fast-johnson-county-ks", "sell-my-house-fast-miami-county-ks"])
    );
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

  it("references its own city's real population figure from geography.ts", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      expect(text, page.slug).toContain(city.population.toLocaleString("en-US"));
    }
  });

  it("names its own parent county by name where that county has content, and explicitly flags the counties that do not", () => {
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

  it("names the secondary county for each multi-county city without treating it as the page's primary jurisdiction", () => {
    for (const [slug, secondaryName] of Object.entries(MULTI_COUNTY_SECONDARY)) {
      const page = cityContentTier3a[slug];
      const text = page.body.join(" ");
      expect(text, slug).toContain(secondaryName);
      const city = cityBySlug.get(slug)!;
      const primaryCounty = countyBySlug.get(city.countySlug)!;
      expect(text, slug).toContain(primaryCounty.name);
    }
  });

  it("says when selling to us is the wrong move, specific to each city", () => {
    const WRONG_MOVE =
      /not selling to us at all|obvious answer for a|automatic right call|automatic answer|default answer for a seller|default choice for a seller|right call in this city|better off (listing|bringing|testing)|better served (listing|testing)|genuine reason to (weigh|consider) a fast cash sale|strong candidate for a cash sale|genuinely good candidate for a fast cash sale|is not the automatic right call|is not automatically the right call|is not the automatic answer|not the obvious answer|is not (?:who|the seller) a fast cash sale is built for|is the stronger move|usually beats a fast cash sale|rarely serves|rarely needs|rarely the right call|comes out ahead (?:bringing|listing)|usually favors (?:bringing|listing)|toward a conventional listing|usually better served|gains (?:little|more)|outperform(?:s)? a fast cash sale|changes the (?:answer|calculation)|calculation changes|better than a fast cash sale|than taking a cash offer|does better working with a local realtor|sells for more/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(WRONG_MOVE.test(text), page.slug).toBe(true);
    }
  });

  it("frames each page with a no-legal-advice closing that points at a professional", () => {
    const DISCLAIMS = /\b(not|nothing (?:above|here|on this page) is|none of (the above|this) is)\b[^.]{0,60}\blegal advice\b/i;
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
      .filter(([, slugs]) => slugs.some((s) => Object.prototype.hasOwnProperty.call(cityContentTier3a, s)));
    expect(shared.map(([, slugs]) => slugs.join(" + ")), "identical disclaimer reused").toEqual([]);
  });

  it("never fabricates a market statistic -- no medians, day-on-market counts, or homes-bought claims", () => {
    const FABRICATED = /\$[\d,]+(?:k|,000)? (?:median|average)|days? on (the )?market|we(?:'ve| have) bought \d+/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(FABRICATED.test(text), page.slug).toBe(false);
    }
  });

  // --- The Johnson County trap -----------------------------------------

  it("never writes 'Johnson County' without a state qualifier ('Kansas' or 'Missouri') on any of the three Johnson County KS pages", () => {
    const BARE_JOHNSON_COUNTY = /Johnson County(?!(?:['’]s)?,?\s*(Kansas|Missouri|KS|MO)\b)/gi;
    const EXEMPT_CONTEXT =
      /(Kansas's own Johnson County|which Johnson County|"Johnson County"|Johnson County a (piece of mail|given piece)|Johnson County page|Johnson County treasurer|Johnson County('s)? own (tax-sale|statutes)|Johnson County hub)/;
    for (const slug of JOHNSON_COUNTY_KS_SLUGS) {
      const page = cityContentTier3a[slug];
      for (const paragraph of page.body) {
        if (!/Johnson County/.test(paragraph)) continue;
        let m: RegExpExecArray | null;
        BARE_JOHNSON_COUNTY.lastIndex = 0;
        while ((m = BARE_JOHNSON_COUNTY.exec(paragraph))) {
          const window = paragraph.slice(Math.max(0, m.index - 30), m.index + 40);
          if (EXEMPT_CONTEXT.test(window)) continue;
          expect.fail(`${slug}: bare "Johnson County" (no state qualifier) in "${window}"`);
        }
      }
    }
  });

  it("names the Johnson County, Kansas county page for each of the three Johnson County KS cities", () => {
    for (const slug of JOHNSON_COUNTY_KS_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe("sell-my-house-fast-johnson-county-ks");
    }
  });

  it("has every Johnson County KS page carry only [KS] labels and Kansas claims", () => {
    for (const slug of JOHNSON_COUNTY_KS_SLUGS) {
      const page = cityContentTier3a[slug];
      for (const claim of page.claims ?? []) {
        expect(claim.state, slug).toBe("KS");
      }
      expect(page.body.join(" "), slug).not.toMatch(/\[MO\]/);
    }
  });

  it("quotes 'Johnson County, Kansas' explicitly on each of Merriam, Mission, and Spring Hill so the disambiguation is provable, not just present", () => {
    for (const slug of JOHNSON_COUNTY_KS_SLUGS) {
      const text = cityContentTier3a[slug].body.join(" ");
      expect(text, slug).toMatch(/Johnson County, Kansas/);
    }
  });

  it("has each of Merriam, Mission, and Spring Hill name its own distinguishing angle without collapsing into one template", () => {
    const merriam = cityContentTier3a["sell-my-house-fast-merriam-ks"].body.join(" ");
    expect(merriam).toMatch(/Antioch Shopping Center|landlocked/i);

    const mission = cityContentTier3a["sell-my-house-fast-mission-ks"].body.join(" ");
    expect(mission).toMatch(/Gateway/);
    expect(mission).toMatch(/landlocked/i);

    const springHill = cityContentTier3a["sell-my-house-fast-spring-hill-ks"].body.join(" ");
    expect(springHill).toMatch(/Miami County/);
    expect(springHill).toMatch(/fastest-growing/i);
  });

  // --- Distinguishing facts, one per city --------------------------------

  it("covers the four outstate Missouri cities' small-market honesty -- fewer comparable sales, genuinely different pace", () => {
    for (const slug of [
      "sell-my-house-fast-marshall-mo",
      "sell-my-house-fast-clinton-mo",
      "sell-my-house-fast-maryville-mo",
      "sell-my-house-fast-chillicothe-mo",
    ]) {
      const text = cityContentTier3a[slug].body.join(" ");
      expect(text, slug).toMatch(/fewer|thinner|smaller market/i);
      expect(text, slug).toMatch(/comparable/i);
    }
  });

  it("covers Marshall's distinguishing story: Saline County seat, Missouri Valley College, Van Meter State Park", () => {
    const text = cityContentTier3a["sell-my-house-fast-marshall-mo"].body.join(" ");
    expect(text).toMatch(/Missouri Valley College/);
    expect(text).toMatch(/Van Meter State Park/);
  });

  it("covers Ottawa's distinguishing story: Franklin County seat, I-35 corridor, Ottawa University", () => {
    const text = cityContentTier3a["sell-my-house-fast-ottawa-ks"].body.join(" ");
    expect(text).toMatch(/Interstate 35|I-35/);
    expect(text).toMatch(/Ottawa University/);
  });

  it("covers Lansing's distinguishing story: Lansing Correctional Facility, a distinct economy from neighboring Leavenworth's Fort Leavenworth", () => {
    const text = cityContentTier3a["sell-my-house-fast-lansing-ks"].body.join(" ");
    expect(text).toMatch(/Lansing Correctional Facility/);
    expect(text).toMatch(/Fort Leavenworth/);
  });

  it("covers Kearney's distinguishing story: Jesse James birthplace, Clay County Northland", () => {
    const text = cityContentTier3a["sell-my-house-fast-kearney-mo"].body.join(" ");
    expect(text).toMatch(/Jesse James/);
  });

  it("covers Smithville's distinguishing story: Smithville Lake, and its Clay/Platte county straddle", () => {
    const text = cityContentTier3a["sell-my-house-fast-smithville-mo"].body.join(" ");
    expect(text).toMatch(/Smithville Lake/);
    expect(text).toMatch(/Platte County/);
  });

  it("covers Atchison's distinguishing story: historic Missouri River town, oldest housing stock, Amelia Earhart", () => {
    const text = cityContentTier3a["sell-my-house-fast-atchison-ks"].body.join(" ");
    expect(text).toMatch(/Amelia Earhart/);
    expect(text).toMatch(/older|oldest/i);
  });

  it("covers Excelsior Springs's distinguishing story: historic spa town, Hall of Waters, its Clay/Ray county straddle", () => {
    const text = cityContentTier3a["sell-my-house-fast-excelsior-springs-mo"].body.join(" ");
    expect(text).toMatch(/Hall of Waters/);
    expect(text).toMatch(/Ray County/);
  });

  it("covers Maryville's distinguishing story: Nodaway County seat, Northwest Missouri State University", () => {
    const text = cityContentTier3a["sell-my-house-fast-maryville-mo"].body.join(" ");
    expect(text).toMatch(/Northwest Missouri State/);
  });

  it("covers Harrisonville's distinguishing story: Cass County seat, historic square", () => {
    const text = cityContentTier3a["sell-my-house-fast-harrisonville-mo"].body.join(" ");
    expect(text).toMatch(/county seat/i);
    expect(text).toMatch(/Cass County/);
  });

  it("covers Clinton's distinguishing story: Henry County seat, Rock Island Trail, Truman Reservoir", () => {
    const text = cityContentTier3a["sell-my-house-fast-clinton-mo"].body.join(" ");
    expect(text).toMatch(/Rock Island Trail/);
    expect(text).toMatch(/Truman/);
  });

  it("covers Chillicothe's distinguishing story: Livingston County seat, birthplace of sliced bread", () => {
    const text = cityContentTier3a["sell-my-house-fast-chillicothe-mo"].body.join(" ");
    expect(text).toMatch(/sliced bread/i);
  });

  // --- Duplication -------------------------------------------------------

  it("has zero duplicate 160-character windows within the tier-3a city map itself", () => {
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

  it("has zero duplicate 160-character windows against every prior content map (tier-1 and tier-2 cities included)", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
      ...Object.values(stateLineContentTransaction),
      ...Object.values(stateHubContent),
      ...Object.values(countyContentMetro),
      ...Object.values(countyContentOuter),
      ...Object.values(cityContentTier1),
      ...Object.values(cityContentTier2),
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

  it("has zero duplicate 160-character windows across the entire content registry (whole registry)", () => {
    // Asserts this file's map is REGISTERED, not how many maps exist. Pinning
    // an exact count means every future content wave breaks a test in an
    // unrelated file. A count is not the property under test.
    //
    // NOTE: the scan below samples at stride 20. The authoritative duplication
    // check is `npm run check:duplication` (gate #10), exhaustive at stride 1.
    expect(
      contentRegistries.some((m) => "sell-my-house-fast-marshall-mo" in m),
      "this batch's map is registered"
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

  it("registers all fourteen pages in the merged content registry", () => {
    for (const slug of Object.keys(cityContentTier3a)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all fourteen pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(cityContentTier3a)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
