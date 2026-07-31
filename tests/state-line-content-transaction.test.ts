// tests/state-line-content-transaction.test.ts
//
// The content contract (docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md,
// Tasks 5-7) is mechanically checkable, so this test checks it mechanically rather
// than trusting a read-through. Every assertion here is designed to fail against
// broken content, not just pass against correct content -- see the addendum in
// docs/CITATION-LEDGER.md on why a clean sweep deserves scrutiny.
//
// Wave 0B closed with three ledger gaps in this cluster: no Kansas tax-sale
// claim, and no claim at all -- for either state -- on contract for deed or
// seller disclosure. Wave 0C closed all three (see the file-level comment in
// state-line-content-transaction.ts and docs/CITATION-LEDGER.md), so all four
// pages in this cluster now carry at least one verified claim and all four
// clear the 900-word flagship floor. Nothing here asserts law that was not
// independently verified against a primary source -- Missouri's absence of a
// dedicated contract-for-deed statute is itself a verified (negative) finding,
// not a gap papered over.
import { describe, expect, it } from "vitest";
import { stateLineContentTransaction } from "../src/data/state-line-content-transaction";
import { stateLineContentForeclosure } from "../src/data/state-line-content-foreclosure";
import { stateLineContentMoney } from "../src/data/state-line-content-money";
import { citations } from "../src/data/legal-citations";
import { getPageContent, contentRegistries } from "../src/data/content-registry";
import { isIndexable, isBodyIndexable, MIN_INDEXABLE_WORDS } from "../src/lib/seo/indexation";
import { findUnlabeledBlends, auditClaimList } from "../scripts/check-state-claims.mts";

const FLAGSHIP_MIN_WORDS = 900;

// Mirrors the gate's own patterns (scripts/check-state-claims.mts) so a
// mislabeled paragraph fails here even if it happens to dodge the gate.
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;
const NAMES_A_STATE = /\b(Missouri|Kansas)\b/;
const LABEL = /\[(MO|KS)\]/;
const DEICTIC = /\b(here|across the line|our neighbors|both states|either state)\b/i;

const pages = Object.values(stateLineContentTransaction);

function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

