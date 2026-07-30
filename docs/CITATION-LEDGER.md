# Citation Ledger

The verified source of statute truth for the state-line silo (Wave 0B, Tasks 5-7).
Every legal assertion the fourteen anchor pages make must resolve to an id in
`src/data/legal-citations.ts`. This document records what was checked, against
what, on what date, the operative language relied on, and the effective-date
status of each entry. Nothing here is invented; anything that could not be
verified against a primary source is recorded below as **UNVERIFIED** and
deliberately left out of `citations`.

All 17 claims in scope for Wave 0B were verified. There are no UNVERIFIED
entries in this pass.

## The trap this ledger exists to avoid

`revisor.mo.gov` serves amended statutory text ahead of its effective date. On
2026-07-29, RSMo 513.475 (`mo-homestead`) rendered "forty thousand dollars"
even though the current operative figure is $15,000 -- the $40,000 text is
H.B. 1870, effective 2027-01-01. Every entry below was checked for this: the
page's "Effective -" line and its trailing `A.L.`/history citation, not just
the text on the page. Nine other statutes were checked and none carry a
similar future-effective trap (see the effective-date note on each entry).
`ksrevisor.gov` was checked for the same hazard and did not exhibit it on any
statute reviewed here -- every Kansas citation's displayed text matched its
"History" line's most recent enactment date, with no forward-dated language.

---

## Pre-verified by the controller (used verbatim, not re-checked)

### `ks-redemption-12mo` / `ks-redemption-3mo`
- **Citation:** K.S.A. 60-2414
- **Source:** https://ksrevisor.gov/statutes/chapters/ch60/060_024_0014.html
- **verifiedOn:** 2026-07-29
- 12 months generally; shortened to 3 months when default occurs before
  one-third of the debt is paid -- *unless* all liens total less than
  one-third of market value, in which case the court still orders the full
  12 months.

### `ks-homestead`
- **Citation:** Kan. Const. Art. 15 §9; K.S.A. 60-2301
- **Source:** https://www.ksrevisor.gov/statutes/chapters/ch60/060_023_0001.html
- **verifiedOn:** 2026-07-29
- 160 acres farming land / 1 acre in an incorporated town or city / a
  manufactured or mobile home. No dollar limit on value.
- **Cross-checked in this pass:** re-fetched the same page directly; text and
  acreage figures match exactly.

### `mo-homestead`
- **Citation:** RSMo 513.475
- **Source:** https://revisor.mo.gov/main/OneSection.aspx?section=513.475
- **verifiedOn:** 2026-07-29
- In force today: **$15,000**. `pendingChange`: $40,000 effective
  2027-01-01, H.B. 1870 (signed 2026-05-06, merged with S.B. 835 & 1111),
  `status: "enacted"` -- this bill is signed law, not a proposal. Triennial
  CPI adjustment begins 2029-04-01 (not modeled as a separate pendingChange;
  noted here only).

### `mo-notice-period`
- **Citation:** RSMo 443.320 -- Effective 28 Aug 1989
- **Source:** https://revisor.mo.gov/main/OneSection.aspx?section=443.320
- Population-dependent: counties of 50,000+ get 20 daily-newspaper
  insertions; smaller counties get 4 successive weekly issues, last
  insertion within a week of the sale.

### `mo-redemption`
- **Citations:** RSMo 443.410 (Eff. 28 Aug 1993), RSMo 443.420 (Eff. 28 Aug 1939)
- **Sources:** https://revisor.mo.gov/main/OneSection.aspx?section=443.410 ·
  https://revisor.mo.gov/main/OneSection.aspx?section=443.420
- The flagship comparison: a *theoretical* one-year right gated by (1) the
  lender being the purchaser, (2) a ten-day-advance written notice
  requirement, and (3) a full-debt surety bond within 20 days.

---

## Verified in this pass

### `mo-nonjudicial`
- **Citation:** RSMo 443.410
- **Source:** https://revisor.mo.gov/main/OneSection.aspx?section=443.410
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 1993-08-28
- Operative language (first sentence): "Deeds of trust in the nature of
  mortgages of lands may, in addition to being forecloseable by suit, be
  also foreclosed by trustee's sale at the option of the holder of the debt
  or obligation thereby secured and the mortgaged property sold by the
  trustee or his successor in the same manner and in all respects as in
  case of mortgages with power of sale."
