import type { LegalClaim } from "@/types/legal";

/**
 * The single source of statute truth for the state-line silo (Tasks 5-7).
 * Fourteen pages assert Missouri and Kansas law; every one of those
 * assertions must trace back to an entry here, not to an author's own
 * lookup. See docs/CITATION-LEDGER.md for what was checked, against what,
 * and when -- including the claims that could not be verified and were
 * deliberately left out of this file.
 *
 * Binding rule applied to every entry below: a statute found on
 * revisor.mo.gov or ksrevisor.gov is not necessarily in force. Check the
 * "Effective -" line and the trailing revision history before trusting the
 * text on the page. RSMo 513.475 (`mo-homestead`) is the case that proves
 * why -- see its `pendingChange`.
 */
export const citations: Record<string, LegalClaim> = {
  // ---------------------------------------------------------------------
  // Foreclosure cluster
  // ---------------------------------------------------------------------

  "mo-nonjudicial": {
    state: "MO",
    claim:
      "Missouri lets a lender foreclose without ever going to court. A deed of trust may be foreclosed by trustee's sale at the lender's option, as an alternative to foreclosing by suit.",
    citation: "RSMo 443.410",
    sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=443.410",
    verifiedOn: "2026-07-29",
    effectiveFrom: "1993-08-28",
  },

  "ks-judicial": {
    state: "KS",
    claim:
      "Kansas has no power-of-sale statute paralleling Missouri's trustee's-sale mechanism. A Kansas foreclosure proceeds as a civil action resulting in a judgment, then a sheriff's execution sale, and the sale must be confirmed by the district court before a deed can issue.",
    citation: "K.S.A. 60-2410; K.S.A. 60-2415",
    sourceUrl: "https://www.ksrevisor.gov/statutes/chapters/ch60/060_024_0010.html",
    verifiedOn: "2026-07-29",
  },

  "ks-redemption-12mo": {
    state: "KS",
    claim:
      "The defendant owner may redeem any real property sold under execution at any time within 12 months from the day of sale.",
    citation: "K.S.A. 60-2414",
    sourceUrl: "https://ksrevisor.gov/statutes/chapters/ch60/060_024_0014.html",
    verifiedOn: "2026-07-29",
  },

  "ks-redemption-3mo": {
    state: "KS",
    claim:
      "The court shortens the redemption period to 3 months when a default occurs before one-third of the original indebtedness secured by the foreclosed mortgage or lien has been paid -- unless the total of all mortgages or liens is less than one-third of the property's market value, in which case the court orders the full 12-month period regardless of how little of the debt has been paid.",
    citation: "K.S.A. 60-2414",
    sourceUrl: "https://ksrevisor.gov/statutes/chapters/ch60/060_024_0014.html",
    verifiedOn: "2026-07-29",
  },

  "mo-notice-period": {
    state: "MO",
    claim:
      "Before a Missouri trustee's sale, notice must run for at least twenty insertions continued to the day of sale in a daily newspaper in counties of 50,000 or more population; in smaller counties, notice runs in a weekly newspaper for four successive issues, the last insertion not more than one week before the sale.",
    citation: "RSMo 443.320",
    sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=443.320",
    verifiedOn: "2026-07-29",
    effectiveFrom: "1989-08-28",
  },

  "mo-redemption": {
    state: "MO",
    claim:
      "Missouri does have a one-year post-sale redemption right, but it is gated four ways: it exists only when the lender (not a third-party investor) is the purchaser at the trustee's sale; it runs one year from the sale date; written notice of intent to redeem must be given at the sale or within ten days before the advertised sale date; and a surety bond covering the full debt, interest, costs, and other charges must be posted within twenty days after the sale.",
    citation: "RSMo 443.410; RSMo 443.420",
    sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=443.410",
    verifiedOn: "2026-07-29",
    effectiveFrom: "1993-08-28",
  },

  // ---------------------------------------------------------------------
  // Money cluster
  // ---------------------------------------------------------------------

  "mo-homestead": {
    state: "MO",
    claim: "Missouri's homestead exemption is $15,000.",
    citation: "RSMo 513.475",
    sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=513.475",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2003-08-28",
    pendingChange: {
      claim:
        "Homestead exemption rises to $40,000, with a triennial CPI adjustment (rounded to the nearest $25) beginning 2029-04-01.",
      effectiveFrom: "2027-01-01",
      citation: "H.B. 1870 (2026), signed 2026-05-06, merged with S.B. 835 & 1111",
      status: "enacted",
    },
  },

  "ks-homestead": {
    state: "KS",
    claim:
      "Kansas exempts a homestead of up to 160 acres of farming land, or one acre within an incorporated town or city, or a manufactured/mobile home, from forced sale under any process of law -- with no dollar limit on its value.",
    citation: "Kan. Const. Art. 15 §9; K.S.A. 60-2301",
    sourceUrl: "https://www.ksrevisor.gov/statutes/chapters/ch60/060_023_0001.html",
    verifiedOn: "2026-07-29",
  },

  "mo-transfer-tax-ban": {
    state: "MO",
    claim:
      "Missouri's constitution prevents the state, counties, and other political subdivisions from imposing any new tax, including a sales tax, on the sale or transfer of homes or any other real estate. Missouri has no real-estate transfer tax.",
    citation: "Mo. Const. Art. X §25",
    sourceUrl: "https://law.justia.com/constitution/missouri/article-x/section-25/",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2010-12-02",
  },

  "ks-mortgage-reg-tax": {
    state: "KS",
    claim:
      "Kansas phased out and repealed its mortgage registration tax; the statute imposing it was repealed effective January 1, 2019.",
    citation: "K.S.A. 79-3102 (repealed by L. 2014, ch. 140, §22)",
    sourceUrl: "https://www.ksrevisor.gov/statutes/chapters/ch79/079_031_0002.html",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2019-01-01",
  },

  "mo-assessment-19": {
    state: "MO",
    claim: "Missouri assesses subclass (1) residential real property at 19% of true value.",
    citation: "RSMo 137.115",
    sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=137.115",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2026-01-01",
  },

  "ks-assessment-115": {
    state: "KS",
    claim:
      "Kansas assesses residential real property, including multi-family residential real property and land under a community of mobile or manufactured homes, at 11.5% of value.",
    citation: "Kan. Const. Art. 11 §1",
    sourceUrl: "https://ksrevisor.gov/kanconst/093_011_0001.html",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2013-01-01",
  },

  "jackson-county-reassessment": {
    state: "MO",
    claim:
      "The Missouri State Tax Commission found Jackson County's 2023 reassessment failed to give proper notice and skipped required physical inspections on parcels facing increases of 15% or more, affecting at least 75% of the parcels subject to those requirements. Its August 6, 2024 order directed the county to correct the 2023 assessment roll so that subclass (1) parcel valuations, excluding new construction or improvements, do not exceed a 15% increase since the last assessment. Jackson County contested the order in court; the Missouri Court of Appeals, Western District sided with the Commission on December 30, 2025.",
    citation:
      "Order of the State Tax Commission of Missouri to Jackson County (Aug. 6, 2024); State ex rel. State Tax Comm'n v. County Executive of Jackson County, No. WD87831 (Mo. App. W.D. Dec. 30, 2025)",
    sourceUrl:
      "https://stc.mo.gov/wp-content/uploads/sites/5/2024/08/Order-of-STC-to-Jackson-County-Regarding-2023-and-2024-Assessments.pdf",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2024-08-06",
  },

  // ---------------------------------------------------------------------
  // Transaction cluster
  // ---------------------------------------------------------------------

  "mo-tax-sale-redemption": {
    state: "MO",
    claim:
      "The owner, lienholder, occupant, or other interested party has the absolute right to redeem land sold for delinquent taxes at any time during the one year following the sale, and a defeasible right to redeem continues until the tax-sale purchaser actually acquires the collector's deed.",
    citation: "RSMo 140.340",
    sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=140.340",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2015-08-28",
  },

  "mo-probate-independent": {
    state: "MO",
    claim:
      "When a will authorizes it (or all heirs and devisees consent, where the will permits), a Missouri personal representative may administer the estate independently -- without adjudication, order, or direction of the probate court -- rather than under supervised administration.",
    citation: "RSMo 473.780",
    sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=473.780",
    verifiedOn: "2026-07-29",
    effectiveFrom: "1981-01-01",
  },

  "ks-probate-simplified": {
    state: "KS",
    claim:
      "On a petition for appointment of an administrator or probate of a will, a Kansas court determines whether the estate is administered as a simplified estate or a supervised estate, considering the estate's size, the heirs' degree of kinship, solvency, the estate's nature, the heirs' wishes, and the probable cost of administration.",
    citation: "K.S.A. 59-3202",
    sourceUrl: "https://ksrevisor.gov/statutes/chapters/ch59/059_032_0002.html",
    verifiedOn: "2026-07-29",
    effectiveFrom: "1976-01-01",
  },

  "kcmo-earnings-tax": {
    state: "MO",
    claim:
      "Kansas City, Missouri imposes a 1% earnings tax on wages, salaries, commissions, and other compensation of residents (and of nonresidents for work done in the city), plus net profits of businesses conducted in the city. State law requires the city to resubmit the tax to voters every five years to keep collecting it; Kansas City voters renewed it on April 7, 2026 (75.45% in favor), extending it through 2031.",
    citation: "RSMo 92.111; Kansas City, Mo. Code of Ordinances §68-382",
    sourceUrl: "https://www.kcmo.gov/city-hall/departments/finance/earnings-tax",
    verifiedOn: "2026-07-29",
    effectiveFrom: "2026-04-07",
  },
};
