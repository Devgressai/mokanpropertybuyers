import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * Wave 0C, batch 1 -- fourteen tier-3 city pages, the eighth content map.
 * Four of these fourteen (Marshall, Clinton, Maryville, Chillicothe) are
 * genuinely outstate Missouri: small markets with far fewer comparable
 * sales than anywhere else this site covers, and each one says so plainly
 * rather than borrowing the metro's own numbers or pace. Three more
 * (Merriam, Mission, Spring Hill) sit in Johnson County, KANSAS -- never
 * written bare, because a differently named Johnson County, MISSOURI
 * exists roughly 65 miles away with the opposite foreclosure procedure and
 * opposite money rules, and a published page on this site has already
 * shipped that exact mistake once before it was caught. Smithville (Clay
 * and Platte Counties) and Excelsior Springs (Clay and Ray Counties) each
 * straddle a county line; both name the second county for what it actually
 * determines -- the courthouse and the tax-sale process for the sliver
 * across that line -- without treating it as this page's own primary
 * county, which stays whatever CityDef.countySlug in geography.ts says.
 *
 * Four of this batch's counties (Clay, Johnson KS, Cass) already carry a
 * hub page in county-content-metro.ts, and every city below that sits in
 * one of those three links to it by name instead of re-deriving the same
 * statute mechanics a fourth, fifth, or sixth time. The remaining counties
 * -- Saline, Franklin, Leavenworth, Atchison, Ray, Nodaway, Miami (KS), and
 * Livingston -- carry no hub page in the registry as of this map's own
 * commit (see the per-page note on each), and each of those pages says so
 * rather than pointing at a page that is not actually there yet.
 *
 * Same binding rules as every content map before this one: every paragraph
 * asserting law carries `[MO]` or `[KS]`, never both; every legal assertion
 * traces to a real entry in `citations` rather than being retyped from
 * memory; and no deictic stand-in for a named state, or for "this city" as
 * a substitute for one, appears anywhere. Every citation description below
 * is worded fresh for this map -- not copied from county-content-metro.ts
 * or either tier-1/tier-2 city map -- because the exhaustive duplication
 * gate checks every 160-character window across the whole registry, not
 * just within this file.
 */
