# MoKan Property Buyers — Design Spec

**Date:** 2026-07-29
**Status:** Awaiting user review
**Domain:** `mokanpropertybuyers.com` (verified available by whois 2026-07-29 — **register before scaffolding**)
**Repo:** `Devgressai/mokanpropertybuyers`, branch `main` → Vercel (user-managed deploy)

---

## 1. What This Is

A direct property-buyer website for **MoKan Property Buyers** — a new, standalone brand
serving a 100-mile radius around Kansas City, spanning both Missouri and Kansas.

The company buys, in every condition:

- Houses — distressed, inherited, vacant, tenant-occupied, storm-damaged, code-cited
- Land, buildable and unbuildable lots, rural acreage, and farm ground
- Small multifamily (duplex through fourplex) and small commercial
- Creative-financing acquisitions — subject-to, owner financing, assumable loans, contract for deed

"MoKan" is the authentic regional term for the bi-state Kansas City area (MoKan Regional
Council of Governments, MoKan Dragway). The name *is* the footprint, which is why it
reads correctly in Olathe, Independence, Topeka, and Sedalia alike.

### Relationship to Sierra Property Buyers

MoKan is a **hard fork of the SPB engine with a completely new content layer**. It shares
no brand, no entity, no trust data, and no copy with SPB. See §3.

---

## 2. Market Definition — Computed, Not Guessed

The footprint was derived from public data, not written from memory:

- **Source:** US Census Gazetteer 2023 (counties + places, national files) and Census
  Population Estimates `sub-est2023.csv` / `co-est2023-alldata.csv`
- **Method:** haversine distance from downtown Kansas City (39.0997, −94.5786), radius ≤ 100 mi
- **Reproducible via** `scripts/build-footprint.py` → `data/footprint.json` (both committed)

### Results

| Measure | Value |
|---|---|
| Counties in radius | **53** (Missouri 31 · Kansas 22) |
| Incorporated places in radius | **509** (456 matched to population data) |
| Total population served | **3,168,509** |
| Missouri side | 1,728,957 (54.6%) |
| Kansas side | 1,439,552 (45.4%) |

The near-even population split is the strongest argument for the two-state brand: this is
not a Missouri site with some Kansas pages bolted on. It is one market bisected by a
state line.

### County distribution by distance band

| Band | Counties | Places |
|---|---|---|
| 0–25 mi | 5 | 77 |
| 25–50 mi | 11 | 104 |
| 50–75 mi | 18 | 150 |
| 75–100 mi | 19 | 178 |

### Places by population tier

| Tier | Population | Places | Cumulative |
|---|---|---|---|
| T1 | ≥ 50,000 | 12 | 12 |
| T2 | 15,000–49,999 | 14 | 26 |
| T3 | 5,000–14,999 | 37 | 63 |
| T4 | 2,000–4,999 | 38 | 101 |
| T5 | 1,000–1,999 | 43 | 144 |
| T6 | < 1,000 | 312 | 456 |

**City pages are built for T1–T5 (144 places).** T6 places (312, all under 1,000 people)
are deliberately excluded — a page for a 200-person village is the definition of thin,
scaled content, and they are better served by their county hub. This exclusion is a
design decision, not an oversight, and is recorded here so it is not "fixed" later.

### Anchor cities

Kansas City MO (510,704) · Overland Park (197,089) · Kansas City KS (152,933) ·
Olathe (147,461) · Topeka (125,475) · Independence (120,922) · Lee's Summit (104,184) ·
Lawrence (96,207) · St. Joseph (70,634) · Shawnee (69,417) · Blue Springs (60,539) ·
Lenexa (58,536)

---

## 3. Fork Strategy

Three options were considered:

| | Approach | Verdict |
|---|---|---|
| A | Hard fork, gut the data layer | Simple, zero coupling; engine fixes never propagate |
| B | Extract a shared engine package consumed by both sites | Cleanest long-term, but requires refactoring SPB — a live 1,136-page site **with no CI**. Rejected as unacceptable risk to a production property. |
| **C** | **Hard fork + `docs/ENGINE-PROVENANCE.md`** | **Selected.** Same isolation as A, plus a manifest recording which files were taken from SPB unmodified, so improvements can be cherry-picked deliberately in either direction. |

