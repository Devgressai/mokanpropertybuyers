// tests/city-content-tier3b.test.ts
//
// Wave 0C, batch 2 -- the fourteen tier-3 city pages, the tenth content map.
// Same mechanical contract as city-content-tier3a.test.ts. Two of these
// fourteen cities (Roeland Park, De Soto) sit in Johnson County, KANSAS -- a
// differently named Johnson County, MISSOURI exists roughly 65 miles away
// with the opposite foreclosure procedure and opposite money rules, and a
// published page on this site has already shipped that exact mistake once
// before it was caught. Bonner Springs also names Johnson County, Kansas as
// one of the three counties it straddles, so it carries the same guard.
// Every assertion here is designed to fail against broken content, not just
// pass against correct content.
import { describe, expect, it } from "vitest";
import { cityContentTier3b } from "../src/data/city-content-tier3b";
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
  "sell-my-house-fast-oak-grove-mo",
  "sell-my-house-fast-parkville-mo",
  "sell-my-house-fast-pleasant-hill-mo",
  "sell-my-house-fast-nevada-mo",
  "sell-my-house-fast-boonville-mo",
  "sell-my-house-fast-basehor-ks",
  "sell-my-house-fast-bonner-springs-ks",
  "sell-my-house-fast-fort-scott-ks",
  "sell-my-house-fast-cameron-mo",
  "sell-my-house-fast-roeland-park-ks",
  "sell-my-house-fast-de-soto-ks",
  "sell-my-house-fast-eudora-ks",
  "sell-my-house-fast-greenwood-mo",
  "sell-my-house-fast-tonganoxie-ks",
];

// The two Johnson County KS cities in this batch, plus Bonner Springs, which
// names Johnson County, Kansas as one of the three counties it straddles --
// the collision class this batch is at highest risk of getting wrong,
// alongside the ten Johnson County KS/MO cities already shipped in
// tier1/tier2/tier3a.
const JOHNSON_COUNTY_KS_PRIMARY_SLUGS = [
  "sell-my-house-fast-roeland-park-ks",
  "sell-my-house-fast-de-soto-ks",
];
const JOHNSON_COUNTY_KS_MENTION_SLUGS = [
  ...JOHNSON_COUNTY_KS_PRIMARY_SLUGS,
  "sell-my-house-fast-bonner-springs-ks",
];

// Counties whose own hub page has content as of this map's commit.
const COUNTIES_WITH_CONTENT = new Set([
  ...Object.keys(countyContentMetro),
  ...Object.keys(countyContentOuter),
]);
const NO_CONTENT_COUNTY_SLUGS = new Set([
  "sell-my-house-fast-nevada-mo", // Vernon
  "sell-my-house-fast-boonville-mo", // Cooper
  "sell-my-house-fast-fort-scott-ks", // Bourbon
  "sell-my-house-fast-cameron-mo", // Clinton MO
]);

// Multi-county cities: primary county per geography.ts's countySlug, plus
// secondary county names the page is allowed to mention for
// courthouse/tax-sale purposes without treating them as the primary
// jurisdiction.
const MULTI_COUNTY_SECONDARY: Record<string, string[]> = {
  "sell-my-house-fast-oak-grove-mo": ["Lafayette"],
  "sell-my-house-fast-pleasant-hill-mo": ["Jackson"],
  "sell-my-house-fast-cameron-mo": ["DeKalb"],
  "sell-my-house-fast-bonner-springs-ks": ["Leavenworth", "Johnson"],
};

