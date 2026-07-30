import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * The money cluster -- homestead exemption, property tax assessment, the
 * Jackson County reassessment dispute, transfer/mortgage-registration tax,
 * and the Kansas City earnings tax. Same rules as the foreclosure cluster:
 * every paragraph asserting law names exactly one state and carries its
 * `[MO]` or `[KS]` label, and every legal assertion traces to `citations`
 * rather than being retyped. See docs/CITATION-LEDGER.md for what backs each
 * entry -- especially the Addendum, which documents three precision failures
 * already caught in this ledger (a citation that didn't support its claim, a
 * procedural ruling overstated as a merits win, and an unofficial election
 * tally printed as certified). This cluster repeats none of them: the
 * Missouri homestead figure is stated as $15,000 in force today plus the
 * enacted $40,000 change coming 2027-01-01, never as $40,000 now; the Jackson
 * County page states a suit was allowed to proceed, not that the county
 * lost; the KCMO earnings-tax renewal margin is described as an approximate,
 * unofficial figure, not a certified one; and the Kansas assessment page
 * makes no mention of the proposed, unenacted HCR 5011.
 */
export const stateLineContentMoney: Record<string, PageContent> = {
  "homestead-exemption-missouri-vs-kansas": {
    slug: "homestead-exemption-missouri-vs-kansas",
    body: [
      "Missouri and Kansas homeowners who fall behind on debt, face a lawsuit, or end up in bankruptcy are not protected the same way when it comes to keeping the equity built up in a house. Every state draws a line around how much of a home's value a creditor cannot reach, and where that line sits is where Missouri and Kansas pull sharply apart -- a difference large enough to change what a homeowner near the state line decides to do next, including whether selling makes sense at all.",

      "[MO] Missouri's homestead exemption -- the amount of home equity a court cannot award to satisfy an unsecured creditor's judgment -- is set by RSMo 513.475 at $15,000 today. That figure has stood since 2003, and it is the number that applies to a Missouri homeowner facing a judgment or bankruptcy filing right now, not a number that used to apply or is scheduled to apply only in the future.",

      "[MO] That number is scheduled to change, and a Missouri homeowner deciding whether to sell before or after the new year needs both figures, not just one. H.B. 1870, signed into law May 6, 2026 and merged with S.B. 835 and S.B. 1111, raises the exemption to $40,000 effective January 1, 2027, with a triennial cost-of-living adjustment beginning April 1, 2029. The increase is enacted, signed law, not a proposal that might not happen -- but it is also not in force yet. A Missouri owner weighing options today is protected up to $15,000 of equity; the same owner still holding the property after January 1, 2027 is protected up to $40,000, more than double.",

      "[KS] Kansas takes a fundamentally different approach: instead of setting a dollar figure at all, the Kansas Constitution exempts a homestead of up to 160 acres of farming land, or one acre within an incorporated town or city, or a manufactured or mobile home, from forced sale under any process of law -- with no limit on the property's value. Under Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301, a Kansas homeowner on a single eligible city lot is protected no matter how much equity that lot holds, whether that equity is $40,000 or $400,000.",

      "[KS] That is the starkest money difference between the two states covered on this site. A Missouri homeowner with $200,000 of home equity keeps at most $15,000 of it shielded from an unsecured creditor's judgment today, rising to $40,000 in 2027; a Kansas homeowner on a comparably sized city lot keeps all $200,000 shielded, because Kansas law never asks what the lot is worth in the first place. Two owners with the same amount of equity, on opposite sides of the state line, can face entirely different outcomes if an unsecured creditor comes after the house.",

      "A homestead exemption of either kind protects equity from a general creditor's judgment. It does not erase a mortgage, a tax lien, or a mechanic's lien already recorded against the property, and it does not stop a lender who is owed money on the home itself from foreclosing on it. What it protects against is a separate, unsecured creditor trying to force a sale of the house to collect an unrelated debt -- a medical bill, a credit card judgment, a personal loan gone to collections.",

      "[MO] For a Missouri homeowner who is behind on an unsecured debt, not a mortgage, and weighing whether to accept a fast cash sale just to make a creditor go away, the current $15,000 figure is a real number worth running before deciding anything. If the equity at stake is close to or under that amount, a fast sale can hand a creditor money that the exemption would otherwise have kept out of reach entirely. That math shifts again once the $40,000 figure takes effect on January 1, 2027, and an owner close to that date has a real reason to ask whether waiting changes the calculation.",

      "[KS] Selling for cash is even less often the right move for a Kansas homeowner with real equity in a house on an eligible homestead lot. Because Kansas sets no dollar limit at all, a Kansas owner facing an unsecured judgment can often keep the entire property, not just a slice of its value, without selling anything. A fast cash sale in that situation can give up protection Kansas law already provides for free. A Kansas homeowner in this position is frequently better off not selling to us at all, at least not for the purpose of satisfying a creditor who could not have reached the house regardless.",

      "[MO] The exemption also does not apply itself. A Missouri homeowner generally has to claim it in the case where a creditor is trying to reach the property -- it is not something a court applies automatically without being asked, and missing the deadline to raise it in a specific case can matter as much as the dollar figure itself.",

      "[KS] The same is true on the Kansas side. A Kansas homeowner generally has to claim the homestead exemption in the case where a creditor is trying to reach the property, rather than assuming a court will apply it unasked -- the exemption's lack of a dollar cap does not mean it is self-executing.",

      "None of this is legal advice. Whether a specific debt is the kind of unsecured claim an exemption reaches, and how to actually claim it in a pending lawsuit or bankruptcy filing, are questions for a licensed attorney in the state where the property sits, not something to work out from a general comparison of two states' rules.",

      "[MO] A Missouri homeowner who is already being sued, or who is weighing bankruptcy, should raise the homestead question directly with counsel before assuming a fast cash sale is the only way through it -- the $15,000-to-$40,000 change alone can shift what counsel recommends.",

      "[KS] The same applies on the Kansas side, where the stakes of getting the exemption question right before selling can be even higher given how much equity the homestead exemption can shield with no dollar limit at all.",

      "[KS] A Kansas attorney can also confirm whether a specific property actually qualifies as the statutory homestead in the first place -- the 160-acre, one-acre-in-town, and manufactured-home rules above are not automatic for every parcel a homeowner happens to live on, and confirming eligibility before relying on the exemption is worth the conversation.",
    ],
    claims: [citations["mo-homestead"], citations["ks-homestead"]],
  },

  "property-tax-assessment-missouri-vs-kansas": {
    slug: "property-tax-assessment-missouri-vs-kansas",
    body: [
      "Property tax on a home is not calculated on its sale price or its appraised market value directly. A local assessor sets a market value estimate first, then a fixed percentage set by state law is applied to that estimate to produce an assessed value, and it is that lower number, not the market value, that a local tax rate is actually applied to. The percentage itself is where two homes of identical market value, sitting in different states, can end up with very different assessed values before a single tax rate is even applied.",

      "[MO] Missouri assesses subclass (1) residential real property -- the category nearly every single-family home falls into -- at 19% of true value, under RSMo 137.115. That rate took effect January 1, 2026, after House Bill 199 was merged with Senate Bill 4, and 19% is the figure currently in force, not a rate on its way out.",

      "[KS] Kansas assesses residential real property, including multi-family residential property and land under a community of manufactured or mobile homes, at 11.5% of value, under Article 11, Section 1 of the Kansas Constitution. That rate has governed since a 2012 constitutional amendment took effect January 1, 2013, and it remains the figure in force.",

      "[MO] Run an identical market value through Missouri's ratio and the arithmetic is straightforward: a home appraised at $300,000 produces an assessed value of $57,000 -- 19% of $300,000 -- and that $57,000 figure, not the $300,000 market value, is what a local tax rate is then applied to.",

      "[KS] Run that same $300,000 hypothetical through Kansas's ratio and the assessed value comes out meaningfully lower: 11.5% of $300,000 is $34,500. Two homes worth exactly the same amount on paper start from noticeably different assessed values once each state's own ratio is applied, before either county's specific tax rate ever enters the calculation.",

      "[MO] That 19% figure applies the same way to a home in Jackson County, Missouri -- the most populous Missouri county in this site's footprint, at roughly 718,000 people -- as it does to a home in a far smaller Missouri county in the same footprint. The ratio does not vary by county; only the market-value estimate that the county assessor sets, and the local tax rate applied afterward, vary from one Missouri county to the next.",

      "[KS] The same is true across this site's Kansas footprint. Johnson County, Kansas, the most populous Kansas county in that footprint at roughly 622,000 people, applies the identical 11.5% ratio that a far smaller Kansas county in the same footprint applies -- the constitutional rate does not change from one Kansas county to another. What differs county to county is the assessor's market-value estimate and the local mill levy, not the ratio itself.",

      "None of this determines the actual dollar amount of a tax bill by itself. The assessed value produced above is only the base that a local taxing jurisdiction's own rate -- set independently by whatever city, county, school district, and special district a property sits in -- is then applied to. Two homes with an identical assessed value in two different taxing jurisdictions within the same state can still owe different tax bills, because the ratio is only half of the calculation, not the whole of it.",

      "The ratio matters most to a homeowner deciding whether it is worth challenging a new assessed value, or simply planning around it before selling. A percentage-point argument that looks small in the abstract compounds every year property taxes are billed, for as long as the owner keeps the property -- which is part of why an assessment dispute is worth taking seriously rather than dismissing as paperwork.",

      "[MO] A rising Missouri assessed value is not, by itself, a reason to sell. Whether a specific reassessment can be challenged, and how, is a question for a property tax professional or an attorney familiar with the county's own process, not a decision to make from the size of a notice alone -- and not a reason to accept a fast, as-is cash sale before looking into it.",

      "[KS] The same caution applies on the Kansas side. An assessed-value increase reflects the 11.5% ratio applied to a new market-value estimate, not a change in the ratio itself, and whether that new market-value estimate is accurate, and worth disputing, is again a question for a Kansas property tax professional -- not something a general comparison of two states' ratios can answer for a specific parcel.",

      "[MO] Missouri's 19% assessment ratio applies uniformly to subclass (1) residential property regardless of how a specific reassessment came about, including a corrected Jackson County roll if one is ultimately ordered -- the ratio itself is not part of what any pending litigation could change.",

      "[KS] Kansas's 11.5% assessment ratio is likewise fixed by the state constitution rather than by any single county's assessor, so a Kansas homeowner disputing a specific valuation is disputing the market-value estimate underneath that ratio, not the 11.5% figure itself.",

      "Accepting a fast, as-is cash sale purely to escape an assessed-value increase is not the right move for most owners in either Missouri or Kansas, because the ratio itself is fixed by law and does not respond to how quickly a property changes hands. Selling faster does not lower the 19% or the 11.5% figure, and it does not undo whatever market-value estimate the county already set -- it only trades the property away, at a discount, for a problem that a challenge to the valuation, not a change of ownership, is what actually addresses.",

      "None of this is legal or tax advice. An assessment ratio only sets the base a tax bill is calculated from; the questions that actually decide whether a specific assessment is fair, or worth appealing, belong to a licensed tax professional or attorney who can look at the actual notice and comparable properties nearby, not a general side-by-side of two states' percentages.",
    ],
    claims: [citations["mo-assessment-19"], citations["ks-assessment-115"]],
  },

  "jackson-county-reassessment": {
    slug: "jackson-county-reassessment",
    body: [
      "[MO] A county's assessed values do not just sit in a spreadsheet -- disputes over how they were calculated can end up in front of state agencies and courts, and one of those disputes has been playing out around Jackson County, Missouri's 2023 property reassessment for more than two years. What follows is what has actually happened so far, not a summary that assumes how it ends.",

      "[MO] In an August 6, 2024 order, the State Tax Commission of Missouri found that Jackson County's 2023 reassessment process failed to give property owners proper notice and skipped required physical inspections on parcels where the assessed value increased 15% or more -- failures the Commission called widespread and systemic, affecting at least 75% of the parcels subject to those requirements. The order directed the county to correct the 2023 assessment roll so subclass (1) parcel valuations, excluding new construction or improvements, would not exceed a 15% increase since the prior assessment.",

      "[MO] Jackson County contested that order in court rather than complying with it outright, and a circuit court initially dismissed the Commission's suit to enforce the order. On December 30, 2025, the Missouri Court of Appeals, Western District, reversed that dismissal in No. WD87831, holding that the Commission's enforcement suit could go forward.",

      "[MO] That reversal is a ruling that the case may proceed, not a decision on who is right about the underlying reassessment. The Court of Appeals did not rule that Jackson County's 2023 values were too high, or that the Commission's corrected roll must be adopted -- it ruled only that the circuit court was wrong to dismiss the Commission's suit before deciding those questions on the merits. As of this review, the underlying dispute over the 2023 assessed values remains unresolved.",

      "For a Jackson County homeowner, that distinction matters directly. \"The state won\" and \"the case is still active\" point toward different decisions. The first might suggest there is nothing left to do; the second means an owner's own 2023 assessed value, and any tax bill calculated from it, may still be subject to change depending on how the underlying suit and any county-level correction ultimately proceed.",

      "[MO] The reassessment dispute concerns valuation -- what the county said a given home was worth -- not the assessment ratio applied to that value once it is set. Missouri assesses subclass (1) residential property, the category residential homes fall into, at 19% of true value under RSMo 137.115, and that rate is not what the Jackson County litigation is about and did not change as a result of it. A corrected 2023 valuation, if one is ultimately ordered, would still be multiplied by the same 19%, just against a different market-value base.",

      "[MO] Jackson County is the most populous county in this site's Missouri footprint, home to roughly 718,000 people, which is part of why a reassessment dispute there draws more attention than a similar disagreement might in a smaller county -- more parcels, and more owners, are affected by however the litigation and any correction to the roll ultimately resolve.",

      "[MO] The 15% figure at the center of the dispute is worth separating clearly from the 19% assessment ratio discussed above. The Commission's order caps how much a subclass (1) parcel's assessed valuation can rise since its last assessment, absent new construction or improvements -- a limit on the pace of a valuation increase. The 19% ratio is a separate, later step that converts whatever valuation survives that cap into an assessed value. A corrected valuation and an unchanged 19% ratio are two different numbers doing two different jobs in the same tax bill.",

      "[MO] It is also worth being precise about what the Commission's finding covered and what it did not. The order addressed notice and physical-inspection procedure on parcels with a 15%-or-greater increase -- it was not a finding that every 2023 Jackson County valuation was wrong, or that every parcel was affected. An owner whose own parcel did not see an increase anywhere near that threshold is not necessarily covered by the same finding, and confirming that is a question for the assessor's office or an attorney, not an assumption to make from a general summary of the litigation.",

      "[MO] A Jackson County owner unsure whether their own 2023 or 2024 assessed value was affected by the notice and inspection failures the Commission found should raise the question with the county assessor's office or a Missouri property tax attorney directly, rather than assuming either that nothing can be done or that the litigation has already fixed it. Both assumptions are premature while the case remains open.",

      "[MO] None of this makes a fast cash sale the obvious answer. An owner facing an inflated assessed value, and the higher tax bill that comes with it, has other paths available -- raising the issue with the assessor, working with a tax professional on next steps, or waiting to see how the ongoing litigation resolves -- that can address the actual problem rather than trading a home for a fast, as-is price because a tax notice or a headline made it feel urgent.",

      "None of this is legal advice. What effect, if any, the Court of Appeals' December 2025 ruling has on a specific parcel's assessed value is a live question that a Missouri property tax attorney, not a general description of the litigation, is positioned to answer.",
    ],
    claims: [citations["jackson-county-reassessment"], citations["mo-assessment-19"]],
  },

  "transfer-tax-missouri-vs-kansas": {
    slug: "transfer-tax-missouri-vs-kansas",
    body: [
      "A home sale can trigger more than one kind of tax at closing, and two of them are easy to confuse: a transfer tax is charged on the act of transferring title itself, while a mortgage registration tax, where one exists, is charged on recording the loan document that finances a purchase -- a cost tied to borrowing against the property, not to selling it. Whether either tax applies, and how much it costs, depends entirely on which state the property sits in.",

      "[MO] Missouri does not impose a real estate transfer tax, and it constitutionally cannot create one going forward. Article X, Section 25 of the Missouri Constitution -- adopted by voters in 2010 as Constitutional Amendment 3 -- bars the state, counties, and every other political subdivision from imposing any new tax, including a sales tax, on the sale or transfer of homes or any other real estate. A Missouri seller pays no state or local transfer tax at closing, and none can be added later without another constitutional amendment.",

      "[KS] Kansas does not currently impose a mortgage registration tax. The tax, once charged on recording a mortgage against Kansas real estate, was phased down starting in 2015 and fully repealed effective January 1, 2019, under K.S.A. 79-3102. A Kansas buyer financing a purchase with a mortgage recorded today does not pay that particular fee, because the statute that once required it has been off the books for years.",

      "[MO] Missouri's ban is constitutional, not merely statutory, which matters for how durable it is. Amendment 3 went before Missouri voters directly in November 2010 and took effect that December; undoing it would require another statewide vote to amend the constitution again, not a simple act of the legislature. A Missouri seller planning a sale years out does not need to track a legislative session for a transfer-tax bill that might change the math, because no ordinary bill can create one.",

      "[KS] The mortgage registration tax's repeal, by contrast, came through the ordinary legislative process -- a phase-down enacted by the Kansas legislature in 2014, phasing the tax out from 2015 through full repeal effective January 1, 2019. That is a different kind of durability than a constitutional ban: a future legislature could, in principle, revisit the statute, though nothing before this page's review date indicates any effort to do so.",

      "This page does not cover, and takes no position on, any other closing costs, recording fees, or municipal charges tied to a home sale on either side of the state line -- only the two specific tax questions above, which are the two most commonly confused with each other by a seller researching closing costs online.",

      "[MO] For a Missouri seller weighing a fast cash sale against a traditionally listed sale, the closing-cost side of that comparison does not include a transfer tax pulling money away either way, because Missouri does not charge one under either approach. That removes one variable from the comparison; it does not settle the rest of it.",

      "[KS] For a Kansas seller, the same is true of the mortgage registration tax specifically -- it no longer applies to a Kansas closing at all, cash sale or traditional listing, because it has been repealed since 2019. Whatever else affects the math between a cash sale and a listed sale, that particular tax is not one of them.",

      "[MO] Because Missouri charges no transfer tax either way, a Missouri owner comparing a cash offer against listing with a realtor is not choosing between \"pay a tax by listing\" and \"avoid a tax by selling for cash\" -- that tradeoff does not exist under Missouri law. The comparison should rest on price, timeline, and the condition of the home, not a tax cost that was never real to begin with.",

      "[KS] The same logic applies on the Kansas side for the mortgage registration tax question specifically. Since 2019, no Kansas closing pays it, so an owner saves nothing on that particular line item by choosing a fast cash sale over a traditional one. If a cash buyer's pitch leans on avoiding a tax that no longer exists, that reason for accepting a lower price does not hold up.",

      "Property tax, covered in depth on this site's Missouri-versus-Kansas assessment comparison, is a separate, recurring cost tied to owning a home year after year. Transfer and mortgage-registration taxes, by contrast, are one-time costs -- or, in Missouri and Kansas specifically, non-costs -- tied only to the moment of sale or financing, not to ongoing ownership.",

      "[MO] A Missouri seller who has heard, from a cash buyer or elsewhere, that a transfer tax is coming out of the sale proceeds should ask specifically what fee is being described, because it is not a state or local transfer tax -- Article X, Section 25 forecloses that entirely, and a buyer or agent citing one as a reason to accept a lower price is describing something Missouri law does not permit.",

      "[KS] A Kansas seller should apply the same scrutiny to any closing-cost estimate that lists a mortgage registration fee on the seller's side of the ledger. That tax was historically the borrower's cost tied to recording the loan, not a seller's transfer cost, and it has not existed at all since 2019 -- a stale reference to it in a closing estimate is worth questioning directly with whoever produced the estimate.",

      "None of this is tax advice. Actual closing costs vary by county, lender, and title company regardless of what the state constitution or statute does or does not require, and a seller weighing offers should ask a title company or closing attorney for an itemized breakdown of a specific transaction rather than relying on a general description of two states' tax rules.",
    ],
    claims: [citations["mo-transfer-tax-ban"], citations["ks-mortgage-reg-tax"]],
  },

  "kansas-city-earnings-tax": {
    slug: "kansas-city-earnings-tax",
    body: [
      "[MO] Kansas City, Missouri is one of a small number of Missouri cities that charges its own earnings tax on top of state and federal income tax, and a homeowner selling a property inside the city limits, or who works inside them, should understand what the tax actually reaches before assuming it affects a home sale one way or another.",

      "[MO] Under RSMo 92.111 and Kansas City, Mo. Code of Ordinances Section 68-382, the city imposes a 1% tax on wages, salaries, commissions, and other compensation earned by residents, and by nonresidents for work performed inside the city, plus 1% on the net profits of businesses conducted within city limits.",

      "[MO] Nothing in that description reaches the act of selling a house. The earnings tax is a payroll-and-business-income tax, charged on wages and business net profits earned inside the city, not a tax triggered by a real estate closing. An ordinary homeowner selling a primary residence does not owe Kansas City earnings tax on the sale itself merely because the property sits inside city limits.",

      "[MO] The exception worth flagging is for an owner who sells real estate as a business -- a landlord operating rental property as a business enterprise, or a house-flipping operation, for example -- because the tax reaches net profits of a business conducted in the city. Whether a specific sale counts as ordinary personal property or business income for earnings-tax purposes is a fact-specific question a Kansas City tax professional is better positioned to answer than a general description of the ordinance can.",

      "[MO] The tax is not permanent by default. RSMo 92.111 requires a constitutional charter city that already collects an earnings tax to resubmit the question to voters every five years in order to keep collecting it. Kansas City's tax came up for exactly that renewal on April 7, 2026, and voters approved extending it for another five years by a wide margin -- election-night reporting put the margin at roughly three-quarters in favor, though that figure was an unofficial tally, and the certified result, not the election-night number, is the authoritative one.",

      "[MO] The statute behind that renewal requirement, RSMo 92.111, does more than set the resubmission clock -- it is the reason the tax can exist at all as a matter of state law, since a Missouri charter city cannot levy an earnings tax without state authorization. Kansas City's own ordinance, Code of Ordinances Section 68-382, is the local implementation of what the state statute permits, not an independent taxing power the city created on its own.",

      "[MO] Because the statute ties the tax's continued existence to a recurring popular vote rather than a one-time legislative act, a homeowner who wants to know whether the earnings tax will still be in place at some future point has an actual date to check against -- the next scheduled renewal vote -- rather than having to guess at ordinary legislative risk the way a seller might have to with a tax that Kansas or Missouri's own legislature could change in any given session.",

      "[MO] Employers operating within Kansas City generally withhold the 1% wage tax the same way they withhold state and federal income tax, and workers who do not have it withheld directly -- someone self-employed and working in the city, for instance -- generally have to remit it on their own through an annual filing with the city's finance department rather than assuming no one is collecting it.",

      "[MO] Extending the tax for another five years from an April 2026 vote means it is now secured through the next scheduled renewal vote, rather than facing any near-term lapse. For a homeowner deciding whether to sell now or wait, the 2026 renewal removes one kind of uncertainty from the timeline: the tax was not on the verge of expiring partway through an ordinary selling process.",

      "[MO] If a cash buyer's pitch relies on beating some earnings-tax change that isn't actually happening, that particular urgency is not real. The renewal vote already happened, the tax was extended, and nothing about that outcome creates a deadline pressing a seller to accept a fast, as-is offer instead of comparing it against listing the property normally.",

      "[MO] It is worth being precise about who owes the tax at all, separate from where a property sits. A Kansas City resident owes the 1% on wages wherever in the metro that resident works; a nonresident owes it only on wages earned for work actually performed inside the city; someone who lives outside city limits and also works outside them owes none of it, regardless of whether that person happens to own property inside the city.",

      "[MO] Confirming whether a specific property is inside the city limits of Kansas City, Missouri is a separate question from confirming which county or state it sits in, and it is not always obvious from a mailing address alone near the city's edges. A parcel's tax classification, or a call to the city's finance department, is a faster way to confirm it than assuming from a Kansas City address that the earnings tax necessarily applies.",

      "None of this is tax advice. Whether a specific sale, especially one involving rental or investment property, triggers earnings-tax liability on its profit is a question for a Kansas City tax professional who can look at how the property was held and used, not a general description of the ordinance.",
    ],
    claims: [citations["kcmo-earnings-tax"]],
  },
};
