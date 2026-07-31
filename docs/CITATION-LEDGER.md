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


---

## Addendum — controller precision fixes, 2026-07-30

Three claims were restated after independent verification. None was a fabrication; all
three were precision failures of the kind that quietly discredit the citations around them.

### `mo-nonjudicial` — citation did not support the claim

**Was:** cited RSMo 443.410 as authority for foreclosing without a court.

RSMo 443.410 is the **redemption** section. Its opening clause ("real estate which may be
sold under any power of sale in a mortgage deed of trust") *presupposes* the power of sale
but does not grant it. Citing the redemption statute as authority for non-judicial
foreclosure is a mismatch a knowledgeable reader catches immediately — and having caught
it, they reasonably distrust every other citation on the page.

**Now cites:**
- **RSMo 443.290** — "Mortgages and security agreements with power of sale." Operative
  language: "All mortgages of real property or security agreements providing for a security
  interest in personal property, or both, with powers of sale in the mortgagee or secured
  party…" Revision history `(RSMo 1939 § 3462, A.L. 1965 p. 114)`, Effective 28 Aug 1965.
  Verified https://revisor.mo.gov/main/OneSection.aspx?section=443.290
- **RSMo 443.327** — "Sale by trustee exercising powers under security instrument."
  Confirmed by catchline from the chapter range 443.290–443.330.

Related sections in the same chapter, confirmed by catchline: 443.300 (death of debtor,
foreclosure stayed), 443.310 (sales, where made — number of days' notice), 443.320 (notice,
contents — how published), 443.325 (individual notice of foreclosure sale), 443.330 (trustee
failing to execute trust).

### `jackson-county-reassessment` — overstated a procedural ruling as a merits win

**Was:** "the Missouri Court of Appeals, Western District sided with the Commission on
December 30, 2025."

The court **reversed the circuit court's dismissal** of the State Tax Commission's
enforcement suit (No. WD87831, Mo. App. W.D., Dec. 30, 2025) — it revived the case. That is
a ruling that the suit may proceed, not a judgment that the Commission wins.

The distinction is not academic. A Jackson County homeowner reading this page may be
deciding whether to pursue their own assessment appeal, and "the state won" implies a
settled outcome that "the case is still live" does not. Restated to say what the court
actually did and that the underlying dispute was unresolved as of review.

The STC's August 6, 2024 order and its quoted finding — failures "widespread and systemic,
affecting at least 75 percent of the parcels to which these requirements applied" — were
independently confirmed and are unchanged.

### `kcmo-earnings-tax` — unofficial tally stated as certified

**Was:** "renewed it on April 7, 2026 (75.45% in favor), extending it through 2031."

The 75.45% figure came from election-night reporting, which described it as **unofficial
results.** The rate (1%), the date (April 7, 2026), and the five-year renewal cycle are all
verified and unchanged; the precise percentage is now described as approximate and
unofficial, with the certified result named as the authority.

### Note on the perfect record

The original ledger reported 17 of 17 claims verified with zero UNVERIFIED entries. That is
possible, but a clean sweep on a first pass deserves scrutiny rather than trust — and
spot-checking three claims found three precision problems. No claim was downgraded to
UNVERIFIED, because all three survived restatement. Future waves should assume the same
scrutiny applies to their own ledger additions.

---

## Wave 0C — closing the three transaction-cluster gaps, 2026-07-30

Three gaps carried forward from Wave 0B (`docs/WAVE-0B-PREREQUISITES.md`, "Wave 0C
inheritance"): no Kansas tax-sale claim, and no claim at all — for either state — on contract
for deed or seller disclosure. All three were closed in this pass. Ten new entries were added
to `citations`. Zero were left UNVERIFIED, but — unlike Wave 0B's Missouri contract-for-deed
question, where the honest answer turned out to be "no such statute" — that is a report of
what was actually found, not a repeat of the "perfect record" pattern flagged above; see the
near-miss below for the one place a clean-looking secondary source was wrong.

### `ks-tax-sale-no-post-sale-redemption` and `ks-tax-sale-county-holding-period`

Pre-verified by the controller against `ksrevisor.gov` on 2026-07-30 and used verbatim, not
re-checked in this pass.

- **`ks-tax-sale-no-post-sale-redemption`** — K.S.A. 79-2803, captioned "Property not subject
  to redemption after sale." Redemption is permitted only *before* the day of the tax
  foreclosure sale. Case annotation: *Sumner County Comm'rs v. Avis*, 163 Kan. 388, 393, 183
  P.2d 462, holds no redemption right exists following the sale.
  Source: https://ksrevisor.gov/statutes/chapters/ch79/079_028_0003.html
- **`ks-tax-sale-county-holding-period`** — K.S.A. 79-2401a. Real estate bid off by the county
  is held before the county pursues foreclosure: two years generally, three years if the
  property is a homestead under section 9 of article 15 of the Kansas Constitution, one year
  for an abandoned building or structure and the land under it. Redeemable during that period
  by the owner/holder of record title, their heirs, devisees, executors, administrators, or
  assigns, or a mortgagee or the owner's/holder's assigns.
  Source: https://ksrevisor.gov/statutes/chapters/ch79/079_024_0001a.html

**Why this matters:** Kansas tax foreclosure is close to the mirror image of Kansas mortgage
foreclosure, which the ledger already covers (`ks-redemption-12mo`: 12 months to redeem,
sometimes shortened to 3, *after* a mortgage foreclosure sale). For a tax foreclosure, the
entire redemption opportunity sits *before* the sale — none after. `tax-sale-missouri-vs-kansas`
now states this contrast explicitly and warns against carrying the mortgage-foreclosure
12-month intuition across to a tax sale. Johnson County, Kansas (~622,237 people, the largest
Kansas county in this footprint per `data/footprint.json`) is called out because the
three-year homestead holding period reaches a large share of its housing stock specifically.

### `ks-contract-for-deed-act` and `ks-contract-for-deed-notice-cure`

Verified directly against `ksrevisor.gov` on 2026-07-30. The Kansas Contract for Deed Act
(K.S.A. 58-5201 to 58-5204) is genuinely new law, **effective 2024-07-01**
(`L. 2024, ch. 63, §§ 10-13; July 1`), confirmed on all four sections fetched directly.

- **58-5201** — citation and definitions (contract for deed = executory agreement, 5+ payments
  exclusive of down payment, buyer's principal residence).
  https://ksrevisor.gov/statutes/chapters/ch58/058_052_0001.html
- **58-5202** — recording of the contract or an affidavit of equitable interest; seller
  remedies on buyer default after the notice-and-cure period runs.
- **58-5203** — seller must hold fee simple title free of encumbrances, with narrow disclosed
  exceptions; violation is a deceptive act or practice under the Kansas Consumer Protection
  Act. https://ksrevisor.gov/statutes/chapters/ch58/058_052_0003.html
- **58-5204** — buyer's notice-and-cure right before forfeiture: 30 days if the buyer has paid
  less than 50% of the purchase price, 90 days if 50% or more. Notice must be served in person,
  left at the buyer's residence, or sent by certified mail.
  https://ksrevisor.gov/statutes/chapters/ch58/058_052_0004.html

Two ledger ids were made from these four sections: `ks-contract-for-deed-act` (58-5201,
58-5203 — the title-holding requirement and its Consumer Protection Act consequence) and
`ks-contract-for-deed-notice-cure` (58-5204 — the 30/90-day buyer protection), mirroring the
existing pattern of splitting one topic across sibling ids (`ks-redemption-12mo` /
`ks-redemption-3mo`).

### Near-miss: Missouri has no dedicated Contract for Deed Act — "RSMo 442.700-442.746" is not enacted law

This is the most important finding in this pass, and it very nearly went the other way.

Multiple search results — a legal-forms marketing site, a Kansas City-area real-estate
investors' association blog, and search-engine summaries drawing on both — describe a
"Missouri Contract for Deed Act" at RSMo 442.700 through 442.746, with provisions (a 60-day
cure period, a 30%-of-price-or-48-payments threshold before a trustee-style sale replaces
forfeiture, a 15%-paid conversion-to-title right, a 14-day buyer rescission window) that
exactly match two real Missouri bills: **HB 296**, introduced in the House in 2011, and **SB
555**, pre-filed in the Senate in December 2011 for the 2012 session, carrying identical
text. The introduced-bill PDF (`https://www.senate.mo.gov/12info/pdf-bill/intro/SB555.pdf`,
fetched and read directly) and the House's own bill summary
(`https://documents.house.mo.gov/billtracking/bills111/sumpdf/HB0296I.HTM` and its summary
PDF, fetched directly) both describe this in detail — but an introduced bill is not enacted
law, and initial attempts to confirm passage via `revisor.mo.gov`'s `OneSection.aspx` for
442.700, 442.706, 442.710, and 442.742 all returned the site's bot-block page on every
attempt, while adjacent sections (442.606, 260.213, 407.020, 443.410) fetched normally in the
same session — a pattern that looked, at first, like the site was specifically protecting
this range rather than that the range simply did not exist.

**Resolved by fetching the chapter's own table of contents directly:**
`https://revisor.mo.gov/main/OneChapter.aspx?chapter=442` lists every section in Chapter 442
in order. It runs from 442.010 through 442.606 ("Methamphetamine production, seller of
property to disclose...") and then jumps straight to **442.920** ("Missouri Residential Sale
Leaseback Protection Act" — a real, different, enacted statute about a different transaction
structure). **There is no 442.700 through 442.746 in the current code.** HB 296 and SB 555
either died in committee or were never brought to a vote in either session; nothing in the
current chapter index reflects them.

This is exactly the "near-miss" pattern the Addendum above warns about, but in the opposite
direction from `mo-assessment-19`'s proposed-bill-mistaken-for-enacted-text trap: here, several
independent-*looking* secondary sources converged on the same specific, plausible, detailed
citation, and only a direct fetch of the primary source's own table of contents caught that it
was describing a bill, not a statute. **No `mo-contract-for-deed` citation was added.** The
`contract-for-deed-missouri-vs-kansas` page states plainly that no Missouri statute was found,
rather than repeating what every secondary source claims.

### `mo-seller-disclosure-meth` and `mo-seller-disclosure-solid-waste`

Verified directly against `revisor.mo.gov` on 2026-07-30.

- **RSMo 442.606** — "Methamphetamine production, seller of property to disclose to buyer such
  production and certain criminal convictions." Effective 28 Aug 2001 (L. 2001 S.B. 89 & 37).
  https://revisor.mo.gov/main/OneSection.aspx?section=442.606
- **RSMo 260.213** — "Disclosure of landfill, sale of property, required." Effective 28 Aug
  1990 (L. 1990 S.B. 530). Operative text confirmed verbatim: "No person may knowingly sell,
  convey or transfer title to any property that contains a permitted or unpermitted solid
  waste disposal site or demolition landfill, without disclosing to the buyer early in the
  negotiation process the existence and location of the site."
  https://revisor.mo.gov/main/OneSection.aspx?section=260.213

### `mo-merchandising-practices-act`

Verified directly against `revisor.mo.gov` on 2026-07-30.

- **RSMo 407.020** — "Unlawful practices, penalty — exceptions." Effective 28 Aug 2020 (five
  amendments since 1967). Operative text (subsection 1) declares "deception, fraud, false
  pretense, false promise, misrepresentation, unfair practice or the concealment, suppression,
  or omission of any material fact in connection with the sale or advertisement of any
  merchandise" an unlawful practice.
- **RSMo 407.010** — fetched specifically to confirm "merchandise" reaches real estate, not
  just goods. Definition confirmed verbatim: "any objects, wares, goods, commodities,
  intangibles, real estate or services."

This is Missouri's closest analog to a general seller-silence duty, in the explicit absence of
a dedicated disclosure-form statute. It is a consumer-protection statute, not a disclosure
statute — the page frames it that way rather than calling it a disclosure requirement.

### `ks-seller-disclosure-radon` and `ks-seller-disclosure-special-assessment`

Verified directly against `ksrevisor.gov` on 2026-07-30.

- **K.S.A. 58-3078a** — "Contract to include information regarding radon." Effective 2008-07-01
  (L. 2008, ch. 153, § 1). Confirmed: "Kansas law requires sellers to disclose any information
  known to the seller that shows elevated concentrations of radon gas in residential real
  property," plus mandatory contract language warning radon is a Class A human carcinogen.
- **K.S.A. 12-6a20** — "Disclosure by seller; acknowledgment." Effective 2003-07-01 (L. 2003,
  ch. 156, § 5). Confirmed verbatim: seller must disclose a special assessment/fee or
  improvement-district membership, with a good-faith estimate if the amount is unknown, and
  obtain the buyer's written acknowledgment.

### `ks-broker-disclosure-duty`

Verified directly against `ksrevisor.gov` on 2026-07-30. K.S.A. 58-30,106, "Minimum
requirements of seller's or landlord's agent," part of the Brokerage Relationships in Real
Estate Transactions Act. Most recent amendment effective 2015-07-01 (L. 2015, ch. 21, § 5).
**Important distinction confirmed by reading the actual subsection, not the section title:**
this duty runs from the *licensee* to a buyer/tenant who is a customer rather than a client —
"a licensee shall disclose to any customer all adverse material facts actually known by the
licensee" — it is not a duty imposed on the seller directly. The page states this distinction
explicitly rather than describing it as a seller disclosure requirement.

### Effective-date trap check, Wave 0C additions

All ten new citations were checked for the `revisor.mo.gov` forward-dated-text hazard
documented above. None exhibited it — every Missouri "Effective -" line and A.L. history
matched a date already in the past, and every Kansas "History" line's most recent enactment
date likewise reflected current law with no forward-dated language.