const pages = Object.values(cityContentTier3b);
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("city content -- tier-3 Wave 0C, batch 2", () => {
  it("defines exactly the fourteen expected city slugs", () => {
    expect(Object.keys(cityContentTier3b).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real city in geography.ts", () => {
    for (const [key, page] of Object.entries(cityContentTier3b)) {
      expect(page.slug).toBe(key);
      expect(cityBySlug.get(key), key).toBeDefined();
    }
  });

  it("verifies every city's parent county against geography.ts -- CityDef.countySlug is authoritative", () => {
    const expectedCounty: Record<string, string> = {
      "sell-my-house-fast-oak-grove-mo": "sell-my-house-fast-jackson-county-mo",
      "sell-my-house-fast-parkville-mo": "sell-my-house-fast-platte-county-mo",
      "sell-my-house-fast-pleasant-hill-mo": "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-nevada-mo": "sell-my-house-fast-vernon-county-mo",
      "sell-my-house-fast-boonville-mo": "sell-my-house-fast-cooper-county-mo",
      "sell-my-house-fast-basehor-ks": "sell-my-house-fast-leavenworth-county-ks",
      "sell-my-house-fast-bonner-springs-ks": "sell-my-house-fast-wyandotte-county-ks",
      "sell-my-house-fast-fort-scott-ks": "sell-my-house-fast-bourbon-county-ks",
      "sell-my-house-fast-cameron-mo": "sell-my-house-fast-clinton-county-mo",
      "sell-my-house-fast-roeland-park-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-de-soto-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-eudora-ks": "sell-my-house-fast-douglas-county-ks",
      "sell-my-house-fast-greenwood-mo": "sell-my-house-fast-jackson-county-mo",
      "sell-my-house-fast-tonganoxie-ks": "sell-my-house-fast-leavenworth-county-ks",
    };
    for (const slug of EXPECTED_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe(expectedCounty[slug]);
    }
  });

  it("confirms the four multi-county cities against geography.ts's countiesAll", () => {
    const oakGrove = cityBySlug.get("sell-my-house-fast-oak-grove-mo")!;
    expect(oakGrove.countiesAll).toEqual(
      expect.arrayContaining(["sell-my-house-fast-jackson-county-mo", "sell-my-house-fast-lafayette-county-mo"])
    );
    const pleasantHill = cityBySlug.get("sell-my-house-fast-pleasant-hill-mo")!;
    expect(pleasantHill.countiesAll).toEqual(
      expect.arrayContaining(["sell-my-house-fast-cass-county-mo", "sell-my-house-fast-jackson-county-mo"])
    );
    const cameron = cityBySlug.get("sell-my-house-fast-cameron-mo")!;
    expect(cameron.countiesAll).toEqual(
      expect.arrayContaining(["sell-my-house-fast-clinton-county-mo", "sell-my-house-fast-dekalb-county-mo"])
    );
    const bonnerSprings = cityBySlug.get("sell-my-house-fast-bonner-springs-ks")!;
    expect(bonnerSprings.countiesAll).toEqual(
      expect.arrayContaining([
        "sell-my-house-fast-johnson-county-ks",
        "sell-my-house-fast-leavenworth-county-ks",
        "sell-my-house-fast-wyandotte-county-ks",
      ])
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

  it("names every secondary county for each multi-county city without treating it as the page's primary jurisdiction", () => {
    for (const [slug, secondaryNames] of Object.entries(MULTI_COUNTY_SECONDARY)) {
      const page = cityContentTier3b[slug];
      const text = page.body.join(" ");
      for (const secondaryName of secondaryNames) {
        expect(text, `${slug}: expected "${secondaryName}"`).toContain(secondaryName);
      }
      const city = cityBySlug.get(slug)!;
      const primaryCounty = countyBySlug.get(city.countySlug)!;
      expect(text, slug).toContain(primaryCounty.name);
    }
  });

  it("says when selling to us is the wrong move, specific to each city", () => {
    const WRONG_MOVE =
      /not selling to us at all|obvious answer for a|automatic right call|automatic answer|default answer for a seller|default choice for a seller|right call in this city|better off (listing|bringing|testing)|better served (listing|testing)|genuine reason to (weigh|consider) a fast cash sale|strong candidate for a cash sale|genuinely good candidate for a fast cash sale|is not the automatic right call|is not automatically the right call|is not the automatic answer|not the obvious answer/i;
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
      ...Object.values(cityContentTier3a),
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
      .filter(([, slugs]) => slugs.some((s) => Object.prototype.hasOwnProperty.call(cityContentTier3b, s)));
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

  it("never writes 'Johnson County' without a state qualifier ('Kansas' or 'Missouri') on any page mentioning it", () => {
    const BARE_JOHNSON_COUNTY = /Johnson County(?!(?:['’]s)?,?\s*(Kansas|Missouri|KS|MO)\b)/gi;
    const EXEMPT_CONTEXT =
      /(Kansas's own Johnson County|which Johnson County|"Johnson County"|Johnson County a (piece of mail|given piece)|Johnson County page|Johnson County treasurer|Johnson County('s)? own (tax-sale|statutes)|Johnson County hub|Johnson County's own eastern|Johnson County-anchored)/;
    for (const slug of JOHNSON_COUNTY_KS_MENTION_SLUGS) {
      const page = cityContentTier3b[slug];
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

  it("names the Johnson County, Kansas county page for each of Roeland Park and De Soto", () => {
    for (const slug of JOHNSON_COUNTY_KS_PRIMARY_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe("sell-my-house-fast-johnson-county-ks");
    }
  });

  it("has Roeland Park and De Soto carry only [KS] labels and Kansas claims", () => {
    for (const slug of JOHNSON_COUNTY_KS_PRIMARY_SLUGS) {
      const page = cityContentTier3b[slug];
      for (const claim of page.claims ?? []) {
        expect(claim.state, slug).toBe("KS");
      }
      expect(page.body.join(" "), slug).not.toMatch(/\[MO\]/);
    }
  });

  it("quotes 'Johnson County, Kansas' explicitly on Roeland Park, De Soto, and Bonner Springs so the disambiguation is provable, not just present", () => {
    for (const slug of JOHNSON_COUNTY_KS_MENTION_SLUGS) {
      const text = cityContentTier3b[slug].body.join(" ");
      expect(text, slug).toMatch(/Johnson County, Kansas/);
    }
  });

  it("has Roeland Park and De Soto each name their own distinguishing angle without collapsing into one template", () => {
    const roelandPark = cityContentTier3b["sell-my-house-fast-roeland-park-ks"].body.join(" ");
    expect(roelandPark).toMatch(/landlocked/i);

    const deSoto = cityContentTier3b["sell-my-house-fast-de-soto-ks"].body.join(" ");
    expect(deSoto).toMatch(/Panasonic/);
    expect(deSoto).toMatch(/Sunflower Army Ammunition/);
  });

  // --- Distinguishing facts, one per city --------------------------------

  it("covers Oak Grove's distinguishing story: eastern Jackson County, I-70, rail depot town, Lafayette County straddle", () => {
    const text = cityContentTier3b["sell-my-house-fast-oak-grove-mo"].body.join(" ");
    expect(text).toMatch(/Interstate 70/);
    expect(text).toMatch(/Lafayette County/);
  });

  it("covers Parkville's distinguishing story: Missouri River bluffs, Park University, English Landing Park", () => {
    const text = cityContentTier3b["sell-my-house-fast-parkville-mo"].body.join(" ");
    expect(text).toMatch(/Park University/);
    expect(text).toMatch(/English Landing Park/);
  });

  it("covers Pleasant Hill's distinguishing story: Amtrak Missouri River Runner, Cass/Jackson straddle", () => {
    const text = cityContentTier3b["sell-my-house-fast-pleasant-hill-mo"].body.join(" ");
    expect(text).toMatch(/Amtrak/);
    expect(text).toMatch(/Jackson County/);
  });

  it("covers Nevada's distinguishing story: Vernon County seat, Cottey College, Bushwhacker history", () => {
    const text = cityContentTier3b["sell-my-house-fast-nevada-mo"].body.join(" ");
    expect(text).toMatch(/Cottey College/);
    expect(text).toMatch(/Bushwhacker/);
  });

  it("covers Boonville's distinguishing story: Cooper County seat, Katy Trail, farthest city in this batch", () => {
    const text = cityContentTier3b["sell-my-house-fast-boonville-mo"].body.join(" ");
    expect(text).toMatch(/Katy Trail/);
  });

  it("covers Basehor's distinguishing story: K-7 corridor, Leavenworth County exurb growth", () => {
    const text = cityContentTier3b["sell-my-house-fast-basehor-ks"].body.join(" ");
    expect(text).toMatch(/K-7/);
    expect(text).toMatch(/Basehor-Linwood/);
  });

  it("covers Bonner Springs's distinguishing story: three-county straddle, Ag Hall of Fame", () => {
    const text = cityContentTier3b["sell-my-house-fast-bonner-springs-ks"].body.join(" ");
    expect(text).toMatch(/National Agricultural Center and Hall of Fame/);
    expect(text).toMatch(/three counties|three-county straddle/i);
  });

  it("covers Fort Scott's distinguishing story: historic fort, oldest housing stock, thin market", () => {
    const text = cityContentTier3b["sell-my-house-fast-fort-scott-ks"].body.join(" ");
    expect(text).toMatch(/Fort Scott National Historic Site/);
    expect(text).toMatch(/thinner|thin market|thinning/i);
  });

  it("covers Cameron's distinguishing story: I-35/US-36 crossroads, Clinton/DeKalb straddle, correctional center", () => {
    const text = cityContentTier3b["sell-my-house-fast-cameron-mo"].body.join(" ");
    expect(text).toMatch(/Interstate 35/);
    expect(text).toMatch(/DeKalb County/);
    expect(text).toMatch(/Correctional Center/);
  });

  it("covers Eudora's distinguishing story: Kansas River, between Lawrence and De Soto, owner-occupied contrast", () => {
    const text = cityContentTier3b["sell-my-house-fast-eudora-ks"].body.join(" ");
    expect(text).toMatch(/Kansas River/);
    expect(text).toMatch(/owner-occupied/i);
  });

  it("covers Greenwood's distinguishing story: Jackson County, U.S. 50, Lake Winnebago", () => {
    const text = cityContentTier3b["sell-my-house-fast-greenwood-mo"].body.join(" ");
    expect(text).toMatch(/Lake Winnebago/);
  });

  it("covers Tonganoxie's distinguishing story: Chief Tonganoxie, U.S. 24\\/40 corridor", () => {
    const text = cityContentTier3b["sell-my-house-fast-tonganoxie-ks"].body.join(" ");
    expect(text).toMatch(/Chief Tonganoxie/);
    expect(text).toMatch(/24\/40/);
  });

  // --- Duplication -------------------------------------------------------

  it("has zero duplicate 160-character windows within the tier-3b city map itself", () => {
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
      ...Object.values(countyContentOuter),
      ...Object.values(cityContentTier1),
      ...Object.values(cityContentTier2),
      ...Object.values(cityContentTier3a),
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
      contentRegistries.some((m) => "sell-my-house-fast-oak-grove-mo" in m),
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
    for (const slug of Object.keys(cityContentTier3b)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all fourteen pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(cityContentTier3b)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
