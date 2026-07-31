import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * Wave 0C -- the first eight county hub pages, the largest counties in this
 * site's 53-county footprint by population. These are children of the two
 * state hubs (`src/data/state-hub-content.ts`): Missouri law lives on the
 * four Missouri county pages here, Kansas law on the four Kansas county
 * pages, and neither state's law is asserted on the other's page. Same rules
 * as every content map before this one -- every paragraph asserting law
 * carries `[MO]` or `[KS]`, every legal assertion traces to an entry in
 * `citations` rather than being retyped, and no deictic stand-in for a named
 * state appears anywhere. See docs/CITATION-LEDGER.md for what backs each
 * citation used below.
 *
 * The failure mode this file exists to avoid is a template with the county
 * name swapped in eight times. Each page below leans on something true of
 * that county specifically -- a live reassessment dispute, an uncapped
 * homestead exemption reaching an unusually wealthy tax base, a
 * two-Kansas-Citys naming collision, a university town's rental-heavy
 * housing stock, a farther-out capital-city market, or simply which side of
 * a near-identical population figure a county's own notice schedule falls
 * on -- rather than restating the state hubs' or the state-line silo's own
 * paragraphs. Where a topic is covered in depth elsewhere on this site, this
 * file links to that page by name instead of reproducing it, both to keep
 * these pages honest about what is genuinely different here and to avoid
 * the duplicate-paragraph risk eight siblings on the same legal claims
 * otherwise create.
 */
