# Engine Provenance

Required by design spec §3 (Fork Strategy). Records which files in this repo
came from `~/sierrapropertybuyers` (SPB, read-only reference) and how much
they were changed, so future work can tell an original file from a port
without guessing, and so improvements can be cherry-picked deliberately in
either direction.

**Headline finding, stated plainly because §3 is optimistic about it:** §3
estimates "≈19,500 lines inherited" — the internal-linking engine, anchor-text
rotation, glossary link graph, guide-relevance derivation, JSON-LD schema
builders, offer math, the net-proceeds calculator, and the lead API. **None of
that exists in this repo yet.** Wave 0A built the geography layer only (states,
counties, cities, the slug/state-claims/link/asset/page gates, and the routes
that render them). The lead pipeline, schema builders, and every content silo
beyond geography are out of scope for Wave 0A — see the plan's spec-coverage
table and Task 9. This document covers what Wave 0A (Tasks 1–8) actually did,
not what §3's fork strategy anticipates doing eventually.

## What was actually ported

| File | SPB source | Similarity | Notes |
|---|---|---|---|
| `scripts/check-assets.mts` | `scripts/check-assets.mjs` | **Close port.** Same idea, same regex shape, same public/-existence check. | Rewritten in TypeScript; the extraction and existence-check logic was split into two pure, independently testable functions (`extractAssetRefs`, `findMissingAssets`) so known-bad input could be unit-tested — SPB's version is a single top-to-bottom script with no exports. Added comment-stripping, which SPB's version does not do. |
| `scripts/check-pages.mts` | `scripts/check-pages.mjs` | **Loose port — same checks, different entity set.** | Same three assertions (no duplicate slugs, no duplicate titles, every reference resolves) and the same "print counts by type" tail. SPB's version spans five entity kinds (seoPages, combos, guides, blog); this repo has exactly one (`seoPages`), because combos/guides/blog don't exist here. Rewritten as pure `analyzePages()` + `auditPages()` rather than a flat script. |
| `scripts/check-links.mts` | `scripts/check-orphans-all.ts` | **Concept only, not a code port.** The ORPHAN vs. HUB-ONLY distinction is taken from SPB's script. | SPB's link graph is built from glossary term links, guide-relevance links, combo cross-links, and blog city-matching — none of which exist in this repo. This repo's graph is built from scratch from the three relationships the geography page index actually has: `parentSlug`, `childSlugs`, `nearbySlugs`. Nothing was copied; the shape of the finding (two categories, not one) was. |
| Gate script shape (`auditX()` + `main()` + `process.argv[1]?.includes(...)` direct-execution guard) | `scripts/check-pages.mjs`, `check-assets.mjs`, `check-orphans-all.ts` | **Pattern, not code.** | Established in Tasks 3 and 6 (`check-slugs.mts`, `check-state-claims.mts`) before this task, and followed here for consistency across all five gates. |
| Project scaffold conventions (script names in `package.json`, CI job shape, `next lint`/`tsc --noEmit` as separate steps) | SPB's `package.json`, `.github/` (SPB has none — see below) | **Structure only.** | Task 1 modeled the scaffold on SPB's conventions where SPB had them (script names, tooling choices) and added what SPB lacks: SPB has no CI at all. This repo has CI from commit one specifically because SPB's absence of it was identified as a risk (spec §3, §11). |

## What was written fresh, not ported

Everything else in `src/`, despite surface-level resemblance to SPB's file
layout (a `pageIndex.ts`, a `[slug]/page.tsx`, a `components/seo/` folder):

- `src/data/geography.ts` — generated from Census data unique to this market
  (Task 2). SPB has no equivalent; its counties/cities are hand-authored.
- `src/lib/seo/pageIndex.ts` — built against `SeoPage`, a type with no
  `pillarSlug`, no combo fields, no situation/property-type/financing
  variants. SPB's `pageIndex.ts` merges five page kinds; this one merges one
  (geography), keyed to two states rather than one.
- `src/lib/seo/indexation.ts` — the word-count-gated `isIndexable()` concept
  doesn't exist in SPB in this form; SPB gates indexation per-content-type
  with bespoke `isClusterIndexable()` logic (see `check-orphans-all.ts` line
  41 above). This repo's version is simpler and new.
- `src/app/(geo)/[slug]/page.tsx`, `StatePage.tsx`, `CountyPage.tsx`,
  `CityPage.tsx`, `PageShell.tsx`, `Breadcrumbs.tsx`, `PlaceLinkList.tsx`,
  `ParentLink.tsx`, `PageBody.tsx` — three-tier hierarchy components written
  fresh for the state/county/city shape. SPB's `(seo)/[slug]/page.tsx`
  switches over ten page types; this repo's switches over three.
- `src/lib/seo/placeCopy.ts`, `src/data/content-registry.ts`,
  `src/data/trust.ts`, `src/lib/site.ts` — no SPB equivalent.
- `scripts/codegen-geography.mts`, `scripts/check-slugs.mts`,
  `scripts/check-state-claims.mts` — new gates for this market's specific
  failure mode (state-line law divergence), built in Tasks 2, 3, and 6. SPB
  has no state line and no equivalent risk.
- `src/app/sitemap.ts`, `src/app/robots.ts` — the sitemap-filtered-by-
  isIndexable() pattern matches SPB's `sitemap.ts` in spirit (both filter to
  indexable entries) but the entry set, priority scheme, and static-path list
  are specific to this repo and were written against this repo's own
  `seoPages`/`isIndexable`, not copied from SPB's file.

## Not yet built (spec §11/§12 gaps, tracked for later waves)

Spec §11 lists `check:glossary`, `check:cannibalization`, `check:a11y`, and
`gen:lastmod` as gates "ported from SPB." **None of these exist in this repo.**
They depend on content (a glossary, rendered body copy dense enough to compare
for cannibalization, real markup to audit) that doesn't exist yet with an
empty content registry. Building them now would mean either porting dead code
that checks nothing, or faking fixtures to make them look busy — both worse
than not having them. They belong in the wave that adds the content they
check.

The lead pipeline (spec §12: `/api/contact`, Resend, rate limiting, honeypot,
the CI lead-delivery smoke test) also does not exist in this repo. It is
independent of geography and is deferred to Task 9 per the plan's self-review.