- Effective-date check: page shows "Effective - 28 Aug 1993", history
  "RSMo 1939 § 3450, A.L. 1993 H.B. 105 & 480" -- long-settled, no
  forward-dated text.
- Note: this is the same statute cited for `mo-redemption`. It does two
  distinct jobs -- establishes the trustee's-sale mechanism itself
  (`mo-nonjudicial`) and gates the redemption right that attaches to it
  (`mo-redemption`) -- so both ids point to it deliberately, not by mistake.

### `ks-judicial`
- **Citations:** K.S.A. 60-2410; K.S.A. 60-2415
- **Sources:** https://www.ksrevisor.gov/statutes/chapters/ch60/060_024_0010.html ·
  https://ksrevisor.gov/statutes/chapters/ch60/060_024_0015.html
- **verifiedOn:** 2026-07-29
- There is no single Kansas statute that says "foreclosure must be
  judicial" the way Missouri's ch. 443 affirmatively creates a non-judicial
  trustee's-sale option. The case is structural, built from two primary
  sources: K.S.A. 60-2410 requires public notice and a sheriff's sale under
  execution following a judgment; K.S.A. 60-2415 requires the district
  court to confirm the sale --- "If the court finds the proceedings regular
  and in conformity with law and equity, it shall confirm the same, direct
  the clerk to make such entry upon the journal and order the sheriff to
  make to the purchaser the certificate of sale or deed" -- before a deed
  can issue. Kansas has no analog to Missouri's RSMo 443.410 power-of-sale
  mechanism; every Kansas foreclosure sale passes through a district judge's
  confirmation. This is the basis for calling Kansas a judicial-foreclosure
  state.
- I looked for a single "action to foreclose a real estate mortgage"
  section and did not find one; K.S.A. 60-1006 (foreclosure of a security
  interest) turned out to govern personal property, not real estate, and
  K.S.A. 60-1001/1002/1003 are ejectment, quiet title, and partition,
  respectively -- ruled out by direct inspection, not assumed.

### `mo-transfer-tax-ban`
- **Citation:** Mo. Const. Art. X §25
- **Source:** https://law.justia.com/constitution/missouri/article-x/section-25/
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 2010-12-02
- Operative language: "After the effective date of this section, the state,
  counties, and other political subdivisions are hereby prevented from
  imposing any new tax, including a sales tax, on the sale or transfer of
  homes or any other real estate."
- Adopted by voters November 2, 2010 (Constitutional Amendment 3), effective
  December 2, 2010. `revisor.mo.gov`'s constitution page for this section
  returned HTTP 403 to the fetch tool; law.justia's transcription was used
  and is consistent with every secondary description of Amendment 3 found.

### `ks-mortgage-reg-tax`
- **Citation:** K.S.A. 79-3102 (repealed by L. 2014, ch. 140, §22)
- **Source:** https://www.ksrevisor.gov/statutes/chapters/ch79/079_031_0002.html
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 2019-01-01
- The Revisor's page for 79-3102 now shows no operative text and a history
  line reading (verbatim): "L. 1925, ch. 273, § 2; L. 1973, ch. 395, § 1;
  L. 1979, ch. 317, § 1; L. 1985, ch. 322, § 1; L. 1990, ch. 351, § 3;
  L. 1992, ch. 265, § 4; L. 1994, ch. 250, § 3; L. 2014, ch. 140, § 15;
  Repealed, L. 2014, ch. 140, § 22; January 1, 2019." Kansas phased the tax
  down from 2015 through 2019, when it was fully repealed.

### `mo-assessment-19`
- **Citation:** RSMo 137.115
- **Source:** https://revisor.mo.gov/main/OneSection.aspx?section=137.115
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 2026-01-01
- Operative language (subsection 5(1)): "All subclasses of real property...
  shall be assessed at the following percentages of true value: (a) For
  real property in subclass (1), nineteen percent; (b) For real property in
  subclass (2), twelve percent; and (c) For real property in subclass (3),
  thirty-two percent." Residential real property is subclass (1) = 19%.
