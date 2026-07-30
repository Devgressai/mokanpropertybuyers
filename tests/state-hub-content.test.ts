// tests/state-hub-content.test.ts
//
// The content contract (docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md,
// Task 8) is mechanically checkable, so this test checks it mechanically rather
// than trusting a read-through. Every assertion here is designed to fail against
// broken content, not just pass against correct content -- see the addendum in
// docs/CITATION-LEDGER.md on why a clean sweep deserves scrutiny.
//
// These two pages are the parents of all 53 counties in the footprint and the
// structural home of all state-specific law. Each hub must give a seller a
// complete picture of their own state's rules and nothing about the other
// state's -- so, unlike the three preceding clusters, this file also asserts
// that "Kansas" never appears in the Missouri hub and "Missouri" never
// appears in the Kansas hub.
import { describe, expect, it } from "vitest";
import { stateHubContent } from "../src/data/state-hub-content";
import { stateLineContentForeclosure } from "../src/data/state-line-content-foreclosure";
import { stateLineContentMoney } from "../src/data/state-line-content-money";
import { stateLineContentTransaction } from "../src/data/state-line-content-transaction";
import { citations } from "../src/data/legal-citations";
import { getPageContent, contentRegistries } from "../src/data/content-registry";
import { isIndexable, MIN_INDEXABLE_WORDS } from "../src/lib/seo/indexation";
import { findUnlabeledBlends, auditClaimList } from "../scripts/check-state-claims.mts";

const HUB_MIN_WORDS = 1200;

// Mirrors the gate's own patterns (scripts/check-state-claims.mts) so a
// mislabeled paragraph fails here even if it happens to dodge the gate.
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const MO_SLUG = "sell-my-house-fast-missouri";
const KS_SLUG = "sell-my-house-fast-kansas";
const moPage = stateHubContent[MO_SLUG];
const ksPage = stateHubContent[KS_SLUG];
const pages = [moPage, ksPage];

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("state hub content", () => {
  it("defines exactly the two state hub slugs", () => {
    expect(Object.keys(stateHubContent).sort()).toEqual([KS_SLUG, MO_SLUG].sort());
  });

  it("keeps each entry's slug field matching its registry key", () => {
    for (const [key, page] of Object.entries(stateHubContent)) {
      expect(page.slug).toBe(key);
    }
  });

  it("clears the 1,200-word hub floor on both pages, well above the 600-word site floor and the 900-word silo floor", () => {
    expect(HUB_MIN_WORDS).toBeGreaterThan(MIN_INDEXABLE_WORDS);
    for (const page of pages) {
      expect(wordCount(page.body), page.slug).toBeGreaterThanOrEqual(HUB_MIN_WORDS);
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
    expect(checked).toBeGreaterThan(15);
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

  it("carries no [KS] label anywhere on the Missouri hub, and no [MO] label anywhere on the Kansas hub", () => {
    const moText = moPage.body.join(" ");
    const ksText = ksPage.body.join(" ");
    expect(moText).not.toMatch(/\[KS\]/);
    expect(ksText).not.toMatch(/\[MO\]/);
  });

  it("never names the other state on either hub -- Missouri law lives on the Missouri page, Kansas law on the Kansas page", () => {
    const moText = moPage.body.join(" ");
    const ksText = ksPage.body.join(" ");
    // "Kansas City" is a place name that appears inside Missouri (and inside
    // Kansas), not a reference to the state of Kansas -- excluded the same
    // way the gate itself excludes it.
    expect(moText).not.toMatch(/\bKansas\b(?!\s+City)/);
    expect(ksText).not.toMatch(/\bMissouri\b/);
  });

  it("gives every hub at least seven claims, and every claim passes the citation audit", () => {
    for (const page of pages) {
      const claims = page.claims ?? [];
      expect(claims.length, page.slug).toBeGreaterThanOrEqual(7);
      expect(auditClaimList(page.slug, claims)).toEqual([]);
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

  it("covers the required claim set on the Missouri hub", () => {
    const required = [
      "mo-nonjudicial",
      "mo-notice-period",
      "mo-redemption",
      "mo-homestead",
      "mo-assessment-19",
      "mo-transfer-tax-ban",
      "mo-tax-sale-redemption",
      "mo-probate-independent",
    ] as const;
    for (const id of required) {
      expect(moPage.claims, id).toContainEqual(citations[id]);
    }
  });

  it("covers the required claim set on the Kansas hub", () => {
    const required = [
      "ks-judicial",
      "ks-redemption-12mo",
      "ks-redemption-3mo",
      "ks-homestead",
      "ks-assessment-115",
      "ks-mortgage-reg-tax",
      "ks-probate-simplified",
    ] as const;
    for (const id of required) {
      expect(ksPage.claims, id).toContainEqual(citations[id]);
    }
  });

  it("renders the Missouri homestead pendingChange -- both the current and future figures", () => {
    const text = moPage.body.join(" ");
    expect(text).toContain("$15,000");
    expect(text).toContain("$40,000");
    expect(text).toMatch(/2027/);
    const mo = citations["mo-homestead"];
    expect(mo.claim).toContain("$15,000");
    expect(mo.pendingChange?.claim).toContain("$40,000");
    expect(mo.pendingChange?.effectiveFrom).toBe("2027-01-01");
  });

  it("states the Kansas homestead exemption has no dollar cap", () => {
    const text = ksPage.body.join(" ");
    expect(text).toMatch(/no (dollar )?limit|no cap/i);
  });

  it("never mentions HCR 5011 or a pending Kansas assessment change", () => {
    const text = ksPage.body.join(" ");
    expect(text).not.toMatch(/HCR ?5011/i);
    expect(citations["ks-assessment-115"].pendingChange).toBeUndefined();
  });

  it("orients the reader with real footprint data -- 31 Missouri counties, 22 Kansas counties, named anchor counties", () => {
    const moText = moPage.body.join(" ");
    const ksText = ksPage.body.join(" ");
    expect(moText).toMatch(/31 Missouri counties|31 counties/);
    expect(moText).toMatch(/Jackson/);
    expect(moText).toMatch(/Worth County/);
    expect(ksText).toMatch(/22 Kansas counties|22 counties/);
    expect(ksText).toMatch(/Johnson County/);
    expect(ksText).toMatch(/Wabaunsee County/);
  });

  it("says when selling to us is the wrong move, specific to each state", () => {
    const moText = moPage.body.join(" ");
    const ksText = ksPage.body.join(" ");
    expect(moText).toMatch(/not the obvious answer|does not belong in the comparison|comparison should rest on/i);
    // The Kansas hub specifically: real equity + uncapped homestead + 12
    // months of redemption is frequently better off not selling at all.
    expect(ksText).toMatch(/frequently better off not selling to us at all/i);
    expect(ksText).toMatch(/uncapped homestead/i);
    expect(ksText).toMatch(/twelve months/i);
  });

  it("frames probate as an area where a lawyer is often genuinely necessary, on both hubs", () => {
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(text, page.slug).toMatch(/lawyer is often genuinely necessary/i);
    }
  });

  it("has zero duplicate 160-character windows within the state hub pair", () => {
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

  it("has zero duplicate 160-character windows against the foreclosure, money, and transaction clusters", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
      ...Object.values(stateLineContentTransaction),
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

  it("registers both hubs in the merged content registry", () => {
    for (const slug of Object.keys(stateHubContent)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes both hubs indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(stateHubContent)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
