// tests/state-line-content-foreclosure.test.ts
//
// The content contract (docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md,
// Tasks 5-7) is mechanically checkable, so this test checks it mechanically rather
// than trusting a read-through. Every assertion here is designed to fail against
// broken content, not just pass against correct content -- see the addendum in
// docs/CITATION-LEDGER.md on why a clean sweep deserves scrutiny.
import { describe, expect, it } from "vitest";
import { stateLineContentForeclosure } from "../src/data/state-line-content-foreclosure";
import { citations } from "../src/data/legal-citations";
import { getPageContent } from "../src/data/content-registry";
import { isIndexable, MIN_INDEXABLE_WORDS } from "../src/lib/seo/indexation";
import { findUnlabeledBlends, auditClaimList } from "../scripts/check-state-claims.mts";

const FLAGSHIP_MIN_WORDS = 900;

// Mirrors the gate's own patterns (scripts/check-state-claims.mts) so a
// mislabeled paragraph fails here even if it happens to dodge the gate.
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const pages = Object.values(stateLineContentForeclosure);

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("state-line foreclosure cluster content", () => {
  it("defines exactly the five foreclosure-cluster slugs", () => {
    expect(Object.keys(stateLineContentForeclosure).sort()).toEqual([
      "deed-of-trust-vs-mortgage",
      "kansas-right-of-redemption",
      "missouri-trustee-sale-timeline",
      "missouri-vs-kansas-foreclosure",
      "which-side-of-state-line-road",
    ]);
  });

  it("keeps each entry's slug field matching its registry key", () => {
    for (const [key, page] of Object.entries(stateLineContentForeclosure)) {
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
    // A paragraph that names neither state (generic terminology, e.g. what a
    // deed of trust structurally is) makes no jurisdictional claim and needs
    // no label. One that names a state AND uses a legal-marker word IS an
    // assertion of that state's law and must be labeled.
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

  it("has zero duplicate 160-character windows across all five pages", () => {
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

  it("registers all five pages in the merged content registry", () => {
    for (const slug of Object.keys(stateLineContentForeclosure)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("makes all five pages indexable now that they clear the word floor", () => {
    for (const slug of Object.keys(stateLineContentForeclosure)) {
      expect(isIndexable(slug), slug).toBe(true);
    }
  });
});
