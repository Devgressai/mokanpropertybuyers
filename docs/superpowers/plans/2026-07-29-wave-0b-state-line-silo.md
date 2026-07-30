# MoKan Wave 0B — The State-Line Silo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the 14 anchor pages of the state-line silo plus deep Missouri and Kansas state hubs — 16 pages of genuinely differentiated, statute-cited legal content — with citation enforcement wired *before* the first claim is written.

**Architecture:** Three infrastructure tasks precede any prose. Citation enforcement is closed first (Wave 0A left `claimIsCited()` uncalled), a content-slug collision gate lands before the second content map exists, and the `stateLine` page type is wired into the existing root `[slug]` route. Then a **single verified-citation ledger** is built and reviewed as its own task, and every page's prose is written against that ledger rather than each author researching independently — one wrong statute number repeated across fourteen pages is the failure mode this ordering prevents.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript 5, Tailwind v4, Vitest. `WebSearch`/`WebFetch` are required for statute verification.

## Global Constraints

- **Every legal claim carries a `[MO]` or `[KS]` label and a statute or official-source citation.** No exceptions.
- **Deictic state references are PROHIBITED in legal copy** — never "here", "across the line", "our neighbors", "both states", "either state" as a stand-in for a named state. Spec §6 documents why: the anaphoric evasion class is undetectable by any gate.
- **Never state one rule as covering both states.** Missouri and Kansas get separate labeled sentences, always.
- **Every citation must be verified against a primary source and stamped with `verifiedOn`.** If it cannot be verified, the page says so and links the official source instead of asserting. Do not cite from memory.
- No fabricated statistics, review counts, timeline promises, superlatives, or case studies. `trust.ts` stays empty.
- NAP is unset. Render no phone, address, or entity name.
- Indexation floor is 600 words (`MIN_INDEXABLE_WORDS`); `follow: true` is universal.
- Palette `--mk-*` only. `clay` is large-text/buttons only (4.35:1 on limestone); small text uses `clay-ink`.
- **Never build locally.** CI is the build gate. `npx tsc --noEmit`, `npx vitest run`, `npx next lint`, `npm run check:all` are required.
- Do not hand-edit `src/data/geography.ts`. Do not modify `data/footprint.json`, `scripts/build-footprint.py`, or `.gitignore`.
- No `Co-Authored-By` / `Claude-Session` commit trailers. Commit as `git -c user.email=webvello@gmail.com -c user.name=george`.
- Do not push; no remote exists yet.

## Scope boundary

Wave 0B ships **16 pages**: the 14 anchor pages in spec §6 plus the two state hubs. The remaining ~26 silo pages (per-state transactional variants) are **Wave 0C**. Spec §9 folds all 40 into "Wave 0"; this plan deliberately splits it, because 40 pages of statute-verified content is too large for one plan and the anchors carry most of the differentiation.

---

### Task 1: Close the citation hole

Wave 0A shipped `LegalClaim` with a required `citation` field and an exported `claimIsCited()` that **nothing calls**. A claim with `citation: ""` typechecks and passes the gate. This must close before any claim exists.

**Files:**
- Modify: `src/data/content-registry.ts` (extend `PageContent`)
- Modify: `scripts/check-state-claims.mts` (`ClaimAudit`, `auditClaims`)
- Test: `tests/check-state-claims.test.ts`

**Interfaces:**
- Consumes: `LegalClaim` from `@/types/legal`
- Produces:
  - `interface PageContent { slug: string; body: string[]; claims?: LegalClaim[] }`
  - `interface ClaimAudit { total: number; claimCount: number; unlabeledBlends: string[]; missingCitation: string[] }`

- [ ] **Step 1: Write the failing test**