### What is inherited (≈19,500 lines)

Components, route handlers, and SEO libraries: the internal-linking engine, deterministic
anchor-text rotation, glossary link graph, guide-relevance derivation, JSON-LD schema
builders, the depth-layer content merge pattern, offer math, the net-proceeds calculator,
the lead API with escaping/rate-limiting/honeypot, and all six content-quality gates.

### What is discarded (≈83,000 lines)

Every content data file. The SPB corpus contains **4,025 references to "California" and
908 references to California-only law** — Proposition 19 reassessment, the Williamson Act,
CCP 580e, nonjudicial trustee sale with no redemption, CZU fire recovery, defensible-space
requirements, coastal corridor geography. Missouri and Kansas contradict nearly all of it.
No content is carried over, adapted, or find-and-replaced. It is authored fresh.

### Repository policy

- New GitHub repo `Devgressai/mokanpropertybuyers`, push directly to `main`
- **I push to GitHub only.** Vercel project creation, environment variables, and DNS are
  the user's, per standing preference.
- **CI from commit one** (see §11). SPB has no CI and PineWood has never compiled; this
  repo will not repeat that. CI is the build gate — nothing is built locally.

---

## 4. Information Architecture

```
                              [ HOME ]
        ┌──────────────────────┼──────────────────────┐
   /missouri               /kansas            /kansas-city-metro
        │                      │                (spans the line)
   MO counties (31)       KS counties (22)
        │                      │
     cities                 cities
        └──────────┬───────────┘
                   │
   Situations · Property types · Creative financing · Guides · Glossary
                   │
        ★ THE STATE-LINE SILO — the moat ★
```

**State hubs sit above counties.** Every claim about foreclosure timelines, redemption
rights, probate procedure, disclosure duties, homestead exemptions, or assessment ratios
lives under `/missouri` or `/kansas` and is inherited downward. Nothing blends the two
states in one unlabeled block. This is both an SEO structure and a correctness mechanism.

`/kansas-city-metro` is the one hub that deliberately spans both states, because the metro
genuinely does — and that page is where the "which side of State Line Road are you on"
question gets answered.

---

## 5. Page Inventory — Full Extent

| Silo | Routes | Notes |
|---|---|---|
| Static + core | 14 | home, how-it-works, about, contact, faq, reviews, legal, thank-you, calculator, four silo indexes |
| State hubs | 2 | `/missouri`, `/kansas` |
| Metro hub | 1 | `/kansas-city-metro` |
| Region hubs | 9 | Northland · Eastern Jackson · Cass & South KC · Johnson County KS · Wyandotte/KCK · Northeast Kansas · Northwest Missouri · West-Central Missouri · Southeast Kansas |
| County hubs | 53 | every county in the radius |
| City pages | 144 | T1–T5 places (≥1,000 population) |
| Situations | 48 | see §5.1 |
| Property types | 52 | houses, land, lots, acreage, farm ground, multifamily, small commercial, difficult property |
| Creative financing | 30 | subject-to, owner finance, assumable, wraparound, lease option, **contract for deed** |
| County × topic matrix | 120 | 30 counties (pop ≥15,000) × 4 topics |
| City × situation combos | 450 | 30 cities × 15 situations, content-gated |
| Guides | 100 | educational, top-of-funnel |
| Blog | 110 | |
| Glossary | 45 | state-tagged where law diverges |
| **State-line silo** | **40** | §6 — the differentiator |
| **Total** | **1,218** | parity with SPB's 1,136 |

**Scope note:** 1,218 routes is far too large for one implementation plan. This spec
yields a **series** of plans, one per wave in §9, each independently shippable and each
gated on CI green before the next begins. Wave 0 (scaffold, engine fork, state hubs, and
the state-line silo) is the first plan and the only one that needs to be written now.

### 5.1 Situations (48) — market-specific, not inherited

The situation set is rebuilt for this market. Genuinely local entries include:

- **Tornado, hail, and straight-line wind damage** (replaces SPB's wildfire cluster)
- **Foundation heave and settling on expansive clay** — endemic across the metro
- **Methamphetamine contamination disclosure** — a real and under-served Missouri issue
- **Flood damage** — Missouri, Kaw, Blue, and Little Blue river bottoms
- **Radon mitigation** — both states sit in EPA Zone 1
- **Tax-delinquent property** — Missouri collector's deed vs Kansas judicial tax foreclosure
- **Vacant and abandoned property** — including the KC land bank pathway
- Plus the standard set: inherited/probate, divorce, behind on payments, bad tenants,
  hoarder conditions, code violations, liens, job relocation, downsizing, out-of-state
  owner, tired landlord, structural damage, medical debt, condemned property

---

## 6. The State-Line Silo — The Moat (40 pages)

This is the section that justifies the build. A California site cannot structurally have
it, and no local competitor has written it. Every page here is genuinely useful and
genuinely differentiated.

### Anchor pages

| Page | Substance |
|---|---|
| **Which side of State Line Road is your house on?** | The metro's defining quirk, turned into a decision tool |
| **Missouri foreclosure vs Kansas foreclosure** | MO is nonjudicial via deed of trust and moves in weeks; **KS is judicial** and moves in months |
| **Kansas right of redemption** | Generally 12 months, shortened to 3 when less than one-third of the debt is paid — a Kansas seller has options a Missouri seller does not |
| **Missouri trustee sale timeline** | Deed of trust, trustee, statutory publication period |
| **Homestead exemptions compared** | **Kansas: unlimited in value**, 160 rural acres or 1 urban acre (Kan. Const. Art. 15 §9). **Missouri: $15,000** (RSMo 513.475). Decisive for a distressed seller and almost never explained locally. |
| **Probate compared** | MO independent vs supervised administration; KS simplified estate procedure |
| **Assessment ratios and property tax** | MO residential 19% vs KS residential 11.5% |
| **The Jackson County reassessment crisis** | The 2023 valuation surge, State Tax Commission response, and the appeal path |
| **Transfer taxes** | Missouri's constitutional prohibition (Mo. Const. Art. X §25); Kansas's repealed mortgage registration tax |
| **Tax sales compared** | Missouri collector's deed and its redemption period vs Kansas judicial tax foreclosure |
| **Deed of trust vs mortgage** | Why the security instrument changes the sale mechanics |
| **Contract for deed** | Regulated differently on each side of the line |
| **Seller disclosure duties compared** | |
| **The Kansas City earnings tax** | Why it factors into cross-line moves |

Plus per-state versions of the high-intent transactional pages (selling an inherited house,
selling in foreclosure, selling with a lien) so the Missouri and Kansas answers never share
a page.

### Legal-content rule (binding)

Every legal claim must (a) declare which state it applies to, (b) carry a statute or
official-source citation, and (c) be verified against that source at authoring time.
Where a claim cannot be verified, the page says so and links the official source rather
than asserting. This rule is mechanically enforced — see §11.

---

## 7. Slug and Collision Policy

The computed footprint surfaced **7 place-name collisions and 3 county-name collisions**
across the state line:

| Name | Missouri | Kansas |
|---|---|---|
| **Kansas City** | **510,704** | **152,933** |
| **Johnson County** | 54,962 | **622,237** |
| **Jackson County** | **718,560** | 13,368 |
| Linn County | 11,791 | 9,860 |
| Richmond | 5,958 | 441 |
| Edgerton | 605 | 1,718 |
| Mound City | 1,012 | 645 |
| Alma | 394 | 822 |
| Waverly | 801 | 559 |
| Easton | 224 | 211 |

SPB shipped a bug of exactly this class — two real California towns named Live Oak shared
one slug and the Map silently dropped one. Here the stakes are far higher: the two largest
colliding entities are Kansas City and Johnson County, which together account for most of
the market.

**Policy:** every geographic slug is state-scoped, unconditionally and without exception —
`kansas-city-mo` / `kansas-city-ks`, `johnson-county-ks` / `johnson-county-mo`. No
"the big one gets the bare slug" special-casing. A gate enforces uniqueness at build time
(§11) so this cannot regress.

---

## 8. Content Authoring Rules

Carried forward from lessons SPB learned expensively:

1. **No fabricated proof.** `trust.ts` ships **empty** — no review count, no rating, no
   homes-purchased figure, no dollars-paid, no years-in-business — until the user supplies
   verified numbers. Components render these only when populated, so an empty file ships
   nothing false.
2. **No case studies.** Not even labeled "illustrative." SPB had to rewrite eight pages
   whose "representative transaction" sections read as fabricated. This site will not
   create that debt.
3. **No invented market data.** No medians, appreciation rates, or days-on-market unless
   sourced and linked.
4. **No guarantee language.** "No financing contingency," never "guaranteed close."
5. **Say when listing is better.** Every money page carries the honest counter-case, as
   SPB's `OfferHonesty` component does.
6. **Anti-duplication discipline.** After every authoring batch: 8-word shingle audit,
   cross-slug 160-character duplicate-paragraph check, and per-slug hash rotation across
   phrasing variants where a shared fact must appear on many pages. Real place-facts are
   never varied — only phrasing.
7. **US spelling**, enforced by gate.

---

## 9. Indexation — Wave Publication

**This is the most important strategic decision in the spec.**

SPB's Google Search Console data was unambiguous: **9 clicks and 5,899 impressions across
748 indexed pages**, average position ~40. The bottleneck was off-page authority, not page
count. Publishing 800+ pages on a brand-new domain reproduces a known failure mode and
risks a site-wide scaled-content assessment.

So MoKan builds the full architecture but **gates indexation by depth**. Every page exists
and is reachable; a page carries `index, follow` only once it has hand-written content
meeting a word and uniqueness floor. Everything else is `noindex, follow` — crawlable,
link-equity-passing, invisible to the index.

| Wave | Adds | Cumulative indexed |
|---|---|---|
| 0 — Foundation | static 14, state hubs 2, metro 1, regions 9, top 20 counties, top 60 cities, 24 core situations, **the full state-line silo 40** | **170** |
| 1 — Coverage | remaining 33 counties, cities to 144 (+84), situations to 48 (+24), property types 52, financing 30 | **393** |
| 2 — Authority | guides 100, glossary 45, county × topic 120 | **658** |
| 3 — Long tail | blog 110, indexed combo subset 120 | **888** |

At full maturity: **1,218 routes, 888 indexed, 330 `noindex, follow`** — and that 330 is
exactly the un-enriched share of the 450 city × situation combos, which is precisely the
page class SPB had to retroactively noindex after Search Console showed zero impressions.
Here they start gated rather than getting rescued later.

The state-line silo ships in **Wave 0**, not last. It is the reason the site deserves to
rank, and it is what earns links — which is the actual bottleneck.

Waves 1–3 are gated on evidence, not calendar: each advances only when the prior wave
shows impressions growing in Search Console. If Wave 0 does not gain traction, adding 500
more pages will not fix it, and the correct response is off-page work.

---

## 10. Brand and Design System

A distinct identity from SPB — river, limestone, and prairie clay rather than SPB's pine
and brass.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--mk-ink` | `#14181B` | Headlines, dark sections, footer | 15.83:1 on limestone |
| `--mk-river` | `#1D4E63` | Primary surface and buttons | 8.02:1 on limestone |
| `--mk-river-deep` | `#12333F` | Deep sections | 13.37:1 with white |
| `--mk-limestone` | `#F4F1EA` | Warm page background — KC bluff limestone | — |
| `--mk-stone` | `#DED8CC` | Borders, secondary surfaces | border token, not text |
| `--mk-slate` | `#5C6670` | Body and secondary text | 5.19:1 on limestone |
| `--mk-clay` | `#B4552D` | CTA accent — Missouri brick and river clay | 4.91:1 on white; **large text and buttons only** on limestone (4.35:1) |
| `--mk-clay-ink` | `#8F3F1E` | Small accent text on light surfaces | 6.42:1 on limestone |

All pairs validated by relative-luminance computation on 2026-07-29. Fourteen of sixteen
tested pairs pass WCAG AA for normal text; the two that do not are correct by design and
documented above — the same accent discipline SPB uses with brass/brass-ink.

**Accent scarcity:** at most one clay element per viewport, marking the single most
important action. River carries structure.

Unlike SPB, this site launches on **one scale** — there is no legacy palette to migrate,
so no mixed-token debt.

---

## 11. Quality Gates and CI

Six gates ported from SPB, plus two built for this market's specific failure modes.

| Gate | Asserts |
|---|---|
| `check:pages` | every declared route resolves and renders |
| `check:assets` | every `"/path.ext"` string literal in `src` exists under `public/` |
| `check:links` | no orphans; reports ORPHAN and HUB-ONLY separately |
| `check:glossary` | glossary link graph is bidirectional and fully reachable |
| `check:cannibalization` | reports H1-similarity pairs competing for one query |
| `check:a11y` | audits rendered markup |
| **`check:state-claims`** | **NEW.** Every page making a legal claim declares a state; no Missouri-only and Kansas-only claim appear in the same block unlabeled; flagged statute references resolve to a citation. This site's most likely way to be wrong is confidently applying Missouri law to a Kansas house. |
| **`check:slugs`** | **NEW.** Every geographic slug is state-scoped and globally unique. Makes the §7 collision class structurally impossible. |
| `gen:lastmod` | per-entry git-blame snapshot, committed (Vercel shallow-clones, so build-time git reports one date for every file) |

**GitHub Actions on every push:** `tsc --noEmit` → lint → all gates → `next build`.
This closes the gap that has bitten three sibling projects.

---

## 12. Lead Pipeline

Ported from SPB: `/api/contact` with HTML escaping, CSRF origin check, in-memory rate
limiting (5/IP/hour), honeypot, and input validation. Resend for delivery. Security
headers: HSTS, Permissions-Policy, X-Frame-Options, X-Content-Type-Options.

**Two hard lessons applied:**

- IronCrest and Boise Bath both lost leads silently for two weeks after a Resend key
  rotation. This site gets a **startup assertion that the API key is present** and a
  **lead-delivery smoke test in CI**, so a missing key fails loudly.
- Sacramento Bath's quote endpoint only ever `console.log`ged leads. The CI smoke test
  covers the full path, not just the handler's return value.

CTAs anchor to the on-page form (`#offer-form`) where one exists, and to `/contact`
otherwise — SPB shipped 22 CTAs pointing at `/#hero`, navigating visitors off the money
page.

---

## 13. Known Blockers — User Action Required

Confirmed with the user: **real NAP will be added later.** The site builds with clearly
marked placeholders and will not launch until these land.

| # | Blocker | Needed for |
|---|---|---|
| 1 | **Register `mokanpropertybuyers.com`** | Canonicals, schema, sitemap, all copy |
| 2 | Legal entity name and any state registration | LocalBusiness schema, footer, terms |
| 3 | Phone number | NAP consistency, call CTAs |
| 4 | Business address | LocalBusiness schema, GBP |
| 5 | Resend API key (**new, not a pre-rotation sibling key**) | Lead delivery |
| 6 | Verified trust figures, or explicit confirmation to ship without | `trust.ts` — empty until then |
| 7 | Google Business Profile | Off-page authority, the actual bottleneck |
| 8 | GA4 measurement ID | Analytics (code wired, ID set in Vercel) |

Items 1–5 block launch. Item 6 blocks nothing — the site renders honestly without it.

---

## 14. Non-Goals

- No content, phrasing, or data adapted from SPB — the corpus is California-specific and
  legally wrong here
- No pages for the 312 places under 1,000 population
- No blending of Missouri and Kansas legal guidance on a shared page
- No case studies, testimonials, or proof figures until real ones exist
- No Vercel or DNS actions — user-managed
- No refactor of the SPB repository

---

## 15. Success Criteria

1. CI green on every push: typecheck, lint, all eight gates, and a successful build
2. Zero slug collisions across 53 counties and 144 cities, enforced mechanically
3. Every legal claim state-tagged and source-cited, enforced mechanically
4. `trust.ts` empty and no fabricated proof anywhere in the corpus
5. Wave 0 ships ≈170 genuinely deep, non-duplicative indexed pages — with the state-line
   silo among them
6. No duplicate paragraphs across slugs; shingle audit clean after each batch
7. Lead delivery verified end-to-end in CI, not assumed

---

## Appendix A — Data Provenance

| Artifact | Source |
|---|---|
| `data/footprint.json` | Census Gazetteer 2023 + Population Estimates 2023, filtered by haversine ≤100 mi from 39.0997, −94.5786 |
| `scripts/build-footprint.py` | Reproduces the above from scratch |

Regenerate at any time; the radius, center point, and population cutoffs are all
parameters, so the footprint is auditable rather than asserted.
