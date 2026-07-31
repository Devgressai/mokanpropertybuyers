# Wave 0B Prerequisites and Carry-Forwards

> **STATUS 2026-07-30 — Wave 0B is complete.** Items 1 and 2 below are CLOSED
> (see the strikethroughs). The state-line silo shipped: 14 anchor pages plus 2
> deep state hubs, 194 paragraphs, 48 verified claims, 0 unlabeled MO/KS blends,
> 0 uncited claims. 14 of 213 pages are indexed. The lead pipeline shipped too.
> Everything still open below is Wave 0C's inheritance.

Everything Wave 0A deliberately left undone, and the traps waiting for whoever
picks this up. Promoted out of the SDD progress ledger — that file lives in
gitignored scratch and `git clean -fdx` would erase it.

Wave 0A shipped the foundation: 199 geographic pages generated from Census data,
five gates, 83 tests, CI green. No page content exists yet, and nothing is
indexed. See `README.md` for orientation and the design spec for the plan.

---

## Blocking — do these BEFORE the work they gate

### 1. ~~Wire `claimIsCited` before writing a single legal claim~~ — CLOSED (commit 51211ce)

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

### 2. ~~Add content-slug collision detection before the SECOND content map~~ — CLOSED (commit 7b21066)

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

### 4. ~~Extend `placeLabel()` when adding any new H1 shape~~ — CLOSED for stateLine (commit f913c9d, explicit `label` field). Still applies to any FUTURE H1 shape.

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

## Wave 0C — waiting on ledger coverage, not on code

Task 7.5 added a second indexation gate for `stateLine` pages: clearing the
600-word floor is necessary but not sufficient — the page also needs at least
one entry in its `claims` array (`isIndexable()` in
`src/lib/seo/indexation.ts`). A `stateLine` page's title promises a named
legal comparison; word count alone doesn't prove the comparison happened.
State/county/city pages are unaffected — their titles describe a place, not a
legal comparison, so they keep the word-count-only rule.

~~Two pages currently sit below that bar, both `noindex, follow` (reachable,
linked, passing link equity — just not indexed):~~ **CLOSED 2026-07-30.** Both
pages gained verified claims (see "Wave 0C inheritance" below) and now index.

**No code change was needed to bring these into the index.** Adding a verified
citation to `src/data/legal-citations.ts` for either topic in either state,
plus a `claims: [...]` entry naming it on the corresponding page in
`src/data/state-line-content-transaction.ts`, was enough for `isIndexable()` to
pick it up automatically. Do not lower the claims-gate bar to work around a
future wait like this one — see the comment above `isTopicallyIndexable()` in
`indexation.ts` for why.

Indexable count: 16 of 213 pages (was 12 immediately after this gate first
landed, 14 before that; the two pages above are back in). `check:links`
confirms 0 orphans among the 16.

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


---

## Wave 0C inheritance — added 2026-07-30

### Ledger gaps that kept two pages out of the index — CLOSED 2026-07-30

`contract-for-deed-missouri-vs-kansas` and `seller-disclosure-missouri-vs-kansas`
were written, linked, and `noindex, follow`, waiting on ledger coverage. All
three of the gaps below were closed in a single pass; see
`docs/CITATION-LEDGER.md` for the verification detail and
`src/data/state-line-content-transaction.ts`'s file-level comment for the
resulting content. Both pages now index.

| Needed claim | Where it was found | Result |
|---|---|---|
| Kansas tax-sale redemption | K.S.A. 79-2803; K.S.A. 79-2401a | Verified. Redemption only *before* the sale, none after — the mirror image of the 12-month post-sale window on a Kansas mortgage foreclosure. |
| Contract-for-deed default/forfeiture, Kansas | K.S.A. 58-5201 to 58-5204 | Verified. A real, dedicated Kansas Contract for Deed Act, effective 2024-07-01 — new law, not previously on anyone's radar. |
| Contract-for-deed default/forfeiture, Missouri | RSMo ch. 443 / case law | **Checked and found not to exist.** See the near-miss below — do not re-add "RSMo 442.700-442.746" without re-verifying against `revisor.mo.gov`'s live chapter index first. |
| Seller disclosure duty, Missouri | RSMo ch. 339; Mo. real-estate commission rules | No general disclosure-form statute exists. Found instead: RSMo 442.606 (meth production), RSMo 260.213 (solid-waste/demolition-landfill site), and RSMo 407.020/407.010 (Merchandising Practices Act — concealment ban, "merchandise" includes real estate). |
| Seller disclosure duty, Kansas | K.S.A. ch. 58; KREC rules | No general disclosure-form statute exists either. Found instead: K.S.A. 58-3078a (radon), K.S.A. 12-6a20 (special assessments), and K.S.A. 58-30,106 — a *licensee's* material-fact duty, not a seller's. |