export const countyContentMetro: Record<string, PageContent> = {
  "sell-my-house-fast-jackson-county-mo": {
    slug: "sell-my-house-fast-jackson-county-mo",
    body: [
      "Jackson County is the anchor of this site's entire Missouri footprint: roughly 718,560 people spread across Kansas City itself and twelve incorporated cities and towns around it -- Independence, Lee's Summit, Blue Springs, Raytown, Grandview, Grain Valley, Oak Grove, Greenwood, Buckner, Sugar Creek, Lone Jack, and Lake Lotawana. The county courthouse sits roughly 14 miles from downtown Kansas City, and no other county in this site's 53-county footprint carries more of its total population or more of its day-to-day real estate activity.",

      "[MO] Every one of those thirteen places sits in Missouri, so a homeowner selling anywhere in Jackson County answers to the same body of Missouri law -- not Kansas law -- regardless of whether the house is in downtown Kansas City or out in Lone Jack near the county's eastern line.",

      "[MO] Jackson County's own recent history matters in a way that a general Missouri overview cannot capture. In an August 6, 2024 order, the Missouri State Tax Commission found that the county's 2023 reassessment skipped required notice and physical inspections on parcels facing increases of 15% or more -- failures the Commission called widespread and systemic, affecting at least 75% of the parcels subject to those requirements -- and directed the county to correct the roll. Jackson County fought that order in court, and on December 30, 2025 the Missouri Court of Appeals, Western District reversed a circuit court's dismissal of the Commission's enforcement suit, letting that suit proceed. That reversal is a ruling that the case may go forward, not a finding that the county's original values were wrong, and the underlying dispute over what a given 2023 assessment should have been remained unresolved as of this page's review.",

      "[MO] A homeowner whose own valuation jumped sharply in 2023 or 2024 has a genuine, still-open process to raise with the county assessor or a property tax attorney, not a settled result to accept either way. The full account of the Commission's order, the litigation, and exactly what the Court of Appeals did and did not decide lives on this site's dedicated Jackson County reassessment page, not repeated at length on this one.",

      "[MO] Because Kansas City itself sits inside this county, a tax question comes up in this county that a smaller Missouri county in this footprint does not raise the same way. Kansas City charges a 1% tax on wages and business net profits earned inside its own city limits, under RSMo 92.111 and the city's own ordinance -- a tax on income, not on the act of selling a house -- and voters renewed it for another five years on April 7, 2026, by an approximate margin reported on election night as well above what the renewal needed. A homeowner selling an ordinary residence anywhere in this county does not owe that tax on the sale itself; who actually owes it, and when, is covered on this site's dedicated Kansas City earnings tax page.",

      "[MO] On the foreclosure side, this county's size decides which notice schedule a trustee's sale in Jackson County has to follow. At roughly 718,560 people, Jackson County clears the 50,000-population line RSMo 443.320 sets by a wide margin, so a trustee's sale on a Jackson County property runs on the slower, twenty-insertion daily-newspaper schedule, not the shorter four-week track a smaller Missouri county elsewhere in this footprint would use.",

      "[MO] The sale itself follows the same trustee-driven process as anywhere else in Missouri: RSMo 443.290 and RSMo 443.327 let a lender's trustee sell a defaulted property directly without ever filing suit, and a narrow one-year redemption right can attach afterward under RSMo 443.410 and RSMo 443.420, but only when the lender itself is the buyer at the sale, written notice of intent to redeem is given, and a surety bond is posted within twenty days. The full mechanics of that timeline are covered step by step on this site's Missouri trustee-sale-timeline page rather than restated on this one.",

      "[MO] Away from foreclosure, the same statewide dollar figures apply to a Jackson County home as anywhere else in Missouri: RSMo 513.475 shields $15,000 of home equity from an unsecured creditor's judgment today, rising to $40,000 on January 1, 2027 under a bill already signed into law, and RSMo 137.115 assesses an ordinary Jackson County home, like any other Missouri subclass (1) residential parcel, at 19% of its market value -- a rate the reassessment dispute above is not actually contesting.",

      "[MO] None of that adds up to a reason to take a fast cash offer just because a notice arrived in the mail. An owner disputing a sharp 2023 or 2024 increase has an active process to pursue with the assessor's office, not a foregone conclusion either way. An owner near the January 1, 2027 homestead change has a real reason to ask whether waiting shifts the math. And an owner inside Kansas City itself who is worried about the earnings tax eating into a sale is worried about the wrong tax entirely -- it does not reach an ordinary home sale.",

      "[MO] The thirteen cities in this county are not interchangeable for a seller weighing options, either. Independence and Lee's Summit are large enough to carry substantial resale markets of their own; Grain Valley, Oak Grove, and Buckner sit farther out along the county's eastern edge; and small lake communities like Lake Lotawana and Greenwood carry their own zoning and access quirks a countywide summary cannot capture -- a homeowner in any of them is still working under the same Missouri statutes described above, but the practical path to a sale can look different city to city.",

      "None of this is legal advice, and a Jackson County homeowner disputing an assessment, weighing a notice of trustee's sale, or settling an estate that owns a house in this county should talk to a Missouri attorney before assuming any one of these topics resolves itself on its own timeline -- particularly the reassessment dispute, which is still working through the courts and does not yet have a final answer.",
    ],
    claims: [
      citations["jackson-county-reassessment"],
      citations["kcmo-earnings-tax"],
      citations["mo-notice-period"],
      citations["mo-nonjudicial"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
    ],
  },

  "sell-my-house-fast-johnson-county-ks": {
    slug: "sell-my-house-fast-johnson-county-ks",
    body: [
      "Johnson County, Kansas is the second-largest county in this site's entire 53-county footprint and by a wide margin the wealthiest, spanning Overland Park, Olathe, Lenexa, Leawood, Gardner, Spring Hill, De Soto, and Edgerton across roughly 622,237 people, about 20 miles from the Kansas City core. Home values and household incomes across this county run well above most of the rest of this site's footprint, and that difference changes the honest answer to whether a fast cash sale even makes sense for a lot of homeowners in this county specifically.",

      "[KS] Every city above sits in Kansas, so Johnson County follows Kansas law start to finish -- no Missouri statute, no Missouri court, and no Missouri redemption period applies to a house anywhere in this county, regardless of how close Overland Park sits to the state line.",

      "[KS] The single Kansas rule that reaches more homeowners in this county than in any other county in this footprint is the county's own holding period on tax-foreclosed property. Under K.S.A. 79-2401a, when a Kansas county bids off real estate at a tax foreclosure sale, it has to hold that property before pursuing a further sale -- two years in the ordinary case, but three years specifically when the property is a homestead under Section 9 of Article 15 of the Kansas Constitution. This county carries more owner-occupied homestead property, and more total assessed value riding on that three-year figure, than any other Kansas county in this footprint.",

      "[KS] That three-year window compounds with a second Kansas rule that also lands unusually hard on this county: the homestead exemption in Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shields an eligible homestead from a forced sale under any process of law with no dollar limit on its value at all. An owner in this county sitting on a home worth well above this county's own already-high average keeps every dollar of that value out of an unsecured creditor's reach, not just a capped slice of it the way an owner across the state line in Missouri would.",

      "[KS] Put the county holding period and the uncapped exemption together and a homeowner in this county with real equity is often better protected against losing that equity than almost anyone else in this footprint. An owner behind on an unsecured debt, not a mortgage, can frequently keep the entire home out of a creditor's reach through the homestead exemption alone, and an owner facing a county tax foreclosure specifically gets three full years, not two, before the county even moves toward a sale on a qualifying homestead. That combination frequently means the right move for an owner facing financial pressure in this county is not selling to us at all -- refinancing, negotiating directly with a creditor or the county treasurer, or simply relying on the exemption's own protection is often the better outcome given how much local law already shields.",

      "[KS] Separately from a tax sale, an ordinary mortgage default in this county still runs through the judicial process K.S.A. 60-2410 and K.S.A. 60-2415 require everywhere in Kansas -- a lawsuit, a sheriff's sale, and a judge's confirmation -- followed by a twelve-month right to redeem under K.S.A. 60-2414, sometimes shortened to three months for a heavily leveraged owner who defaults early. The full mechanics of that redemption window, including exactly how the twelve-versus-three-month line gets drawn, are covered on this site's Kansas right-of-redemption page rather than repeated in this summary.",

      "[KS] The tax-sale process is a different animal from that mortgage-foreclosure timeline, and the two should not be confused. Once a tax foreclosure sale in this county is actually held, K.S.A. 79-2803 cuts off redemption entirely -- there is no twelve-month window afterward the way a mortgage default gets. Everything that protects an owner in this county on the tax side happens before that sale, principally through the two- or three-year county holding period described above, not after it.",

      "[KS] The eight cities in this county are not one uniform market. Overland Park and Olathe are large enough to carry substantial resale activity on their own; Leawood sits among the highest-value residential areas in this entire footprint; and Gardner, Spring Hill, De Soto, and Edgerton, while still bound by this county's own tax and exemption rules, sit farther from the built-up core and trade at different price points and paces.",

      "[KS] Property tax assessment runs on the same fixed 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets for every Kansas county in this footprint, but because home values in this county run well above the footprint's average, that identical percentage produces a meaningfully larger assessed value -- and a larger tax bill -- than the same ratio produces on a comparable home in a smaller Kansas county nearby. The 11.5% figure itself never changes; what changes is the market-value estimate the county assessor sets underneath it, and in this county that estimate tends to run higher than almost anywhere else in this footprint.",

      "[KS] None of the above means every seller in this county should decline a cash offer. An owner without much equity left after the mortgage and liens are counted, an estate needing a fast and uncomplicated close, or a property with real repair needs a conventional buyer's lender will not finance can still find a cash sale the sensible answer in this county -- the point is that this county's wealth and its unusually protective rules mean that decision deserves a genuine look at what is actually at stake before assuming a quick sale is the default.",

      "[KS] None of this is legal advice. Whether a specific property actually qualifies as a homestead under the constitutional definition, and how this county's own tax-sale timeline applies to a specific parcel, are questions for a Kansas attorney or the county treasurer's office directly, not a general description of countywide rules.",
    ],
    claims: [
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-homestead"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-assessment-115"],
    ],
  },

  "sell-my-house-fast-clay-county-mo": {
    slug: "sell-my-house-fast-clay-county-mo",
    body: [
      "Clay County anchors the Missouri Northland -- the cluster of suburbs and small cities on the north side of the Missouri River, across from Kansas City's older core. Roughly 259,772 people live across ten cities and towns: Liberty, Gladstone, North Kansas City, Smithville, Kearney, Excelsior Springs, Claycomo, Riverside, Pleasant Valley, and Lawson, spread about 17 miles from downtown Kansas City at this county's southern edge.",

      "[MO] Every one of those ten places sits in Missouri, so Clay County follows the same statewide Missouri rules as Jackson County to the south -- but unlike Jackson County, none of this county's own cities is Kansas City itself, so the 1% earnings tax that RSMo 92.111 and the city's own ordinance impose inside Kansas City's limits does not reach an ordinary sale or a resident's wages in this county just because it borders Kansas City. A resident of this county who happens to work inside Kansas City limits can still owe that tax on wages earned there, but living in or selling a house anywhere in Clay County does not trigger it on its own.",

      "[MO] Clay County has also not been part of the notice-and-inspection dispute that has followed Jackson County's 2023 reassessment through the State Tax Commission and the Missouri Court of Appeals -- that litigation, covered in depth on this site's Jackson County reassessment page, concerns Jackson County's own assessment roll specifically and has no bearing on how a Clay County valuation was set.",

      "[MO] This county still clears Missouri's own population line for trustee's-sale notice, even without a reassessment dispute of its own. At roughly 259,772 people, Clay County is well above the 50,000 threshold RSMo 443.320 sets, so a trustee's sale in Clay County runs on the slower twenty-insertion daily-newspaper schedule -- the same schedule Jackson, Platte, and Cass Counties all use, and a longer one than several smaller Missouri counties elsewhere in this footprint follow.",

      "[MO] Beyond that notice schedule, a Clay County trustee's sale follows the same statewide process as anywhere else in Missouri: RSMo 443.290 and RSMo 443.327 let a trustee sell the property directly on default without a lawsuit, and RSMo 443.410 and RSMo 443.420 attach a narrow one-year redemption right afterward only when the lender itself buys at the sale, notice of intent to redeem is given, and a full bond is posted within twenty days. This site's Missouri trustee-sale-timeline page walks through that sequence in full; it is not repeated on this one.",

      "[MO] The same statewide dollar figures apply to a Clay County home as anywhere else in the state: $15,000 of equity is shielded from an unsecured creditor's judgment under RSMo 513.475 today, rising to $40,000 on January 1, 2027 under an already-signed law, and an ordinary residential parcel in Clay County is assessed at 19% of its market value under RSMo 137.115, the same rate applied county-wide across Missouri regardless of a county's own population or growth rate.",

      "[MO] A Clay County property sold for delinquent taxes rather than a missed mortgage payment follows RSMo 140.340's separate one-year absolute right of redemption, plus a further defeasible right that continues until the tax-sale purchaser actually gets the collector's deed -- a different process, and a different timeline, from the trustee's-sale redemption described above, and one that should not be assumed to carry the same four conditions.",

      "[MO] The Northland's own cities differ from each other more than a single Clay County summary can capture. Liberty and Gladstone are large, established suburbs with long-running resale markets; North Kansas City is a small, largely commercial-and-residential city squeezed between the river and the interstate; Excelsior Springs carries its own historic small-town character built around a former resort economy; and Smithville, Kearney, Claycomo, Riverside, Pleasant Valley, and Lawson range from growing bedroom communities to small, quiet towns with far less turnover.",

      "[MO] Probate works the same way for a Clay County house as it does everywhere else in Missouri, and it decides who can actually sign a deed before a sale closes. Under RSMo 473.780, a personal representative can skip most day-to-day court oversight when a will authorizes doing so, or when the will allows it and every heir signs off -- otherwise, the estate proceeds under supervised administration, where the probate court's approval attaches to major steps, selling the house among them.",

      "[MO] A Clay County closing carries no state or local transfer tax, a rule voters wrote into the Missouri Constitution back in 2010 rather than leaving it to an ordinary statute. Amendment 3, now Article X, Section 25, keeps the state, every county, and every other political subdivision from ever creating a new tax on the sale or transfer of real estate, so a seller in Clay County compares a cash offer against a normal listing on price and timeline alone, without a transfer-tax line item entering the math the way it might on a Kansas closing statement.",

      "[MO] None of the above makes a fast cash sale automatically right for a Clay County seller. An owner with time before a notice of trustee's sale is even published usually does better bringing a loan current, negotiating directly with the lender, or listing through a realtor at full market value; an owner facing a delinquent-tax sale has a full year, and often longer, to redeem under RSMo 140.340 before that option closes; and an owner near the January 1, 2027 homestead change has a real reason to ask whether waiting changes the calculation, the same as anywhere else in Missouri.",

      "None of this is legal advice. A Clay County homeowner facing a specific notice, tax sale, or estate question should talk to a Missouri attorney who can look at the actual paperwork, rather than relying on a countywide overview like this one.",
    ],
    claims: [
      citations["mo-notice-period"],
      citations["mo-nonjudicial"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["kcmo-earnings-tax"],
      citations["jackson-county-reassessment"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
    ],
  },

  "sell-my-house-fast-shawnee-county-ks": {
    slug: "sell-my-house-fast-shawnee-county-ks",
    body: [
      "Shawnee County sits apart from the rest of this site's Kansas footprint in one obvious way: distance. At roughly 63 miles from the Kansas City core, it is the farthest large county in this entire footprint, built around Topeka -- the Kansas state capital -- along with three much smaller communities: Auburn, Rossville, and Silver Lake. Roughly 177,746 people live across those four places, making Shawnee the third-largest Kansas county in this site's footprint even at that distance.",

      "[KS] Every one of those four places sits in Kansas, so the same statewide Kansas rules covered elsewhere on this site apply in full -- but a sale in this county is not really competing in the same market as a house in Overland Park or Kansas City, Kansas. State government employment anchors much of Topeka's own economy in a way none of the closer-in Kansas counties in this footprint share, and a homeowner in Shawnee County is often selling into a slower, less competitive resale market than the metro core sees.",

      "[KS] A mortgage default in this county runs through the same judicial process every Kansas county follows: K.S.A. 60-2410 requires a lawsuit ending in a judgment, K.S.A. 60-2415 requires the district court to confirm the sheriff's sale before a deed issues, and K.S.A. 60-2414 then gives a defendant owner twelve months to redeem afterward, shortened to three months only when the owner defaulted early and is heavily leveraged. This site's Kansas right-of-redemption page covers exactly how that three-month carve-out works; it is not repeated at length in this summary.",

      "[KS] A delinquent-tax sale in this county works differently from that mortgage timeline, and the difference matters because the deadlines run in opposite directions. Under K.S.A. 79-2803, redemption on a tax foreclosure is only available before the sale itself, not after it, and Kansas courts have held that no redemption right survives once that sale is held. Before that point, though, K.S.A. 79-2401a still gives the county its own multi-year holding period on property it bids off -- two years generally, three for a qualifying homestead -- before it moves toward a further sale at all.",

      "[KS] The homestead exemption and the property-tax assessment ratio apply exactly as they do statewide: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead in this county from a forced sale with no dollar cap on its value, and Article 11, Section 1 of the Kansas Constitution assesses an ordinary residential home in Shawnee County, as everywhere in Kansas, at 11.5% of its market value -- the same figure Johnson County or Wyandotte County applies, with only the local market-value estimate and mill levy actually varying county to county.",

      "[KS] An inherited house in this county still has to clear the same K.S.A. 59-3202 test every Kansas estate goes through -- a court decides whether the estate is administered as a simplified or a supervised estate, weighing its size, the heirs' agreement, its solvency, and the probable cost of settling it, rather than a will alone deciding the answer the way one can in Missouri.",

      "[KS] Topeka itself, at roughly 125,000 people, accounts for the large majority of this county's population and its own resale activity, while Auburn, Rossville, and Silver Lake are small communities with far fewer transactions in a given year, longer time-on-market when a house does list, and buyer pools that look nothing like Topeka's own. A homeowner in one of those three smaller towns is working from a genuinely different set of comparable sales than a Topeka seller, even though the same Kansas statutes above apply equally to both.",

      "[KS] A buyer financing a purchase anywhere in this county also owes nothing under the old Kansas mortgage-registration tax, since K.S.A. 79-3102 was fully repealed effective January 1, 2019 -- the same repeal that reaches a closing in Topeka itself or in one of the three smaller communities around it.",

      "[KS] Topeka's own economy leans more heavily on stable, salaried state and public-sector employment than the faster-churning private job growth driving Johnson County or the closer-in metro core, and that steadier but slower-growing base is part of why home values and turnover in this county trend behind the metro's own pace. A homeowner weighing how long a listing might sit on the market in this county should expect a longer runway than in Overland Park or Lenexa -- not because the Kansas statutes above differ, but because the local buyer pool is smaller and moves less quickly.",

      "[KS] None of the distance or the slower market above means a fast cash sale is the obvious answer for a seller in this county. An owner with real equity and no urgent deadline is generally still better off listing through a realtor and letting the local market -- slower than the metro core, but not without buyers -- run its course, particularly for a well-maintained home inside Topeka itself. A cash sale becomes worth serious consideration mainly for a property that would sit a long time in a smaller-town market, needs repairs a conventional lender will not finance, or is tied to an estate or deadline that cannot wait out a longer listing period.",

      "[KS] None of this is legal advice. A Shawnee County homeowner facing a foreclosure notice, a tax sale, or a probate question should talk to a Kansas attorney who can look at the actual documents for that property, not a general description of statewide rules.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-probate-simplified"],
      citations["ks-mortgage-reg-tax"],
    ],
  },

  "sell-my-house-fast-wyandotte-county-ks": {
    slug: "sell-my-house-fast-wyandotte-county-ks",
    body: [
      "Wyandotte County is home to Kansas City, Kansas -- a separate city, in a separate state, from Kansas City, Missouri, despite sharing almost the same name and sitting less than 10 miles from the Missouri city's own downtown. Roughly 165,281 people live across this county's twelve cities: Kansas City itself, Bonner Springs, Edwardsville, Fairway, Lake Quivira, Merriam, Mission, Mission Hills, Prairie Village, Roeland Park, Shawnee, and Westwood.",

      "[KS] That name overlap causes real confusion for a homeowner trying to work out which state's law applies to a specific address, and the answer is unambiguous: every one of the twelve cities above sits in Wyandotte County, Kansas, not Missouri, so Kansas law -- not Missouri law -- governs a foreclosure, a redemption period, a homestead exemption, or a property tax assessment on a house in this county, regardless of how many times \"Kansas City\" appears on a piece of mail addressed to it. A seller who assumes Missouri's trustee-sale process or its one-year redemption right governs a sale in this county, because the city is named Kansas City, is working from the wrong state's rules entirely.",

      "[KS] A mortgage default in Wyandotte County runs through Kansas's judicial process, not a Missouri-style trustee's sale: K.S.A. 60-2410 requires a lawsuit ending in a judgment, K.S.A. 60-2415 requires the district court to confirm the sheriff's sale, and K.S.A. 60-2414 then gives a defendant owner twelve months to redeem afterward -- sometimes shortened to three months for an owner who defaulted early with little equity at stake. No trustee named in a deed in this county has the power to sell a property outright the way a Missouri deed of trust allows just across the state line.",

      "[KS] The same uncapped Kansas homestead exemption applies in this county as anywhere else in the state: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale regardless of its dollar value, and Article 11, Section 1 of the Kansas Constitution assesses an ordinary Wyandotte County home at 11.5% of its market value -- the same ratio Johnson County or Shawnee County applies, with the local assessor setting only the underlying market-value estimate.",

      "[KS] A buyer financing a purchase in this county also pays nothing under the old Kansas mortgage-registration tax, since K.S.A. 79-3102 was fully repealed effective January 1, 2019 -- a cost that no longer shows up on a Kansas closing statement anywhere in this state.",

      "[KS] A delinquent-tax sale in this county works on the same before-the-sale-only redemption structure as everywhere else in Kansas: K.S.A. 79-2803 cuts off redemption once the sale itself is held, while K.S.A. 79-2401a gives the county its own two- or three-year holding period on property it bids off before pursuing that sale at all.",

      "[KS] The twelve cities in this county vary enormously in size and character. Kansas City itself carries the large majority of this county's population and its industrial and urban core; Bonner Springs and Edwardsville sit farther out along the Kansas River; and a cluster of small, closely built suburbs -- Mission, Mission Hills, Westwood, Fairway, Roeland Park, Merriam, Prairie Village, and Shawnee -- ring the Kansas side of the metro's inner core, several of them among the smallest and most established residential communities in this entire footprint. Lake Quivira, a private gated community built around its own lake, is unlike any other place on this county's list.",

      "[KS] An inherited house in this county still has to clear Kansas's own probate test before it can be sold with clear title. Under K.S.A. 59-3202, a court -- not the will alone -- decides whether the estate is administered as a simplified estate or a supervised estate, weighing its size, the heirs' agreement, its solvency, and the probable cost of settling it. A small, uncomplicated estate with agreeable heirs is more likely to qualify as simplified than a larger or contested one.",

      "[KS] Distance sets this county apart from most of the rest of this site's Kansas footprint in the opposite direction from Shawnee County: at roughly 10 miles from the Kansas City core, Wyandotte County is the closest Kansas county in this entire footprint to downtown Kansas City, Missouri, closer even than most of Johnson County's own cities. That proximity is part of why the two-Kansas-Citys naming confusion described above causes more genuine problems in this county than in a Kansas county sitting farther from the line.",

      "[KS] Because every Wyandotte County foreclosure runs through the district court sitting in Kansas City, Kansas, rather than through a trustee acting under a deed of trust, a homeowner who receives a summons or a petition should treat it as the start of a lawsuit requiring a response, not as a notice that simply runs its course the way a Missouri trustee's-sale publication does just across the state line.",

      "[KS] None of the above makes a fast cash sale the right move just because a house sits in a place called Kansas City. An owner with real equity and time is still generally better off confirming the county on a tax statement or plat map, understanding that Kansas's twelve-month redemption window and uncapped homestead protection govern in this county, and weighing a normal listed sale before accepting a discounted cash offer.",

      "None of this is legal advice. A Wyandotte County homeowner who is not sure which city, county, or state a specific address actually falls under should confirm it directly against a parcel number or tax statement -- not against the name on the mailing address -- before assuming which state's rules apply, and should talk to a Kansas attorney about anything time-sensitive.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-douglas-county-ks": {
    slug: "sell-my-house-fast-douglas-county-ks",
    body: [
      "Douglas County is a genuinely different kind of market from the rest of this site's Kansas footprint, built around Lawrence -- home to the University of Kansas -- along with Eudora and Baldwin City. Roughly 120,553 people live across those three cities, about 41 miles from the Kansas City core, and the university's presence shapes this county's housing stock in a way no other county in this footprint shares.",

      "[KS] All three cities sit in Kansas, so the same statewide Kansas rules -- judicial foreclosure, a twelve-month redemption window, an uncapped homestead exemption, and an 11.5% assessment ratio -- apply exactly as they do in Johnson or Wyandotte County. What differs is not the law itself but how often it actually comes into play, because a large share of this county's housing is rented out to students and university staff rather than owner-occupied.",

      "[KS] That rental-heavy profile matters most for the homestead exemption specifically. Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 protect a homestead -- an owner's own residence, or a qualifying manufactured home, or up to 160 acres of farmland -- from a forced sale with no dollar limit on value, but that protection belongs to an owner living in the property, not to a landlord who owns a Lawrence rental house occupied by tenants. An owner in this county selling a non-owner-occupied rental should not assume the same uncapped protection an owner-occupied home in the same county would carry against an unsecured creditor's judgment.",

      "[KS] A mortgage default on a property in this county, rental or owner-occupied, still runs through Kansas's judicial process everywhere in the state: a lawsuit and judgment under K.S.A. 60-2410, a court-confirmed sheriff's sale under K.S.A. 60-2415, and then a twelve-month redemption right under K.S.A. 60-2414, sometimes shortened to three months for an early, highly leveraged default. This site's Kansas right-of-redemption page walks through exactly how that three-month carve-out is calculated; it is not repeated on this one.",

      "[KS] Property tax assessment follows the same statewide 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets for every Kansas county in this footprint, applied to whatever market-value estimate the county assessor sets for a specific parcel -- a rental duplex near campus and a single-family home in Eudora are assessed at the identical 11.5% ratio, even though the underlying market values, and the rental income behind one of them, look nothing alike.",

      "[KS] A landlord selling a rental in this county to an investor buyer should also know that Kansas places its broader material-defect disclosure duty on the real estate licensee representing the seller, not on the seller directly, under K.S.A. 58-30,106 -- a licensee has to disclose adverse material facts actually known, including physical condition and title defects, to a buyer who is a customer rather than a client. That duty runs through the agent handling the sale, and it applies the same way whether the property is owner-occupied or a long-term rental.",

      "[KS] Lawrence itself, at roughly 96,000 people, is by far the largest of the three cities and carries a resale market driven heavily by the university calendar -- turnover often clusters around the academic year in a way a purely residential Kansas suburb does not see. Eudora and Baldwin City are smaller, more conventional residential communities with far less of that seasonal rhythm, even though both sit in the same county under the same statutes.",

      "[KS] Owner financing comes up more often in this county than in most of the rest of this footprint, because a share of Lawrence-area buyers -- a recent graduate, a self-employed landlord, or someone rebuilding credit -- cannot always qualify for a conventional mortgage right away. Effective July 1, 2024, the Kansas Contract for Deed Act requires a seller under that kind of arrangement to hold fee simple title free of undisclosed encumbrances, and fixes how much time a defaulting buyer gets before losing the property: 30 days to cure if less than half the purchase price has been paid, 90 days if half or more has. A seller or buyer in this county considering a contract for deed should read this site's dedicated contract-for-deed comparison page before signing one, rather than relying on this summary alone.",

      "[KS] The same K.S.A. 58-30,106 licensee disclosure duty that reaches an ordinary rental sale in this county also reaches a sale made under a contract for deed -- the licensee representing the seller still owes a buyer-customer disclosure of adverse material facts actually known, regardless of which financing structure the parties choose.",

      "[KS] A landlord in this county with a rental in poor condition, tenants who are difficult to remove, or a lease that runs against a preferred closing date is often a genuinely good candidate for a fast cash sale, since a conventional buyer's lender and a normal listing timeline both tend to struggle with an occupied rental more than with a vacant, owner-occupied home. An owner-occupied Lawrence, Eudora, or Baldwin City home in good condition, with no urgent deadline, is a different story -- the same reasoning that applies to an owner-occupied home anywhere else in this Kansas footprint applies in this county too, and listing it through a realtor is very often the better outcome.",

      "[KS] None of this is legal advice. Whether a specific property actually qualifies as a homestead, and what a specific lease or tenancy means for how quickly it can be sold, are questions for a Kansas attorney familiar with both real estate and landlord-tenant law, not a general description of countywide rules.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-contract-for-deed-act"],
      citations["ks-contract-for-deed-notice-cure"],
    ],
  },

  "sell-my-house-fast-platte-county-mo": {
    slug: "sell-my-house-fast-platte-county-mo",
    body: [
      "Platte County is the smaller of the two Northland counties in this site's Missouri footprint, but at roughly 111,940 people it still comfortably outsizes many other counties in this footprint, spread across four cities: Parkville, Platte City, Weston, and Weatherby Lake, about 22 miles from downtown Kansas City.",

      "[MO] All four of those cities sit in Missouri, so Platte County follows the same statewide Missouri rules as Clay or Jackson County to its south and east -- a trustee-driven, non-judicial foreclosure process rather than a lawsuit, a homestead exemption set by dollar figure rather than acreage, and a fixed statewide assessment ratio -- even though this county's own population and character look quite different from either of its larger neighbors.",

      "[MO] Platte County still clears RSMo 443.320's 50,000-population line for trustee's-sale notice, the same as Clay and Cass Counties, even at a smaller population than either -- 111,940 people is comfortably above that threshold, so a trustee's sale in Platte County runs on the slower twenty-insertion daily-newspaper schedule, not the shorter four-week track a smaller Missouri county elsewhere in this footprint would use.",

      "[MO] Beyond that notice schedule, the sale itself proceeds under the same statewide mechanism as anywhere in Missouri: RSMo 443.290 and RSMo 443.327 let a named trustee sell the property directly on default, with no lawsuit and no judge involved, and a narrow one-year redemption right can attach afterward under RSMo 443.410 and RSMo 443.420 only when the lender is the buyer at the sale, notice of intent to redeem is given, and a bond is posted within twenty days. The step-by-step version of that timeline lives on this site's Missouri trustee-sale-timeline page rather than being repeated on this one.",

      "[MO] The statewide dollar figures apply without modification: RSMo 513.475 shields $15,000 of home equity from an unsecured creditor's judgment today, rising to $40,000 on January 1, 2027 under a bill Missouri has already signed into law, and RSMo 137.115 assesses an ordinary Platte County home at 19% of its market value, the identical rate applied in every other Missouri county in this footprint regardless of size.",

      "[MO] A Platte County property sold for unpaid taxes rather than a missed mortgage payment carries its own separate one-year absolute redemption right under RSMo 140.340, plus a further defeasible right that runs until the tax-sale purchaser actually obtains the collector's deed -- a distinct process from the trustee's-sale redemption above, with none of that redemption's four conditions attached to it.",

      "[MO] This county's own four cities lean smaller and more distinct from each other than a countywide summary suggests. Parkville, sitting along the Missouri River, carries an active small-downtown resale market built around its riverfront and a private university campus; Platte City is the county seat and a modest, steady residential market; Weston is a small historic river town with an older, tighter housing stock; and Weatherby Lake is a small, lake-centered residential community organized around private lake access rather than a conventional street grid.",

      "[MO] A house held in a Platte County estate cannot pass to a buyer with clear title until Missouri probate sorts out who is actually authorized to sign for it. RSMo 473.780 allows independent administration -- skipping most ongoing court approval -- when a will authorizes it, or when every heir and devisee consents where the will permits; without one of those two paths, the estate instead proceeds under supervised administration, with the probate court's sign-off required at each major step, including a sale of the property itself.",

      "[MO] Closing on a Platte County sale involves the identical absence of a transfer tax found everywhere else in Missouri -- not because no one has proposed one, but because Missouri voters barred it constitutionally in 2010. Undoing that ban, codified at Article X, Section 25 of the state constitution, would take another statewide vote, not a routine act of the legislature, which is part of why this particular cost is one a Platte County seller can safely leave out of any long-range planning.",

      "[MO] Compared with Clay County immediately to its east, Platte County is smaller in population and more rural in character away from Parkville and Platte City, with more land zoned agricultural or held in larger residential lots -- a difference that matters for a seller because a larger parcel can take longer to market conventionally and often draws a narrower buyer pool than a standard subdivision lot in a denser Clay County suburb.",

      "[MO] That shared twenty-insertion notice schedule is one of the few points where this county's rules run identically to its larger Northland neighbor -- the underlying population figures differ by more than double, but RSMo 443.320 only asks whether a county clears 50,000 people, not by how much, so Clay County's much larger population buys a Clay County seller no faster or slower a notice timeline than a Platte County seller gets.",

      "[MO] None of the above makes a fast cash sale the obvious answer for a seller in this county. An owner with time before a notice of trustee's sale is published usually comes out ahead bringing the loan current, negotiating with the lender, or listing through a realtor -- and that is especially true in Parkville and Weston, where an older or architecturally distinctive home can draw real buyer interest a fast, as-is cash sale would not capture.",

      "[MO] None of this is legal advice. A Platte County homeowner facing a specific foreclosure notice, tax sale, or estate question should talk to a Missouri attorney who can review the actual paperwork for that property rather than rely on a general county overview.",
    ],
    claims: [
      citations["mo-notice-period"],
      citations["mo-nonjudicial"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
    ],
  },

  "sell-my-house-fast-cass-county-mo": {
    slug: "sell-my-house-fast-cass-county-mo",
    body: [
      "Cass County sits at the southern rim of the Kansas City metro's Missouri side, roughly 111,732 people across eight cities: Belton, Raymore, Peculiar, Pleasant Hill, Harrisonville, Garden City, Archie, and Lake Winnebago, about 34 miles from downtown Kansas City at the county's outer edge.",

      "[MO] All eight of those cities sit in Missouri, so Cass County follows the same statewide rules as Clay and Platte Counties to the north -- but Cass sits at the opposite, southern edge of the metro's Missouri side, farther out and still absorbing much of the newer subdivision growth spreading down from Belton and Raymore toward Harrisonville, the county seat.",

      "[MO] At roughly 111,732 people, Cass County clears RSMo 443.320's 50,000-population threshold for trustee's-sale notice by more than double, placing a trustee's sale in Cass County on the same twenty-insertion daily-newspaper schedule that Jackson, Clay, and Platte Counties all use, rather than the shorter weekly track a smaller Missouri county in this footprint follows.",

      "[MO] The sale process itself is the same statewide mechanism as anywhere else in Missouri: RSMo 443.290 and RSMo 443.327 give a named trustee the power to sell a defaulted property directly, without a lawsuit, and RSMo 443.410 and RSMo 443.420 attach a narrow one-year redemption right afterward only when the lender itself buys at the sale, notice of intent to redeem is given, and a bond covering the full debt is posted within twenty days. This site's Missouri trustee-sale-timeline page covers that sequence step by step rather than repeating it in this summary.",

      "[MO] The same statewide dollar figures govern a Cass County home as anywhere in Missouri: $15,000 of equity is shielded from an unsecured creditor's judgment under RSMo 513.475 today, rising to $40,000 effective January 1, 2027 under a law Missouri has already signed, and RSMo 137.115 assesses an ordinary residential parcel in Cass County, as in every other Missouri county in this footprint, at 19% of its market value.",

      "[MO] Delinquent property taxes, rather than a missed mortgage payment, trigger a separate process under RSMo 140.340 -- an absolute right to redeem a Cass County property within one year of a tax sale, plus a further defeasible right that runs until the purchaser actually acquires the collector's deed, distinct from the four-condition redemption right tied to a trustee's sale.",

      "[MO] An inherited Cass County house, like an estate anywhere else in Missouri, generally cannot be sold with clear title until probate resolves who has authority to sign for it. RSMo 473.780 lets the personal representative skip most ongoing court oversight when the will authorizes it, or when the will permits it and every heir consents -- otherwise the estate defaults to supervised administration, with the probate division approving major steps along the way, a sale of estate real estate included.",

      "[MO] No transfer tax reaches a sale in Cass County either, for the same reason none reaches a sale anywhere in Missouri: the state constitution itself, not a statute a future legislature could quietly amend, forbids the state, the county, and any other political subdivision from imposing one. That protection has held since Missouri voters adopted it in 2010, and it applies to a cash sale and a conventional listing exactly alike.",

      "[MO] Unlike the two Northland counties on the opposite side of the metro, Cass County's growth has followed Interstate 49 south from the built-up Jackson County line, and Belton and Raymore in particular have absorbed much of that newer subdivision construction over the past two decades -- a different growth pattern from Clay County's older, more established inner-ring suburbs or Platte County's smaller river towns, even though all three counties answer to identical Missouri statutes.",

      "[MO] Cass County's own connection to Jackson, Clay, and Platte Counties on this specific point comes down to a single number: all four clear RSMo 443.320's 50,000-population mark, so a trustee's sale anywhere in Cass County runs on the same twenty-insertion daily schedule the other three follow, even though Cass County's total population is just under a sixth of Jackson County's and even slightly smaller than Platte County's own count.",

      "[MO] Rapid subdivision growth in Belton and Raymore also means more Cass County parcels are seeing their first assessment as new construction rather than a reassessment of an existing home, but the same 19% ratio under RSMo 137.115 applies to a brand-new subdivision house exactly as it does to an older home in Harrisonville or Pleasant Hill -- growth itself does not change the rate a seller's tax bill is built on, even though it can change the underlying market-value estimate the assessor sets.",

      "[MO] Cass County's eight cities range widely in size and pace. Belton and Raymore, closest to the built-up metro, carry the most active resale markets and the newest subdivision construction; Harrisonville, the county seat, and Pleasant Hill sit farther south with a steadier, more established housing stock; and Peculiar, Garden City, Archie, and Lake Winnebago are considerably smaller, with far fewer transactions and longer time-on-market in a typical year.",

      "[MO] None of the above makes a fast cash sale the default answer for a seller in this county. An owner with time before a trustee's-sale notice is published usually comes out ahead bringing the loan current or listing through a realtor, particularly in Belton or Raymore where buyer demand for newer construction remains strong; an owner working through a Cass County estate has real reason to confirm who actually holds authority to sign before assuming a sale, quick or otherwise, can move forward at all.",

      "[MO] None of this is legal advice. A Cass County homeowner facing a foreclosure notice, a tax sale, or a probate question should talk to a Missouri attorney who can review the specific paperwork, not rely on a general county-level summary.",
    ],
    claims: [
      citations["mo-notice-period"],
      citations["mo-nonjudicial"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
    ],
  },
};