- **A near-miss worth recording:** an early web search surfaced language
  about a scheduled decrease -- "beginning on or after January 1, 2026 the
  assessment will decrease by one-fourth of one percent every two years
  until 2040, when it reaches seventeen percent." That language traces to a
  **Missouri Senate fiscal note for SB 1212 (2026 session)** -- a *proposed*
  bill, not the enacted statute. I fetched revisor.mo.gov's OneSection page
  for 137.115 directly and asked for the verbatim text of subsection 5:
  it contains no such phase-down language. The enacted, currently-effective
  text is flatly 19%, full stop. This is the mirror image of the homestead
  trap -- language that *looks* like a forward-dated statute but is
  actually unenacted bill text -- and it would have been just as wrong to
  publish. Not recorded as a `pendingChange` because SB 1212 has not been
  shown to be signed into law.
- The 2026-01-01 effective date itself reflects a real, recent, enacted
  change: history reads "A.L. 2025 H.B. 199 merged with S.B. 4," "Effective
  8-28-25 (S.B. 4); 1-01-26 (H.B. 199)" -- both dates are already past
  today (2026-07-29), so 19% is the number in force.

### `ks-assessment-115`
- **Citation:** Kan. Const. Art. 11 §1
- **Source:** https://ksrevisor.gov/kanconst/093_011_0001.html
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 2013-01-01
- Operative language: real property used for residential purposes,
  including multi-family residential real property and real property
  accommodating a manufactured/mobile home community, "shall be assessed
  uniformly" at "11½%." Current governing amendment: L. 2012, ch. 180, §1,
  effective January 1, 2013.
