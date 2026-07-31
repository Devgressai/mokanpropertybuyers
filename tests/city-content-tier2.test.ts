// tests/city-content-tier2.test.ts
//
// Wave 0C -- the fourteen tier-2 city pages, the seventh content map. Same
// mechanical contract as city-content-tier1.test.ts and
// county-content-metro.test.ts, extended with the check this batch exists
// to prove: this batch contains BOTH Johnson Counties in the footprint --
// Leawood, Gardner, and Prairie Village sit in Johnson County, KANSAS;
// Warrensburg sits in Johnson County, MISSOURI, a different county roughly
// 65 miles away with the opposite foreclosure procedure and opposite money
// rules. Every assertion here is designed to fail against broken content,
// not just pass against correct content.
import { describe, expect, it } from "vitest";
import { cityContentTier2 } from "../src/data/city-content-tier2";
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
  "sell-my-house-fast-leavenworth-ks",
  "sell-my-house-fast-leawood-ks",
  "sell-my-house-fast-liberty-mo",
  "sell-my-house-fast-raytown-mo",
  "sell-my-house-fast-gladstone-mo",
  "sell-my-house-fast-belton-mo",
  "sell-my-house-fast-grandview-mo",
  "sell-my-house-fast-gardner-ks",
  "sell-my-house-fast-raymore-mo",
  "sell-my-house-fast-emporia-ks",
  "sell-my-house-fast-prairie-village-ks",
  "sell-my-house-fast-sedalia-mo",
  "sell-my-house-fast-warrensburg-mo",
  "sell-my-house-fast-grain-valley-mo",
];

// The four Johnson County KS cities in tier1 (already shipped) plus the
// three here, and the one Johnson County MO city here -- the exact
// collision class this batch has to get right.
const JOHNSON_COUNTY_KS_SLUGS = ["sell-my-house-fast-leawood-ks", "sell-my-house-fast-gardner-ks", "sell-my-house-fast-prairie-village-ks"];
const JOHNSON_COUNTY_MO_SLUGS = ["sell-my-house-fast-warrensburg-mo"];

// Counties whose own hub page has content -- Leavenworth, Lyon, Pettis, and
// Johnson MO have none yet, mirroring St. Joseph/Buchanan in tier1.
const COUNTIES_WITH_CONTENT = new Set(Object.keys(countyContentMetro));
const NO_CONTENT_COUNTY_SLUGS = new Set([
  "sell-my-house-fast-leavenworth-ks",
  "sell-my-house-fast-emporia-ks",
  "sell-my-house-fast-sedalia-mo",
  "sell-my-house-fast-warrensburg-mo",
]);