```typescript
// append to tests/check-state-claims.test.ts
import { auditClaimList } from "../scripts/check-state-claims.mts";

describe("citation enforcement", () => {
  it("reports a claim whose citation is empty", () => {
    const result = auditClaimList("sell-my-house-fast-missouri", [
      { state: "MO", claim: "Homestead is $15,000.", citation: "", verifiedOn: "2026-07-29" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("sell-my-house-fast-missouri");
    expect(result[0]).toContain("Homestead is $15,000.");
  });

  it("reports a claim whose citation is only whitespace", () => {
    expect(auditClaimList("x", [
      { state: "KS", claim: "Redemption is 12 months.", citation: "   ", verifiedOn: "2026-07-29" },
    ])).toHaveLength(1);
  });

  it("accepts a cited claim", () => {
    expect(auditClaimList("x", [
      { state: "MO", claim: "Homestead is $15,000.",
        citation: "RSMo 513.475", verifiedOn: "2026-07-29" },
    ])).toEqual([]);
  });

  it("reports a claim with no verifiedOn date", () => {
    expect(auditClaimList("x", [
      { state: "MO", claim: "Homestead is $15,000.",
        citation: "RSMo 513.475", verifiedOn: "" },
    ])).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npx vitest run tests/check-state-claims.test.ts`
Expected: FAIL — `auditClaimList` is not exported.

- [ ] **Step 3: Extend `PageContent`**

In `src/data/content-registry.ts`, add the optional field. Optional keeps every
existing page valid — geography pages carry no claims.

```typescript
import type { LegalClaim } from "@/types/legal";

export interface PageContent {
  slug: string;
  /** Paragraph blocks of hand-written body copy. */
  body: string[];
  /**
   * Statements of law made by this page. Every entry is audited by
   * `check:state-claims` for a non-empty citation and verification date.
   * Absent on pages that assert no law.
   */
  claims?: LegalClaim[];
}
```

- [ ] **Step 4: Wire the audit**

In `scripts/check-state-claims.mts`:

```typescript
/**
 * Every claim must carry a citation AND a verification date. An uncited claim
 * typechecks — `citation: ""` satisfies `citation: string` — so the type alone
 * never enforced this. Wave 0A shipped `claimIsCited` uncalled; this is the
 * call site.
 */
export function auditClaimList(slug: string, claims: LegalClaim[]): string[] {
  const problems: string[] = [];
  for (const c of claims) {
    if (!claimIsCited(c)) {
      problems.push(`${slug}: uncited [${c.state}] "${c.claim.slice(0, 80)}"`);
    } else if (c.verifiedOn.trim() === "") {
      problems.push(`${slug}: unverified [${c.state}] "${c.claim.slice(0, 80)}"`);
    }
  }
  return problems;
}
```

Then extend `auditClaims()` to accumulate `claimCount` and `missingCitation` by
calling `auditClaimList` for each page's `claims ?? []`, and extend `main()` to
print both counts and exit non-zero when `missingCitation` is non-empty.

Expected output with no content: `check:state-claims OK — 0 paragraphs, 0 claims, 0 unlabeled MO/KS blends, 0 uncited claims`

- [ ] **Step 5: Run tests and the gate**

Run: `npx vitest run && npm run check:state-claims`
Expected: all pass; gate prints the four-count line.

- [ ] **Step 6: Commit**

```bash
git add src/data/content-registry.ts scripts/check-state-claims.mts tests/check-state-claims.test.ts
git commit -m "gate: call the citation check that was only ever declared

LegalClaim requires a citation and claimIsCited() has existed since Wave
0A, but nothing called it -- so a claim with citation: \"\" typechecked
and passed the gate. The type never enforced anything, because an empty
string is a string.

auditClaims now walks every page's claims and fails on an uncited or
unverified one, naming the page and the claim. Closed before the first
claim exists rather than after, which was the whole point of recording
it as a prerequisite."
```

---

### Task 2: Content-slug collision gate

The content registry merges `Object.assign({}, ...registries)` — last wins, silently. Wave 0B adds the first content map; Wave 0C adds the second. This gate lands before that.

**Files:**
- Create: `scripts/check-content-slugs.mts`
- Modify: `package.json` (add `check:content-slugs`, add to `check:all`), `.github/workflows/ci.yml`
- Test: `tests/check-content-slugs.test.ts`

