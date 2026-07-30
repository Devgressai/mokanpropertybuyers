# MoKan Property Buyers

Cash property buyer site covering a 100-mile radius around Kansas City,
spanning both Missouri and Kansas. The footprint is computed from US Census
data: 53 counties, 144 cities, 199 generated geographic pages (state, county,
and city tiers). The authority for every decision here — market definition,
IA, slug policy, indexation rules, quality gates, known blockers — is:

**`docs/superpowers/specs/2026-07-29-mokan-property-buyers-design.md`**

Read it before changing geography, indexation, or gate logic. This README is
orientation, not a replacement for that spec.

## Generated code — do not hand-edit

`src/data/geography.ts` is **generated**, not hand-written. Never edit it
directly — regenerate it:

```
npm run codegen:geography
```

CI fails the build if the checked-in file drifts from what codegen would
produce, so a stale hand-edit gets caught, not shipped.

**Two copies of `slugifyPlace` exist by design** — one in
`scripts/codegen-geography.mts`, one emitted into the generated
`src/data/geography.ts` so the generated file is self-contained and doesn't
import the codegen script at runtime. They must stay byte-identical. The CI
drift check is the only thing that catches a one-sided edit; if the two
diverge, you've reintroduced the exact slug-collision class (Kansas City,
Johnson County, and others straddling the state line) this repo was built to
prevent.

## Nothing is indexed yet — that is correct

`src/data/content-registry.ts` is empty. With no hand-written content
registered, all 199 geographic pages render a fallback body and carry
`noindex, follow` (see `src/lib/seo/indexation.ts`). A page only earns
`index, follow` once it carries **≥600 words** of real body copy
(`MIN_INDEXABLE_WORDS`). `follow` is always `true` regardless of indexation
status, so un-indexed pages still pass link equity to whatever they link to.
This is the intended state for Wave 0A — do not seed the registry to make
gates "pass" with placeholder text.

## Citation enforcement is not live — read this before touching legal content

`src/types/legal.ts` defines `LegalClaim`, and
`scripts/check-state-claims.mts` defines `claimIsCited()`, but **`ClaimAudit`
has no `missingCitation` field and `auditClaims()` never calls
`claimIsCited()`.** The two look wired together; they are not. The
state-claims gate today only catches *unlabeled MO/KS blends* (a paragraph
that names both states, asserts law, and has no `[MO]`/`[KS]` label) — it
does not check that any `LegalClaim` actually carries a citation. Anyone
adding real `LegalClaim` records must wire `claimIsCited` into `auditClaims`
first, or citations can silently go unchecked.

## Quality gates — what a green run proves today

Five gates, run via `npm run check:all`:

| Gate | What it checks | Has real content to exercise it yet? |
|---|---|---|
| `check:slugs` | Every geographic slug is globally unique and state-scoped (`-mo`/`-ks`) | Yes — the real 199-page graph |
| `check:pages` | No duplicate slugs/titles; every parent/child slug reference resolves | Yes — the real 199-page graph |
| `check:state-claims` | No unlabeled MO/KS legal blends in page body copy | No — content registry is empty |
| `check:assets` | Every hardcoded asset path (schema, JSON-LD, etc.) exists under `public/` | No — nothing references assets yet |
| `check:links` | Every indexable page has an inbound link beyond the automatic parent/child listing | No — nothing is indexable yet |

All five are wired correctly and pass, but only `check:slugs` and
`check:pages` are actually exercising real data. The other three are gates
waiting for content — a green run does not yet mean "no legal blends" or "no
orphan pages," it means "nothing to check was found wrong yet."

## Commands

```
npm run codegen:geography   # regenerate src/data/geography.ts from data/footprint.json
npm test                    # vitest run
npm run check:all           # typecheck + test + all five gates
npx next lint                # zero warnings expected
```

**The build is never run locally.** `npm run build` / `next build` are not
part of the local workflow — CI is the build gate. Push and check CI status
rather than building on your machine.

## Routes

Only two routes exist in the app today:

- `src/app/page.tsx` — the homepage. It's an **intentional placeholder**, a
  static App Router route, and is not part of `seoPages`.
- `src/app/(geo)/[slug]/page.tsx` — the single dynamic route that renders all
  199 generated geographic pages from `seoPages`.

`src/app/sitemap.ts`'s `STATIC_PATHS` list must only ever contain paths with
a route that exists today; `tests/sitemap.test.ts` enforces this against the
real filesystem.

## NAP is unset on purpose

`src/lib/site.ts` holds visibly-empty placeholders (phone, address, legal
entity) rather than plausible-looking fake values — a fake-but-realistic
value is worse than an obviously-unset one because it can ship silently.
`src/data/trust.ts` ships empty arrays for the same reason. **Nothing here
may be invented.** Per spec §13, launch is blocked on:

1. Registering `mokanpropertybuyers.com`
2. Legal entity name / state registration
3. Phone number
4. Business address
5. A new Resend API key (not a pre-rotation sibling key)

Verified trust figures (or explicit confirmation to ship without them) and a
Google Business Profile matter for authority but do not block launch.
