// tests/state-line-content-money.test.ts
//
// The content contract (docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md,
// Tasks 5-7) is mechanically checkable, so this test checks it mechanically rather
// than trusting a read-through. Every assertion here is designed to fail against
// broken content, not just pass against correct content -- see the addendum in
// docs/CITATION-LEDGER.md on why a clean sweep deserves scrutiny.
import { describe, expect, it } from "vitest";
import { stateLineContentMoney } from "../src/data/state-line-content-money";
import { stateLineContentForeclosure } from "../src/data/state-line-content-foreclosure";
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

const pages = Object.values(stateLineContentMoney);

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("state-line money cluster content", () => {
  it("defines exactly the five money-cluster slugs", () => {
    expect(Object.keys(stateLineContentMoney).sort()).toEqual([
      "homestead-exemption-missouri-vs-kansas",
      "jackson-county-reassessment",
      "kansas-city-earnings-tax",
      "property-tax-assessment-missouri-vs-kansas",
      "transfer-tax-missouri-vs-kansas",
    ]);
  });

  it("keeps each entry's slug field matching its registry key", () => {
    for (const [key, page] of Object.entries(stateLineContentMoney)) {
      expect(page.slug).toBe(key);
    }
  });

  it("clears the 900-word flagship floor on every page, well above the 600-word site floor", () => {
    expect(FLAGSHIP_MIN_WORDS).toBeGreaterThan(MIN_INDEXABLE_WORDS);
    for (const page of pages) {
      expect(wordCount(page.body), page.slug).toBeGreaterThanOrEqual(FLAGSHIP_MIN_WORDS);
    }
  });

  it("labels every paragraph asserting state-specific law with [MO] or [KS]", () => {
    // A paragraph that names neither state (generic terminology, e.g. what an
    // assessment ratio structurally is) makes no jurisdictional claim and
    // needs no label. One that names a state AND uses a legal-marker word IS
    // an assertion of that state's law and must be labeled.
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
    // asserting law at all -- there must be real labeled paragraphs to check.
    expect(checked).toBeGreaterThan(20);
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

  it("gives every page at least one claim, and every claim passes the citation audit", () => {
    for (const page of pages) {
      const claims = page.claims ?? [];
      expect(claims.length, page.slug).toBeGreaterThan(0);
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

  it("renders the Missouri homestead pendingChange -- both the current and future figures", () => {
    const page = stateLineContentMoney["homestead-exemption-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toContain("$15,000");
    expect(text).toContain("$40,000");
    expect(text).toMatch(/2027/);
    // The current figure must not be presented as $40,000 -- that was the
    // exact trap the ledger's Step 0 exists to prevent.
    const mo = citations["mo-homestead"];
    expect(mo.claim).toContain("$15,000");
    expect(mo.pendingChange?.claim).toContain("$40,000");
    expect(mo.pendingChange?.effectiveFrom).toBe("2027-01-01");
  });

  it("states the Kansas homestead exemption has no dollar cap", () => {
    const page = stateLineContentMoney["homestead-exemption-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/no (dollar )?limit|no cap/i);
  });

  it("does not overstate the Jackson County ruling as a merits win", () => {
    const page = stateLineContentMoney["jackson-county-reassessment"];
    const text = page.body.join(" ");
    // Must describe the ruling as procedural (may proceed) not a merits win.
    expect(text).toMatch(/may proceed|could go forward|could proceed/i);
    expect(text).toMatch(/unresolved|still active|not (a )?(final|merits)/i);
    // A bare, unqualified claim that the Commission prevailed on the merits
    // would be the overstatement the ledger's addendum warns against. The
    // page may quote "the state won" only as an explicitly rejected framing
    // (i.e. paired with "the case is still active" as the correct one) --
    // check for the overstatement stated as fact, not the contrast itself.
    expect(text).not.toMatch(/sided with the Commission on the merits|Jackson County lost the case|the Commission (won|prevailed)\b/i);
  });

  it("never mentions a scheduled or pending change to the Kansas 11.5% assessment rate", () => {
    const page = stateLineContentMoney["property-tax-assessment-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).not.toMatch(/HCR ?5011/i);
    // The Kansas assessment claim itself must carry no pendingChange -- the
    // ledger deliberately omitted the dead HCR 5011 amendment.
    expect(citations["ks-assessment-115"].pendingChange).toBeUndefined();
  });

  it("does not print the KCMO earnings-tax renewal margin as a certified figure", () => {
    const page = stateLineContentMoney["kansas-city-earnings-tax"];
    const text = page.body.join(" ");
    // If a percentage appears at all, it must be hedged as unofficial/approximate.
    if (/%/.test(text) || /75\.45/.test(text)) {
      expect(text).toMatch(/unofficial|approximate|roughly|near/i);
    }
    expect(text).not.toMatch(/75\.45%? in favor/i);
  });

  it("says when selling to us is the wrong move, on every page", () => {
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(
        /better off not selling|not the (obvious|right) (answer|move)|does not hold up|not real|premature|discount/i.test(text),
        page.slug
      ).toBe(true);
    }
  });

  it("has zero duplicate 160-character windows within the money cluster", () => {
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

  it("has zero duplicate 160-character windows against the foreclosure cluster (Task 5)", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const foreclosurePages = Object.values(stateLineContentForeclosure);
    for (const page of [...foreclosurePages, ...pages]) {
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

  it("registers all five pages in the merged content registry", () => {
    for (const slug of Object.keys(stateLineContentMoney)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all five pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(stateLineContentMoney)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