### Near-miss: "RSMo 442.700-442.746" is not enacted Missouri law

Multiple secondary sources (legal-forms sites, a REIA blog, and search-engine
summaries drawing on them) describe a Missouri "Contract for Deed Act" at RSMo
442.700-442.746, matching two real bills: HB 296 (introduced 2011) and SB 555
(pre-filed 2012, identical text). **Neither bill's numbering appears in current
Missouri law.** `revisor.mo.gov`'s live Chapter 442 section index runs
442.600 → 442.606 (psychologically-impacted-property and meth disclosure) and
then jumps straight to 442.920 (the unrelated Missouri Residential Sale
Leaseback Protection Act) — there is no 442.700 through 442.746 gap in between.
Confirmed by fetching `OneChapter.aspx?chapter=442` directly, not by inference.
Anyone who cites "RSMo 442.700-442.746" going forward is repeating a bill that
appears never to have passed — re-verify against the live chapter index before
trusting any source that names it, including this document if enough time has
passed that the chapter could have changed again.

### The remaining ~26 silo pages

Spec §6 anticipates 40 silo pages; 14 anchors shipped. The rest are per-state
transactional variants (selling an inherited house in Missouri, selling in
foreclosure in Kansas, and so on). They inherit the same content contract.

### Every Missouri citation needs its effective date re-checked

`revisor.mo.gov` serves amended text **ahead of its effective date**. RSMo 513.475
renders "forty thousand dollars" today while $15,000 is the figure in force until
2027-01-01. **On 2027-01-01 the `mo-homestead` claim and its `pendingChange` must
swap** — the pending figure becomes current. Nothing automates that. Anyone
touching the homestead pages after January must check.

### Parallel agents need real isolation

Two implementers were run concurrently in this shared checkout on disjoint file
lists. It still broke: `tsc` and `vitest` are checkout-global, so one agent's
in-progress code failed the other's verification. Disjoint files are not enough —
use a git worktree per agent, or run implementers sequentially.

---

## Deliberate exclusion — three cities whose county is outside the footprint

Added 2026-07-31. **This is a decision, not an oversight. Do not "fix" it.**

`scripts/build-footprint.py` filters **counties** and **places** by distance
**independently**. A place can therefore sit inside the 100-mile radius while the
county it actually belongs to sits outside it. Three cities are in that position:

| City | Population | Actually in | Modeled? |
|---|---:|---|---|
| El Dorado Springs, MO | 3,595 | Cedar County | no |
| Stover, MO | 1,049 | Morgan County | no |
| New Franklin, MO | 1,017 | Howard County | no |

`scripts/codegen-geography.mts` **drops** them rather than assigning a parent.
An earlier version fell back to the nearest modeled county, which put a false
jurisdiction in the data — the record said "El Dorado Springs, Vernon County",
and the first authoring pass to reach that page would have published it. On a
site whose entire premise is that getting the jurisdiction right matters, a
fallback parent is worse than no page.

A city whose county is unmodeled is a city we cannot write truthful county-level
content for: no courthouse, no county tax-sale holding period, no county hub to
link, no county page to name.

**Counts follow from this:** 141 cities (not 144), **196** geographic slugs
(2 states + 53 counties + 141 cities), 210 total pages. Tests assert these
numbers with the reasoning inline.

The codegen prints each drop by name at generation time, so the exclusion is
visible in the build output rather than silent.

**To include them instead**, model Cedar, Morgan and Howard counties — but note
their centroids are outside the 100-mile radius the site claims to serve, so
that widens the footprint's meaning for 5,661 people at the far edge. Dropping
was judged the better trade.

### The underlying bug worth knowing about

Before 2026-07-31, cities were assigned to counties by **nearest county
centroid**, which is wrong near a border. Audited against the Census
place-to-county crosswalk, **32 of 144 cities carried a county they are not in**
— most damagingly eight Johnson County, Kansas cities (Shawnee, Prairie Village,
Merriam, Mission, Roeland Park, Fairway, Mission Hills, Westwood) all assigned to
Wyandotte County, because Johnson's centroid is farther from its own northeastern
suburbs than Wyandotte's is.

`sell-my-house-fast-shawnee-ks` had already shipped saying Wyandotte County — a
live factual error on a real page. Unwinding it required correcting six
published pages (Shawnee and Kansas City, KS's city pages; the Wyandotte,
Johnson, Clay, and Platte County hub pages). County assignment is now
constrained to the crosswalk, with nearest-centroid used only to break ties
among counties a place genuinely touches, and `CityDef.countiesAll` records
every county a place spans.
