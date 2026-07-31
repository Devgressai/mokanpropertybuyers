import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * Wave 0C (counties 21-32) -- twelve more county hub pages, all of them
 * genuinely rural: every county in this batch sits under 22,000 people, and
 * most sit 60 to 97 miles out from the Kansas City core. Same mechanical
 * rules as every content map before this one: every paragraph asserting law
 * carries `[MO]` or `[KS]`, every legal assertion traces to an entry in
 * `citations` rather than being retyped, and no deictic stand-in for a named
 * state appears anywhere. See docs/CITATION-LEDGER.md for what backs every
 * citation used below.
 *
 * A county this small is not a smaller version of Jackson or Johnson County,
 * Kansas -- it is a different market. Far fewer comparable recent sales
 * means a specific house is harder to price and can sit far longer than the
 * same house would closer to the metro core; a smaller buyer pool often
 * means more cash and farm-credit purchases and fewer conventional mortgage
 * buyers; and agricultural land and outbuildings are a real, ordinary part
 * of the housing stock rather than an edge case. That thin-market reality
 * cuts both ways deliberately in every page below: a long listing period is
 * a genuine argument for a cash sale, and the same thin market is exactly
 * why a cash offer on a property like that tends to land lower than a
 * seller expects.
 *
 * Two pages below carry an explicit name trap. Jefferson County, Kansas is
 * one of several Jefferson Counties nationwide; this page says plainly it is
 * the one north of Lawrence. Atchison County, Kansas is a different county
 * from Atchison County, Missouri, which sits in Missouri's far northwest
 * corner outside this site's 53-county footprint entirely and so has no page
 * of its own -- a seller could easily search for the wrong one, and this
 * page says so directly rather than leaving that ambiguous.
 */