const pages = Object.values(cityContentTier2);
const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
const countyBySlug = new Map(counties.map((c) => [c.slug, c]));

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("city content -- tier-2 Wave 0C", () => {
  it("defines exactly the fourteen expected city slugs", () => {
    expect(Object.keys(cityContentTier2).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("keeps each entry's slug field matching its registry key, and matching a real city in geography.ts", () => {
    for (const [key, page] of Object.entries(cityContentTier2)) {
      expect(page.slug).toBe(key);
      expect(cityBySlug.get(key), key).toBeDefined();
    }
  });

  it("verifies every city's parent county against geography.ts -- CityDef.countySlug is authoritative", () => {
    const expectedCounty: Record<string, string> = {
      "sell-my-house-fast-leavenworth-ks": "sell-my-house-fast-leavenworth-county-ks",
      "sell-my-house-fast-leawood-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-liberty-mo": "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-raytown-mo": "sell-my-house-fast-jackson-county-mo",
      "sell-my-house-fast-gladstone-mo": "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-belton-mo": "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-grandview-mo": "sell-my-house-fast-jackson-county-mo",
      "sell-my-house-fast-gardner-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-raymore-mo": "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-emporia-ks": "sell-my-house-fast-lyon-county-ks",
      "sell-my-house-fast-prairie-village-ks": "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-sedalia-mo": "sell-my-house-fast-pettis-county-mo",
      "sell-my-house-fast-warrensburg-mo": "sell-my-house-fast-johnson-county-mo",
      "sell-my-house-fast-grain-valley-mo": "sell-my-house-fast-jackson-county-mo",
    };
    for (const slug of EXPECTED_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe(expectedCounty[slug]);
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

  it("references its own city's real population figure from geography.ts", () => {
    for (const page of pages) {
      const city = cityBySlug.get(page.slug)!;
      const text = page.body.join(" ");
      expect(text, page.slug).toContain(city.population.toLocaleString("en-US"));
    }
  });

  it("names its own parent county by name where that county has content, and explicitly flags the four counties that do not", () => {
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

  it("says when selling to us is the wrong move, specific to each city", () => {
    const WRONG_MOVE =
      /not selling to us at all|obvious answer for a|automatic right call|automatic answer|default answer for a seller|default choice for a seller|right call in this city|better off (listing|bringing|testing)|better served listing|genuine reason to (weigh|consider) a fast cash sale|strong candidate for a cash sale|genuinely good candidate for a fast cash sale/i;
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(WRONG_MOVE.test(text), page.slug).toBe(true);
    }
  });

  it("frames each page with a no-legal-advice closing that points at a professional", () => {
    const DISCLAIMS = /\b(not|nothing (?:above|here|on this page) is|none of this is)\b[^.]{0,40}\blegal advice\b/i;
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
      ...Object.values(cityContentTier1),
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
      .filter(([, slugs]) => slugs.some((s) => Object.prototype.hasOwnProperty.call(cityContentTier2, s)));
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

  it("never writes 'Johnson County' without a state qualifier ('Kansas' or 'Missouri') on any of the four Johnson County pages", () => {
    // Matches a bare "Johnson County" that is NOT immediately followed by
    // ", Kansas" / ", Missouri" / ", KS" / ", MO" (case-insensitive on the
    // state name only -- "MISSOURI" in caps is still a qualifier) and is
    // NOT immediately preceded by "Kansas's own" (the one accepted
    // alternate phrasing this batch uses). Meta-references to the ambiguity
    // itself ("which Johnson County", the literal printed string) are the
    // only other exemption, checked separately below by hand.
    const BARE_JOHNSON_COUNTY = /Johnson County(?!(?:['’]s)?,?\s*(Kansas|Missouri|KS|MO)\b)/gi;
    const EXEMPT_CONTEXT =
      /(Kansas's own Johnson County|which Johnson County|"Johnson County"|Johnson County a (piece of mail|given piece)|Johnson County page|Johnson County treasurer|Johnson County('s)? own (tax-sale|statutes)|Johnson County hub)/;
    for (const slug of [...JOHNSON_COUNTY_KS_SLUGS, ...JOHNSON_COUNTY_MO_SLUGS]) {
      const page = cityContentTier2[slug];
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

  it("names the correct county page for each Johnson County city -- KS slug for the three Kansas cities, MO slug for Warrensburg", () => {
    for (const slug of JOHNSON_COUNTY_KS_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe("sell-my-house-fast-johnson-county-ks");
    }
    for (const slug of JOHNSON_COUNTY_MO_SLUGS) {
      const city = cityBySlug.get(slug)!;
      expect(city.countySlug, slug).toBe("sell-my-house-fast-johnson-county-mo");
    }
  });

  it("has every Johnson County KS page carry only [KS] labels and Kansas claims", () => {
    for (const slug of JOHNSON_COUNTY_KS_SLUGS) {
      const page = cityContentTier2[slug];
      for (const claim of page.claims ?? []) {
        expect(claim.state, slug).toBe("KS");
      }
      expect(page.body.join(" "), slug).not.toMatch(/\[MO\]/);
    }
  });

  it("has the Johnson County MO page (Warrensburg) carry only [MO] labels and Missouri claims", () => {
    const page = cityContentTier2["sell-my-house-fast-warrensburg-mo"];
    for (const claim of page.claims ?? []) {
      expect(claim.state).toBe("MO");
    }
    expect(page.body.join(" ")).not.toMatch(/\[KS\]/);
  });

  it("has each of the three Johnson County KS pages name Leawood, Gardner, or Prairie Village's own distinguishing angle without collapsing into one template", () => {
    const leawood = cityContentTier2["sell-my-house-fast-leawood-ks"].body.join(" ");
    expect(leawood).toMatch(/wealthiest|large residential lots|high.equity/i);

    const gardner = cityContentTier2["sell-my-house-fast-gardner-ks"].body.join(" ");
    expect(gardner).toMatch(/Santa Fe/);
    expect(gardner).toMatch(/newer and faster-growing/i);

    const prairieVillage = cityContentTier2["sell-my-house-fast-prairie-village-ks"].body.join(" ");
    expect(prairieVillage).toMatch(/planned suburban|1940s/i);
  });

  it("has Warrensburg name UCM and Whiteman Air Force Base, and explicitly say it does not carry Kansas's uncapped homestead exemption", () => {
    const text = cityContentTier2["sell-my-house-fast-warrensburg-mo"].body.join(" ");
    expect(text).toMatch(/University of Central Missouri/);
    expect(text).toMatch(/Whiteman/);
    expect(text).toMatch(/should not assume Kansas's own more protective homestead rule reaches a house on this side of the state line, because it does not/i);
  });

  it("quotes the state qualifier explicitly on Leawood (Kansas) and Warrensburg (Missouri) so the disambiguation is provable, not just present", () => {
    const leawood = cityContentTier2["sell-my-house-fast-leawood-ks"].body.join(" ");
    expect(leawood).toMatch(/Johnson County, Kansas/);
    const warrensburg = cityContentTier2["sell-my-house-fast-warrensburg-mo"].body.join(" ");
    expect(warrensburg).toMatch(/Johnson County, MISSOURI/);
  });

  // --- Distinguishing facts, one per city --------------------------------

  it("covers Leavenworth's distinguishing story: oldest Kansas city, Fort Leavenworth, and PCS relocation timelines", () => {
    const text = cityContentTier2["sell-my-house-fast-leavenworth-ks"].body.join(" ");
    expect(text).toMatch(/oldest incorporated city in Kansas/i);
    expect(text).toMatch(/Fort Leavenworth/);
    expect(text).toMatch(/PCS|permanent-change-of-station/);
  });

  it("covers Emporia's distinguishing story: the farthest city on the site, at 99.4 miles", () => {
    const text = cityContentTier2["sell-my-house-fast-emporia-ks"].body.join(" ");
    expect(text).toMatch(/farthest city/i);
    expect(text).toMatch(/99\.4 miles/);
    expect(text).toMatch(/Lyon County/);
  });

  it("covers Sedalia and Warrensburg's shared west-central Missouri identity, each with its own landmark", () => {
    const sedalia = cityContentTier2["sell-my-house-fast-sedalia-mo"].body.join(" ");
    expect(sedalia).toMatch(/Missouri State Fair/);
    const warrensburg = cityContentTier2["sell-my-house-fast-warrensburg-mo"].body.join(" ");
    expect(warrensburg).toMatch(/University of Central Missouri/);
  });

  it("covers Raytown and Grandview as older, inner-ring Jackson County cities, without duplicating each other's paragraphs", () => {
    for (const slug of ["sell-my-house-fast-raytown-mo", "sell-my-house-fast-grandview-mo"]) {
      const text = cityContentTier2[slug].body.join(" ");
      expect(text, slug).toMatch(/Jackson County/);
    }
    expect(cityContentTier2["sell-my-house-fast-raytown-mo"].body.join(" ")).toMatch(/older, denser housing stock|postwar decades/i);
    expect(cityContentTier2["sell-my-house-fast-grandview-mo"].body.join(" ")).toMatch(/Truman Farm Home/);
  });

  it("covers Liberty and Gladstone as Clay County Northland cities, Liberty as the historic county seat", () => {
    const liberty = cityContentTier2["sell-my-house-fast-liberty-mo"].body.join(" ");
    expect(liberty).toMatch(/county seat/i);
    expect(liberty).toMatch(/William Jewell College/);
    const gladstone = cityContentTier2["sell-my-house-fast-gladstone-mo"].body.join(" ");
    expect(gladstone).toMatch(/Clay County/);
  });

  it("covers Belton and Raymore as the Cass County I-49 growth corridor, without duplicating each other's paragraphs", () => {
    for (const slug of ["sell-my-house-fast-belton-mo", "sell-my-house-fast-raymore-mo"]) {
      const text = cityContentTier2[slug].body.join(" ");
      expect(text, slug).toMatch(/Interstate 49|I-49/);
      expect(text, slug).toMatch(/Cass County/);
    }
  });

  it("covers Grain Valley as a small eastern Jackson County commuter city", () => {
    const text = cityContentTier2["sell-my-house-fast-grain-valley-mo"].body.join(" ");
    expect(text).toMatch(/commuter city/i);
    expect(text).toMatch(/Jackson County/);
    expect(text).toMatch(/16,609/);
  });

  // --- Duplication -------------------------------------------------------

  it("has zero duplicate 160-character windows within the tier-2 city map itself", () => {
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

  it("has zero duplicate 160-character windows against every prior content map (tier-1 cities included)", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
      ...Object.values(stateLineContentTransaction),
      ...Object.values(stateHubContent),
      ...Object.values(countyContentMetro),
      ...Object.values(cityContentTier1),
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

  it("has zero duplicate 160-character windows across the entire content registry (all seven maps)", () => {
    expect(contentRegistries.length).toBe(7);
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
    for (const slug of Object.keys(cityContentTier2)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all fourteen pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(cityContentTier2)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
