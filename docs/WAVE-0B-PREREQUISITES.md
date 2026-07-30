# Wave 0B Prerequisites and Carry-Forwards

Everything Wave 0A deliberately left undone, and the traps waiting for whoever
picks this up. Promoted out of the SDD progress ledger — that file lives in
gitignored scratch and `git clean -fdx` would erase it.

Wave 0A shipped the foundation: 199 geographic pages generated from Census data,
five gates, 83 tests, CI green. No page content exists yet, and nothing is
indexed. See `README.md` for orientation and the design spec for the plan.

---

## Blocking — do these BEFORE the work they gate

### 1. Wire `claimIsCited` before writing a single legal claim

**This is the most dangerous item in the repo.** `src/types/legal.ts` defines
`LegalClaim` with a required `citation` field, and `scripts/check-state-claims.mts`
exports `claimIsCited()`. Both *look* like citation enforcement is live.

**It is not.** `ClaimAudit` is `{ total, unlabeledBlends }` — there is no
`missingCitation` field, and nothing calls `claimIsCited()`. A `LegalClaim` with
`citation: ""` typechecks and passes the gate.

Harmless today because zero `LegalClaim` records exist. The moment the first one
is authored, the required-citation rule is unenforced at runtime while appearing
enforced. **Wire `missingCitation` into `auditClaims()` in the same task that
writes the first claim.** This was a defect in the Wave 0A plan: the task brief's
interface summary listed the field and the brief's own reference code omitted it.

### 2. Add content-slug collision detection before the SECOND content map

`src/data/content-registry.ts` merges via `Object.assign({}, ...registries)` —
**last wins, silently.** Two content maps defining the same slug means one page's
copy vanishes with no error.

This is the exact failure class engineered out of the geography layer, where
`check:slugs` proves 199 slugs unique. The content layer has no equivalent.
Zero risk today (`registries` is empty). Add a `check:content-slugs` gate before
the second map is pushed.

### 3. Create `public/` before referencing the first asset

No `public/` directory exists. `check:assets` currently scans 22 source files and
finds 0 asset references, which is honest but unexercised. The sibling project
advertised a `logo.png` that never existed, sitewide, in three JSON-LD blocks —
no build broke, no error was thrown. This gate is the only thing that catches
that, so give it something to check.

### 4. Extend `placeLabel()` when adding any new H1 shape

`src/lib/seo/placeCopy.ts` strips `/^Sell Your House Fast in /` off `h1` to get a
place label. Correct for all 199 pages today (verified: 0 leaks). On a
non-matching H1 it returns the **entire sentence**, so a future
`"We Buy Land in Bates County, MO"` renders as a full-sentence breadcrumb label.

Property-type, situation, and state-line pages introduce new H1 shapes. Either
add an explicit `label` field to `SeoPage` or extend the strip patterns when they
land. Degrades ugly, not dangerous — but it will look broken.

---

## Binding on all content waves

### The state-claims gate is a backstop, not enforcement

Spec §6 documents four evasion classes, three of which no improvement to the gate
can close. Adversarially verified 2026-07-29:

| Class | Catchable? |
|---|---|
| Blend split across two adjacent paragraphs | No — the checker's unit is one block |
| Vocabulary avoidance ("the bank can take your home in about three weeks") | Partially; synonym lists never close |
| Implicit/anaphoric state reference ("here", "across the state line") | **No** — never writes "Missouri"/"Kansas", so the state regex never fires |
| Geographic false *positive* ("Missouri River … Kansas … lien") | Partially |

**The authoring rule, not the gate, is the standard:** every paragraph asserting
law carries an explicit `[MO]` or `[KS]` label, and deictic references to a state
— "here", "across the line", "our neighbors" — are prohibited in legal copy.

A green `check:state-claims` does not mean the copy is accurate.

### Honesty rules

- `src/data/trust.ts` stays empty until real verified figures exist. No review
  counts, ratings, homes-purchased, dollars-paid, or years-in-business.
- No case studies, even labeled "illustrative." The sibling project had to
  rewrite eight pages whose "representative transaction" sections read as
  fabricated.
- No invented medians, appreciation rates, or days-on-market.
- No "guaranteed" language.
- **"No repairs, no commissions, no fees"** appears in current page copy. That is
  a real-world promise the business must honor — confirm with the owner.

---

## Deferred, triaged as safe to wait

Ruled DEFER by the final whole-branch review, with reasoning:

| Item | Why it can wait |
|---|---|
| `pop ?? 0` coerces null population in codegen | Verified inert: `places_excluded_below_min_pop` has 365 null-pop entries, but the consumed `counties` (53) and `places` (144) arrays have **zero** nulls |
| Gate guards use `process.argv[1]?.includes(...)` substring match | Cosmetic; consistent across all five gate scripts; changing it touches 5 files for zero behavior change |
| Duplicate-slug reporting collapses occurrence counts (3× → 1 entry) | Correct per spec; counts simply aren't surfaced |
| `page-index.test.ts` self-referential city-count term | Redundant, not untrustworthy — counts are pinned by hardcoded literals in a separate test |
| `--color-stone` shares a name with Tailwind's built-in `stone-*` scale | No collision (bare `stone` vs `stone-500`); note for component authors |
| `next.config.ts` security headers were unspecified scope | Reasonable and modeled on the sibling project; confirm as standing convention |

---

## Not yet built (Wave 0A scope boundary)

- **Lead pipeline** (spec §12) — `resend` is a declared dependency but no
  `/api/*` route exists. Needs the API-key startup assertion and the CI
  lead-delivery smoke test: two sibling projects lost leads silently for two
  weeks after a key rotation, and a third only ever `console.log`ged them.
- **Static pages** — `/how-it-works`, `/about`, `/contact`, `/faq`. Add each to
  `STATIC_PATHS` in `src/app/sitemap.ts` **as the page ships**; the sitemap test
  fails if you add a path before the route exists.
- **JSON-LD schema builders**, internal-linking engine, anchor-text rotation,
  offer math, net-proceeds calculator — spec §3 anticipates these; see
  `docs/ENGINE-PROVENANCE.md` for what was actually ported (much less than §3
  implies).
- **All page content** — every silo in spec §5 beyond geography, and the 40-page
  state-line silo in §6 that is the site's actual differentiator.