describe("state-line transaction cluster content", () => {
  it("defines exactly the four transaction-cluster slugs", () => {
    expect(Object.keys(stateLineContentTransaction).sort()).toEqual([
      "contract-for-deed-missouri-vs-kansas",
      "probate-missouri-vs-kansas",
      "seller-disclosure-missouri-vs-kansas",
      "tax-sale-missouri-vs-kansas",
    ]);
  });

  it("keeps each entry's slug field matching its registry key", () => {
    for (const [key, page] of Object.entries(stateLineContentTransaction)) {
      expect(page.slug).toBe(key);
    }
  });

  // All four pages now clear the flagship 900-word floor -- closing the
  // ledger's three gaps (Kansas tax-sale, contract for deed, seller
  // disclosure) gave each page enough independently-verified law to state
  // that padding was never required to get here.
  it("clears the flagship 900-word floor on all four pages", () => {
    expect(FLAGSHIP_MIN_WORDS).toBeGreaterThan(MIN_INDEXABLE_WORDS);
    for (const page of pages) {
      expect(wordCount(page.body), page.slug).toBeGreaterThanOrEqual(FLAGSHIP_MIN_WORDS);
    }
  });

  it("reports the actual word count of every page (regression guard against silent shrinkage)", () => {
    // These are the real counts measured after Wave 0C closed this cluster's
    // three ledger gaps. A meaningful future edit can grow a page; this test
    // exists to catch one quietly losing content, not to freeze the copy in
    // place.
    const minimums: Record<string, number> = {
      "probate-missouri-vs-kansas": 1000,
      "tax-sale-missouri-vs-kansas": 1050,
      "contract-for-deed-missouri-vs-kansas": 1000,
      "seller-disclosure-missouri-vs-kansas": 1100,
    };
    for (const [slug, min] of Object.entries(minimums)) {
      const page = stateLineContentTransaction[slug];
      expect(wordCount(page.body), slug).toBeGreaterThanOrEqual(min);
    }
  });

  it("labels every paragraph asserting state-specific law with [MO] or [KS]", () => {
    // A paragraph that names neither state, or names a state but asserts no
    // law, makes no jurisdictional claim and needs no label. One that names a
    // state AND uses a legal-marker word IS an assertion of that state's law
    // and must be labeled.
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
    // asserting law at all.
    expect(checked).toBeGreaterThan(6);
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

  it("gives every page in this cluster at least one claim, each passing the citation audit", () => {
    for (const page of pages) {
      const claims = page.claims ?? [];
      expect(claims.length, page.slug).toBeGreaterThan(0);
      expect(auditClaimList(page.slug, claims)).toEqual([]);
    }
  });

  it("gives contract-for-deed exactly the two Kansas Contract for Deed Act claims -- no matching Missouri statute was found", () => {
    const page = stateLineContentTransaction["contract-for-deed-missouri-vs-kansas"];
    const claims = page.claims ?? [];
    expect(claims).toContainEqual(citations["ks-contract-for-deed-act"]);
    expect(claims).toContainEqual(citations["ks-contract-for-deed-notice-cure"]);
    expect(claims.every((c) => c.state === "KS"), "no MO claim -- none was verified").toBe(true);
  });

  it("gives seller-disclosure narrow statutory claims for both states plus Kansas's licensee-duty claim", () => {
    const page = stateLineContentTransaction["seller-disclosure-missouri-vs-kansas"];
    const claims = page.claims ?? [];
    expect(claims).toContainEqual(citations["mo-seller-disclosure-meth"]);
    expect(claims).toContainEqual(citations["mo-seller-disclosure-solid-waste"]);
    expect(claims).toContainEqual(citations["mo-merchandising-practices-act"]);
    expect(claims).toContainEqual(citations["ks-seller-disclosure-radon"]);
    expect(claims).toContainEqual(citations["ks-seller-disclosure-special-assessment"]);
    expect(claims).toContainEqual(citations["ks-broker-disclosure-duty"]);
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

  it("cites the Missouri tax-sale redemption right distinctly from the mortgage-foreclosure redemption right", () => {
    // The whole point of pulling in `mo-redemption` alongside
    // `mo-tax-sale-redemption` on this page is to contrast two different
    // Missouri redemption rights, not conflate them. Guard that both ids are
    // actually present and distinct.
    const page = stateLineContentTransaction["tax-sale-missouri-vs-kansas"];
    const claims = page.claims ?? [];
    expect(claims).toContainEqual(citations["mo-tax-sale-redemption"]);
    expect(claims).toContainEqual(citations["mo-redemption"]);
    expect(citations["mo-tax-sale-redemption"]).not.toBe(citations["mo-redemption"]);
  });

  it("states the Kansas tax-sale redemption cutoff as the mirror image of Kansas mortgage-foreclosure redemption", () => {
    const page = stateLineContentTransaction["tax-sale-missouri-vs-kansas"];
    const text = page.body.join(" ");
    // The verified rule: redemption only before the tax foreclosure sale,
    // none after -- the opposite of the 12-month post-sale window that
    // applies to a Kansas mortgage foreclosure (ks-redemption-12mo).
    expect(text).toMatch(/K\.S\.A\. 79-2803/);
    expect(text).toMatch(/no redemption right survives it|no redemption after that sale|closes the door/i);
    expect(text).toMatch(/mirror image/i);
    expect(text).toMatch(/K\.S\.A\. 79-2401a/);
  });

  it("states the Kansas Contract for Deed Act's notice-and-cure periods and says plainly no Missouri statute was found", () => {
    const page = stateLineContentTransaction["contract-for-deed-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/Kansas Contract for Deed Act/i);
    expect(text).toMatch(/30 days.*50%|50%.*30 days/i);
    expect(text).toMatch(/90 days/i);
    expect(text).toMatch(/did not find a Missouri statute creating a dedicated contract-for-deed framework/i);
  });

  it("states each state's narrow seller-disclosure statutes and says plainly neither has one comprehensive statute", () => {
    const page = stateLineContentTransaction["seller-disclosure-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/methamphetamine/i);
    expect(text).toMatch(/solid waste disposal site|demolition landfill/i);
    expect(text).toMatch(/radon/i);
    expect(text).toMatch(/special assessment/i);
    expect(text).toMatch(/does not have one statute requiring a residential seller to complete a general property-condition disclosure form/i);
    expect(text).toMatch(/does not have a single comprehensive seller-disclosure statute/i);
  });

  it("frames probate and disclosure as areas where a lawyer is often genuinely necessary", () => {
    const probate = stateLineContentTransaction["probate-missouri-vs-kansas"].body.join(" ");
    const disclosure = stateLineContentTransaction["seller-disclosure-missouri-vs-kansas"].body.join(" ");
    expect(probate).toMatch(/lawyer is often genuinely necessary|probate attorney/i);
    expect(disclosure).toMatch(/attorney.*often genuinely necessary|genuinely necessary/i);
  });

  it("says when selling to us is the wrong move, on every page", () => {
    for (const page of pages) {
      const text = page.body.join(" ");
      expect(
        /better off (not selling|listed|continuing|making those repairs|exploring)|not (the obvious|a reason)|obviously right move|far more than accepting a cash offer|worth serious consideration/i.test(text),
        page.slug
      ).toBe(true);
    }
  });

  it("says a cooperative estate with time and a decent-condition house usually nets more listed, for probate specifically", () => {
    const page = stateLineContentTransaction["probate-missouri-vs-kansas"];
    const text = page.body.join(" ");
    expect(text).toMatch(/time to work with/i);
    expect(text).toMatch(/agree on what to do|cooperat/i);
    expect(text).toMatch(/does not need significant repair|decent condition/i);
    expect(text).toMatch(/nets more money|better off listed/i);
  });

  it("has zero duplicate 160-character windows within the transaction cluster", () => {
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

  it("has zero duplicate 160-character windows against the foreclosure and money clusters", () => {
    const windows = new Map<string, string>();
    const duplicates: string[] = [];
    const priorPages = [
      ...Object.values(stateLineContentForeclosure),
      ...Object.values(stateLineContentMoney),
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

  it("registers all four pages in the merged content registry", () => {
    for (const slug of Object.keys(stateLineContentTransaction)) {
      expect(getPageContent(slug), slug).toBeDefined();
    }
  });

  it("clears the 600-word floor on all four pages", () => {
    // If any of these four is ever trimmed below 600 words, it should go
    // noindex rather than have this assertion loosened.
    for (const slug of Object.keys(stateLineContentTransaction)) {
      expect(isBodyIndexable(getPageContent(slug)!.body), slug).toBe(true);
    }
  });

  it("indexes all four pages -- each now carries at least one verified claim", () => {
    // Task 7.5: a stateLine page's title promises a named legal comparison,
    // so clearing the word floor is not enough on its own; it also needs a
    // claim. Wave 0C closed the ledger gaps that used to leave
    // contract-for-deed and seller-disclosure claims-less, so all four pages
    // in this cluster now index. See src/lib/seo/indexation.ts.
    expect(isIndexable("probate-missouri-vs-kansas")).toBe(true);
    expect(isIndexable("tax-sale-missouri-vs-kansas")).toBe(true);
    expect(isIndexable("contract-for-deed-missouri-vs-kansas")).toBe(true);
    expect(isIndexable("seller-disclosure-missouri-vs-kansas")).toBe(true);
  });
});