export const countyContentRural: Record<string, PageContent> = {
  "sell-my-house-fast-clinton-county-mo": {
    slug: "sell-my-house-fast-clinton-county-mo",
    body: [
      "Clinton County is the closest of these twelve counties to the Kansas City core, roughly 21,548 people across four towns -- Cameron, Gower, Lathrop, and the county seat, Plattsburg -- about 36 miles north on Interstate 35. Cameron sits right at the junction of I-35 and U.S. Highway 36, and that interchange has pulled more commercial and residential growth toward it over the decades than the other three towns have seen combined; Plattsburg, smaller than Cameron, is where the courthouse and the county's day-to-day government business actually sit.",

      "[MO] All four towns sit in Missouri, so a sale anywhere in Clinton County runs under the same statewide rules that govern Clay County and Platte County just to the south -- a trustee-driven foreclosure, a fixed-dollar homestead figure, a flat statewide assessment ratio -- even though Clinton County's own population is a small fraction of either of those two closer-in neighbors.",

      "[MO] A missed mortgage payment in Clinton County doesn't put anyone in front of a judge before the house can be sold. RSMo 443.290 lets a deed of trust name a trustee with the power of sale, and that trustee, under RSMo 443.327, can carry out the sale on default without a lawsuit ever being filed. RSMo 443.320 then ties how long notice has to run before that sale to the county's own population, and at 21,548 people, Clinton County sits below the 50,000-person line -- so notice runs for four successive weekly newspaper issues, the last one no more than a week out from the sale, rather than the twenty-insertion daily schedule Clay or Platte County uses.",

      "[MO] Redemption after that sale is not automatic anywhere in Missouri, and Clinton County is no exception: RSMo 443.410 and RSMo 443.420 require the lender itself to be the buyer at the sale, written notice of an intent to redeem to arrive at or before it, a bond covering the full debt posted within twenty days afterward, and the redemption itself to close out inside a year -- every one of those four, not just one or two.",

      "[MO] The same two statewide dollar figures reach every Clinton County home regardless of which of the four towns it sits in: RSMo 513.475 keeps $15,000 of equity out of an unsecured creditor's reach today, climbing to $40,000 on January 1, 2027 under a law already signed, and RSMo 137.115 taxes an ordinary residential parcel at 19% of its market-value estimate -- the identical rate applied in Clay County to the south or Worth County far to the north.",

      "[MO] Growth along the I-35 corridor has not brought a transfer tax with it, and constitutionally never can. Article X, Section 25 of the Missouri Constitution, added by statewide vote in 2010, keeps the state, Clinton County, and every town inside it from ever taxing the sale of a house or a farm parcel -- a Cameron closing costs no more in transfer tax than one in Plattsburg, Gower, or Lathrop, or anywhere else in the state.",

      "[MO] A Clinton County property sold for unpaid taxes rather than a missed mortgage payment follows a different clock entirely. RSMo 140.340 gives the owner, a lienholder, or any other interested party an unconditional right to redeem for a full year after the sale, with a weaker right after that lasting until the purchaser actually receives the collector's deed -- a separate process from the trustee's-sale redemption above, and one that shows up on farmland outside the four towns about as often as it does on a house inside them.",

      "Cameron's own anchor, Cameron Regional Medical Center, gives the town steady employment none of the other three has, on top of the interchange traffic; Gower and Lathrop, smaller and farther from that junction, see far less turnover from one year to the next; and Plattsburg carries the courthouse and the recorder's office but never captured Cameron's own commercial pull.",

      "At 21,548 people spread across four towns, Clinton County has noticeably fewer comparable recent sales in a given month than Clay or Platte County produce in a week, and that scarcity cuts two ways for a seller. A house outside Cameron can sit on the market considerably longer than the same house would closer to the metro core, which is a real argument for taking a certain cash offer rather than waiting; it is also exactly why an investor's opening number on a thinly traded property tends to land lower than a seller expects, since there is less recent local data to price against.",

      "A buyer purchasing outside Cameron's own subdivisions is more likely to be paying cash or financing through a farm-credit lender than through a conventional mortgage bank, particularly on a property that carries acreage or an outbuilding rather than a standard residential lot -- a different buyer pool than the one a Clay County listing typically draws.",

      "An estate settling a Clinton County house has to go through the same courthouse in Plattsburg no matter which of the four towns the property actually sits in -- Cameron, Gower, and Lathrop heirs alike file through the Clinton County Circuit Court there, and someone who has moved away from northwest Missouri is dealing with one small-town courthouse rather than a large metro clerk's office built to process filings by the hundreds.",

      "Clinton County's own proximity to the metro core, closer than any other county in this batch, has made it a genuine commuter option for households working in Kansas City or St. Joseph but priced out of Clay or Buchanan County -- new construction near Cameron reflects that spillover far more than Gower or Lathrop do, and the two smaller towns have changed comparatively little.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Clinton County. An owner in Cameron with real equity and no fixed deadline is usually better off listing conventionally, since the I-35 corridor still draws a reasonably steady stream of buyers; a cash sale earns real consideration mainly for a Gower or Lathrop property that would sit for months in a thinner market, farmland caught in a stalled estate, or a house needing repairs a conventional lender won't finance.",

      "[MO] None of this is legal advice. A Clinton County homeowner facing a foreclosure notice, an estate question, or uncertainty about how a farm-credit buyer's financing actually works should talk to a Missouri attorney who can review the specific paperwork, not rely on a general county page like this one.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-transfer-tax-ban"],
      citations["mo-tax-sale-redemption"],
    ],
  },

  "sell-my-house-fast-nodaway-county-mo": {
    slug: "sell-my-house-fast-nodaway-county-mo",
    body: [
      "Nodaway County is built almost entirely around one town, Maryville, roughly 20,695 people across the whole county and home to Northwest Missouri State University, about 89 miles north of the Kansas City core near the Iowa line. A university town changes a housing market in a specific way a purely farming county does not share: a real slice of Maryville's housing stock turns over as a rental on the academic calendar rather than on the ordinary reasons a house changes hands.",

      "[MO] Maryville sits in Missouri, so a sale anywhere in Nodaway County follows the identical statewide rules that reach Buchanan County and St. Joseph roughly 40 miles south along Interstate 29 -- a trustee-driven foreclosure, a dollar-figure homestead exemption, a flat assessment ratio -- despite Nodaway County's population being a fraction of its larger neighbor's.",

      "[MO] Nobody forecloses a Nodaway County mortgage by filing a lawsuit. RSMo 443.290 authorizes a deed of trust to name a trustee with the power of sale, and RSMo 443.327 lets that trustee sell the defaulted property directly, with no judge ever reviewing the file. Nodaway County's own population falls well under the 50,000-person line RSMo 443.320 sets, so notice of a Maryville-area trustee's sale runs for four successive weekly newspaper issues, wrapping up no more than a week before the sale, instead of the daily-newspaper schedule Buchanan County uses to the south.",

      "[MO] Redemption is never automatic after a Nodaway County trustee's sale -- RSMo 443.410 and RSMo 443.420 don't hand a borrower a year to redeem unless four things line up: the lender, not an outside investor, has to be the one who bought the property; the borrower has to notify the trustee in writing of an intent to redeem no later than the sale itself; a bond covering the full debt has to be posted inside the following twenty days; and the redemption itself has to close before twelve months pass.",

      "[MO] The same two statewide dollar figures reach a Maryville rental exactly as they would a farmhouse outside town: RSMo 513.475 shields $15,000 of home equity from an unsecured creditor's judgment right now, rising to $40,000 on January 1, 2027 under a law already signed, and RSMo 137.115 taxes an ordinary residential parcel in Nodaway County at the same 19% of market value used everywhere else in the state, university rental or owner-occupied home alike.",

      "[MO] An inherited Maryville house, whether it was a landlord's rental or a family's own residence, still has to clear Missouri probate before a sale can close with clear title. Under RSMo 473.780, an estate qualifies for independent administration -- free of most ongoing court sign-off -- only when the will authorizes it, or the will permits it and every heir agrees; failing that, supervised administration takes over, with the probate court approving each major step, a sale among them.",

      "[MO] A Nodaway County landlord also carries a duty Missouri law places on the sale itself rather than on any specific disclosure form: the Missouri Merchandising Practices Act, under RSMo 407.020 and RSMo 407.010, treats concealing, suppressing, or omitting a known material fact about a house -- student-rental wear and tear included -- as an unlawful practice, whether or not a checklist form exists asking about it directly.",

      "Maryville itself, with the university's own rental-heavy student housing stock and a steady flow of faculty and staff turnover, looks nothing like the farmland surrounding it on every side -- a landlord's rental near campus sells into a genuinely different buyer pool than a farmhouse a few miles outside town, even though both answer to the same statewide Missouri law above.",

      "Outside Maryville's own city limits, Nodaway County is almost entirely agricultural, and a house there can sit unsold for a considerably longer stretch than a rental near campus does between tenants -- a scarcity of comparable recent sales that cuts both ways for a seller: it's a genuine reason a certain cash offer looks appealing, and it's exactly why a cash buyer's opening number on a rural parcel like that tends to come in lower than a Maryville in-town comparable would suggest.",

      "A buyer for a farmhouse or acreage outside Maryville is more often paying cash or financing through a farm-credit lender than through an ordinary mortgage bank, and outbuildings -- a barn, a machine shed, a grain bin -- are a routine, expected part of what's being sold rather than an unusual add-on.",

      "The Nodaway County Courthouse in Maryville is the only courthouse in the county, and it handles every filing that touches real estate in the county -- probate, a foreclosure, a tax dispute -- whether the underlying property sits inside city limits or twenty miles out on a gravel road.",

      "A landlord with a Maryville rental sitting vacant between semesters, or dealing with a difficult student tenant, is a genuinely stronger candidate for a fast cash sale than an owner-occupied farmhouse in good repair with no deadline -- the university drives a distinct, recurring reason to sell quickly that the surrounding farmland simply does not share.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Nodaway County. An owner-occupied home in Maryville with no urgent deadline is usually better off listed conventionally, given the university's own steady demand; a cash sale earns real consideration mainly for a rental between tenants, a farmhouse that would sit for months in a thin rural market, or an estate that cannot wait out either one.",

      "[MO] None of this is legal advice. A Nodaway County homeowner facing a foreclosure notice, a landlord-disclosure question, or an estate involving a rental property should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-probate-independent"],
      citations["mo-merchandising-practices-act"],
    ],
  },

  "sell-my-house-fast-benton-county-mo": {
    slug: "sell-my-house-fast-benton-county-mo",
    body: [
      "Benton County sits at the western gateway to the Lake of the Ozarks, roughly 20,552 people across three towns -- Cole Camp, Lincoln, and the county seat, Warsaw -- about 89 miles southeast of the Kansas City core. Warsaw itself sits just below the Truman Dam, where the Osage River widens into the lake, and that setting gives this county a genuinely different housing stock than the farm counties elsewhere in this batch: a real share of it is lakefront or near-lake vacation property rather than a full-time residence.",

      "[MO] Cole Camp, Lincoln, and Warsaw all sit in Missouri, so a sale anywhere in Benton County follows the same statewide rules as Henry County immediately to the east, which shares this same reservoir under its more familiar name, Truman Lake -- a trustee-driven foreclosure, a fixed homestead dollar figure, a flat assessment ratio -- reached the identical way whether the property is a lake cabin near Warsaw or a farmhouse near Cole Camp.",

      "[MO] Missouri's foreclosure process skips the courthouse entirely: RSMo 443.290 lets a deed of trust name a trustee with the power of sale, and RSMo 443.327 lets that trustee sell a defaulted Benton County property directly, no lawsuit required. Because Benton County's population falls under the 50,000-person line RSMo 443.320 sets, notice of that sale runs on four successive weekly newspaper issues, the last one no more than a week before the sale -- the same shorter schedule Henry County's own lakefront market runs on.",

      "[MO] Whether a redemption right actually exists after a Benton County trustee's sale turns on four conditions under RSMo 443.410 and RSMo 443.420: the lender buying at its own sale, written notice of intent to redeem reaching the trustee at or before it, a bond for the debt posted within the following twenty days, and the redemption itself finished inside the year.",

      "[MO] A Benton County lake cabin and a Cole Camp farmhouse answer to the identical two statewide dollar figures. RSMo 513.475 keeps the first $15,000 of a homeowner's equity out of an unsecured creditor's reach as of today, a number set to jump to $40,000 on January 1, 2027 once an already-signed law takes hold, while RSMo 137.115 fixes the assessment ratio flat at 19% of market value no matter how close a specific house sits to the water.",

      "[MO] A lake or farm property left to heirs in Benton County still has to clear Missouri probate before it can pass with clear title. RSMo 473.780 opens independent administration, largely free of ongoing court oversight, when a will authorizes it or the will permits it and every heir agrees; short of either path, supervised administration takes over instead, with the probate court signing off on major steps, a sale of lake or farm property included.",

      "[MO] A Benton County property sold for delinquent taxes rather than a mortgage default runs on RSMo 140.340's own separate track: a full year of unconditional redemption rights running from the sale, with a weaker right afterward lasting only until the purchaser actually secures the collector's deed -- worth knowing on its own, since a seasonal lake cabin's tax bill can go unaddressed longer than a full-time residence's typically does.",

      "Warsaw carries the lake-driven segment of this county's market and most of its year-round population and resale activity; Cole Camp, settled predominantly by German immigrants in the 1830s and 1840s and still marking that heritage today, sits farther from the water and moves at a steadier, more farmland-driven pace; Lincoln, smaller still, sees fewer transactions in a typical year than either of the other two.",

      "A lake cabin near Warsaw sells on a genuinely different calendar than a Cole Camp farmhouse does -- buyer interest around the reservoir concentrates heavily in the warmer months, and an owner trying to move a vacation property in the off-season is working against a much thinner pool of lake buyers than the same property would draw come summer.",

      "A buyer for acreage outside Cole Camp or Lincoln is more often paying cash or working with a farm-credit lender than financing through an ordinary mortgage bank, and a barn or grain bin on the property is treated as a normal part of what's for sale rather than a complication -- a different buyer profile than the one shopping for a Warsaw lake cabin.",

      "Away from the lake, Cole Camp and Lincoln farmland has genuinely few comparable sales in a typical month, and that thinness cuts both ways for a seller: a farmhouse can go unsold for a long stretch, a real point in favor of a certain cash offer, and that same lack of local data is exactly why a cash buyer's opening number on it tends to land lower than a Warsaw lake-property comparable would suggest.",

      "The Benton County Courthouse sits in Warsaw and handles every filing touching real estate in the county, lakefront or farmland, and an heir living far from the reservoir is dealing with that single small-town courthouse rather than a large metro clerk's office.",

      "An heir who inherits a Benton County lake cabin used only seasonally faces a different practical question than one inheriting a Cole Camp farmhouse -- deciding whether to keep covering off-season lake-property costs, hold out for next summer's stronger buyer pool, or take a faster off-season sale instead is not the same calculation as settling an ordinary farmland estate.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Benton County. A well-maintained lake cabin near Warsaw with no urgent deadline is usually better off listed conventionally and timed around the season when lake buyers are actually looking; a cash sale earns real consideration mainly for a Cole Camp or Lincoln property that would sit for a long stretch in a thin rural market, or an off-season lake sale that genuinely cannot wait for summer.",

      "[MO] None of this is legal advice. A Benton County homeowner facing a foreclosure notice or weighing how the season affects a lake-property sale should talk to a Missouri attorney or a local realtor familiar with the reservoir market, not rely on a general county overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-probate-independent"],
      citations["mo-tax-sale-redemption"],
    ],
  },

  "sell-my-house-fast-vernon-county-mo": {
    slug: "sell-my-house-fast-vernon-county-mo",
    body: [
      "Vernon County is built almost entirely around Nevada, its county seat and only incorporated city of any size, roughly 19,710 people across the whole county, about 87 miles south of the Kansas City core. Nevada markets itself as the \"Queen City of the Prairie,\" and the description fits the county around it too -- Vernon County sits on the western edge of Missouri's prairie farm country, directly across the state line from Bourbon County, Kansas, covered elsewhere in this same batch.",

      "[MO] Nevada sits in Missouri, so a sale anywhere in Vernon County follows the same statewide rules as Bates County to the north in this same batch, or Cass County closer to the metro core -- a trustee-driven foreclosure, a dollar-figure homestead, a flat assessment ratio -- even though a house in Vernon County is competing in a market that looks nothing like either of those two.",

      "[MO] A Vernon County trustee doesn't wait on a judge to act. RSMo 443.290 authorizes a deed of trust to carry a power of sale, and RSMo 443.327 lets the named trustee sell a defaulted property directly once the borrower is behind. Because Vernon County's population sits well under RSMo 443.320's 50,000-person line, notice of that sale runs on four successive weekly newspaper issues, the last one no more than a week before the sale itself.",

      "[MO] RSMo 443.410 and RSMo 443.420 attach four separate conditions to any redemption right following a Vernon County trustee's sale: the lender must be the one who buys at the sale, the borrower's written notice of an intent to redeem must arrive at or before it, a bond covering the debt must post within the following twenty days, and the redemption itself must close out inside a year.",

      "[MO] RSMo 513.475 keeps $15,000 of home equity in Vernon County safe from an unsecured creditor's judgment right now, rising to $40,000 on January 1, 2027 under a law Missouri has already signed, and RSMo 137.115 assesses an ordinary Nevada home or a Vernon County farmhouse alike at the same statewide 19% of market value.",

      "[MO] An estate involving Vernon County farmland still has to clear Missouri probate before a sale can close with clear title. RSMo 473.780 lets a personal representative proceed through independent administration, free of most ongoing court sign-off, when a will authorizes it or the will permits it and every heir agrees; without either path, the estate moves through supervised administration instead, with the probate court approving a sale of farmland among its major steps.",

      "[MO] A Vernon County seller with an older farmhouse should also know that a Missouri seller who knows a property was used to produce methamphetamine must disclose that fact in writing under RSMo 442.606, and must separately disclose if the property was the residence, storage site, or lab of someone convicted of a related crime the seller knew or should have known about -- a real question on rural property that has changed hands informally within a family more than once.",

      "Nevada carries essentially all of Vernon County's resale activity, its courthouse, and its year-round population; the rest of the county is farmland dotted with smaller unincorporated communities, where a house changes hands rarely enough that a comparable sale can be genuinely hard to find nearby.",

      "The state line between Vernon County, Missouri and Bourbon County, Kansas runs the length of the county's western edge, and while the land and the farming economy look identical on either side of it, everything about how a sale actually proceeds -- who has to sign off, how long anything takes, and what a seller keeps at closing -- changes completely the moment a property crosses from one side to the other.",

      "A buyer for farmland or acreage outside Nevada is considerably more likely to pay cash or finance through a farm-credit lender than through a conventional mortgage bank, and a barn, machine shed, or grain bin on the property is an ordinary, expected part of the sale rather than an unusual complication for an appraiser to work around.",

      "At 19,710 people concentrated almost entirely in one city, Vernon County has few comparable recent sales outside Nevada itself in a given month, and a seller should weigh that fact in both directions: a rural property can sit unsold for a long stretch, which is a real reason a certain cash offer looks appealing, and that same thinness is exactly why a cash buyer's opening number on it tends to come in lower than a metro-area comparable would suggest.",

      "An heir to Vernon County farmland scattered among several family members faces a genuinely different problem than a Nevada homeowner selling a single-family residence -- sorting out who can actually sign for the land, and whether every heir agrees to independent administration, often takes longer than settling a straightforward town-home estate does.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Vernon County. A Nevada homeowner with real equity and no fixed deadline is usually better off listing conventionally through a local realtor; a cash sale earns real consideration mainly for farmland tied up in a stalled, multi-heir estate, or a rural property needing repairs a conventional lender will not finance.",

      "[MO] None of this is legal advice. A Vernon County homeowner facing a foreclosure notice or an estate involving farmland split among heirs should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county summary.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-probate-independent"],
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-jefferson-county-ks": {
    slug: "sell-my-house-fast-jefferson-county-ks",
    body: [
      "Jefferson County, Kansas is the county directly north of Lawrence and Douglas County, roughly 18,327 people across two towns, Oskaloosa and Valley Falls, about 44 miles from the Kansas City core -- and it is worth being precise about which Jefferson County this is, since the name is shared by dozens of counties across the country. This is the Jefferson County that sits north of Lawrence in northeast Kansas, not a Jefferson County in any other state.",

      "[KS] Oskaloosa and Valley Falls both sit in Kansas, so a sale anywhere in Jefferson County follows the same statewide rules that govern Douglas County just to the south -- a judicial foreclosure process, a redemption right measured in months, an uncapped homestead exemption -- even though Jefferson County's own population is a small fraction of its university-driven neighbor's.",

      "[KS] A Jefferson County default doesn't end with a private sale. K.S.A. 60-2410 requires a lawsuit resulting in a judgment before a sheriff can sell the property under execution, and K.S.A. 60-2415 requires the district court to confirm that sale before a deed can pass -- no trustee named in a Jefferson County deed of trust has the power Missouri gives one just across the state line.",

      "[KS] K.S.A. 60-2414 sets that redemption window at twelve months by default, but compresses it to three whenever the borrower defaulted early, with less than a third of the original debt retired -- unless the property carries less than a third of its own value in combined liens, a low-leverage exception that restores the full twelve months regardless of timing.",

      "[KS] A Jefferson County homestead -- a manufactured home, a single acre inside Oskaloosa or Valley Falls, or as much as 160 acres of farmland -- is shielded from forced sale by Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 without any dollar limit attached at all, and Article 11, Section 1 of the Kansas Constitution taxes an ordinary Jefferson County residential property at 11.5% of its market-value estimate, the same ratio used statewide.",

      "[KS] Perry Lake, the reservoir the Army Corps of Engineers built on the Delaware River, sits inside Jefferson County and shapes a real slice of its housing stock the way it does for no other county in this batch -- a share of the property near its shoreline is recreational or seasonal rather than a full-time residence, on top of an otherwise ordinary farm-county market.",

      "[KS] Buying a Jefferson County property the county itself bid off at a tax sale means waiting: K.S.A. 79-2401a keeps the county holding it for two years as a rule, three if the property counts as a homestead, before any resale can even take place. Once that resale does happen, K.S.A. 79-2803 shuts the redemption door for good -- there's no getting the property back afterward the way a mortgage-foreclosure sale would allow.",

      "Oskaloosa, the county seat, carries the courthouse and most of the county's ordinary resale activity; Valley Falls, smaller and farther east, moves at an even steadier, slower pace; and the land around Perry Lake draws a distinct seasonal buyer looking for recreational property rather than a year-round home.",

      "[KS] An estate in Jefferson County, lake cabin or farmland alike, still has to clear the same Kansas probate test used statewide: under K.S.A. 59-3202, a court -- not the will by itself -- chooses between simplified and supervised administration by weighing the estate's solvency, its size, how well the heirs agree, and what settling it is likely to cost.",

      "A buyer for farmland outside Oskaloosa or Valley Falls is considerably more likely to be paying cash or financing through a farm-credit lender than through a conventional mortgage bank, and a lake-adjacent seller near Perry Lake often faces the opposite: a buyer whose bank hesitates over flood-zone or shoreline-setback questions a straightforward farmhouse sale would never raise.",

      "At 18,327 people spread mostly between two small towns and the lake and farmland between them, Jefferson County has genuinely few comparable sales in a typical month -- an appraisal on a Jefferson County parcel often has to reach back further in time, or draw on a lake-property sale instead of a straight residential one, in a way a denser county closer to Lawrence rarely requires.",

      "An owner selling a Perry Lake cabin in the off-season faces a real timing tradeoff a Valley Falls town-home seller does not: an off-season cash sale trades away the stronger summer buyer pool for certainty now, while a farmland parcel outside either town can sit unsold for months regardless of season -- a real reason a certain cash offer looks appealing, and exactly why that offer's opening number tends to come in lower than what an Oskaloosa in-town comparable would suggest.",

      "Jefferson County's own courthouse sits in Oskaloosa, and it handles every filing touching real estate in the county regardless of whether the parcel in question is a Valley Falls town lot, a working farm, or a cabin near the reservoir -- a single small-town courthouse standing in for what a Douglas County seller would find spread across a much larger county clerk's office in Lawrence.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Jefferson County. An owner in Oskaloosa or Valley Falls with no urgent deadline is usually better off listing conventionally; a cash sale earns real consideration mainly for an off-season lake property, farmland caught in a stalled estate, or a house needing repairs a conventional lender will not finance.",

      "[KS] None of this is legal advice. A Jefferson County homeowner facing a foreclosure summons or an estate question involving lake or farm property should talk to a Kansas attorney who can review the actual paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-andrew-county-mo": {
    slug: "sell-my-house-fast-andrew-county-mo",
    body: [
      "Andrew County sits directly north of St. Joseph and Buchanan County, roughly 18,127 people across two towns, Savannah and Country Club, about 63 miles from the Kansas City core. Savannah, the county seat, and Country Club, a small city near the St. Joseph Regional Airport, both function as bedroom communities more than as independent economic centers -- a meaningful share of Andrew County's own growth is spillover from households working in St. Joseph but choosing a smaller, quieter town to live in.",

      "[MO] Andrew County follows the same trustee-driven process every Missouri county does, no courtroom involved. Savannah and Country Club both sit in Missouri, so a sale in Andrew County runs under the same statewide law that reaches Buchanan County just to the south -- despite Andrew County's own population sitting at barely a fifth of its larger neighbor's.",

      "[MO] RSMo 443.290 lets a Missouri deed of trust name a trustee with the power of sale, and RSMo 443.327 lets that trustee sell a defaulted Andrew County property directly, without a lawsuit ever being filed. Andrew County falls under the 50,000-person line RSMo 443.320 sets, so a notice of trustee's sale has to run for four successive weekly newspaper issues, wrapping up no more than a week before the sale -- not the daily-newspaper schedule Buchanan County uses just to the south.",

      "[MO] Four separate conditions decide whether an Andrew County borrower actually gets to redeem after a trustee's sale, under RSMo 443.410 and RSMo 443.420: the buyer at the sale has to be the lender itself; written notice of an intent to redeem has to reach the trustee at or before the sale date; a bond for the full debt has to post within twenty days afterward; and the redemption itself has to happen inside a year. Skip any one of the four and no redemption period exists at all.",

      "[MO] Savannah and Country Club homes answer to the same two statewide dollar figures every Missouri property does: RSMo 513.475 shields $15,000 of home equity from an unsecured creditor's judgment today, growing to $40,000 once January 1, 2027 arrives under a law already on the books, while RSMo 137.115 puts the assessment ratio at 19% of market value across the board, Andrew County included.",

      "[MO] A Savannah or Country Club property sold for delinquent taxes instead of a missed mortgage payment follows its own separate track under RSMo 140.340 -- a full year of unconditional redemption rights from the sale date, followed by a weaker right that lasts only until the purchaser actually secures the collector's deed, a distinct process from the trustee's-sale redemption above.",

      "[MO] Article X, Section 25 of the Missouri Constitution, adopted by statewide vote in 2010, reaches an Andrew County closing the same as it does everywhere else in the state -- the state, the county, and every town inside it are barred from ever taxing the sale of a house or a farm parcel, a genuinely relevant fact for a commuter household weighing closing costs against a St. Joseph purchase just across the county line.",

      "Savannah carries the courthouse and the larger share of Andrew County's resale activity, drawing commuters into St. Joseph as much as it does anyone working locally; Country Club, smaller and closer to the airport, has its own tighter commuter identity tied even more directly to Buchanan County next door.",

      "[MO] An Andrew County estate, whether a Savannah residence or farmland outside either town, still has to clear Missouri probate before a sale can close with clear title. RSMo 473.780 opens independent administration -- largely free of ongoing court oversight -- when a will authorizes it or the will permits it and every heir agrees; short of either path, supervised administration governs instead, with the probate court's sign-off attaching to major steps.",

      "A buyer for farmland or acreage outside Savannah or Country Club is considerably more likely to pay cash or finance through a farm-credit lender than through an ordinary mortgage bank, a pattern that looks nothing like the conventional-mortgage buyer pool typical of a St. Joseph subdivision sale just across the county line.",

      "At 18,127 people, Andrew County has fewer comparable recent sales in a given month than Buchanan County produces in a week, and that scarcity cuts both ways for an Andrew County seller -- a house outside Savannah or Country Club can sit unsold for a long stretch, a real argument for a certain cash offer, while that same thinness is exactly why an investor's opening number tends to come in lower than a St. Joseph comparable would suggest.",

      "A commuter household relocating for a St. Joseph job with a fixed start date is a genuinely different seller than a longtime Savannah resident with no deadline at all -- the first has a real, timeline-driven reason to consider a fast sale that the second usually does not share.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Andrew County. A Savannah or Country Club homeowner with real equity and no fixed deadline is usually better off listing conventionally, given the steady commuter demand from St. Joseph; a cash sale earns real consideration mainly for a relocation on a tight schedule, farmland tied up in a stalled estate, or a property needing repairs a conventional lender will not finance.",

      "[MO] None of this is legal advice. An Andrew County homeowner facing a foreclosure notice or a relocation deadline tied to a St. Joseph job should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-transfer-tax-ban"],
      citations["mo-probate-independent"],
    ],
  },

  "sell-my-house-fast-cooper-county-mo": {
    slug: "sell-my-house-fast-cooper-county-mo",
    body: [
      "Cooper County is anchored by Boonville, its county seat and only incorporated city of real size, roughly 16,947 people across the whole county, about 97 miles east of the Kansas City core on the Missouri River. Boonville is an old river-crossing town in the literal sense -- it sits along the historic Boone's Lick Road corridor that fed the Santa Fe and Oregon Trails, and its downtown and residential streets reflect that age far more than any newer subdivision growth found closer to the metro core.",

      "[MO] Boonville sits in Missouri, so a sale anywhere in Cooper County follows the identical statewide rules that reach Pettis County to the west and Saline County to the northwest, both covered elsewhere in this batch -- a trustee-driven foreclosure, a dollar-figure homestead, a flat assessment ratio -- despite Cooper County's own river-town character looking different from either neighbor's own farmland-heavy identity.",

      "[MO] In Cooper County, as everywhere in Missouri, a deed of trust's own trustee -- not a judge -- is who actually sells a defaulted house. RSMo 443.290 authorizes that power of sale, and RSMo 443.327 lets the trustee carry it out once the borrower is in default. Because Cooper County's population sits well under RSMo 443.320's 50,000-person threshold, notice of that sale runs on four successive weekly newspaper issues, the last one no more than a week before the sale.",

      "[MO] RSMo 443.410 and RSMo 443.420 gate any redemption right after a Cooper County trustee's sale on four separate conditions: the lender must be the buyer at its own sale, the borrower's written notice of an intent to redeem must arrive at or before it, a bond for the debt must be posted within twenty days afterward, and the redemption itself must close out inside the year.",

      "[MO] Boonville's own equity and tax figures are set at the state level, not the county level: $15,000 of home equity stays out of an unsecured creditor's reach under RSMo 513.475 for now, a figure set to grow to $40,000 the moment January 1, 2027 arrives under a bill Missouri's legislature has already passed, and RSMo 137.115 fixes the assessment ratio on an ordinary residential parcel at 19% of market value, whether that parcel sits in Boonville, Pettis County, or Saline County next door.",

      "[MO] A Boonville seller with an older river-town property should also know Missouri never adopted a single statute requiring a general property-condition disclosure form. What actually protects a buyer against a seller's silence is broader and less specific: the Missouri Merchandising Practices Act treats concealing, suppressing, or omitting a known material fact about a house as an unlawful practice in its own right, under RSMo 407.020 and RSMo 407.010, whether or not any particular disclosure form asks about it.",

      "[MO] A Cooper County farm or river-town house left to heirs still has to clear Missouri probate before a sale can close with clear title. RSMo 473.780 permits independent administration, free of most ongoing court oversight, when a will authorizes it or the will permits it and every heir agrees; short of either condition, supervised administration takes over instead, with the probate court's approval attaching to a sale as one of the major steps.",

      "Boonville itself carries nearly all of Cooper County's resale activity and its courthouse, along with a historic downtown and older housing stock that draws a narrower, more particular buyer than a newer subdivision would; the rest of the county is largely river-bottom farmland, where a house changes hands far less often and a comparable sale can be genuinely hard to find nearby.",

      "A buyer for farmland outside Boonville is considerably more likely to be paying cash or financing through a farm-credit lender than through a conventional mortgage bank, and a barn, grain bin, or other outbuilding on the property is treated as an ordinary part of the sale rather than a complication for an appraiser.",

      "Cooper County's 16,947 people are concentrated almost entirely in one river town, which leaves few comparable recent sales to draw on in a typical month, and a seller should read that fact honestly in both directions: a rural parcel outside Boonville can sit unsold for months on end, making a certain cash offer genuinely tempting, while that same shortage of local data is precisely why a cash buyer's first number on it tends to come in lower than a Boonville in-town comparable would suggest.",

      "An owner of an older Boonville home near the historic district faces a narrower but real buyer interest that a fast, as-is cash sale generally does not capture the way a patient, conventionally marketed listing could -- a genuinely different calculation than the one facing a farmland heir outside town with no such niche demand to wait for.",

      "The Cooper County Courthouse sits in Boonville and handles every filing that touches real estate anywhere in the county, historic downtown property or river-bottom farmland alike, and an heir who no longer lives near central Missouri is dealing with one small-town courthouse rather than a large metro clerk's office built to process filings by the hundreds.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Cooper County. A Boonville homeowner with real equity and no urgent deadline is usually better off listing conventionally, particularly near the historic district where patient marketing tends to pay off; a cash sale earns real consideration mainly for farmland tied up in a stalled estate, or a property needing repairs a conventional lender will not finance.",

      "[MO] None of this is legal advice. A Cooper County homeowner facing a foreclosure notice or an estate involving river-bottom farmland should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county summary.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-merchandising-practices-act"],
      citations["mo-probate-independent"],
    ],
  },

  "sell-my-house-fast-bates-county-mo": {
    slug: "sell-my-house-fast-bates-county-mo",
    body: [
      "Bates County sits along the Kansas state line directly east of Miami County, Kansas, covered elsewhere in this batch, roughly 16,242 people across three towns -- Butler, Adrian, and Rich Hill -- about 60 miles south of the Kansas City core. Rich Hill in particular is a former coal-mining town, its older housing stock and street layout still reflecting that history; Butler, the county seat, and Adrian, smaller and closer to Cass County to the north, are both more purely agricultural today.",

      "[MO] All three towns sit in Missouri, so a sale anywhere in Bates County follows the same statewide rules that govern Cass County immediately to the north -- a trustee-driven foreclosure, a dollar-figure homestead, a flat assessment ratio -- even though Bates County's own population is a small fraction of its larger, closer-in neighbor's.",

      "[MO] Bates County's foreclosure process skips the courthouse entirely. RSMo 443.290 lets a deed of trust name a trustee with the power of sale, and RSMo 443.327 lets that trustee sell a defaulted property directly once the borrower is behind, no lawsuit involved. Population is what sets the notice schedule under RSMo 443.320, and Bates County comes in well under the 50,000-person mark, so a trustee's sale notice has to publish across four straight weekly newspaper issues, finishing no more than a week ahead of the sale.",

      "[MO] Whether redemption is even available after a Bates County trustee's sale comes down to four conditions under RSMo 443.410 and RSMo 443.420, and Missouri requires every one of them: the lender bought the property at its own sale; the borrower gave written notice of an intent to redeem no later than the sale date; a bond covering the debt went up within the following twenty days; and the actual redemption happened before the year ran out.",

      "[MO] Bates County home values are taxed and protected exactly like any other Missouri parcel's: $15,000 of equity stays safe from an unsecured creditor's judgment under RSMo 513.475 as of today, set to grow to $40,000 once January 1, 2027 arrives under a law already on the books, and RSMo 137.115 puts the assessment ratio at 19% of market value, the same figure Cass County to the north uses.",

      "[MO] A Rich Hill property with an older history, a converted mining-era building included, raises a disclosure question a newer Adrian home rarely has to answer. Under RSMo 442.606, a seller who knows the house was once used to produce methamphetamine has to put that fact in writing for the buyer, and has to do the same, separately, if the property served as the home, storage site, or lab for someone the seller knew -- or reasonably should have known -- was convicted of a related offense.",

      "[MO] A Bates County property sold for delinquent taxes rather than a missed mortgage payment follows RSMo 140.340's own separate track -- a full year of unconditional redemption rights from the sale date, and a weaker right afterward lasting only until the purchaser actually receives the collector's deed, a genuinely different process from the trustee's-sale redemption above and one that shows up on Bates County farmland about as often as on a house in town.",

      "Butler carries the courthouse and the largest share of Bates County's resale activity; Rich Hill's former coal-mining core gives it an older, denser housing stock than either Butler or Adrian; and Adrian, closest to Cass County, draws more of that county's own spillover growth than Rich Hill or Butler see.",

      "[MO] A farm family working land on the Missouri side of the state line, directly across from Miami County, Kansas, is bound by every one of the Missouri rules above the moment a sale or a default happens -- a legal reality that doesn't show up anywhere in the soil or the fence line itself, since a Kansas parcel a few hundred feet away follows a completely different set of rules.",

      "A buyer for farmland or acreage outside Butler, Adrian, or Rich Hill is considerably more likely to be paying cash or financing through a farm-credit lender than through a conventional mortgage bank, and a barn or grain bin on the property is an ordinary, expected part of what's for sale.",

      "At 16,242 people spread across three towns, Bates County has few comparable recent sales in a given month, and that scarcity cuts both ways for a seller -- a rural property can sit unsold for a long stretch, a genuine reason a certain cash offer looks appealing, and that same thinness is exactly why a cash buyer's opening number on it tends to land lower than a Cass County comparable would suggest.",

      "An heir to Rich Hill property with an unclear history behind it faces a different practical question than an Adrian farmland heir with straightforward title -- confirming what an older building was actually used for before assuming a fast, as-is sale is the simplest path forward is worth the extra step.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Bates County. A Butler or Adrian homeowner with real equity and no fixed deadline is usually better off listing conventionally; a cash sale earns real consideration mainly for a Rich Hill property with disclosure complications, farmland tied up in a stalled estate, or a house needing repairs a conventional lender will not finance.",

      "[MO] None of this is legal advice. A Bates County homeowner facing a foreclosure notice or uncertain what an older Rich Hill property's history requires disclosing should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-seller-disclosure-meth"],
      citations["mo-tax-sale-redemption"],
    ],
  },

  "sell-my-house-fast-atchison-county-ks": {
    slug: "sell-my-house-fast-atchison-county-ks",
    body: [
      "Atchison County, Kansas should not be confused with Atchison County, Missouri, a different county in Missouri's far northwest corner that sits outside this site's 53-county footprint entirely and has no page of its own -- a seller could easily search for the wrong one, so it's worth saying plainly: this page covers Atchison County, Kansas, built around the city of Atchison itself, roughly 16,016 people across the whole county, about 49 miles from the Kansas City core on the Missouri River.",

      "[KS] Atchison, the birthplace of Amelia Earhart and home to Benedictine College, sits in Kansas, so a sale anywhere in Atchison County follows the same statewide rules that reach Leavenworth County immediately to the south, covered elsewhere in this batch -- a judicial foreclosure process, a redemption right measured in months, an uncapped homestead exemption -- despite Atchison County's own population being a fraction of its larger, closer-in neighbor's.",

      "[KS] Kansas has no trustee's-sale shortcut, and Atchison County is no exception. K.S.A. 60-2410 requires a lawsuit ending in a judgment before a sheriff's sale can happen, and K.S.A. 60-2415 requires the district court to confirm that sale before a deed can pass -- a Missouri-style private trustee sale simply does not exist on this side of the river.",

      "[KS] Redemption normally runs a full twelve months under K.S.A. 60-2414, though an early default -- one occurring before a third of the debt has been paid off -- cuts that to three months, except when the property's total liens amount to less than a third of what it's worth, a condition that restores the full year no matter how soon the default happened.",

      "[KS] No dollar figure caps what Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 protect in Atchison County -- a manufactured home, one acre inside Atchison itself, or up to 160 acres of farmland all qualify regardless of value -- while Article 11, Section 1 of the Kansas Constitution taxes an ordinary residential property at the identical 11.5% of market value charged everywhere in the state.",

      "[KS] One line item an Atchison buyer's closing statement won't carry is a mortgage registration tax -- the legislature retired that tax for good when K.S.A. 79-3102 was repealed, effective January 1, 2019, and nothing has revived it anywhere in Kansas since.",

      "[KS] An Atchison County property bid off at a tax foreclosure sale doesn't go back on the market right away: K.S.A. 79-2401a requires the county to hold it first, generally for two years, stretched to three when the property qualifies as a homestead, and only after that period ends can a further sale happen -- one that K.S.A. 79-2803 then closes to any redemption at all, since Kansas courts have held that no redemption right survives a tax foreclosure sale.",

      "Atchison itself, an old Missouri River port town, carries a historic downtown and residential streets built up well before the newer construction found in the faster-growing counties closer to the metro core, and Benedictine College adds a modest rental-driven segment to the local market that a purely agricultural county in this batch does not share.",

      "[KS] An Atchison estate, college-adjacent rental or family farm alike, still has to clear the same Kansas probate test used statewide: under K.S.A. 59-3202, a court -- not the will alone -- chooses between simplified and supervised administration by weighing the estate's solvency, its size, how well the heirs agree, and the likely cost of settling it.",

      "A buyer for farmland outside Atchison itself is considerably more likely to be paying cash or financing through a farm-credit lender than through a conventional mortgage bank, a pattern the college's own rental-driven segment of the market doesn't share at all.",

      "At 16,016 people concentrated mostly in one river town, Atchison County has few comparable recent sales in a given month outside Atchison itself, and that scarcity cuts both ways for a rural seller in the county -- a farmhouse can sit unsold for a long stretch, a real argument for a certain cash offer, and that same thinness is exactly why a cash buyer's opening number on it tends to land lower than an Atchison-town comparable would suggest.",

      "A landlord with a Benedictine College-area rental sitting vacant between semesters is a genuinely stronger candidate for a fast cash sale than a farmhouse owner with no deadline at all -- the college drives a distinct, recurring reason to sell quickly that the surrounding farmland doesn't share.",

      "The Atchison County Courthouse in Atchison itself handles every filing that touches real estate in the county, whether the parcel in question is a downtown rental near the college or a farm several miles out along the river bluffs -- a single small-town courthouse rather than a large metro clerk's office built to process filings by the hundreds.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Atchison County. An owner-occupied home in Atchison itself with no urgent deadline is usually better off listed conventionally, given the college's own steady rental demand; a cash sale earns real consideration mainly for a rental between semesters, farmland that would sit for months in a thin rural market, or an estate that cannot wait out either one.",

      "[KS] None of this is legal advice, and confirming which Atchison County a specific property sits in isn't a legal question at all -- it's a matter of checking the state on a deed or tax bill first. An Atchison County, Kansas homeowner facing a foreclosure summons or an estate question should talk to a Kansas attorney who can review the actual paperwork.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-osage-county-ks": {
    slug: "sell-my-house-fast-osage-county-ks",
    body: [
      "Osage County sits directly south of Topeka and Shawnee County, and west of Franklin County, both covered elsewhere in this batch, roughly 15,824 people across three towns -- Carbondale, Lyndon, and Osage City -- about 68 miles from the Kansas City core. Osage City in particular grew up around a coal-mining industry in the late 1800s that has long since ended, and its older housing stock still reflects that history more than the newer growth found in Carbondale, the town closest to Topeka's own southern edge.",

      "[KS] All three towns sit in Kansas, so a sale anywhere in Osage County follows the same statewide rules that reach Shawnee County to the north and Franklin County to the east -- a judicial foreclosure process, a redemption right measured in months, an uncapped homestead exemption -- even though Osage County's own population is a small fraction of Shawnee County's.",

      "[KS] An Osage County foreclosure runs through the district court from start to finish. K.S.A. 60-2410 requires a lawsuit ending in a judgment before a sheriff's sale can happen, and K.S.A. 60-2415 requires that sale to be confirmed by the court before a deed passes -- no private trustee's sale exists in Kansas the way one does under a Missouri deed of trust.",

      "[KS] The twelve-month redemption period K.S.A. 60-2414 grants shrinks to three months in one specific circumstance: a default before the borrower has retired a third of the original debt. That exception has an exception of its own -- if every lien against the property together totals less than a third of its market value, the statute restores the full twelve months regardless of how early the default occurred.",

      "[KS] Whether it's a manufactured home, a single acre inside Carbondale, Lyndon, or Osage City, or up to 160 acres of farmland, Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 keep it out of a creditor's reach with no ceiling on its value, and Article 11, Section 1 of the Kansas Constitution then taxes an ordinary Osage County home at the same 11.5% of market value applied statewide, Topeka included.",

      "[KS] Kansas doesn't put its broadest disclosure duty on an Osage County seller directly -- it lands on whichever real estate licensee represents that seller. K.S.A. 58-30,106 obligates that licensee to tell a buyer who is merely a customer, not a client, about any adverse material fact they actually know, covering everything from the condition of the structure itself to a defect buried in the title.",

      "[KS] An Osage County property bid off at a tax foreclosure sale doesn't return to the market right away: K.S.A. 79-2401a forces the county to hold it first, generally for two years, stretched to three when it qualifies as a homestead, before any further sale can proceed -- and K.S.A. 79-2803 then closes off redemption entirely the moment that further sale happens.",

      "Carbondale, closest to Topeka, has absorbed more Shawnee County commuter spillover than either Lyndon, the county seat, or Osage City, whose old mining-town core moves at a steadier, slower pace than Carbondale's own newer growth; Lyndon carries the courthouse and handles filings for all three towns alike.",

      "[KS] Whether it's a Carbondale commuter home or a piece of Osage City's older housing stock, an Osage County estate answers to the identical K.S.A. 59-3202 test every Kansas estate does: a court, not the will alone, decides between simplified and supervised administration by looking at the estate's solvency, how large it is, whether the heirs get along, and what settling it is likely to cost.",

      "Farmland changing hands between the three towns is considerably more likely to involve cash or a farm-credit lender than a conventional mortgage bank, a pattern Carbondale's own commuter buyers, financing through an ordinary bank, don't share.",

      "At 15,824 people spread across three small towns and the farmland between them, Osage County has genuinely few comparable sales in a typical month outside Carbondale's own commuter-driven pocket. An Osage City or Lyndon property can sit unsold for a long stretch as a result, a real reason a certain cash offer looks appealing, and that same scarcity of local data is exactly why a cash buyer's opening number on it tends to land lower than a Carbondale comparable would suggest.",

      "A Carbondale seller weighing a cash offer against Topeka-driven commuter demand faces a different calculation than an Osage City seller facing a genuinely thinner, older-town buyer pool -- the same statutes govern both, but the practical case for accepting a discounted cash offer is not the same in the two settings.",

      "The Osage County Courthouse in Lyndon handles every filing touching real estate anywhere in the county, whether the parcel in question is a Carbondale commuter home, an Osage City rental, or farmland between the three towns -- one small-town courthouse standing in for what a Shawnee County seller would find spread across a much larger clerk's office in Topeka.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Osage County. A Carbondale homeowner with real equity and no urgent deadline is usually better off listing conventionally, given the Topeka-driven commuter demand; a cash sale earns real consideration mainly for an Osage City or Lyndon property that would sit for a long stretch in a slower, older-town market, or farmland caught in a stalled estate.",

      "[KS] None of this is legal advice. An Osage County homeowner facing a foreclosure summons or an estate question should talk to a Kansas attorney who can review the actual paperwork for that specific property, not rely on a general county overview.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-livingston-county-mo": {
    slug: "sell-my-house-fast-livingston-county-mo",
    body: [
      "Livingston County is built around Chillicothe, its county seat and only city of real size, roughly 14,557 people across the whole county, about 72 miles northeast of the Kansas City core. Chillicothe markets itself as the \"Home of Sliced Bread,\" after a local bakery put the first commercial bread-slicing machine into use there in 1928, and the small-town identity that anecdote points to runs through the rest of the county as well -- a single county-seat market surrounded by farmland, with almost no other town of comparable size anywhere in Livingston County.",

      "[MO] Chillicothe sits in Missouri, so a sale anywhere in Livingston County follows the identical statewide rules that reach Ray County closer to the metro core, covered elsewhere in this batch -- a trustee-driven foreclosure, a dollar-figure homestead, a flat assessment ratio -- despite Livingston County sitting farther out and carrying no comparable second town the way several of its neighbors do.",

      "[MO] Livingston County homeowners never see a judge before a trustee's sale happens. RSMo 443.290 lets a deed of trust name a trustee with the power of sale, and RSMo 443.327 lets that trustee sell a defaulted property directly, no lawsuit filed. Livingston County's population sits well under RSMo 443.320's 50,000-person line, which means a weekly newspaper carries the notice four separate times, with publication ending no later than a week ahead of the sale date.",

      "[MO] RSMo 443.410 and RSMo 443.420 gate any redemption right following a Livingston County trustee's sale on four separate conditions: the lender itself buying at the sale, the borrower's written notice of an intent to redeem arriving at or before it, a bond for the debt posted within the following twenty days, and the redemption itself completed before the year runs out.",

      "[MO] RSMo 513.475 shields $15,000 of home equity in Livingston County from an unsecured creditor's judgment today, climbing to $40,000 on January 1, 2027 under a law already signed, and RSMo 137.115 assesses an ordinary Chillicothe home or a county farmhouse alike at the same statewide 19% of market value.",

      "[MO] Nothing gets added to a Chillicothe closing statement for a transfer tax, because Missouri doesn't have one to add -- Article X, Section 25 of the state constitution, put there by a 2010 statewide vote, forbids the state itself, Livingston County, and every other political subdivision in Missouri from ever taxing the transfer of a home or a farm.",

      "[MO] More than one heir inheriting the same Livingston County farm is the rule rather than the exception, and Missouri won't let a sale close with clear title until probate settles who has authority to sign for it. Two paths lead to independent administration under RSMo 473.780 -- a will that grants it directly, or one that allows it once every heir signs off -- and absent either, a judge has to approve a sale of the land personally, step by step, under supervised administration instead.",

      "Chillicothe itself carries the courthouse and nearly all of Livingston County's resale activity, and its small-town identity -- built as much around its own local history as around any commuter pull toward the metro core -- means a Chillicothe buyer is choosing the town for its own sake rather than as a cheaper alternative to somewhere closer in.",

      "Outside Chillicothe, Livingston County is almost entirely farmland, and a house there can sit unsold for a considerably longer stretch than one inside town -- a genuine scarcity of comparable recent sales that an appraiser has to work around by reaching back further in time or farther afield than a denser county would require.",

      "A buyer for farmland outside Chillicothe is considerably more likely to be paying cash or financing through a farm-credit lender than through a conventional mortgage bank, and a barn, grain bin, or machine shed on the property is an ordinary, expected part of the sale rather than a complication.",

      "With 14,557 people concentrated almost entirely around one county-seat town, Livingston County has genuinely few comparable sales outside Chillicothe in a given month. That scarcity is a double-edged reality worth stating plainly: a rural Livingston County property can go unsold far longer than the same house would inside Chillicothe, which is real leverage for a certain cash offer, and it is also the exact reason an investor's opening bid on it tends to land lower than a Chillicothe-town comparable would suggest.",

      "Settling a Chillicothe residence with one clear owner is a straightforward matter next to untangling a Livingston County farm left to several siblings at once -- getting every one of them to actually agree on independent administration, rather than defaulting into a court-supervised process, is where a farmland estate usually loses months a town-home estate never has to spend.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Livingston County. A Chillicothe owner sitting on real equity with no deadline forcing a decision generally comes out ahead listing through a realtor who knows the local market; where a fast sale genuinely earns consideration is a multi-heir farm estate stuck in probate, or a house that needs work no conventional buyer's lender will approve financing for.",

      "[MO] None of this is legal advice, and a multi-heir farm estate in particular is not something to navigate off a general summary like this one. A Livingston County homeowner staring down a foreclosure notice, or heirs trying to sort out a shared farm, should get an actual Missouri attorney to look at the specific paperwork in front of them.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-transfer-tax-ban"],
      citations["mo-probate-independent"],
    ],
  },

  "sell-my-house-fast-bourbon-county-ks": {
    slug: "sell-my-house-fast-bourbon-county-ks",
    body: [
      "Bourbon County is built around Fort Scott, its county seat and only city of real size, roughly 14,408 people across the whole county, about 87 miles from the Kansas City core along the Missouri state line. Fort Scott takes its name from the actual 1842 Army post now preserved as the Fort Scott National Historic Site, a stop along the old military road connecting Fort Leavenworth to Fort Gibson, and that history gives the town a genuinely different character than the farmland-and-courthouse identity most of the smaller counties in this batch share.",

      "[KS] Fort Scott sits in Kansas, directly across the state line from Vernon County, Missouri, covered elsewhere in this batch, so a sale anywhere in Bourbon County follows the same statewide rules that reach every other Kansas county in this footprint -- a judicial foreclosure process, a redemption right measured in months, an uncapped homestead exemption -- even though the farmland on either side of that state line looks identical.",

      "[KS] Bourbon County follows the same judicial foreclosure track every Kansas county does. A lender has to win a judgment first, under K.S.A. 60-2410, before a sheriff can sell anything at all, and even then K.S.A. 60-2415 makes that sale conditional on the district court signing off on it -- Kansas gives a Bourbon County lender no trustee's-sale shortcut the way Missouri would on a Vernon County property just across the state line.",

      "[KS] Under K.S.A. 60-2414, an owner ordinarily gets twelve months to redeem, though that period drops to three months for a default that hits before a third of the debt is paid down -- unless total liens against the property are themselves under a third of its value, a low-leverage scenario in which the full year applies no matter when the default happened.",

      "[KS] A Bourbon County homestead is protected the way any Kansas homestead is: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 cover a manufactured home, an acre inside Fort Scott, or up to 160 acres of farmland, with no dollar ceiling written into the exemption at all, and Article 11, Section 1 of the Kansas Constitution taxes an ordinary residential property at 11.5% of market value, the same rate applied everywhere in the state.",

      "[KS] Owner-financed farmland sales are common enough in a county this rural that a Bourbon County seller carrying the contract themselves should know Kansas regulates that arrangement directly. The Kansas Contract for Deed Act, under K.S.A. 58-5203, requires a seller under a contract for deed to hold title free of encumbrances with only narrow exceptions, and treats a violation as a deceptive act enforceable under the Kansas Consumer Protection Act.",

      "[KS] Before a Bourbon County seller carrying a contract for deed can forfeit a defaulting buyer's interest, K.S.A. 58-5204 requires written notice identifying the contract, describing the property, specifying the breach, and giving the buyer time to cure it -- 30 days if less than half the purchase price has been paid, 90 days if half or more has -- served in person, left at the buyer's residence, or sent by certified mail.",

      "Fort Scott carries the courthouse, the historic site's own modest tourism draw, and nearly all of Bourbon County's resale activity; the rest of the county is farmland along the state line, where a house changes hands rarely enough that a comparable sale can be genuinely hard to find nearby.",

      "[KS] A Bourbon County estate, farmland or a Fort Scott residence alike, still has to clear the same K.S.A. 59-3202 probate test used everywhere in Kansas: a court, not the will alone, weighs the estate's solvency, its size, how well the heirs agree, and the likely cost of settling it before choosing simplified or supervised administration.",

      "A buyer for farmland outside Fort Scott is considerably more likely to be paying cash, financing through a farm-credit lender, or buying on a seller-carried contract for deed than financing through a conventional mortgage bank -- a genuinely different buyer pool than the one a Fort Scott in-town listing typically draws.",

      "Bourbon County's 14,408 people cluster almost entirely around one historic county-seat town, so comparable recent sales outside Fort Scott itself are genuinely hard to come by in a typical month -- a fact that helps a seller in one direction and hurts in another: farmland can sit unsold for a long stretch, which argues for taking a certain cash offer, but the same thin data set is exactly why that cash offer's opening number tends to land lower than what a Fort Scott in-town sale would fetch.",

      "A seller carrying a contract for deed on Bourbon County farmland and dealing with a defaulting buyer faces a genuinely different problem than a Fort Scott homeowner selling outright -- working through the statutory notice-and-cure process above takes real time before any forfeiture, let alone a resale, can even begin.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Bourbon County. A Fort Scott homeowner with real equity and no fixed deadline is usually better off listing conventionally; a cash sale earns real consideration mainly for farmland that would sit for a long stretch in a thin rural market, a stalled multi-heir estate, or a contract-for-deed situation complicated enough to make a conventional buyer's lender balk.",

      "[KS] None of this is legal advice. A Bourbon County homeowner facing a foreclosure summons or a contract-for-deed dispute should talk to a Kansas attorney who can review the actual paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-contract-for-deed-act"],
      citations["ks-contract-for-deed-notice-cure"],
      citations["ks-probate-simplified"],
    ],
  },
};
