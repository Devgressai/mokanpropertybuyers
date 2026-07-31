import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * The two state hubs -- `sell-my-house-fast-missouri` and
 * `sell-my-house-fast-kansas` -- the fourth content map and the last content
 * task of Wave 0B. These are the parents of all 53 counties in this site's
 * footprint (`data/footprint.json`) and the structural home for
 * state-specific law: every county and city page inherits from one of the
 * two pages below, and each hub gives a seller a complete picture of their
 * own state's rules and nothing about the other state's. Missouri law lives
 * on the Missouri page; Kansas law lives on the Kansas page. Neither page
 * names the other state at all, by design -- see docs/CITATION-LEDGER.md for
 * what backs every cited figure, and
 * docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md (Task 8) for
 * the content contract this file is written against.
 *
 * Same rules as the three preceding content maps: every paragraph asserting
 * law carries `[MO]` or `[KS]`, every legal assertion traces to an entry in
 * `citations` rather than being retyped, and no deictic stand-in for a named
 * state appears anywhere. HCR 5011 -- the dead Kansas assessment ballot
 * measure documented in the ledger's HCR 5011 section -- is deliberately not
 * mentioned; it never passed the legislature and is not a live threat to the
 * 11.5% figure.
 */
export const stateHubContent: Record<string, PageContent> = {
  "sell-my-house-fast-missouri": {
    slug: "sell-my-house-fast-missouri",
    body: [
      "[MO] This site works across 31 Missouri counties on the state's western edge, radiating out from the Kansas City metro core -- Jackson, Clay, Platte, Cass, and Buchanan Counties -- to smaller, more rural counties well outside it, including Worth County, home to roughly 1,900 people and the smallest county in this footprint. A homeowner selling a house in any of those 31 counties answers to the same body of Missouri law regardless of which one the property sits in. What differs from county to county is not which rules apply, but a handful of county-specific mechanics -- how long a foreclosure notice has to run, whether an assessment dispute is playing out locally -- that this page orients around before sending a reader deeper into any one topic.",

      "[MO] Start with what happens if a mortgage payment gets missed. Missouri lets a lender foreclose without ever filing a lawsuit. Under RSMo 443.290, a Missouri mortgage or deed of trust can carry a power of sale naming a trustee, and under RSMo 443.327, that trustee can sell the property directly once the loan is in default -- no judge reviews the file, and no court date exists anywhere on the calendar for the sale itself. That is the foundation everything else in this section builds on: Missouri's entire foreclosure timeline runs through a trustee named in the loan documents, not through a courtroom.",

      "[MO] Before a trustee's sale can happen, RSMo 443.320 requires published notice, and how long that notice has to run depends on the county's population. In a county of 50,000 people or more, notice has to run for at least twenty insertions in a daily newspaper, continued through the day of the sale. Jackson County (roughly 718,000 people), Clay County (roughly 260,000), Platte County (roughly 112,000), Cass County (roughly 112,000), Buchanan County (roughly 83,000), and Johnson County, Missouri (roughly 55,000, just over that line) all clear the 50,000 threshold and move on that slower daily-newspaper schedule. A smaller county in the same footprint -- Pettis County, at roughly 43,500 people, or Worth County, at roughly 1,900 -- falls under that line, and a trustee's sale there can run on four successive weekly newspaper issues instead, with the last insertion no more than a week before the sale. The county a property sits in decides which schedule applies; the schedule does not move with a city's own size or reputation.",

      "[MO] A trustee's sale in Missouri also carries a narrow one-year redemption right, but it is not automatic. Under RSMo 443.410 and RSMo 443.420, redemption exists only when four things are all true: the buyer at the sale is the lender itself, not an outside investor; the person seeking to redeem gives written notice of that intent at the sale or within the ten days before it; a surety bond covering the full debt, interest, costs, and other charges is posted within twenty days after the sale; and the redemption happens within one year of the sale date. Miss any one of those four and no redemption period exists at all for that sale.",

      "[MO] Separate from mortgage foreclosure, an unpaid property tax bill can also lead to a sale, and Missouri sets that right out more simply. Under RSMo 140.340, the owner, a lienholder, an occupant, or anyone else with an interest in land sold for delinquent taxes has an absolute right to redeem it -- no bond, no notice condition -- at any time during the one year immediately following the tax sale, and a defeasible right to redeem continues after that until the tax-sale purchaser actually acquires the collector's deed. This is a different process from a mortgage trustee's sale, with its own separate one-year-plus structure, and the two should not be confused with each other when a specific property is facing one or the other.",

      "[MO] Money kept out of a creditor's reach works differently than either of those redemption rights. RSMo 513.475 sets Missouri's homestead exemption -- the equity a court cannot award to satisfy an unsecured creditor's judgment -- at $15,000 today, a figure that has stood since 2003. That number is changing: H.B. 1870, signed into law May 6, 2026, raises the exemption to $40,000 effective January 1, 2027, with a triennial cost-of-living adjustment starting April 1, 2029. A Missouri homeowner facing a judgment or a bankruptcy filing right now is protected up to $15,000 of equity; the same owner still holding the property after January 1, 2027 is protected up to $40,000, more than double.",

      "[MO] Property tax on an ordinary sale works on a separate track from that homestead figure. RSMo 137.115 assesses subclass (1) residential property -- the category nearly every single-family home falls into -- at 19% of true value, a rate that took effect January 1, 2026. That 19% ratio applies the same way in Jackson County as it does in a far smaller county in the same footprint; only the market-value estimate the local assessor sets, and the tax rate a specific taxing jurisdiction applies afterward, vary from one Missouri county to the next. Jackson County's own 2023 reassessment has been the subject of an active state and appellate dispute over notice and inspection procedure -- the 19% ratio itself is not what that litigation is about, and a homeowner whose parcel is affected can find the fuller account, including exactly what has and has not been decided so far, on this site's dedicated Jackson County reassessment page.",

      "[MO] Missouri also constitutionally bars a real-estate transfer tax. Article X, Section 25 of the Missouri Constitution, adopted by voters in 2010, prevents the state, counties, and every other political subdivision from imposing any new tax, including a sales tax, on the sale or transfer of homes or any other real estate. A Missouri seller pays no state or local transfer tax at closing, and because the ban is constitutional rather than statutory, no ordinary legislative session can add one back without another statewide vote.",

      "[MO] Inside Kansas City's own city limits, a different tax applies to income rather than to a sale: a 1% earnings tax on wages and business net profits earned in the city, under RSMo 92.111 and the city's own ordinance. It reaches payroll and business income, not the act of selling a house, and it was renewed by Kansas City voters on April 7, 2026 for another five years, as state law requires every five years to keep collecting it. The full mechanics of who owes it and when are covered on this site's Kansas City earnings tax page.",

      "[MO] When a Missouri homeowner dies owning real estate, that property generally cannot be sold with clear title until probate resolves who has authority over it. RSMo 473.780 lets an estate skip most ongoing court oversight -- independent administration -- when the will authorizes it, or when the will permits it and every heir and devisee consents; a personal representative administering the estate that way can proceed with settling and distributing it without adjudication, order, or direction from the probate court at each step. Absent one of those two paths, a Missouri estate defaults to supervised administration, where the court's approval attaches to major steps, selling estate real estate included.",

      "[MO] None of the above makes a fast cash sale the obvious answer for a Missouri seller, and each topic above has its own honest answer for when it is not. Before a notice of trustee's sale has even been published, there is usually time to bring a loan current, negotiate a repayment plan, or list the property through a realtor at full market value. A homeowner near the January 1, 2027 homestead change has a real reason to ask whether waiting shifts the calculation. An owner disputing a Jackson County reassessment has an active process to pursue rather than a foregone conclusion to accept. And because Missouri charges no transfer tax either way, that particular cost never belongs in the comparison between a cash offer and a normal listed sale to begin with -- the comparison should rest on price, timeline, and the home's condition instead.",

      "[MO] A Missouri seller who wants the full detail behind any one of these topics -- the trustee's-sale process step by step, the four conditions that gate redemption, how the homestead figure and the property-tax ratio actually run the numbers, or what independent administration means for an inherited house specifically -- will find each one covered in depth elsewhere on this site, one topic per page rather than compressed into a single summary. This page is the starting point for orientation, not the final word on any one of them.",

      "[MO] None of this is legal advice, and Missouri probate in particular is an area where a lawyer is often genuinely necessary rather than merely helpful -- whether a specific will actually authorizes independent administration, or whether every heir has truly consented, depends on the actual will and the actual heirs, not on a general description of the two administration tracks. A homeowner who is not sure where a specific property, sale, or estate stands under Missouri law should talk to a Missouri attorney before assuming any of the topics above resolves itself on its own timeline.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-tax-sale-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-transfer-tax-ban"],
      citations["mo-probate-independent"],
    ],
  },

  "sell-my-house-fast-kansas": {
    slug: "sell-my-house-fast-kansas",
    body: [
      "[KS] This site works across 22 Kansas counties on the state's eastern edge, radiating out from the Kansas City metro core -- Johnson County, the most populous county in this entire footprint at roughly 622,000 people, and Wyandotte County, the closest of the 22 to downtown Kansas City -- out to Shawnee County around Topeka, Douglas County around Lawrence, and smaller counties well beyond those, including Wabaunsee County, home to roughly 7,100 people and the smallest county in this footprint. A homeowner selling a house in any of those 22 counties answers to the same body of Kansas law regardless of which one the property sits in; what changes from county to county is local mechanics, not which statute governs.",

      "[KS] Start with what happens if a mortgage payment gets missed. Kansas has no power-of-sale statute that lets a lender direct a sale outside of court -- every Kansas foreclosure is a lawsuit. It proceeds to a judgment under K.S.A. 60-2410, then a sheriff's sale conducted under execution, and the district court must confirm that sale as regular and lawful under K.S.A. 60-2415 before a deed can issue to the buyer. A Kansas foreclosure passes through a judge at least twice before anyone's title changes -- once for the judgment, once for the sale's confirmation -- and that alone generally takes months to reach a sale in the first place.",

      "[KS] After a sheriff's sale is confirmed, a defendant owner is still not necessarily out. K.S.A. 60-2414 gives that owner the right to redeem the property at any time within twelve months from the day of the sale -- a right that exists on its own, independent of who bought the property at the sale or of posting any bond to preserve it. Twelve months is the default period a Kansas owner starts with.",

      "[KS] One exception shortens that twelve-month window to three: a default that hits before a third of the original debt has been paid down. K.S.A. 60-2414 immediately narrows that exception back out, though, for anyone who isn't over-leveraged -- as long as every mortgage and lien against the property together total under a third of what it is worth, the court still orders the full year regardless of how early the default came. Equity is what the statute actually measures, not the calendar date a payment was missed.",

      "[KS] Kansas protects a homestead by category, not by a dollar cap. Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield a manufactured or mobile home, a single acre inside an incorporated city or town, or up to 160 acres of farmland from forced sale under any process of law -- whichever description fits the property, with no ceiling on its value written into the exemption at all. An owner on one eligible city lot keeps the entire thing safe from an unsecured creditor's judgment regardless of what that lot is actually worth, since value is simply never part of the test.",

      "[KS] Property tax works off a separate, fixed ratio: 11.5% of value for residential real property statewide, set by Article 11, Section 1 of the Kansas Constitution and unchanged since a 2012 amendment took effect January 1, 2013. Multi-family residential property, and land under a manufactured- or mobile-home community, fall under that same 11.5%. Because the rate is constitutional rather than local, Johnson County and Wabaunsee County apply the identical percentage -- a county's own assessor sets the market-value estimate and the local mill levy, but never the ratio itself.",

      "[KS] One tax a Kansas closing no longer includes at all is the mortgage registration tax -- once owed whenever a mortgage against Kansas real estate was recorded, phased out starting in 2015, and gone entirely as of January 1, 2019 under K.S.A. 79-3102. A buyer financing a purchase today owes nothing on that line item. The repeal came from an ordinary legislative act rather than a constitutional amendment, which matters for how durable it is -- a future legislature could in principle revisit the statute, and a closing estimate that still lists the fee is simply outdated, not just being conservative.",

      "[KS] When a Kansas homeowner dies owning real estate, the estate generally cannot pass clear title to a buyer until a court resolves who has authority over it, and Kansas draws that line differently than a will's own language does. Under K.S.A. 59-3202, when someone petitions to be appointed administrator or to have a will admitted to probate, a Kansas court itself decides whether the estate is administered as a simplified estate or a supervised estate, weighing the estate's size, the heirs' degree of kinship, its solvency, its nature, the heirs' own wishes, and the probable cost of administering it. A large estate, heirs who disagree, or an estate of uncertain solvency all push toward the supervised track; a small, straightforward estate with agreeable heirs is more likely to qualify as simplified.",

      "[KS] Put the pieces together and a Kansas homeowner facing financial pressure often has more time, and more protection, than assumed. A judicial foreclosure generally takes months to reach a sale in the first place. An owner with real equity -- specifically, one whose total liens fall under one-third of the property's market value -- keeps the full twelve months to redeem after that sale regardless of how early the default happened. And the homestead exemption behind that same property has no dollar limit at all. An owner carrying real equity, an uncapped homestead exemption, and a full twelve months of redemption time is frequently better off not selling to us at all -- refinancing, negotiating directly with the lender, or simply listing the property once things stabilize is very often the better outcome for that specific combination of circumstances.",

      "[KS] The same caution applies to the property-tax side of the picture. A rising assessed value reflects the fixed 11.5% ratio applied to a new market-value estimate, not a change in the ratio itself, and accepting a fast, as-is cash sale purely to escape that increase trades the property away for a problem that a challenge to the underlying valuation, not a change of ownership, is what actually addresses. Selling faster does not lower the 11.5% figure and does not undo whatever estimate the county assessor already set.",

      "[KS] A Kansas seller who wants the full detail behind any one of these topics -- exactly how the twelve-month and three-month redemption windows are calculated for a specific sale, how the uncapped homestead exemption actually gets claimed in a pending case, or how a court decides between a simplified and a supervised estate -- will find the redemption question covered in depth on this site's Kansas redemption-rights page, with the remaining topics covered on their own dedicated pages elsewhere on this site rather than compressed into a single summary on this one.",

      "[KS] A property tax sale for unpaid taxes is a separate process from a mortgage foreclosure, triggered by delinquent taxes rather than a missed loan payment and running through the county treasurer's office rather than a court overseeing a mortgage default. This page and the rest of this site have not verified Kansas's specific tax-sale redemption timeline closely enough to state it with confidence, and an owner facing that situation should go directly to the county treasurer's office where the property sits rather than assume any figure quoted informally is correct.",

      "[KS] None of this is legal advice, and Kansas probate in particular is an area where a lawyer is often genuinely necessary -- whether a specific estate is likely to be treated as simplified or supervised depends on the actual heirs, the actual estate, and how a specific court weighs the statutory factors, not on a general description of the two tracks. A homeowner who is not sure where a specific property, sale, or estate stands under Kansas law should talk to a Kansas attorney before assuming any of the topics above resolves itself on its own timeline.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-probate-simplified"],
    ],
  },
};