**Interfaces:**
- Produces: `findDuplicateContentSlugs(maps: Record<string, unknown>[]): string[]`, `auditContentSlugs(): { maps: number; slugs: number; duplicates: string[] }`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/check-content-slugs.test.ts
import { describe, expect, it } from "vitest";
import { findDuplicateContentSlugs, auditContentSlugs } from "../scripts/check-content-slugs.mts";

describe("findDuplicateContentSlugs", () => {
  it("reports a slug defined in two maps", () => {
    expect(findDuplicateContentSlugs([
      { "a": {}, "b": {} },
      { "b": {}, "c": {} },
    ])).toEqual(["b"]);
  });

  it("reports each colliding slug once even across three maps", () => {
    expect(findDuplicateContentSlugs([{ "a": {} }, { "a": {} }, { "a": {} }])).toEqual(["a"]);
  });

  it("accepts disjoint maps", () => {
    expect(findDuplicateContentSlugs([{ "a": {} }, { "b": {} }])).toEqual([]);
  });

  it("accepts a single map", () => {
    expect(findDuplicateContentSlugs([{ "a": {}, "b": {} }])).toEqual([]);
  });
});

describe("auditContentSlugs", () => {
  it("finds no duplicates in the real registry", () => {
    expect(auditContentSlugs().duplicates).toEqual([]);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npx vitest run tests/check-content-slugs.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Export the registry list**

`content-registry.ts` currently keeps `registries` module-private. Export it so the gate can inspect the maps *before* they are merged — after `Object.assign` the collision is already gone, which is exactly why this cannot be checked downstream.

```typescript
/** Exported for `check:content-slugs`: a collision is invisible after merge. */
export const contentRegistries: Record<string, PageContent>[] = registries;
```

- [ ] **Step 4: Write the gate**

Follow the established shape: pure `findDuplicateContentSlugs`, an `auditContentSlugs()` real-data entry point, a `main()` that prints and exits non-zero, and the `process.argv[1]?.includes("check-content-slugs")` direct-execution guard used by the other five gates.

Honest output when the registry has one map: `check:content-slugs OK — 1 map, N slugs, 0 duplicates`. With zero maps it must say so rather than implying it checked something.

- [ ] **Step 5: Add to `package.json` and CI**

Add `"check:content-slugs": "tsx scripts/check-content-slugs.mts"`, insert it into `check:all` after `check:state-claims`, and add the CI step in the same position.

- [ ] **Step 6: Run everything**

Run: `npx vitest run && npm run check:all`
Expected: all green, six gates now.

- [ ] **Step 7: Commit**

```bash
git add scripts/check-content-slugs.mts tests/check-content-slugs.test.ts \
        src/data/content-registry.ts package.json .github/workflows/ci.yml
git commit -m "gate: two content maps cannot claim the same slug

The registry merges with Object.assign, so a slug defined in two maps
loses one silently -- no error, no warning, one page's copy simply gone.
Geography has check:slugs proving 199 slugs unique; content had nothing.

The check runs against the pre-merge array, because after the merge the
collision no longer exists to find. Landing it now, while there is still
exactly one map, rather than after the second one hides a page."
```

---

### Task 3: Wire the `stateLine` page type

**Files:**
- Create: `src/data/state-line.ts` (16 page definitions, no prose)
- Create: `src/components/seo/StateLinePage.tsx`, `src/components/seo/LegalClaimList.tsx`
- Modify: `src/lib/seo/pageIndex.ts`, `src/app/(geo)/[slug]/page.tsx`, `src/lib/seo/placeCopy.ts`
- Test: `tests/state-line.test.ts`

**Interfaces:**
- Produces: `interface StateLineDef { slug: string; title: string; h1: string; metaDescription: string; state?: StateCode; }`, `export const stateLinePages: StateLineDef[]`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/state-line.test.ts
import { describe, expect, it } from "vitest";
import { stateLinePages } from "@/data/state-line";
import { getAllSeoSlugs, getPagesByType, getPageBySlug } from "@/lib/seo/pageIndex";

describe("state-line silo", () => {
  it("defines 14 anchor pages", () => {
    expect(stateLinePages).toHaveLength(14);
  });

  it("registers every one in the page index", () => {
    expect(getPagesByType("stateLine")).toHaveLength(14);
    for (const p of stateLinePages) expect(getPageBySlug(p.slug)).toBeDefined();
  });

  it("keeps total slugs unique after adding the silo", () => {
    const all = getAllSeoSlugs();
    expect(new Set(all).size).toBe(all.length);
    expect(all).toHaveLength(199 + 14);
  });

  it("never collides with a geographic slug", () => {
    for (const p of stateLinePages) expect(p.slug).not.toMatch(/-(mo|ks)$/);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npx vitest run tests/state-line.test.ts`
Expected: FAIL — `@/data/state-line` not found.

- [ ] **Step 3: Define the 14 anchor pages**

Slugs are topical, not geographic, so they must NOT end in `-mo`/`-ks` (that suffix is reserved for places and `check:slugs` asserts geographic slugs carry it). Use these exact slugs:

```
which-side-of-state-line-road
missouri-vs-kansas-foreclosure
kansas-right-of-redemption
missouri-trustee-sale-timeline
homestead-exemption-missouri-vs-kansas
probate-missouri-vs-kansas
property-tax-assessment-missouri-vs-kansas
jackson-county-reassessment
transfer-tax-missouri-vs-kansas
tax-sale-missouri-vs-kansas
deed-of-trust-vs-mortgage
contract-for-deed-missouri-vs-kansas
seller-disclosure-missouri-vs-kansas
kansas-city-earnings-tax
```

- [ ] **Step 4: Register in `pageIndex.ts`**

Push a `stateLine` page per definition with `priority: 95` (these are the site's differentiators and should outrank city pages), `parentSlug` set to the relevant state hub when `state` is present and omitted for genuinely bi-state pages.

- [ ] **Step 5: Extend the route switch and `placeLabel`**

Add `case "stateLine":` to the switch in `src/app/(geo)/[slug]/page.tsx` rendering `StateLinePage`. Extend `placeLabel()` in `placeCopy.ts` so a `stateLine` h1 does not fall through and return a whole sentence as a breadcrumb label — this is the Wave 0A carry-forward coming due. Prefer adding an explicit `label` to the definitions over another regex strip pattern.

- [ ] **Step 6: Build the components**

`LegalClaimList.tsx` renders a page's `claims` as a visible, cited list — the citation is shown to the reader, not just stored. A seller deciding whether to trust a foreclosure timeline should see `RSMo 443.320` next to it. `StateLinePage.tsx` composes body prose plus that list, reusing `PageShell`/`PageBody` rather than duplicating them.

- [ ] **Step 7: Run tests and all gates**

Run: `npx vitest run && npx tsc --noEmit && npx next lint && npm run check:all`
Expected: green; `check:slugs` now reports 199 geographic slugs unchanged (the silo is not geographic), `check:pages` reports 213 pages.

- [ ] **Step 8: Commit**

```bash
git add src/data/state-line.ts src/components/seo/StateLinePage.tsx \
        src/components/seo/LegalClaimList.tsx src/lib/seo/pageIndex.ts \
        "src/app/(geo)/[slug]/page.tsx" src/lib/seo/placeCopy.ts tests/state-line.test.ts
git commit -m "silo: routes for the pages that justify the site

Fourteen anchor pages on the state line -- foreclosure, redemption,
homestead, probate, assessment, tax sale, deed of trust versus mortgage.
No prose yet; this is the wiring.

Citations render to the reader rather than sitting in the data. Someone
deciding whether to believe a foreclosure timeline should see the statute
next to it, and a claim nobody can check is a claim nobody should trust."
```

---

### Task 4: The verified citation ledger

**No prose is written until this task is reviewed.** Fourteen pages asserting Missouri and Kansas law need one authoritative, verified source of statute references. Fourteen authors each looking up RSMo 513.475 independently is how a wrong number gets repeated fourteen times.

**Files:**
- Create: `src/data/legal-citations.ts`
- Create: `docs/CITATION-LEDGER.md` (what was checked, against what, on what date)
- Test: `tests/legal-citations.test.ts`

**Interfaces:**
- Produces: `export const citations: Record<string, LegalClaim>` keyed by a stable id (e.g. `mo-homestead`, `ks-redemption-12mo`)

- [ ] **Step 0: Extend `LegalClaim` with effective dating — a statute can be law and not yet in force**

**This step exists because verification already caught a live trap.** On 2026-07-29,
`revisor.mo.gov` served RSMo 513.475 reading "forty thousand dollars" with the revision
history `A.L. 2026 H.B. 1870 merged with S.B. 835 & 1111` and **Effective Date:
January 1, 2027**. The current operative Missouri homestead exemption is **$15,000**;
H.B. 1870 (signed 2026-05-06) raises it to **$40,000 on 2027-01-01**, with triennial CPI
adjustment beginning 2029-04-01.

**The Missouri Revisor publishes amended text ahead of its effective date.** Any author who
verifies against revisor.mo.gov and copies the number will publish a figure that is wrong
for the next five months — and a distressed Missouri homeowner deciding what equity is
protected would be misinformed by exactly $25,000.

So `LegalClaim` gains effective dating:

```typescript
export interface LegalClaim {
  state: StateCode;
  claim: string;
  citation: string;
  sourceUrl?: string;
  /** ISO date the claim was checked against its source. */
  verifiedOn: string;
  /**
   * ISO date this rule took effect. Omit when the rule is long-settled.
   */
  effectiveFrom?: string;
  /**
   * A scheduled change to this rule that is enacted but not yet in force.
   * Rendered to the reader, because a seller planning around a deadline needs
   * to know the rule changes before their timeline ends.
   */
  pendingChange?: {
    /** What it becomes. */
    claim: string;
    /** ISO date it takes effect. */
    effectiveFrom: string;
    /** The enacting instrument, e.g. "H.B. 1870 (2026)". */
    citation: string;
    sourceUrl?: string;
  };
}
```

**Binding rule for every claim in the ledger: check whether the text you are reading is
currently in force.** Look for an "Effective Date" line and a recent `A.L.` entry in the
revision history. If the text is future-effective, record the *current* rule as `claim` and
the coming change as `pendingChange`. Note the same hazard may exist on `ksrevisor.gov`.

Update `auditClaimList` so a `pendingChange` without its own `citation` fails the gate, and
add tests covering both the effective-dating fields and that failure.

- [ ] **Step 1: Verify each claim against a primary source**

Use `WebSearch` and `WebFetch` against **official sources only** — `revisor.mo.gov`, `ksrevisor.gov`, `law.justia.com`, county assessor and Department of Revenue sites, the Kansas and Missouri courts. Do not cite a blog, a law-firm marketing page, or a memory.

The claim set to verify, at minimum:

| id | Claim to verify | Expected source |
|---|---|---|
| `mo-nonjudicial` | Missouri permits non-judicial foreclosure under a deed of trust | RSMo ch. 443 |
| `mo-notice-period` | Missouri's required notice/publication period before a trustee sale | RSMo 443.320 et seq. |
| `mo-redemption` | Missouri post-sale redemption, and the narrow circumstances it exists in | RSMo 443.410 |
| `ks-judicial` | Kansas requires judicial foreclosure | K.S.A. ch. 60 |
| `ks-redemption-12mo` | Kansas redemption period. **VERIFIED 2026-07-29: "the defendant owner may redeem any real property sold under execution … at any time within 12 months from the day of sale."** | K.S.A. 60-2414 |
| `ks-redemption-3mo` | Shortened redemption. **VERIFIED 2026-07-29: 3 months when default occurs "before ⅓ of the original indebtedness secured by the mortgage or lien has been paid"; but the court orders the full 12 months if all liens total less than ⅓ of market value.** | K.S.A. 60-2414 |
| `mo-homestead` | Missouri homestead exemption amount. **VERIFIED 2026-07-29: $15,000 currently; $40,000 from 2027-01-01 per H.B. 1870 (signed 2026-05-06); triennial CPI adjustment from 2029-04-01. Record as `claim` + `pendingChange`.** | RSMo 513.475 |
| `ks-homestead` | Kansas homestead exemption. **VERIFIED 2026-07-29: 160 acres farming land / 1 acre within an incorporated town or city, NO dollar limit on value (annotation 45: "without dollar value limitation").** | Kan. Const. Art. 15 §9; K.S.A. 60-2301 |
| `mo-transfer-tax-ban` | Missouri constitutional prohibition on real estate transfer taxes | Mo. Const. Art. X §25 |
| `ks-mortgage-reg-tax` | Kansas mortgage registration tax repeal and its phase-out | K.S.A. 79-3102 history |
| `mo-assessment-19` | Missouri residential assessment ratio | RSMo 137.115 |
| `ks-assessment-115` | Kansas residential assessment rate | Kan. Const. Art. 11 §1 |
| `mo-tax-sale-redemption` | Missouri collector's-deed redemption period | RSMo ch. 140 |
| `mo-probate-independent` | Missouri independent vs supervised administration | RSMo ch. 473 |
| `ks-probate-simplified` | Kansas simplified estate procedure | K.S.A. ch. 59 |
| `kcmo-earnings-tax` | Kansas City, MO earnings tax rate | City of KCMO Revenue Division |

**If a claim cannot be verified against a primary source, do not invent a citation.** Record it in `docs/CITATION-LEDGER.md` as UNVERIFIED and omit it from `citations`. A page then links the official source and states the limit of what is known instead of asserting. This is a required outcome, not a failure.

- [ ] **Step 2: Write the test**

```typescript
// tests/legal-citations.test.ts
import { describe, expect, it } from "vitest";
import { citations } from "@/data/legal-citations";
import { claimIsCited } from "../scripts/check-state-claims.mts";

describe("citation ledger", () => {
  it("cites and dates every entry", () => {
    for (const [id, c] of Object.entries(citations)) {
      expect(claimIsCited(c), id).toBe(true);
      expect(c.verifiedOn, id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("labels every entry with a state", () => {
    for (const [id, c] of Object.entries(citations)) {
      expect(c.state, id).toMatch(/^(MO|KS)$/);
    }
  });

  it("gives every entry a source URL", () => {
    for (const [id, c] of Object.entries(citations)) {
      expect(c.sourceUrl, id).toMatch(/^https:\/\//);
    }
  });
});
```

- [ ] **Step 3: Run tests and gates**

Run: `npx vitest run && npm run check:all`
Expected: green.

- [ ] **Step 4: Commit**

```bash
git add src/data/legal-citations.ts docs/CITATION-LEDGER.md tests/legal-citations.test.ts
git commit -m "legal: one verified source of statute truth, checked not remembered

Every citation for the state-line silo, verified against revisor.mo.gov,
ksrevisor.gov, and the relevant state constitutions, each stamped with
the date it was checked and the URL it was checked against.

Written as one ledger because fourteen pages asserting Missouri and
Kansas law would otherwise mean fourteen independent lookups of the same
statute, and a wrong number repeated fourteen times reads as
corroboration. Anything that could not be verified is recorded as
UNVERIFIED and omitted -- those pages will link the official source and
say what is not known instead of asserting it."
```

---

### Tasks 5–7: Author the 14 anchor pages

Three batches. Each batch is one task with its own review cycle. Every batch consumes `src/data/legal-citations.ts` and writes prose against it — **no author researches statutes independently.**

- **Task 5** — the foreclosure cluster (5 pages): `missouri-vs-kansas-foreclosure`, `kansas-right-of-redemption`, `missouri-trustee-sale-timeline`, `deed-of-trust-vs-mortgage`, `which-side-of-state-line-road`
- **Task 6** — the money cluster (5 pages): `homestead-exemption-missouri-vs-kansas`, `property-tax-assessment-missouri-vs-kansas`, `jackson-county-reassessment`, `transfer-tax-missouri-vs-kansas`, `kansas-city-earnings-tax`
- **Task 7** — the transaction cluster (4 pages): `probate-missouri-vs-kansas`, `tax-sale-missouri-vs-kansas`, `contract-for-deed-missouri-vs-kansas`, `seller-disclosure-missouri-vs-kansas`

**Files per batch:** create `src/data/state-line-content-{foreclosure,money,transaction}.ts`, push each onto `contentRegistries` in `content-registry.ts`, and add a test per batch.

#### Content contract — binding on all three batches

1. **≥900 words per page** of body prose (floor is 600; these are the site's flagship pages and should clear it comfortably).
2. **Every paragraph asserting law carries `[MO]` or `[KS]`.** Never both in one paragraph.
3. **Every legal assertion appears in the page's `claims` array**, referencing an id from `citations`. Prose and claims must agree; a claim in prose with no ledger entry is a defect.
4. **No deictic state references.** Never "here", "across the line", "our neighbors", "both states", "either state" in place of a named state.
5. **Say when a cash sale is the wrong choice.** Every page states plainly where listing, reinstating, or simply waiting out a redemption period nets the seller more. A Kansas homeowner with 12 months of redemption and equity is frequently better off not selling to us, and the page must say so.
6. **No fabricated figures.** No medians, no days-on-market, no "we've closed N deals". Where a number is genuinely knowable and verified it comes from `citations`; otherwise it is not stated.
7. **Zero duplicate paragraphs across slugs.** Run a cross-slug 160-character duplicate check after each batch; SPB shipped a shared FAQ cluster repeated 35–48× and had to remediate it.
8. **Run `npm run check:all` after every batch.** `check:state-claims` must report 0 blends and 0 uncited claims.

Per-batch steps: write the failing test (asserting word floor, `[MO]`/`[KS]` labeling on legal paragraphs, no deictic terms, every claim id resolving to `citations`) → confirm it fails → author the content → confirm it passes → run the duplicate-paragraph audit → run all gates → commit.

---

### Task 8: Deep state hubs

`/sell-my-house-fast-missouri` and `/sell-my-house-fast-kansas` currently render the no-content fallback. They are the parents of 53 counties and the structural home of all state-specific law.

**Files:** create `src/data/state-hub-content.ts`, push onto `contentRegistries`, test.

Each hub gets ≥1,200 words: what the state's foreclosure process actually is, its homestead protection, its probate route, its assessment ratio, the counties served within it, and an honest statement of when a seller in that state should not sell for cash. Same contract as Tasks 5–7. Every claim cites `citations`, and each hub links to the silo pages that go deeper.

---

### Task 9: Verify indexation and close the wave

- [ ] Confirm exactly 16 pages are now indexable (`isIndexable` true) and 199 geographic pages remain `noindex, follow`
- [ ] Confirm the sitemap grew from 1 entry to 17 and that every entry resolves to a real route
- [ ] Run `npm run check:all` — all six gates green
- [ ] Update `docs/WAVE-0B-PREREQUISITES.md`: strike items 1 and 2 as closed, carry the rest into a Wave 0C prerequisites section
- [ ] Update `README.md`'s "nothing is indexed yet" section to reflect the 16 pages
- [ ] Commit

---

## Self-Review

**Spec coverage:** §6 anchor pages → Tasks 3–7. §4 state hubs → Task 8. §9 wave gating → Task 9. §8 honesty rules → the content contract. Wave 0A prerequisites 1 and 2 → Tasks 1 and 2. The `placeLabel` carry-forward → Task 3 Step 5.

**Known gaps, stated rather than hidden:**
- The remaining ~26 silo pages are Wave 0C. Spec §9 counts all 40 in Wave 0; this plan splits them and says so.
- Tasks 5–8 give a content contract, not literal prose. That is deliberate — 16 pages of statute-cited copy cannot be pre-written inside a plan, and the contract plus the citation ledger is the mechanism that keeps them consistent. The word floors, labeling rules, claim-id resolution, and duplicate audit are all mechanically checkable.
- `public/` still does not exist (Wave 0A carry-forward 3). No task here adds an image, so `check:assets` stays unexercised.

**Type consistency:** `PageContent.claims?: LegalClaim[]` (Task 1) is consumed by `auditClaims` (Task 1), `LegalClaimList` (Task 3), and every content batch (Tasks 5–8). `citations` is keyed by string id and every batch references those ids. `StateLineDef` is defined in Task 3 and consumed by `pageIndex`.