export const cityContentTier3a: Record<string, PageContent> = {
  "sell-my-house-fast-marshall-mo": {
    slug: "sell-my-house-fast-marshall-mo",
    body: [
      "Marshall is the county seat of Saline County, a west-central Missouri city of roughly 13,642 people about 73.8 miles from the metro's core. Missouri Valley College, a small private college founded in 1889, sits inside city limits, and Van Meter State Park -- built around what the state considers one of Missouri's most significant Indigenous village sites, tied to the Otoe-Missouria's own ancestral homeland -- lies a few miles northwest along the Missouri River bluffs.",

      "[MO] Every acre of this city sits in Missouri, inside Saline County, so Missouri law reaches a house sale in this city start to finish -- but this is a genuinely different kind of Missouri market than Jackson, Clay, or Cass County. Fewer buyers are actively shopping in Marshall on any given week, fewer comparable recent sales exist to price against, and a listing can sit for a materially longer stretch than the same house would in the metro core.",

      "[MO] A missed mortgage payment on a house in this city still triggers the identical statewide mechanism every Missouri county uses -- RSMo 443.290 gives a named trustee the power of sale, and RSMo 443.327 lets that trustee carry the sale out directly, with no lawsuit filed at any point. What differs is the notice schedule: Saline County's population, roughly 23,049, falls well under the 50,000-person line RSMo 443.320 draws, so notice preceding a trustee's sale in this city runs in a weekly newspaper for four successive issues rather than the twenty daily insertions a metro-area sale requires, with the last of those four issues published no more than a week before the sale itself.",

      "[MO] Redemption after that sale, when it happens at all, depends on RSMo 443.410 and RSMo 443.420 lining up three separate facts together -- the buyer at the sale has to be the lender itself rather than an outside investor, the borrower has to give written notice of an intent to redeem, and a bond covering the full debt has to be posted within twenty days. Absent all three, nothing is left to redeem, in Marshall exactly as anywhere else in the state.",

      "[MO] The statewide dollar figures apply to a house in this city without any small-county discount -- RSMo 513.475 currently shields $15,000 of home equity from an unsecured creditor's judgment, rising to $40,000 on January 1, 2027 under an already-signed law, and RSMo 137.115 assesses an ordinary residential parcel in Marshall at 19% of its market value, the identical statewide ratio a much larger county applies.",

      "[MO] Unpaid property taxes, separate from a missed mortgage payment, send a house down RSMo 140.340's own track instead -- a full, unconditional year to redeem measured from the tax sale itself, plus a weaker right that survives even past that year until the purchaser actually collects the deed.",

      "[MO] No dedicated Saline County hub page exists yet in this site's registry, so a seller in Marshall looking for county-level depth behind these figures should treat the statewide Missouri pages as the fuller reference for now rather than a county page that is not yet part of this footprint.",

      "[MO] An heir inheriting a house in Marshall still has to clear the same probate question every Missouri estate faces before a sale can close. RSMo 473.780 opens the door to independent administration -- skipping most routine court sign-off -- when the will authorizes it, or permits it with every heir's consent; short of either, supervised administration takes over and the probate division reviews a sale of the house alongside every other major step.",

      "[MO] Closing on a Marshall house carries no state or local transfer tax, the same constitutional bar every Missouri city in this footprint relies on -- Article X, Section 25 of the Missouri Constitution has kept the state, Saline County, and this city itself from creating one since Missouri voters adopted it in 2010.",

      "[MO] A seller in Marshall who knows a specific house was ever used to produce methamphetamine still has to disclose that fact in writing under RSMo 442.606, and separately disclose in writing if the seller knew or should have known the property once housed, stored, or supplied someone convicted of a related offense -- a duty that reaches an older farmhouse on the edge of town exactly as it reaches a newer subdivision closer to the college.",

      "Slater and Sweet Springs share Saline County with Marshall, both considerably smaller and slower-turnover towns than the county seat itself -- a difference in scale within the same county, not in which state's statutes reach any of the three.",

      "[MO] The trade-off cuts both ways in a market this size: fewer active buyers means a house can sit unsold for months once listed, but it also means less competitive pressure pushing a seller toward an unnecessarily fast decision. An owner in Marshall with no pressing foreclosure notice or estate deadline is usually still better off listing through a realtor and letting that slower market run its course, even if the calendar looks longer than it would in the metro.",

      "A cash sale earns real consideration in Marshall specifically when that slower pace becomes the actual problem -- an estate that needs to close before a fixed date, a house carrying repair needs no conventional lender in a small market like this one will finance, or an owner already behind on payments with a trustee's-sale notice bearing down. Outside those situations, this city's genuinely thin buyer pool is a reason to plan for extra time, not a reason to skip the market altogether.",

      "[MO] None of the above is legal advice, and a small-county foreclosure notice, tax bill, or probate filing touching a Marshall property deserves a Missouri attorney's own review of the actual paperwork -- a general description of statewide rules, however accurate, does not substitute for that.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-ottawa-ks": {
    slug: "sell-my-house-fast-ottawa-ks",
    body: [
      "Ottawa is the county seat of Franklin County, roughly 12,686 people about 50.5 miles from the metro's core, sitting directly on the Interstate 35 corridor between Kansas City and Wichita. Ottawa University, founded in 1865 on land tied to the Ottawa Nation's own history in this part of Kansas before the tribe's removal to Indian Territory, still anchors the west side of the city today.",

      "[KS] Every part of this city sits in Kansas, inside Franklin County, so a house sale in Ottawa answers to Kansas's statewide statutes throughout -- the same judicial foreclosure process, the same homestead rule, and the same tax-sale mechanics reaching every other Kansas city in this footprint, this county's own position on the interstate notwithstanding.",

      "[KS] A missed mortgage payment on a house in Ottawa still requires the lender to go to court, not simply act on its own: K.S.A. 60-2410 requires a judgment first, K.S.A. 60-2415 then requires a district judge to confirm the resulting sheriff's sale, and only after that confirmation does K.S.A. 60-2414 start the owner's own redemption clock -- twelve months as the ordinary rule, cut to three when an early default hit a loan still carrying most of its original balance.",

      "[KS] Kansas's own homestead shield reaches a house in this city with the same force it reaches one anywhere else in the state -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 keep an eligible homestead out of an unsecured creditor's reach entirely, with no dollar ceiling written into the exemption at all, regardless of how this city's own home values compare with the wealthier Johnson County, Kansas suburbs much closer to the metro core.",

      "[KS] A delinquent-tax sale in Franklin County runs on the same before-the-sale-only structure Kansas uses everywhere -- K.S.A. 79-2803 cuts off redemption the moment the sale actually happens, while K.S.A. 79-2401a still requires the county to hold a bid-off property for two years before pursuing a further sale, three years when that property qualifies as a homestead.",

      "[KS] Property in this city is assessed at the identical 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets statewide, applied to whatever market-value estimate the county's own assessor sets for a specific parcel -- the percentage itself never moves along the interstate corridor; only the underlying value estimate does.",

      "[KS] Financing a purchase in Ottawa also carries none of the old Kansas mortgage-registration tax on the closing statement -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, a repeal that reaches a closing in this city exactly as it reaches one anywhere else in the state.",

      "No dedicated Franklin County hub page exists yet in this site's registry, so a seller in Ottawa looking for county-level depth behind these figures should treat the statewide Kansas pages as the fuller reference for now.",

      "[KS] Settling an estate that owns a house in Ottawa still means clearing the same K.S.A. 59-3202 test every Kansas estate faces -- a court, not the will by itself, weighs the estate's size, the heirs' own agreement, its solvency, and the likely cost of administering it before deciding whether a simplified or a supervised process applies.",

      "[KS] A seller working through an agent in this city should also know Kansas puts the duty to flag a known material defect on that licensee rather than on the seller directly -- K.S.A. 58-30,106 requires an agent representing a seller to disclose adverse facts actually known to a buyer who counts only as a customer, from a title problem to an environmental hazard requiring legal disclosure, the identical rule reaching an agent-assisted sale anywhere else in Kansas.",

      "Ottawa's own position on Interstate 35 has drawn a genuinely different mix of employers than a Kansas county seat off the interstate typically sees -- warehousing and light manufacturing tied to the corridor sit alongside the university and the county's own government offices, a diversified employment base that has kept this city's resale market steadier over time than a single-industry small town elsewhere in the state might show.",

      "Wellsville shares Franklin County with Ottawa, considerably smaller and with far less resale turnover than the county seat, while this city's own position directly on Interstate 35 gives it a steadier flow of through-traffic commerce that a smaller county town off the interstate does not share.",

      "[KS] None of the above makes a fast cash sale the obvious answer for a seller in this city. An owner in Ottawa with time before a sheriff's sale is even scheduled, and without a pressing estate deadline, is usually still better off listing through a realtor and letting a normal Kansas market run its course, interstate location or not.",

      "A cash sale earns genuine consideration in Ottawa for a narrower set of situations specific to a market this size -- an inherited house an estate needs closed quickly, a property carrying repair needs no conventional lender in Franklin County will finance, or an owner already facing a judgment and a scheduled sheriff's sale with the clock already running.",

      "[KS] None of this is legal advice. A specific foreclosure judgment, tax sale, or probate filing touching a house in Ottawa deserves a Kansas attorney's own read of the actual documents, not a general city-level summary.",

      "Ottawa's own downtown square, built around the county courthouse and dating largely to the late 1800s, has drawn renewed small-business investment in recent years even as growth along the interstate corridor pulls newer commercial development toward the highway exits -- two patterns of investment happening at once in one small city, a fact about local development rather than about which statutes reach any house sale.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-probate-simplified"],
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-lansing-ks": {
    slug: "sell-my-house-fast-lansing-ks",
    body: [
      "Lansing sits in Leavenworth County, roughly 11,221 people about 19.7 miles from the metro's core, immediately adjacent to the city of Leavenworth itself. Where Leavenworth's own economy runs on Fort Leavenworth's active-duty rhythm, this city's is shaped by a different federal and state presence entirely -- Lansing Correctional Facility, the state's largest prison, sits inside city limits and is one of the largest employers in the county, a genuinely distinct local economy from its more military-oriented neighbor.",

      "[KS] Every part of this city sits in Kansas, inside Leavenworth County, so a house sale in Lansing answers to Kansas's statewide statutes throughout -- the same judicial foreclosure process, uncapped homestead exemption, and tax-sale mechanics reaching every other Kansas city in this footprint, this county's own correctional and military institutions notwithstanding.",

      "[KS] Corrections-department employment in this city often runs on transfer and shift-bid schedules rather than the kind of hard relocation deadline a military PCS order creates next door -- a real difference in how quickly a seller in Lansing typically needs to close compared with a seller in Leavenworth, even though the identical Kansas statutes below reach a house in either city without distinction.",

      "[KS] A mortgage default on a house in this city still runs through Kansas's judicial process rather than a trustee acting alone: K.S.A. 60-2410 requires the lender to win a lawsuit first, K.S.A. 60-2415 then requires a district judge to confirm the resulting sheriff's sale, and only after that confirmation does K.S.A. 60-2414 open a redemption window -- twelve months ordinarily, three months when an early default hit a loan still carrying most of its original balance.",

      "[KS] Kansas's uncapped homestead shield reaches a house in Lansing with the same force it reaches one in Leavenworth or anywhere else in the state -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 keep an eligible homestead out of an unsecured creditor's reach with no dollar limit written into the exemption at all.",

      "[KS] A delinquent-tax sale in this county holds a bid-off property for two years before the county pursues a further sale, three years when that property qualifies as a homestead, under K.S.A. 79-2401a -- while K.S.A. 79-2803 shuts redemption off entirely once the sale itself has actually happened, the same before-the-sale-only rule Kansas applies statewide.",

      "[KS] Property in this city carries the identical 11.5% residential assessment ratio Article 11, Section 1 of the Kansas Constitution sets across the state, applied to whatever market-value estimate the county assessor sets for a specific parcel -- nothing about this city's correctional-facility economy changes that fixed percentage.",

      "This site's Leavenworth County page covers the fuller countywide picture behind these figures, including how the same uncapped exemption and multi-year tax-sale holding period reach Basehor and Tonganoxie alongside Lansing and Leavenworth itself.",

      "[KS] A house financed in Lansing also skips the old Kansas mortgage-registration tax entirely -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, reaching a closing in this city exactly as it reaches one anywhere else in the state.",

      "[KS] Settling an estate that owns a house in this city still means clearing the same K.S.A. 59-3202 test every Kansas estate faces, a court weighing the estate's size, the heirs' own agreement, and its solvency before deciding whether a simplified or a supervised process applies.",

      "[KS] A seller in Lansing should also know Kansas requires disclosing any known elevated radon reading in writing, with the sale contract itself carrying the state's own required warning language calling radon a leading cause of lung cancer in non-smokers -- K.S.A. 58-3078a, a duty reaching a house near the correctional facility exactly as it reaches one anywhere else in Kansas.",

      "Basehor and Tonganoxie round out the rest of Leavenworth County, both considerably smaller and slower-turnover than either Lansing or the city of Leavenworth itself, a difference in scale within one county rather than in which state's statutes reach any of the four cities sharing it.",

      "A house in Lansing near the correctional facility's own perimeter occasionally carries a distinct set of zoning or setback considerations tied to that adjacent institutional use -- a genuinely local land-use fact worth confirming with this city's own planning office, separate from anything the statewide statutes above address.",

      "[KS] None of the above makes a fast cash sale the automatic answer for a seller in this city. A homeowner in Lansing working a normal shift schedule, without a foreclosure notice already in motion or an urgent estate deadline, is usually still better off listing conventionally and letting a normal Kansas sale run its course.",

      "A cash sale earns real consideration in Lansing specifically when a fixed deadline -- an estate that must close quickly, a pending judgment already moving toward a sheriff's sale, or repair needs no conventional lender will finance -- makes the ordinary listing calendar the wrong fit for this particular seller.",

      "[KS] None of this is legal advice. A specific redemption clock, tax-sale timeline, or radon disclosure question touching a house in Lansing depends on the loan documents and facts in front of a Kansas attorney, not on the description above.",

      "Lansing's own population has grown steadily as Kansas City's own metro area has spread west along the interstate corridor, distinct from the slower, more institution-tied growth pattern the neighboring city of Leavenworth shows -- a difference in growth driver between two adjacent cities in the same county, not a difference in which statutes reach either one. Newer subdivisions along the city's own southern edge have absorbed most of that recent growth, giving Lansing a genuinely newer average housing stock than its older neighbor.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-probate-simplified"],
      citations["ks-seller-disclosure-radon"],
    ],
  },

  "sell-my-house-fast-kearney-mo": {
    slug: "sell-my-house-fast-kearney-mo",
    body: [
      "Kearney is a Clay County city of roughly 11,060 people about 21.2 miles from the metro's core, best known well beyond the Northland as the birthplace of Jesse James -- the outlaw's childhood farm, preserved today as the Jesse James Birthplace Museum, sits just outside city limits and draws visitors from well beyond this county on its own.",

      "[MO] A house anywhere in this city sits in Clay County, Missouri, so it follows the identical statewide rules reaching Liberty, Gladstone, and every other Clay County city -- Missouri law throughout, with this city's own historical notoriety changing nothing about which statutes apply.",

      "[MO] Missing a mortgage payment on a house in Kearney sets off the same trustee-driven mechanism as anywhere in Missouri: RSMo 443.290 hands a named trustee the power to sell on default, and RSMo 443.327 lets that power actually be exercised, with no lawsuit at any point. Because Clay County's population, roughly 259,772, clears the 50,000-person line RSMo 443.320 sets by a wide margin, notice preceding a sale in this city runs on the slower schedule -- twenty insertions in a daily newspaper -- rather than the shorter weekly track a smaller Missouri county in this footprint uses.",

      "[MO] Redemption after that sale depends on RSMo 443.410 and RSMo 443.420 lining up three conditions together: the lender itself, not an outside investor, has to be the buyer at the sale; the borrower has to give written notice of an intent to redeem; and a bond covering the full debt has to be posted within twenty days. This site's Missouri trustee-sale-timeline page walks through that sequence in more depth than fits in this summary.",

      "[MO] The statewide dollar figures reach a house in Kearney exactly as they reach one anywhere else in Missouri -- RSMo 513.475 currently shields $15,000 of equity from an unsecured creditor's judgment, rising to $40,000 on January 1, 2027 under an already-signed law, and RSMo 137.115 taxes an ordinary residential parcel at 19% of its market value regardless of a city's own size or history.",

      "[MO] Unpaid property taxes, rather than a missed mortgage payment, send a house down RSMo 140.340's own separate path -- a full, unconditional year to redeem measured from the tax sale itself, plus a further, weaker right that survives past that year until the purchaser actually collects the deed.",

      "This site's Clay County page covers the fuller Northland picture behind these figures in more depth, including how the same twenty-insertion notice schedule and statewide dollar figures reach Liberty, Gladstone, Smithville, and Excelsior Springs alongside Kearney.",

      "[MO] An heir inheriting a house in this city still has to clear Missouri's own probate question before a sale can close. RSMo 473.780 opens the door to independent administration -- skipping most routine court sign-off -- when a will authorizes it, or permits it with every heir's consent; without either path, supervised administration governs, and the probate court reviews a sale of the house alongside every other major step.",

      "[MO] Closing on a house in Kearney carries no state or local transfer tax either -- the same constitutional bar every Missouri city in this footprint relies on, Article X, Section 25 of the Missouri Constitution, adopted by Missouri voters in 2010 and unchanged since.",

      "Kearney has grown steadily as a Northland bedroom community over the past two decades, its own pace somewhere between the older, more built-out inner Clay County suburbs like Gladstone and the smaller, slower-turnover towns farther out in the county -- a difference in growth rate, not in which statutes reach any of them.",

      "[MO] RSMo 442.606 requires a Kearney seller with actual knowledge that a house was used to produce methamphetamine to put that fact in writing for the buyer, plus a second and independent written disclosure covering whether the seller knew, or had reason to know, that same house held or supplied drugs for someone with a qualifying conviction.",

      "The Jesse James Birthplace Museum draws a steady trickle of history-minded visitors into the area surrounding this city each year, a fact about local tourism rather than about which statutes reach a house sale within Kearney's own limits, where the museum itself sits just outside the city boundary in unincorporated Clay County.",

      "[MO] None of the above makes a fast cash sale the automatic right call for a seller in Kearney. An owner with time before a notice of trustee's sale is even published usually still comes out ahead bringing a loan current or listing through a realtor, particularly given how steady buyer demand has stayed for this city's own bedroom-community housing stock.",

      "A cash sale is a genuine reason to consider a fast option in Kearney for an owner already behind on payments with a notice approaching, an estate needing an uncomplicated and quick close, or a property carrying repair needs a conventional lender will not finance -- not for a seller with time and no pressing deadline.",

      "[MO] None of this is legal advice. A Kearney homeowner facing a specific foreclosure notice, tax bill, or probate filing should talk to a Missouri attorney who can review the actual paperwork, not rely on a general city-level overview.",

      "This city's own growth has come almost entirely from new subdivision construction over the past two decades rather than from redeveloping an existing older core the way a longer-settled Clay County suburb might, giving Kearney a genuinely newer average housing stock than Liberty or Gladstone despite sharing the identical Missouri statutes those two cities answer to.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-merriam-ks": {
    slug: "sell-my-house-fast-merriam-ks",
    body: [
      "Merriam is a small, landlocked city of roughly 10,875 people in Johnson County, Kansas, about 8.4 miles from the metro's core -- inner-ring and considerably older than the sprawling newer suburbs farther southwest in the same county. The Antioch Shopping Center, one of the earliest large retail centers built in the Kansas City area, opened in this city in the 1950s and has been redeveloped more than once since, a marker of just how early this particular corner of the county was built out compared with Overland Park's own later growth.",

      "[KS] Every part of this city sits in Johnson County, Kansas -- not the differently named Johnson County, Missouri, roughly 65 miles to the southeast, which this site's Warrensburg page covers -- so a house in Merriam answers to Kansas law throughout, with no Missouri statute reaching it regardless of the shared county name.",

      "[KS] Because Merriam built out decades before Johnson County, Kansas's own newer southwestern suburbs did, a much larger share of its housing stock is now old enough to be genuinely comparable in age to the older, closer-in Kansas suburbs elsewhere in this footprint rather than to newer subdivision construction -- a fact that shapes what a buyer expects to find in this city, not which statutes reach a sale.",

      "[KS] A mortgage default on a house in this city still runs through Kansas's judicial process rather than a trustee acting alone: K.S.A. 60-2410 requires the lender to win a lawsuit first, K.S.A. 60-2415 requires a district judge to confirm the resulting sheriff's sale, and only then does K.S.A. 60-2414 start a redemption clock -- twelve months by default, three months when an early default hit a heavily leveraged loan.",

      "[KS] The uncapped homestead exemption reaches a house in Merriam with the same force it reaches one in a wealthier corner of this Kansas county -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale with no dollar limit written into the exemption at all, a real protection even where this city's own home values run more modestly than Leawood's or Overland Park's.",

      "[KS] That exemption pairs with this Kansas county's own tax-sale holding period -- K.S.A. 79-2401a requires Johnson County, Kansas to sit on a bid-off property for two years before pursuing a further sale, three years when that property qualifies as a homestead, giving a Merriam owner facing delinquent taxes years, not weeks, before the county moves toward a further sale.",

      "[KS] This site's Johnson County, Kansas page covers the fuller countywide picture behind these figures, including how the same uncapped exemption and multi-year holding period reach Overland Park, Shawnee, and Roeland Park alongside this smaller, closer-in city.",

      "[KS] Property in Merriam carries the identical 11.5% assessment ratio Article 11, Section 1 of the Kansas Constitution sets statewide, applied to whatever market-value estimate the county assessor sets for a specific parcel -- an older home in this city and a newer one farther southwest in the same county carry the same percentage, only the underlying estimate differs.",

      "[KS] A closing on a house in this city also skips the old Kansas mortgage-registration tax entirely -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, reaching a Merriam closing exactly as it reaches one anywhere else in the state.",

      "Roeland Park, Fairway, and Mission border this small city on every side, all four sitting in the same closer-in, older cluster of Johnson County, Kansas cities described on this site's county page -- a genuinely different pattern of age and scale from Overland Park's, Olathe's, or Gardner's own newer growth farther out in the same county.",

      "[KS] Settling an estate that owns a house in Merriam still means clearing the same K.S.A. 59-3202 test every Kansas estate faces, a court weighing the estate's size, the heirs' agreement, and its solvency before deciding whether a simplified or a supervised process applies.",

      "Interstate 35 and Interstate 635 both cut through the edges of this small city, giving Merriam a level of commercial and warehouse development well out of proportion to its own residential population -- a genuine local economic driver distinct from the purely residential character of a Johnson County, Kansas suburb farther from either interstate.",

      "[KS] None of the above makes a fast cash sale the default answer for a seller in Merriam. An owner with real equity in an older, well-kept house in this city and no urgent deadline is usually still better off listing conventionally, since this city's small size has not stopped it from drawing steady buyer interest from people specifically looking for its older, closer-in housing stock.",

      "A cash sale earns genuine consideration in this city for an older house carrying deferred maintenance or a title complication a conventional lender will not finance, or for an estate that needs to close on a fixed timeline -- not as the obvious first move for an owner with time and no such pressure.",

      "[KS] None of this is legal advice. A Merriam homeowner facing a specific foreclosure judgment, tax-sale question, or probate filing should talk to a Kansas attorney who can review the actual documents, not rely on a general city-level summary.",

      "Merriam's own small footprint means a single redevelopment project, like the shopping-center rebuild described above, can shift the character of a meaningful share of the city's own commercial tax base at once -- a level of concentrated local impact a larger, more spread-out Johnson County, Kansas suburb would rarely see from any single project.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-smithville-mo": {
    slug: "sell-my-house-fast-smithville-mo",
    body: [
      "Smithville is a Clay County city of roughly 10,785 people about 20.5 miles from the metro's core, built up mostly around Smithville Lake, a US Army Corps of Engineers reservoir completed in the 1970s that draws boaters and anglers from across the Northland and gives this city a genuinely different recreational character than the more purely residential suburbs closer to Kansas City itself.",

      "[MO] Most of this city sits in Clay County, Missouri, which is where its own city hall, its own address for county records, and this page's legal treatment all point -- but a portion of Smithville's own footprint extends into neighboring Platte County as well. That distinction matters for a genuinely practical reason: which county courthouse handles a filing, and which county treasurer runs a tax sale, depends on exactly where within the city a given parcel sits, even though both counties answer to the identical statewide Missouri statutes below.",

      "[MO] Whichever side of the county line a Smithville parcel falls on, the same non-judicial mechanics govern its foreclosure: RSMo 443.290 hands the deed of trust's own named trustee the power of sale, and RSMo 443.327 lets that trustee use it without any court involvement. Both Clay and Platte County clear the 50,000-resident line RSMo 443.320 draws by a comfortable margin, so a Smithville trustee's sale runs the full twenty-insertion daily-newspaper notice no matter which county actually handles the filing.",

      "[MO] A trustee's sale in Smithville is reversible only in a narrow set of circumstances RSMo 443.410 and RSMo 443.420 spell out -- the lender itself, not a third-party investor, has to have bought the property back at the sale, the borrower has to have already filed written notice of an intent to redeem, and a bond for the full debt has to have gone up inside twenty days of the sale date.",

      "[MO] Two fixed dollar figures apply to a Smithville sale the same way they apply anywhere in the state -- $15,000 of equity currently sits beyond an unsecured creditor's reach under RSMo 513.475, rising to $40,000 once 2027 arrives, while RSMo 137.115 taxes an ordinary residential parcel at 19% of value whether that parcel sits on the water or well inland.",

      "[MO] Falling behind on property taxes, as distinct from a mortgage, routes a Smithville property through RSMo 140.340 instead -- a full year of unconditional redemption counting from the tax-sale date, and a weaker right afterward that lasts until the purchaser actually secures the collector's deed.",

      "This site's Clay County page covers the fuller Northland picture behind these figures, including how the same twenty-insertion notice schedule and statewide dollar figures reach Liberty, Gladstone, Kearney, and Excelsior Springs alongside this lake-adjacent city, while this site's Platte County page covers the same figures from that county's own side of the Smithville Lake shoreline.",

      "[MO] Who can actually authorize a sale out of a Smithville estate depends on the same Missouri probate rule that applies statewide -- RSMo 473.780 grants independent administration, and the reduced court oversight it brings, only where the will itself calls for that path or allows it with every heir consenting; without one of those two, the estate proceeds under supervised administration and a judge signs off on the sale.",

      "[MO] No transfer tax touches a Smithville closing, lakefront parcel or not -- Missouri's constitution has barred the state, every county, and every city from creating one since voters approved Article X, Section 25 back in 2010, and that bar draws no distinction based on a house's distance from the shoreline.",

      "Smithville Lake itself draws a real seasonal swing in buyer interest that a purely inland Clay County suburb like Gladstone or Liberty does not share -- a lakefront or near-lake house in this city can see stronger demand in spring and summer than the same house would in the dead of winter, a fact about local buying patterns rather than about which statutes reach the sale.",

      "[MO] A seller in Smithville who knows a specific house was ever used to produce methamphetamine still has to disclose that fact in writing under RSMo 442.606, a duty reaching a lakefront cabin exactly as it reaches a house well away from the water.",

      "Claycomo and Pleasant Valley round out the smaller end of Clay County's own roster of cities, both considerably smaller and less recreation-driven than Smithville's own lake economy -- a difference in local character within the same county, not in which statutes reach any of them.",

      "[MO] A seller in Smithville with breathing room, and without a county-line title complication already in play, is nearly always better served testing the conventional market first rather than defaulting to a fast cash sale -- the lake itself keeps drawing real seasonal demand that a discounted quick sale would simply leave on the table.",

      "A cash sale is worth genuine consideration in Smithville specifically when the county-line question above has muddied a title enough that a conventional buyer's lender balks, or when an owner already faces a scheduled trustee's sale with the clock running -- not as a default response to living near the lake.",

      "[MO] None of this is legal advice. A Smithville homeowner unsure which county's courthouse or treasurer actually handles a specific parcel should confirm that with the Clay County or Platte County recorder directly, and take any foreclosure or tax-sale question to a Missouri attorney rather than relying on this overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-atchison-ks": {
    slug: "sell-my-house-fast-atchison-ks",
    body: [
      "Atchison is the county seat of Atchison County, roughly 10,670 people about 43.7 miles from the metro's core, sitting directly on the Missouri River bluffs -- one of the oldest towns in Kansas, chartered in 1854 the same year the territory itself was organized, and the birthplace of Amelia Earhart, whose childhood home is preserved today as a museum a few blocks from the riverfront. This city's own housing stock runs genuinely older, on average, than any other city in this batch.",

      "[KS] Every part of this city sits in Kansas, inside Atchison County, so a house sale in Atchison answers to Kansas's statewide statutes throughout, this county's own status as one of the state's oldest settled areas notwithstanding -- no Missouri rule reaches a property in Atchison despite sitting directly across the river from Missouri soil.",

      "[KS] A mortgage default on a house in this city runs through Kansas's judicial process rather than a trustee acting alone: K.S.A. 60-2410 requires the lender to win a lawsuit first, K.S.A. 60-2415 requires a district judge to confirm the resulting sheriff's sale, and only then does K.S.A. 60-2414 open a redemption window -- twelve months by default, three when an early default hit a heavily leveraged loan.",

      "[KS] Kansas's uncapped homestead exemption reaches a house in Atchison with the same force it reaches one anywhere else in the state -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale with no dollar limit written into the exemption at all.",

      "[KS] A delinquent-tax sale in this county follows the same before-the-sale-only structure Kansas uses statewide -- K.S.A. 79-2803 shuts off redemption the moment the sale itself happens, while K.S.A. 79-2401a still requires the county to hold a bid-off property for two years before a further sale, three years when the property qualifies as a homestead.",

      "No dedicated Atchison County hub page exists yet in this site's registry, so a seller in this city looking for county-level depth behind these figures should treat the statewide Kansas pages as the fuller reference for now.",

      "[KS] Property in Atchison carries the identical 11.5% residential assessment ratio Article 11, Section 1 of the Kansas Constitution sets statewide -- the percentage itself does not shift for a county this old; only the underlying market-value estimate a specific parcel carries does.",

      "[KS] Because this city's housing stock skews so much older than a newer subdivision elsewhere in this footprint, a seller in Atchison should pay particular attention to Kansas's own radon-disclosure rule -- K.S.A. 58-3078a requires disclosing any known elevated radon reading in writing, and requires the sale contract itself to carry the state's warning that radon is a leading cause of lung cancer in non-smokers, a genuinely more common issue in older basement construction than in a newer build.",

      "[KS] A closing on a house in this city also skips the old Kansas mortgage-registration tax entirely -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, reaching an Atchison closing exactly as it reaches one anywhere else in the state.",

      "[KS] A seller working with an agent in Atchison should also know Kansas places the duty to flag a known material defect on that licensee, not on the seller directly -- K.S.A. 58-30,106 requires the agent to disclose adverse facts actually known to a buyer who counts only as a customer, a rule that matters more in a city with this much century-old housing stock than in a newer subdivision elsewhere in the footprint.",

      "[KS] Settling an estate that owns a house in this city still means clearing the same K.S.A. 59-3202 test every Kansas estate faces, a court weighing the estate's size, the heirs' agreement, and its solvency before deciding whether simplified or supervised administration applies.",

      "Atchison's own bluff-top position on the Missouri River gave it real commercial weight in the steamboat era, before the railroad shifted trade patterns toward towns farther inland -- a piece of history that shaped how this city was originally laid out, and one reason its downtown grid and housing stock look genuinely older than a town built up mostly during the postwar highway era.",

      "The Amelia Earhart Birthplace Museum and Benedictine College both draw a steady trickle of visitors and students into this city year-round, a fact about local tourism and enrollment rather than about which statutes reach a house sale nearby.",

      "[KS] None of the above makes a fast cash sale the obvious answer for a seller in Atchison. An owner of a well-kept historic home near the riverfront, with time and no pressing deadline, is usually still better off testing a normal listing first, since this city's genuine architectural character continues to draw specific buyer interest a fast, discounted sale would not capture.",

      "[KS] None of this is legal advice. A specific foreclosure judgment, radon disclosure, or probate question touching a house in this city deserves a Kansas attorney's own review of the actual paperwork, not a general city-level overview.",

      "Atchison County's own remaining towns are considerably smaller than the county seat itself, leaving Atchison as the only real commercial center for a genuinely rural stretch of northeast Kansas along the Missouri River -- a concentration of buyer demand into one city that a county with several similarly sized towns would not show.",

      "A house built before the mid-1900s in Atchison sometimes carries knob-and-tube wiring, a shallow foundation, or other genuinely dated construction that a conventional lender's inspector flags more readily than in a newer subdivision elsewhere in this footprint -- a real, practical factor in how quickly a specific house can close, separate from anything the statutes above address.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-assessment-115"],
      citations["ks-seller-disclosure-radon"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-excelsior-springs-mo": {
    slug: "sell-my-house-fast-excelsior-springs-mo",
    body: [
      "Excelsior Springs is a Clay County city of roughly 10,612 people about 24.5 miles from the metro's core, built up around mineral springs that made it a nationally known health-resort destination through the early 1900s -- the Hall of Waters, a WPA-era building constructed around the city's own mineral springs, still stands downtown, giving this city an older, more distinctive historic core than most of the rest of the Northland's postwar suburban growth.",

      "[MO] Most of this city sits in Clay County, Missouri, which is where this page's legal treatment points -- but a portion of Excelsior Springs also extends into neighboring Ray County. That distinction determines which county courthouse handles a filing and which county treasurer runs a tax sale for a parcel on that side of the line, even though Clay and Ray Counties answer to the identical statewide Missouri statutes described below.",

      "[MO] Excelsior Springs answers to the same non-judicial foreclosure statutes as any Missouri city its size -- RSMo 443.290 puts the power of sale in the trustee named on the deed of trust, and RSMo 443.327 lets that trustee actually use it, courtroom-free. Because Clay County's roughly 259,772 residents clear the 50,000-person mark RSMo 443.320 sets by a wide margin, the notice ahead of an Excelsior Springs sale has to run twenty separate times in a daily paper before the sale can proceed.",

      "[MO] A trustee's sale here does not automatically carry a right to undo it -- RSMo 443.410 and RSMo 443.420 open that door only when three things line up: the buyer at the sale was the lender itself, the borrower already gave written notice of intent to redeem, and a bond for the full debt amount was posted inside twenty days of the sale.",

      "[MO] Two dollar figures set by the state, not the county, follow an Excelsior Springs sale -- RSMo 513.475's current $15,000 equity shield against an unsecured judgment, on track to reach $40,000 in 2027, and RSMo 137.115's flat 19% assessment ratio, a number that stays fixed whether the house sits in a historic district or a newer subdivision.",

      "[MO] A separate track under RSMo 140.340 governs unpaid property taxes rather than a missed loan payment -- a full, unconditional year of redemption counted from the tax-sale date, followed by a weaker right that persists until the purchaser actually takes possession of the collector's deed.",

      "This site's Clay County page covers the fuller Northland picture behind these figures, including how the same twenty-insertion notice schedule and statewide dollar figures reach Liberty, Gladstone, Kearney, and Smithville alongside this historic spa town.",

      "[MO] Missouri probate law decides who can actually put a signature on an Excelsior Springs deed before an inherited house sells -- RSMo 473.780 grants independent administration, and the lighter court oversight that comes with it, only when a will calls for that route or lets every heir agree to it; anything short of one of those two paths sends the estate into supervised administration, with the probate court signing off on the sale itself.",

      "[MO] Missouri's own constitutional transfer-tax ban keeps an Excelsior Springs closing free of any state or local tax on the sale -- Article X, Section 25 has stood since Missouri's own voters approved it in 2010, and it applies here with the same force it applies statewide.",

      "[MO] Given how much of this city's own housing predates modern construction standards, RSMo 442.606's methamphetamine-disclosure rule carries real weight here -- a seller who actually knows a specific house was used to produce methamphetamine has to say so in writing, and owes a second, separate written disclosure if the seller knew or should have known the same house sheltered or supplied someone with a qualifying conviction.",

      "The Elms Hotel, another Hall of Waters-era resort landmark still operating downtown, continues to draw a modest but real stream of visitors into this city, a fact about local tourism rather than about which county's statutes reach a house sale nearby.",

      "Fishing River runs through the middle of Excelsior Springs, and the mineral-spring geology that originally drew resort visitors to this city also shapes some of the older housing stock's own foundation and drainage quirks -- a genuine inspection consideration for a buyer looking at a century-old house near downtown, distinct from anything the statutes above address.",

      "[MO] None of the above makes a fast cash sale the obvious answer for a seller in Excelsior Springs. An owner of a well-kept historic house near the Hall of Waters, with time before any deadline, is usually still better off testing a normal listing first, given how much genuine buyer interest this city's own historic character continues to draw.",

      "A cash sale earns real consideration in Excelsior Springs for an older house carrying deferred maintenance a conventional lender will not finance, or for an owner whose parcel's county-line status has complicated a title enough to stall a conventional closing -- not as the first move for a seller with time and a clean, marketable title.",

      "[MO] None of this is legal advice. A homeowner in Excelsior Springs unsure which county actually handles a specific parcel should confirm that directly with the Clay County or Ray County recorder, and take any foreclosure or probate question to a Missouri attorney rather than relying on this overview.",

      "The old resort economy that built this city's downtown has never fully returned to its early-1900s scale, and much of Excelsior Springs today functions as a smaller, quieter bedroom community for the wider Northland rather than the destination it once was -- a genuine shift in the local economy over the past century, not a change in which statutes reach a house sale in this city.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-maryville-mo": {
    slug: "sell-my-house-fast-maryville-mo",
    body: [
      "Maryville is the county seat of Nodaway County, roughly 10,309 people about 87.3 miles from the metro's core -- the farthest-north outstate market in this batch, built around Northwest Missouri State University, whose own academic calendar shapes a genuinely different rental and resale rhythm in this city than a purely residential Missouri town of similar size would show.",

      "[MO] Every acre of this city sits in Missouri, inside Nodaway County, so Missouri law reaches a house sale in this city start to finish -- but Maryville is a genuinely smaller, thinner market than Jackson, Clay, or Cass County, with far fewer comparable recent sales to price a specific house against and a buyer pool that a university town's own semester calendar shapes as much as anything else.",

      "[MO] Foreclosure on a Maryville house still follows the trustee mechanism RSMo 443.290 and RSMo 443.327 set up statewide -- the deed of trust's own named trustee sells on default, with no judge or lawsuit anywhere in the sequence. Nodaway County's own population, roughly 20,695, keeps it under the 50,000-resident line RSMo 443.320 uses to sort counties onto the daily-newspaper notice track, so this county instead runs a trustee's-sale notice through four weekly issues, wrapping up no later than a week before the sale date.",

      "[MO] Getting that sale reversed afterward is the exception, not the rule, under RSMo 443.410 and RSMo 443.420 -- only if the lender bought back its own collateral at the sale, the former owner put an intent to redeem in writing, and a bond for the full debt amount was filed inside twenty days does a one-year redemption period actually open on a Maryville property.",

      "[MO] Two fixed statewide numbers follow a Maryville sale regardless of the county's population: RSMo 513.475 keeps $15,000 of equity out of reach of an unsecured judgment right now, climbing to $40,000 once 2027 arrives under a bill Missouri has already enacted, while RSMo 137.115 taxes a residential parcel here at the same 19%-of-value rate used from the metro core to the smallest county in this footprint.",

      "[MO] A tax delinquency, rather than a defaulted loan, moves a Maryville property under RSMo 140.340 instead, which guarantees a clean, no-strings first year of redemption counted from the sale date, and lets a narrower right linger afterward until whoever bought at that sale finally holds the collector's deed.",

      "[MO] Nodaway County itself has no dedicated hub page in this site's registry as of this writing, so a Maryville seller wanting county-specific depth beyond what appears here should rely on the statewide Missouri pages until that gap in the footprint is filled.",

      "[MO] Before a Maryville house can change hands out of an estate, Missouri probate has to settle who is even authorized to sign the deed -- RSMo 473.780 lets a personal representative skip most of that court oversight only if the will itself calls for independent administration, or allows it once every heir signs on; anything less funnels the estate into supervised administration instead.",

      "[MO] Missouri's constitutional transfer-tax ban travels to Maryville the same way it travels everywhere else in the state -- Article X, Section 25 has forbidden the state, every county, and every city from taxing a real-estate transfer since Missouri's own voters wrote it into the constitution in 2010.",

      "A rental market built around Northwest Missouri State's own student population means a larger share of Maryville's housing turns over on a lease cycle rather than an owner-occupant sale cycle compared with a purely residential outstate town -- a genuine difference in how this city's market behaves, not in which statutes reach a sale of owner-occupied property.",

      "Nodaway County's own remaining towns are considerably smaller than Maryville itself, which functions as both the county seat and the only real commercial and educational hub for a genuinely rural stretch of northwest Missouri -- a concentration of population and buyer demand into one city that a county with several similarly sized towns does not show.",

      "[MO] RSMo 442.606 puts a written disclosure duty on any Maryville seller who actually knows a house once served as a meth-production site, plus a second, independent written disclosure if the seller knew or should have known the same house sheltered, stored for, or supplied someone with a qualifying conviction.",

      "[MO] The trade-off in a market this size cuts both ways: fewer active buyers outside the university's own hiring and enrollment cycles means a house can sit unsold for a longer stretch once listed, but it also means less pressure toward an unnecessarily fast decision. An owner in Maryville with no pending foreclosure notice or fixed estate deadline is usually still better off listing through a realtor and giving that slower market the time it actually needs.",

      "A cash sale earns real consideration in Maryville specifically for a rental property between tenants that a landlord wants off the books quickly, an estate needing to close before a fixed date, or a house carrying repair needs no conventional lender in a market this size will finance -- not as the default choice for an owner with time and a marketable house.",

      "[MO] None of the above is legal advice, and a small-county foreclosure notice, tax bill, or probate filing touching a Maryville property deserves a Missouri attorney's own review of the actual paperwork rather than a general description of statewide rules.",

      "Maryville sits close enough to the Iowa state line that some residents cross it for work or shopping on a regular basis, but that proximity has no bearing on which state's law reaches a house sale within this city -- the parcel's own location inside Missouri, not its distance from a neighboring state, is what decides that question.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-mission-ks": {
    slug: "sell-my-house-fast-mission-ks",
    body: [
      "Mission is one of the smallest cities by area in Johnson County, Kansas, roughly 10,014 people about 6.6 miles from the metro's core, entirely landlocked by Fairway, Roeland Park, Prairie Village, and Overland Park on every side. The old Mission Center Mall, an enclosed shopping center that anchored this city's own retail base for decades, has since been redeveloped into Gateway, a mixed-use district of apartments and street-level retail -- a physical marker of how much earlier this inner-ring city built out than the newer subdivisions farther southwest in the same county.",

      "[KS] Every part of this city sits in Johnson County, Kansas -- not the differently named Johnson County, Missouri, roughly 65 miles to the southeast, which this site's Warrensburg page covers -- so a house in Mission answers to Kansas law throughout, with no Missouri statute reaching it regardless of the shared county name.",

      "[KS] A mortgage default on a house in this city still runs through Kansas's judicial process rather than a trustee acting alone: K.S.A. 60-2410 requires the lender to win a lawsuit first, K.S.A. 60-2415 requires a district judge to confirm the resulting sheriff's sale, and only then does K.S.A. 60-2414 start a redemption clock -- twelve months by default, three months when an early default hit a heavily leveraged loan.",

      "[KS] The uncapped homestead exemption reaches a house in Mission with the same force it reaches one anywhere else in this Kansas county -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale with no dollar limit written into the exemption at all, a real protection even in a city this small and this built-out.",

      "[KS] That exemption pairs with this county's own tax-sale holding period -- K.S.A. 79-2401a requires Johnson County, Kansas to sit on a bid-off property for two years before pursuing a further sale, three years when that property qualifies as a homestead, giving an owner in Mission facing delinquent taxes years, not weeks, before the county moves further.",

      "[KS] This site's Johnson County, Kansas page covers the fuller countywide picture behind these figures, including how the same uncapped exemption and multi-year holding period reach Merriam, Roeland Park, and the rest of the closer-in cluster alongside this landlocked city.",

      "[KS] Property in Mission carries the identical 11.5% assessment ratio Article 11, Section 1 of the Kansas Constitution sets statewide, applied to whatever market-value estimate the county assessor sets for a specific parcel -- redeveloped mixed-use land near Gateway and an older single-family lot nearby carry the same percentage, only the underlying estimate differs.",

      "[KS] A closing on a house in this city also skips the old Kansas mortgage-registration tax entirely -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, reaching a Mission closing exactly as it reaches one anywhere else in the state.",

      "The Gateway redevelopment has drawn new apartment construction and street-level retail into a city with almost no room left to grow outward, since every adjoining acre already belongs to a neighboring city -- a genuinely different growth constraint than a newer, still-expanding Johnson County, Kansas suburb faces farther southwest.",

      "Shawnee Mission Parkway runs directly through this city, giving Mission a level of pass-through commercial traffic that a purely residential Johnson County, Kansas suburb set back from a major arterial does not share, a fact about local commerce rather than about which statutes reach a house sale nearby.",

      "This city's own name causes a genuinely separate mix-up from the county-name collision described above -- a reader searching for the Shawnee Mission school district, which serves several nearby cities, sometimes lands on this city's own page by mistake, since Mission itself is only one of several communities the district actually covers.",

      "[KS] Settling an estate that owns a house in Mission still means clearing the same K.S.A. 59-3202 test every Kansas estate faces, a court weighing the estate's size, the heirs' agreement, and its solvency before deciding whether a simplified or a supervised process applies.",

      "[KS] A seller working with an agent in this city should also know Kansas places the duty to flag a known material defect on that licensee, not on the seller directly -- K.S.A. 58-30,106 requires the agent to disclose adverse facts actually known to a buyer who counts only as a customer.",

      "[KS] None of the above makes a fast cash sale the default answer for a seller in Mission. An owner of an older, well-kept house in this city with real equity and no urgent deadline is usually still better off listing conventionally, since this city's redeveloped retail core has, if anything, strengthened nearby buyer interest rather than weakened it.",

      "A cash sale earns genuine consideration in this city for an older house with deferred maintenance a conventional lender will not finance, or for an owner facing a scheduled sheriff's sale with the clock already running -- not as the obvious first move for a seller with time and a marketable property.",

      "[KS] None of this is legal advice. A Mission homeowner facing a specific foreclosure judgment, tax-sale question, or probate filing should talk to a Kansas attorney who can review the actual documents, not rely on a general city-level summary.",

      "Being landlocked on every side has meant this city's own population has stayed roughly flat for decades even as newer Johnson County, Kansas suburbs farther southwest have grown substantially -- a genuine ceiling on Mission's own future growth that a still-expanding city in the same county simply does not face.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-probate-simplified"],
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-harrisonville-mo": {
    slug: "sell-my-house-fast-harrisonville-mo",
    body: [
      "Harrisonville is the county seat of Cass County, roughly 9,852 people about 33.3 miles from the metro's core, its own historic town square anchoring a city considerably older, and slower-growing today, than Belton or Raymore farther north along the same county's own Interstate 49 corridor.",

      "[MO] Every part of this city sits in Cass County, Missouri, so it follows the identical statewide rules reaching Belton and Raymore -- Missouri law throughout, with this city's own status as the county seat changing nothing about which statutes apply.",

      "[MO] As the seat of Cass County, Harrisonville answers to the identical trustee-sale statutes RSMo 443.290 and RSMo 443.327 set up statewide -- the deed of trust's own trustee sells directly on default, courtroom-free -- and with the county's own population above 111,000, well past the 50,000-person line RSMo 443.320 draws, notice ahead of a sale here has to run the full twenty daily-newspaper insertions.",

      "[MO] A defaulted borrower's path back to the property is anything but guaranteed under RSMo 443.410 and RSMo 443.420: only when the lender itself was the buyer at the trustee's sale, only when the borrower already filed written notice of intent to redeem, and only when a bond covering the full debt went up inside twenty days does a one-year redemption right actually exist.",

      "[MO] Two numbers set at the state level, not the county level, govern a Harrisonville sale -- $15,000 of home equity kept from an unsecured creditor's reach under RSMo 513.475 today, rising to $40,000 in 2027, and a flat 19% assessment ratio under RSMo 137.115 that treats an older house on the historic square no differently than a newer one elsewhere in the county.",

      "[MO] Unpaid taxes chart an entirely separate course from a mortgage default under RSMo 140.340 -- a full year of unconditional redemption starting at the tax sale itself, with a weaker right surviving past that year until the purchaser actually obtains the collector's deed.",

      "This site's Cass County page covers the fuller countywide picture behind these figures, including how the same twenty-insertion notice schedule and statewide dollar figures reach Belton, Raymore, and Peculiar alongside this county seat.",

      "[MO] Signing away a Harrisonville house from an estate takes a Missouri probate court's blessing first -- RSMo 473.780 lets a personal representative bypass most of that routine oversight through independent administration, but only if the will authorizes it directly or allows it once every heir agrees; falling short of either condition means the county's own probate division reviews the sale step by step under supervised administration.",

      "[MO] A Harrisonville closing owes no transfer tax to the state, Cass County, or the city itself, courtesy of Article X, Section 25 of the Missouri Constitution -- a rule Missouri voters wrote into the constitution in 2010, applying here exactly as it applies statewide.",

      "Unlike Belton and Raymore, whose own growth has followed newer subdivision construction pushing south along the interstate from the built-up Jackson County line, Harrisonville's own housing stock skews older and more established around its historic square -- a genuinely different pace and character within the same county, not a difference in which statutes reach any of the three cities.",

      "[MO] Under RSMo 442.606, actual knowledge that a Harrisonville house was once used to make methamphetamine obligates the seller to put that fact in writing, and a second, distinct written disclosure comes due if the seller knew or should have known that same property housed or supplied drugs for someone convicted of a qualifying crime.",

      "Garden City, Archie, and Lake Winnebago round out the smaller end of Cass County's own roster, each considerably smaller and slower-turnover than Harrisonville itself -- a difference in scale within one county courthouse's own jurisdiction, not in which statutes reach any of them.",

      "The Cass County Courthouse itself, a limestone building dating to the 1870s, still stands on Harrisonville's own historic square and remains the working seat of county government today -- a genuine piece of local architecture with no bearing on which statutes reach a house sale elsewhere in this city.",

      "[MO] None of the above makes a fast cash sale the automatic right call for a seller in this city. An owner of a well-kept historic house near the square, with time before any deadline, is usually still better off testing a normal listing first, since Harrisonville's own older housing stock continues to draw real interest from a buyer specifically looking for that character rather than newer subdivision construction.",

      "A cash sale earns real consideration in Harrisonville for an older house carrying deferred maintenance or repair needs a conventional lender will not finance, or for an owner already behind on payments with a trustee's-sale notice approaching -- not as the first move for a seller with time and a marketable property.",

      "[MO] None of this is legal advice. A Harrisonville homeowner facing a specific foreclosure notice, tax sale, or probate filing should talk to a Missouri attorney who can review the actual paperwork, not rely on a general city-level overview.",

      "As the county seat, Harrisonville draws a steady base of government and legal-services employment that a smaller Cass County town without a courthouse does not share, giving this city's own resale market a somewhat steadier floor than Archie's or Garden City's, even in years when Belton and Raymore's newer subdivisions are absorbing most of the county's overall growth.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-spring-hill-ks": {
    slug: "sell-my-house-fast-spring-hill-ks",
    body: [
      "Spring Hill sits at the far southwestern edge of Johnson County, Kansas, roughly 9,689 people about 27 miles from the metro's core -- one of the fastest-growing small cities in this footprint, its own newer subdivisions pushing outward even as much of the surrounding farmland stays undeveloped for now. Part of this city's own footprint actually extends over the boundary into Miami County as well.",

      "[KS] Most of Spring Hill sits in Johnson County, Kansas -- not the differently named Johnson County, Missouri, roughly 65 miles to the southeast, which this site's Warrensburg page covers -- and that is where this page's legal treatment points. A portion of the city also reaches into Miami County, which determines which courthouse handles a filing and which county treasurer runs a tax sale for a parcel on that side of the line, even though both counties answer to the identical statewide Kansas statutes below.",

      "[KS] A mortgage default on a house in this city still runs through Kansas's judicial process rather than a trustee acting alone: K.S.A. 60-2410 requires the lender to win a lawsuit first, K.S.A. 60-2415 requires a district judge to confirm the resulting sheriff's sale, and only then does K.S.A. 60-2414 start a redemption clock -- twelve months by default, three months when an early default hit a heavily leveraged loan.",

      "[KS] The uncapped homestead exemption reaches a house in Spring Hill with the same force it reaches one anywhere else in Kansas -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale with no dollar limit written into the exemption at all, regardless of which side of the Johnson-Miami county line a specific parcel actually sits on.",

      "[KS] Johnson County, Kansas holds a bid-off property at a tax foreclosure sale for two years before pursuing a further sale, three years when the property qualifies as a homestead, under K.S.A. 79-2401a -- Miami County follows the identical statute for the sliver of Spring Hill sitting on its own side of the line.",

      "[KS] This site's Johnson County, Kansas page covers the fuller countywide picture behind the exemption and holding-period figures above, including how they reach Gardner and Edgerton nearby alongside the larger share of Spring Hill sitting in that county.",

      "[KS] New subdivision construction has driven most of this city's own recent growth, and a newer subdivision in this city more often carries a special assessment or improvement-district fee tied to that construction than an older Johnson County, Kansas home closer to the built-up core does. K.S.A. 12-6a20 requires a Kansas seller to disclose any such special assessment to a buyer -- making a good-faith estimate if the exact figure is not yet fixed -- and to get the buyer's written acknowledgment before closing.",

      "[KS] Property in Spring Hill is assessed at the identical 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets statewide, applied to whatever market-value estimate the county assessor sets for a specific parcel -- the percentage does not change on either side of the Johnson-Miami line, only the underlying value estimate does.",

      "[KS] A buyer moving into one of this city's newer subdivisions occasionally finances the purchase through a contract for deed rather than an ordinary mortgage, and where that happens, the Kansas Contract for Deed Act -- in force since mid-2024 -- requires the seller to hold title free of most undisclosed encumbrances under K.S.A. 58-5203, and requires written notice and real time to cure a default under K.S.A. 58-5204 before the buyer's interest can be forfeited, 30 days if less than half the price has been paid, 90 days if half or more has.",

      "This city's own newer growth stands apart from the county seat cluster closer to the metro core -- Overland Park, Olathe, and Lenexa -- which built out decades earlier and carries a far older, more established housing stock than Spring Hill's own recent subdivisions.",

      "Louisburg, Paola, and Osawatomie sit farther south and west in Miami County, all considerably smaller and slower-growing than the Johnson County, Kansas side of Spring Hill's own footprint -- a genuine contrast in growth pace between the two counties this city straddles, not a difference in which statutes reach either side of the line.",

      "A house near the Johnson-Miami line in Spring Hill occasionally has its own school-district assignment cross the same county boundary its taxing jurisdiction does, so confirming both the county and the district a specific parcel actually falls under is worth doing before assuming either one from the mailing address alone.",

      "[KS] A closing on a house in Spring Hill also skips the old Kansas mortgage-registration tax entirely -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, reaching a newer subdivision closing in Spring Hill exactly as it reaches one anywhere else in the state.",

      "[KS] None of the above makes a fast cash sale the obvious answer for a seller in this city. A homeowner with real equity in a newer subdivision home and no urgent deadline is usually still better off listing conventionally, particularly given how steady buyer demand has stayed for the new construction driving this city's own growth.",

      "A cash sale earns genuine consideration in this city for a thin-equity owner once a mortgage and any liens are counted, an estate needing an uncomplicated and fast close, or a property carrying repair needs a conventional lender will not finance -- not as the default answer for a seller with equity and time to spare.",

      "None of this is legal advice. A Spring Hill homeowner unsure which county actually handles a specific parcel, or whether a special assessment or contract-for-deed question has been resolved correctly, should talk to a Kansas attorney who can review the actual paperwork.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-seller-disclosure-special-assessment"],
      citations["ks-contract-for-deed-act"],
      citations["ks-contract-for-deed-notice-cure"],
    ],
  },

  "sell-my-house-fast-clinton-mo": {
    slug: "sell-my-house-fast-clinton-mo",
    body: [
      "Clinton is the county seat of Henry County, roughly 9,416 people about 66.6 miles from the metro's core, sitting at the northern trailhead of the Rock Island Trail, a rail-to-trail conversion that has turned an old freight corridor into a genuine recreational draw, and within a short drive of the Harry S. Truman Reservoir's own recreation areas along the Henry-Benton County line.",

      "[MO] Every acre of this city sits in Missouri, inside Henry County, so Missouri law reaches a house sale in this city start to finish -- but this is a genuinely smaller market than Jackson, Clay, or Cass County, with far fewer comparable recent sales to price a specific house against and a slower overall pace of turnover.",

      "[MO] Clinton's own trustee's sales run on the same non-judicial track RSMo 443.290 and RSMo 443.327 set up across the state -- a named trustee, not a court, sells on default -- but the notice leading up to that sale reflects Henry County's own modest size. At roughly 22,485 residents, this county sits under the 50,000-person cutoff RSMo 443.320 uses, so notice here takes the smaller-county form: four weekly newspaper insertions rather than twenty daily ones, the last one running no more than seven days before the sale.",

      "[MO] A defaulting owner's shot at redemption is narrow by design under RSMo 443.410 and RSMo 443.420 -- it exists only if the lender itself, and not some third-party buyer, ends up holding the property after the trustee's sale, only if that owner filed written notice of an intent to redeem, and only if a bond for the full debt was posted inside a twenty-day window.",

      "[MO] Clinton's own dollar figures track Missouri's statewide numbers exactly: a $15,000 equity shield under RSMo 513.475 today, becoming $40,000 in 2027 once an enacted law takes effect, and a flat 19% assessment ratio under RSMo 137.115 that applies to a Henry County parcel the same way it applies to one in a much larger county.",

      "[MO] Delinquent taxes send a Clinton property down an entirely different statutory path than a mortgage default does -- RSMo 140.340 hands the owner an unconditional full year to redeem from the tax-sale date, with a second, weaker redemption right persisting after that year until the purchaser actually obtains the collector's deed.",

      "[MO] Henry County has no hub page of its own in this site's registry yet, so anyone in Clinton wanting a deeper county-specific treatment of these figures should look to the statewide Missouri pages in the meantime.",

      "[MO] Probate has the final say over who can actually sign for a Clinton house before it changes hands -- RSMo 473.780 lets an estate skip most routine court oversight through independent administration only when the will itself authorizes that path, or allows it with every heir's sign-off; without one of those two, supervised administration takes over and the court reviews each major step, sale included.",

      "[MO] No transfer tax attaches to a Clinton closing, courtesy of the same rule every Missouri city in this footprint relies on: Article X, Section 25 of the state constitution, in place since Missouri's own voters approved it in 2010, blocks the state, Henry County, and this city alike from ever creating one.",

      "The Rock Island Trail's own northern trailhead has drawn a modest but real stream of cycling and hiking visitors into Clinton in recent years, a genuine draw for a house within easy walking distance of downtown, but a fact about local recreation rather than about which statutes reach a sale elsewhere in the city.",

      "[MO] Selling a Clinton house that the seller actually knows was once used to manufacture methamphetamine triggers a written-disclosure duty under RSMo 442.606, with a second, separate written disclosure owed if the seller knew or should have known that same house sheltered or supplied someone convicted of a qualifying offense.",

      "Windsor is the other incorporated city sharing Henry County with Clinton, considerably smaller and with far less resale turnover than the county seat itself -- a difference in scale within one county, not in which state's statutes reach either city.",

      "Truman Lake's own recreational pull draws some seasonal buyer interest toward Clinton and the surrounding county even though the reservoir's main shoreline access sits closer to Warsaw in neighboring Benton County -- a regional draw that touches this city's own market at the margins without changing which county's courthouse or treasurer handles a specific Clinton parcel.",

      "[MO] The trade-off in a market this size cuts both ways: fewer active buyers means a house can sit unsold for a longer stretch once listed, but it also means less pressure toward an unnecessarily fast decision. An owner in Clinton with no pending foreclosure notice or fixed estate deadline is usually still better off listing through a realtor and giving that slower market the time it genuinely needs.",

      "A cash sale earns real consideration in Clinton specifically for an estate that needs to close before a fixed date, a house carrying repair needs no conventional lender in a market this size will finance, or an owner already behind on payments with a trustee's-sale notice approaching -- not as the default choice for an owner with time and a marketable house.",

      "[MO] None of the above is legal advice, and a small-county foreclosure notice, tax bill, or probate filing touching a Clinton property deserves a Missouri attorney's own review of the actual paperwork rather than a general description of statewide rules.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-chillicothe-mo": {
    slug: "sell-my-house-fast-chillicothe-mo",
    body: [
      "Chillicothe is the county seat of Livingston County, roughly 9,044 people about 73 miles from the metro's core, and nationally known for one specific claim: the Chillicothe Baking Company first sold machine-sliced bread in this city in 1928, a fact commemorated today with the city's own marketing as the birthplace of sliced bread. Downtown murals and a small museum display keep the story visible to anyone passing through.",

      "[MO] Every acre of this city sits in Missouri, inside Livingston County, so Missouri law reaches a house sale in this city start to finish -- but this is a genuinely smaller market than Jackson, Clay, or Cass County, with far fewer comparable recent sales to price a specific house against and a slower overall pace of turnover than the metro core.",

      "[MO] The mechanics of a Chillicothe trustee's sale start from the same two statutes every Missouri county relies on -- RSMo 443.290 vests the power of sale in a named trustee, and RSMo 443.327 lets that trustee act on it without ever setting foot in a courtroom. Livingston County itself, at roughly 14,557 residents, comes nowhere near the 50,000-person mark RSMo 443.320 uses to require the daily-newspaper notice track, so a Chillicothe sale instead gets four weekly newspaper notices, the last one landing within a week of the sale.",

      "[MO] RSMo 443.410 and RSMo 443.420 keep post-sale redemption narrow rather than automatic in Chillicothe -- it only becomes available where the lender itself bought the property back at the trustee's sale, the borrower already filed written notice of an intent to redeem, and a bond for the full debt amount went up within twenty days of that sale.",

      "[MO] The same two statewide numbers reach a Chillicothe sale as anywhere in the state: RSMo 513.475's $15,000 equity shield, rising to $40,000 in 2027 under a law Missouri has already enacted, and RSMo 137.115's flat 19% residential assessment ratio, unaffected by how small a county's own population happens to be.",

      "[MO] A separate statute, RSMo 140.340, governs what happens after unpaid taxes rather than a missed loan payment cost someone a Chillicothe property -- a full, no-conditions year to redeem starting at the tax sale, plus a lesser right that carries on even past that year until the purchaser actually gets the collector's deed.",

      "[MO] Livingston County itself has no hub page in this site's registry as this map goes live, leaving the statewide Missouri pages as the best available county-adjacent reference for a Chillicothe seller until that gap closes.",

      "[MO] A Chillicothe house tied up in an estate still has to pass through Missouri's own probate gate first -- RSMo 473.780 permits independent administration, which spares the estate most routine court sign-off, only where the will itself authorizes it or allows it with every heir's agreement; failing that, supervised administration takes over and a judge reviews the sale alongside every other major step.",

      "[MO] Article X, Section 25 of the Missouri Constitution reaches a Chillicothe closing the same way it reaches one anywhere else in the state, forbidding any transfer tax on real estate since Missouri voters wrote the ban into the constitution back in 2010.",

      "[MO] There is no dedicated Missouri statute demanding a general property-condition disclosure form, a gap Chillicothe's own older housing stock makes more relevant than it would be in a newer subdivision -- what fills that gap instead is the Missouri Merchandising Practices Act, which treats concealing, suppressing, or omitting a known material fact about a house's condition as an unlawful practice under RSMo 407.020, since RSMo 407.010 folds real estate into its own definition of \"merchandise.\"",

      "The sliced-bread story has become a genuine, if modest, tourism draw for downtown Chillicothe, a fact about local identity and foot traffic rather than about which statutes reach a house sale elsewhere in the city.",

      "Grand River runs along the edge of this city, and the surrounding farmland that makes up most of Livingston County shapes a genuinely more rural buyer pool than Chillicothe's own status as a county seat with a small regional hospital and school district might otherwise suggest.",

      "Chillicothe functions as the only real commercial hub for a wide stretch of north-central Missouri farmland, drawing buyers from several smaller surrounding towns the way a larger regional center would -- a genuine concentration of demand into one city, even though that demand still runs thinner overall than anything the metro core sees.",

      "[MO] The trade-off in a market this size cuts both ways: fewer active buyers means a house can sit unsold for a longer stretch once listed, but it also means less pressure toward an unnecessarily fast decision. An owner in Chillicothe with no pending foreclosure notice or fixed estate deadline is usually still better off listing through a realtor and giving that slower market the time it genuinely needs.",

      "A cash sale earns real consideration in Chillicothe specifically for an estate that needs to close before a fixed date, a house carrying repair needs no conventional lender in a market this size will finance, or an owner already behind on payments with a trustee's-sale notice approaching -- not as the default choice for an owner with time and a marketable house.",

      "[MO] None of the above is legal advice, and a small-county foreclosure notice, tax bill, or probate filing touching a Chillicothe property deserves a Missouri attorney's own review of the actual paperwork rather than a general description of statewide rules.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
      citations["mo-merchandising-practices-act"],
    ],
  },
};