- **HCR 5011 checked and found NOT to be a live pendingChange.** A 2025
  Kansas House Concurrent Resolution proposed capping annual residential
  valuation increases at 3%, which would have amended this section. I
  fetched the bill's page directly on kslegislature.gov
  (https://www.kslegislature.gov/li/b2025_26/measures/hcr5011/): status
  shows **"Died"** -- it passed the House and reached the Senate floor, but
  did not clear the Senate, so it never reached the two-thirds threshold in
  both chambers required for a constitutional amendment and was never
  submitted to voters. It will not appear on any 2026 ballot. Because it
  never passed the legislature at all, it does not meet even the "proposed"
  bar for `pendingChange` (which is for measures still live, e.g. awaiting
  a scheduled vote) -- it is dead. Not recorded on the citation. Noted here
  only so a future author does not re-surface it as a live threat to the
  11.5% figure.

### `mo-tax-sale-redemption`
- **Citation:** RSMo 140.340
- **Source:** https://revisor.mo.gov/main/OneSection.aspx?section=140.340
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 2015-08-28
- Operative language: "the owner, lienholder, occupant, or any other person
  having an interest in land or lot sold for taxes...shall have the
  absolute right to redeem the same at any time during the one year next
  ensuing and shall continue to have a defeasible right to redeem the same
  until such time as the tax sale purchaser acquires the deed." Checked for
  a pending amendment (searched specifically); found none.
- Distinct from RSMo ch. 443's mortgage-foreclosure redemption
  (`mo-redemption`) -- this is the collector's-deed tax-sale process, a
  different proceeding entirely. Do not conflate the two in prose.

### `mo-probate-independent`
- **Citation:** RSMo 473.780
- **Source:** https://revisor.mo.gov/main/OneSection.aspx?section=473.780
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 1981-01-01
- Independent administration applies when a will authorizes it (or, where
  the will permits, all heirs and devisees consent), letting the personal
  representative "proceed expeditiously with the settlement and
  distribution of the estate...without adjudication, order, or direction of
  the court," in contrast to supervised administration, which requires
  court approval for estate actions. Long-settled (1980 S.B. 637); no
  forward-dated text found.

### `ks-probate-simplified`
- **Citation:** K.S.A. 59-3202
- **Source:** https://ksrevisor.gov/statutes/chapters/ch59/059_032_0002.html
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 1976-01-01
- Operative language: on a petition for appointment of an administrator or
  probate of a will, "the court shall determine whether the estate shall be
  administered as a simplified estate or as a supervised estate," weighing
  "the size of the estate; the degree of kinship of the heirs, devisees and
  persons seeking appointment; the solvency of the estate; the nature of
  the estate; the wishes of the heirs and devisees; the probable cost of
  estate administration and settlement; and any other pertinent matters."
  Part of the Kansas Simplified Estates Act (K.S.A. 59-3201 to 59-3206).

### `kcmo-earnings-tax`
- **Citation:** RSMo 92.111; Kansas City, Mo. Code of Ordinances §68-382
- **Source:** https://www.kcmo.gov/city-hall/departments/finance/earnings-tax
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 2026-04-07
- Rate: 1% on wages/salaries/commissions of residents and of nonresidents
  for work done in the city, plus net profits of businesses conducted
  there. The rate figure and description were captured from kcmo.gov's own
  earnings-tax page and corroborated by the city's codified ordinance
  §68-382 ("Imposition of tax") via Municode, the city's official
  codification host; direct WebFetch of both kcmo.gov and library.municode.com
  returned HTTP 403 to the fetch tool (bot-blocked), so the operative text
  was retrieved through search-tool access to those exact official domains,
  not through a law firm or blog.
- State framework: RSMo 92.111, effective 2010-11-02 (adopted by Proposition
  A initiative), requires a constitutional charter city that already
  imposed the tax to resubmit the question to voters every five years to
  keep collecting it. **Kansas City's tax was up for exactly that renewal
  on April 7, 2026**, and voters approved it 75.45%-24.55% (turnout
  breakdown by county reported in the press), extending it through 2031.
  This is a real, dated, resolved event, not a pending one -- recorded as
  `effectiveFrom` (the renewal date), not `pendingChange`.

### `jackson-county-reassessment`
- **Citations:** Order of the State Tax Commission of Missouri to Jackson
  County (Aug. 6, 2024); State ex rel. State Tax Comm'n v. County Executive
  of Jackson County, No. WD87831 (Mo. App. W.D. Dec. 30, 2025)
- **Sources:** https://stc.mo.gov/wp-content/uploads/sites/5/2024/08/Order-of-STC-to-Jackson-County-Regarding-2023-and-2024-Assessments.pdf
- **verifiedOn:** 2026-07-29 · **effectiveFrom:** 2024-08-06
- This is a factual/historical claim, not a statute, per the task brief --
  cited to the State Tax Commission and to the appellate opinion that
  quotes the order, not to a news summary.
- The STC order PDF itself could not be extracted as readable text by the
  fetch tool (binary/compressed PDF stream); the operative order language
  was instead obtained from the Missouri Court of Appeals, Western
  District's December 30, 2025 opinion, which quotes the order directly:
  "Jackson County assessing officials shall correct the 2023 Assessment
  Roll to reflect assessed valuations of all parcels of subclass (1) real
  property, excluding increases due to new construction or improvements,
  that equal the valuations determined by Jackson County assessing
  officials, or valuations that do not exceed fifteen percent since the
  last assessment, whichever is less." The Commission found the county's
  notice and physical-inspection failures "were widespread and systemic,
  affecting at least 75 percent of the parcels to which these requirements
  applied." Jackson County contested the order; the Court of Appeals sided
  with the Commission on December 30, 2025, and as of this writing the case
  was remanded for further enforcement action, i.e. the county's compliance
  is still being litigated. State the claim as "the Commission found and
  ordered X; the county contested it; the Court of Appeals sided with the
  Commission" -- not as a settled, closed matter.

---

## No further effective-date traps found

Beyond `mo-homestead`, none of the seventeen statutes and constitutional
provisions checked in this ledger carry text whose displayed wording is
ahead of its legal effective date. `mo-assessment-19` came close to a
false-positive in the other direction (proposed-bill fiscal-note language
being mistaken for enacted text) but was resolved by reading the actual
enacted subsection directly. `ksrevisor.gov` did not exhibit the
forward-serving behavior found on `revisor.mo.gov` on any statute checked
here.
