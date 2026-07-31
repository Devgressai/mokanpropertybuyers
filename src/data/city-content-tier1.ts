import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * Wave 0C -- the twelve tier-1 city pages, the sixth content map and the
 * highest-intent money pages on the site. Each is a child of one of the
 * eight county hubs in `county-content-metro.ts` and, through that county,
 * one of the two state hubs in `state-hub-content.ts`. Same rules as every
 * content map before this one: every paragraph asserting law carries `[MO]`
 * or `[KS]`, every legal assertion traces to an entry in `citations` rather
 * than being retyped, and no deictic stand-in for a named state (or for
 * "this city" itself) appears anywhere. See docs/CITATION-LEDGER.md for what
 * backs each citation used below.
 *
 * The two Kansas Citys are the reason this whole site is architected around
 * state-scoped slugs. `sell-my-house-fast-kansas-city-mo` (Jackson County,
 * Missouri) and `sell-my-house-fast-kansas-city-ks` (Wyandotte County,
 * Kansas) are different cities in different states with different law, and
 * each page below says so in concrete, non-deictic terms -- naming the other
 * city and its own county and state, never asserting the other state's law.
 *
 * Where a topic is covered in depth on a county hub or a state-line page,
 * this file links to that page by name instead of re-deriving the statute
 * mechanics a second (or third, or fourth) time -- both to keep these twelve
 * pages honest about what is genuinely city-specific and to avoid the
 * duplicate-paragraph risk four Jackson County cities, three Johnson County
 * cities, and two Wyandotte County cities sharing the same underlying
 * statutes would otherwise create. Every shared-statute paragraph below is
 * independently worded rather than templated with the city name swapped in.
 */
export const cityContentTier1: Record<string, PageContent> = {
  "sell-my-house-fast-kansas-city-mo": {
    slug: "sell-my-house-fast-kansas-city-mo",
    body: [
      "Kansas City, Missouri is this site's anchor city and its most populous, with roughly 510,704 people inside city limits, sitting almost at the geographic center of this entire 53-county footprint. It is in Jackson County, on the Missouri side of the state line -- and it is not the same city as Kansas City, Kansas, a separate incorporated city of roughly 152,933 people in Wyandotte County, Kansas, about nine miles to the west.",

      "[MO] The two share a name and, once a specific house goes up for sale, almost nothing else: a Jackson County address puts a seller under Missouri foreclosure law, Missouri probate law, and Missouri's own tax structure, never a Kansas statute, regardless of how many pieces of mail arrive addressed to \"Kansas City\" without a state on the envelope.",

      "[MO] The single tax that sets this Missouri city apart from every other city in this footprint is its own 1% earnings tax on wages, salaries, commissions, and other compensation earned by residents, on compensation nonresidents earn working inside city limits, and on the net profits of a business conducted in the city. RSMo 92.111 and the city's own ordinance require that tax to go back to a popular vote every five years to keep collecting it, and Kansas City, Missouri voters renewed it on April 7, 2026 for another five-year term. It taxes income, not a home sale -- an owner selling an ordinary residence inside city limits owes nothing under it on the transaction itself, even though wages earned working inside the city can trigger it independent of where the worker actually lives.",

      "[MO] This city also sits at the center of the Jackson County reassessment dispute that followed the county's 2023 valuation cycle. The Missouri State Tax Commission's August 6, 2024 order found the county's reassessment skipped required notice and physical inspections on parcels facing increases of 15% or more, and on December 30, 2025 the Missouri Court of Appeals, Western District reversed a circuit court's dismissal of the Commission's own enforcement suit -- reviving that suit, not deciding it on the merits. A homeowner inside city limits whose 2023 or 2024 valuation jumped sharply has an active, unresolved dispute to raise with the county assessor, not a settled result either way. The full account of the order and the appeal lives on this site's dedicated Jackson County reassessment page, and the county's own broader picture -- the other twelve cities that share Jackson County's rules with this one -- is covered on this site's Jackson County page rather than repeated in this summary.",

      "[MO] Away from that dispute, an ordinary foreclosure inside this city runs on the same trustee-driven mechanism as anywhere else in the state. RSMo 443.290 and RSMo 443.327 let a trustee named in the loan documents sell a defaulted property directly, without a lawsuit, and because Jackson County's population clears the 50,000-person line RSMo 443.320 sets by a wide margin, notice of that sale has to run for twenty insertions in a daily newspaper first. A narrow one-year redemption right can attach afterward under RSMo 443.410 and RSMo 443.420, but only when the lender itself is the buyer at the sale, notice of intent to redeem is given, and a bond is posted within twenty days -- the full sequence is laid out step by step on this site's Missouri trustee-sale-timeline page rather than repeated in this summary.",

      "[MO] The same statewide dollar figures apply to a house inside this city as anywhere in Missouri: RSMo 513.475 shields $15,000 of home equity from an unsecured creditor's judgment today, rising to $40,000 on January 1, 2027 under a bill already signed into law, and RSMo 137.115 assesses an ordinary residential parcel at 19% of its market value -- the same rate the reassessment dispute above is not actually contesting. Article X, Section 25 of the Missouri Constitution also bars any state or local transfer tax on the sale itself, a protection this city shares with every other Missouri city in this footprint.",

      "Independence, Raytown, and Grandview all border this city inside Jackson County, and a house near one of those boundaries can look, on a map, almost indistinguishable from a house well inside city limits -- but the actual address, not the boundary line, decides which city's own code and tax rules apply, and every one of those neighboring cities still answers to the same Missouri statutes described above. None of them is Kansas City, Kansas, and no Kansas rule on the far side of the state line reaches a property carrying a Missouri Kansas City address, however close that address sits to the line itself.",

      "[MO] An inherited house inside this city follows the same Missouri probate rule as anywhere else in Jackson County: RSMo 473.780 lets a personal representative skip most ongoing court oversight when a will authorizes it, or when the will permits it and every heir and devisee consents, and absent one of those two paths the estate proceeds under supervised administration, with the probate court's approval attaching to major steps -- a sale of the house among them.",

      "[MO] None of the above adds up to a reason to take a fast cash offer just because a notice arrived in the mail or an assessment jumped. An owner disputing a sharp 2023 or 2024 valuation has an active process in front of the county to pursue, not a foregone result to accept. An owner worried the 1% earnings tax reaches an ordinary home sale is worried about the wrong tax entirely -- it does not. And an owner comparing this city's own resale market against Independence, Raytown, or Grandview next door generally still has a repayment plan, a refinance, or a conventional listing available before a fast cash sale is the only path left.",

      "[MO] None of this is legal advice. A homeowner inside Kansas City, Missouri facing a specific notice, assessment, or estate question should talk to a Missouri attorney who can review the actual paperwork, not assume a general city-level overview settles it -- and should confirm the address itself sits in Jackson County, Missouri before assuming any of the above applies, given how easily this city's name gets confused with Kansas City, Kansas, a separate city in Wyandotte County, Kansas, roughly nine miles away.",
    ],
    claims: [
      citations["kcmo-earnings-tax"],
      citations["jackson-county-reassessment"],
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-transfer-tax-ban"],
      citations["mo-probate-independent"],
    ],
  },

  "sell-my-house-fast-overland-park-ks": {
    slug: "sell-my-house-fast-overland-park-ks",
    body: [
      "Overland Park is Johnson County's largest city and, at roughly 197,089 people, the largest Kansas city in this entire footprint after Kansas City, Kansas. It sits roughly 16 miles from the metro's core, closer in than Olathe or Lenexa, and it borders some of the highest-value residential real estate in this footprint, Leawood among it. Home values and household incomes across this city run well above most of the rest of this site's footprint, and that gap changes the honest answer to whether a fast cash sale even makes sense for a lot of sellers in this city specifically.",

      "[KS] Every acre of this city sits in Johnson County, Kansas, so a house in this city answers to Kansas law start to finish -- no Missouri statute, no Missouri court, and no Missouri redemption period reaches a property in this city, regardless of how close it sits to the state line running along the metro's eastern edge.",

      "[KS] The Kansas rule that reaches more sellers in this city than almost anywhere else in this footprint is the uncapped homestead exemption. Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale under any process of law with no dollar limit on its value -- an owner in this city sitting on a home worth well above this county's own already-high average keeps every dollar of that equity out of an unsecured creditor's reach, not a capped slice of it.",

      "[KS] That protection compounds with a second Johnson County rule: under K.S.A. 79-2401a, when the county itself bids off real estate at a tax foreclosure sale, it has to hold that property for two years before pursuing a further sale, or three years specifically when the property is a qualifying homestead. An owner in this city facing a tax delinquency, not a mortgage default, generally has years, not months, before the county even moves toward a further sale.",

      "[KS] Put the uncapped exemption and the multi-year holding period together, and a homeowner in this city with real equity is frequently better protected against losing that equity than almost anyone else in this footprint -- often well enough protected that the right move is refinancing, negotiating directly with a creditor or the county treasurer, or simply relying on the exemption itself, not selling to us at all.",

      "[KS] An ordinary mortgage default in this city still runs through the same judicial process every Kansas county follows: K.S.A. 60-2410 and K.S.A. 60-2415 require a lawsuit, a sheriff's sale, and a judge's confirmation before a deed can issue, followed by a twelve-month redemption right under K.S.A. 60-2414 that shortens to three months only for an early, heavily leveraged default. The full mechanics of exactly how that three-month line is drawn are covered on this site's Kansas right-of-redemption page rather than repeated in this summary.",

      "Leawood, Prairie Village, and Lenexa all border this city or sit close to it, and none of them changes which statutes apply -- Kansas law governs every one of them identically -- but they do differ in scale and price point from this city's own market, and a seller comparing options across that cluster is comparing markets, not comparing which state's law reaches the sale.",

      "This site's Johnson County page covers the county-wide picture behind these figures in more depth -- the same uncapped homestead exemption and multi-year tax-sale holding period that apply to a house in this city apply to every other Johnson County city in this footprint, from Leawood's high-value streets to the newer subdivisions spreading through Gardner and Spring Hill.",

      "[KS] A buyer financing a purchase in this city also owes nothing under the old Kansas mortgage-registration tax -- K.S.A. 79-3102 was fully repealed effective January 1, 2019, so that particular line item no longer appears on a closing statement anywhere in Johnson County.",

      "[KS] A seller in this city working with an agent should also know that Kansas places its broader material-defect disclosure duty on the licensee, not directly on the seller: K.S.A. 58-30,106 requires a licensee representing a seller to disclose adverse material facts actually known -- physical condition, title defects, environmental hazards requiring legal disclosure -- to a buyer who is a customer rather than a client.",

      "[KS] Property tax assessment runs on the same fixed 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets everywhere in the state, but because home values in this city run well above the footprint's average, that identical percentage produces a meaningfully larger assessed value, and a larger tax bill, than the same ratio produces on a comparable home in a smaller Kansas city nearby. The 11.5% figure itself never moves; the market-value estimate underneath it is what runs higher in this city than in most of the rest of this footprint.",

      "[KS] None of the above means every seller in this city should decline a cash offer. An owner without much equity left after the mortgage and liens are counted, an estate that needs a fast and uncomplicated close, or a property with real repair needs a conventional buyer's lender will not finance can still find a cash sale the sensible answer even in a city this wealthy -- the point is that this city's own combination of high equity and unusually protective Kansas rules means that decision deserves a genuine look at what is actually at stake before assuming a quick sale is the default.",

      "[KS] None of this is legal advice. Whether a specific property in this city actually qualifies as a homestead under the constitutional definition, and how the county's own tax-sale timeline applies to a specific parcel, are questions for a Kansas attorney or the Johnson County treasurer's office directly, not a general city-level description of countywide rules.",
    ],
    claims: [
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-kansas-city-ks": {
    slug: "sell-my-house-fast-kansas-city-ks",
    body: [
      "Kansas City, Kansas is a separate city, in a separate state, from Kansas City, Missouri -- despite sharing almost the same name and sitting less than nine miles from the Missouri city's own downtown. Roughly 152,933 people live in this city, which sits in Wyandotte County, Kansas, not Jackson County, Missouri.",

      "[KS] That distinction decides which body of law governs every foreclosure, redemption period, homestead exemption, and property tax assessment on a house in this city -- Kansas law, not Missouri law, regardless of how many times the words \"Kansas City\" appear on a piece of mail addressed to it.",

      "[KS] A seller who assumes Missouri's trustee-sale process, or its narrow one-year redemption right, governs a sale in this city because the name is Kansas City is working from the wrong state's rules entirely. No trustee named in a deed in this city has the power to sell a defaulted property outright the way a Missouri deed of trust allows in Kansas City, Missouri, roughly nine miles to the east.",

      "[KS] A mortgage default on a house in this city runs through Kansas's judicial process instead: K.S.A. 60-2410 requires a lawsuit ending in a judgment, K.S.A. 60-2415 requires the district court to confirm the sheriff's sale before a deed can issue, and K.S.A. 60-2414 then gives a defaulting owner twelve months to redeem afterward -- sometimes shortened to three months for an owner who defaulted early with little equity at stake. Every Wyandotte County foreclosure runs through the district court sitting in this city, not through a trustee acting on a power of sale, so a homeowner in this city who receives a summons should treat it as the start of a lawsuit requiring a response, not as a notice that simply runs its own course the way a Missouri trustee's-sale publication does on the Missouri side of the line.",

      "[KS] The same uncapped Kansas homestead exemption applies in this city as anywhere else in the state: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale regardless of its dollar value, and Article 11, Section 1 of the Kansas Constitution assesses an ordinary house in this city at 11.5% of its market value, the identical ratio Johnson County or Shawnee County applies elsewhere in this footprint.",

      "[KS] A buyer financing a purchase in this city also pays nothing under the old Kansas mortgage-registration tax, since K.S.A. 79-3102 was fully repealed effective January 1, 2019 -- a line item that no longer shows up on a Kansas closing statement anywhere in this state, this city included.",

      "[KS] A delinquent-tax sale on a house in this city works on the same before-the-sale-only redemption structure as everywhere else in Kansas: K.S.A. 79-2803 cuts off redemption once the sale itself is held, while K.S.A. 79-2401a still gives Wyandotte County its own two- or three-year holding period on property it bids off before pursuing that further sale at all.",

      "[KS] A seller in this city working with an agent should also confirm that Kansas puts the broader duty to disclose a known material defect on the licensee, not the seller directly: K.S.A. 58-30,106 requires an agent representing a seller to tell a buyer-customer about adverse material facts actually known, from a title problem to a physical defect in the property itself.",

      "Shawnee, Bonner Springs, and Edwardsville are all separate cities inside this same Wyandotte County, and Fairway, Mission, Prairie Village, Roeland Park, Westwood, Mission Hills, and Merriam form a cluster of small, closely built residential communities ringing this city's own eastern edge. Every one of them sits under the same Kansas statutes described above -- none of that cluster's proximity to the state line changes which state's rules apply to a house inside it.",

      "The broader Wyandotte County picture -- how these same statutes reach Bonner Springs, Edwardsville, and the cluster of small cities ringing this one's own edges -- is covered in more depth on this site's Wyandotte County page rather than repeated in this summary.",

      "[KS] An inherited house in this city still has to clear Kansas's own probate test before it can be sold with clear title. Under K.S.A. 59-3202, a court -- not the will alone -- decides whether the estate is administered as a simplified estate or a supervised estate, weighing the estate's size, the heirs' agreement, its solvency, and the probable cost of settling it.",

      "[KS] At roughly nine miles from downtown Kansas City, Missouri, this city sits closer to that other Kansas City than most of Johnson County's own cities do, and that proximity is exactly why the two-Kansas-Citys naming confusion causes more genuine problems for this city than it does farther out in this footprint. A homeowner unsure which state a specific address actually falls under should confirm it against a parcel number or tax statement, not the name on an envelope.",

      "[KS] None of the above makes a fast cash sale the right move just because a house sits in a place called Kansas City. An owner with real equity and time is generally better off confirming the county on a tax statement or plat map, understanding that Kansas's twelve-month redemption window and uncapped homestead protection govern in this city, and weighing a normal listed sale before accepting a discounted cash offer.",

      "[KS] None of this is legal advice. A homeowner in Kansas City, Kansas who is not sure which city, county, or state a specific address actually falls under should confirm it directly against a parcel number or tax statement -- not against the name on the mailing address -- before assuming which state's rules apply, and should talk to a Kansas attorney about anything time-sensitive.",
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
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-olathe-ks": {
    slug: "sell-my-house-fast-olathe-ks",
    body: [
      "Olathe is the Johnson County seat, home to roughly 147,461 people about 20 miles from the metro's core, and the county courthouse itself sits inside this city -- which matters directly for a seller, because a Johnson County judicial foreclosure culminates in a confirmation proceeding before the district court sitting in this city, not in Overland Park or Lenexa nearby.",

      "[KS] Because the district court sits inside this city, a mortgage default anywhere in Johnson County -- including a property in this city -- runs through the same process K.S.A. 60-2410 and K.S.A. 60-2415 require statewide: a lawsuit ending in a judgment, then a sheriff's sale the court itself confirms before a deed can issue. A defendant owner in this city then has twelve months to redeem under K.S.A. 60-2414, a window that narrows to three months only for an early default on a property with little equity behind it.",

      "[KS] The homestead exemption that shields Johnson County's own high-equity housing stock applies to a house in this city with exactly the same force it applies in Overland Park or Leawood: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 protect an eligible homestead from forced sale with no dollar limit at all. A seller in this city carrying substantial equity keeps the whole of it shielded from an unsecured creditor's judgment, not a capped portion.",

      "[KS] That exemption pairs with the county's own tax-sale holding period: under K.S.A. 79-2401a, when Johnson County bids off a property at a tax foreclosure sale, it holds that property for two years before a further sale, or three years when the property qualifies as a homestead. A seller in this city facing delinquent taxes rather than a missed mortgage payment generally has years, not weeks, to sort out a redemption before the county moves toward a further sale.",

      "[KS] A Johnson County owner in this city with meaningful equity behind an owner-occupied home is often genuinely better off not selling to us at all -- the combination of an uncapped exemption and a multi-year tax-sale holding period means refinancing, negotiating directly with a creditor, or simply waiting out a temporary financial strain frequently protects more value than a fast cash sale would return.",

      "This city has grown fastest along its own western and southern edges over the past two decades, spreading well beyond the historic courthouse square at its center, and newer subdivision construction in those newer sections sits alongside a much older housing stock closer to downtown -- a difference in age and condition that matters more to how quickly a specific house sells than any statute described above.",

      "[KS] Property tax assessment on a house in this city follows the same fixed 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets for every Kansas city in this footprint, applied to whatever market-value estimate the county assessor -- headquartered in this same city -- sets for that specific parcel.",

      "Gardner, De Soto, and Spring Hill sit farther west and south of this city, still inside Johnson County and still bound by the same statutes, but trading at different price points and a slower pace than the built-up core around Overland Park and this city itself. A seller weighing this city against those smaller neighbors is weighing market pace, not legal exposure -- the law does not change from one to the next.",

      "The broader Johnson County picture behind these same rules -- how the uncapped exemption and the county's own holding period apply across all eight cities sharing this county, not just the county seat -- is covered on this site's Johnson County page rather than repeated in this summary.",

      "[KS] Financing a purchase in this city costs nothing under the mortgage-registration tax Kansas once charged, either -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, and the repeal reaches a closing at the county courthouse in this city exactly as it reaches one anywhere else in the state.",

      "[KS] Kansas law puts its wider duty to disclose a known material defect on the real estate licensee handling a sale in this city, not on the seller directly -- K.S.A. 58-30,106 requires that licensee to tell a buyer-customer about adverse facts actually known, from a title problem to a hazard requiring legal disclosure.",

      "[KS] The county's own multi-year holding period described above is not the same thing as a right to redeem after the further sale itself -- once that sale is actually held, K.S.A. 79-2803 ends redemption for good. Everything protecting an owner in this city on the tax side happens in the two or three years before that sale, not afterward.",

      "[KS] An inherited house in this city still has to clear the same test every Kansas estate goes through under K.S.A. 59-3202: a court, not the will by itself, decides whether the estate proceeds as a simplified estate or a supervised one, weighing its size, how well the heirs agree, and whether it is solvent.",

      "[KS] None of the above makes a fast cash sale the obvious answer for a seller in this city. An owner without much equity left after the mortgage and liens are counted, or a property needing repairs a conventional lender will not finance, can still find a cash sale the sensible answer -- but an owner with real equity and no urgent deadline should weigh the county's own protections against a discounted offer before deciding either way.",

      "[KS] None of this is legal advice. Whether a specific property in this city qualifies as a homestead, and exactly how the county's own multi-year holding period applies to a specific parcel, are questions for a Kansas attorney or the Johnson County treasurer's office, not a general city-level summary.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-topeka-ks": {
    slug: "sell-my-house-fast-topeka-ks",
    body: [
      "Topeka is the capital of Kansas and the seat of Shawnee County, home to roughly 125,475 people about 60 miles from the metro's core -- the farthest tier-1 city in this entire footprint from the Kansas City core, and a genuinely different kind of market from the closer-in Johnson or Wyandotte County cities this site covers.",

      "[KS] A house in this city still answers to the same statewide Kansas rules as anywhere else in this footprint -- judicial foreclosure, a redemption window, an uncapped homestead exemption, a fixed assessment ratio -- but this city's own economy leans more heavily on stable, salaried state and public-sector employment than the faster-churning private job growth driving Johnson County, and that steadier but slower-growing base is part of why turnover and pricing in this city trend behind the metro's own pace.",

      "[KS] A mortgage default on a house in this city runs through the same judicial process every Kansas county follows: K.S.A. 60-2410 requires a lawsuit ending in a judgment, K.S.A. 60-2415 requires the district court to confirm the sheriff's sale, and K.S.A. 60-2414 then gives a defendant owner twelve months to redeem afterward, narrowed to three months only for an owner who defaulted early with little equity behind the property. This site's Kansas right-of-redemption page covers exactly how that three-month carve-out works; it is not repeated in this summary.",

      "[KS] A delinquent-tax sale on a house in this city works differently from that mortgage timeline. Under K.S.A. 79-2803, redemption is available only before the sale itself, not after it, while K.S.A. 79-2401a still gives Shawnee County its own multi-year holding period -- two years generally, three for a qualifying homestead -- on property it bids off before pursuing a further sale at all.",

      "[KS] The homestead exemption and the property-tax ratio apply to a house in this city exactly as they do statewide: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead with no dollar cap on its value, and Article 11, Section 1 of the Kansas Constitution assesses an ordinary residential home at 11.5% of its market value, the same figure Johnson or Wyandotte County applies, with only the local market-value estimate and mill levy actually varying.",

      "[KS] A buyer financing a purchase of a house in this city owes nothing under the old Kansas mortgage-registration tax, since K.S.A. 79-3102 was fully repealed effective January 1, 2019 -- the same repeal that reaches a closing anywhere else in this footprint.",

      "[KS] An inherited house in this city still has to clear the same K.S.A. 59-3202 test every Kansas estate goes through -- a court decides whether the estate is administered as a simplified or a supervised estate, weighing its size, the heirs' agreement, its solvency, and the probable cost of settling it, rather than a will alone deciding the answer.",

      "Auburn, Rossville, and Silver Lake sit around this city inside Shawnee County, each considerably smaller and with far fewer transactions in a given year than this city itself, and a seller in one of those three towns is working from a genuinely different set of comparable sales than a seller inside this city, even though the same Kansas statutes above reach both equally.",

      "This site's Shawnee County page covers the fuller county-wide picture behind these statutes -- including how the same rules reach Auburn, Rossville, and Silver Lake alongside this city -- in more depth than fits into a single city summary.",

      "A buyer or agent traveling from the closer-in metro core for a showing or an inspection in this city faces a genuinely longer round trip than a comparable visit in Overland Park or Lenexa, simply because of the roughly 60-mile drive separating this city from the Kansas City core -- a practical fact about this market, not a change in which statutes apply to it.",

      "[KS] An agent-assisted sale in this city carries the same Kansas rule every other city in this footprint does: K.S.A. 58-30,106 puts the duty to disclose a known adverse material fact -- a title defect, a hazard requiring legal disclosure, the property's physical condition -- on the licensee representing the seller, not on the seller directly.",

      "As the seat of Shawnee County, this city is also where a Shawnee County judicial foreclosure, tax sale confirmation, or probate matter actually gets heard -- the same district court sitting in this city handles those matters for Auburn, Rossville, and Silver Lake as well, none of which has a courthouse of its own.",

      "[KS] A homeowner in this city weighing how long a listing might sit on the market should expect a longer runway than in Overland Park or Lenexa -- not because the statutes above differ, but because state-government employment anchors a larger share of this city's own economy and the local buyer pool moves at a steadier, slower pace than the closer-in metro core.",

      "[KS] None of the distance or the slower pace above means a fast cash sale is the obvious answer for a seller in this city. An owner with real equity and no urgent deadline is generally still better off listing through a realtor and letting this city's own market run its course. A cash sale becomes worth serious consideration mainly for a property that would sit a long time on the market, needs repairs a conventional lender will not finance, or is tied to an estate or deadline that cannot wait out a longer listing period.",

      "[KS] Nothing above is legal advice, and a page cannot be. Statutes set the outer shape of a Kansas foreclosure, a tax sale, or an estate, but which of them govern a particular house turns on the paperwork attached to it — the security instrument, the recorded liens, the notices already served, the dates. A Topeka homeowner with those documents in hand should put them in front of a Kansas attorney, who can say what applies to that property rather than what applies in general.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-probate-simplified"],
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-independence-mo": {
    slug: "sell-my-house-fast-independence-mo",
    body: [
      "Independence, Missouri is a city of roughly 120,922 people about 12 miles from the metro's core, inside Jackson County -- and it carries a piece of history none of this footprint's other cities share: in the 1800s, Independence was the departure point for the Santa Fe, Oregon, and California Trails, the overland routes that carried tens of thousands of settlers west. That history left this city with a genuinely older housing stock, much of it concentrated around the historic Independence Square area, than the newer subdivisions farther out in Jackson County.",

      "[MO] Every part of this city sits in Jackson County, Missouri, so it follows the same statewide Missouri rules as Kansas City, Lee's Summit, and Blue Springs to its north, east, and south -- but this city's own age changes which of those rules a specific house is likeliest to run into. An older home near the historic square is more likely to face a title or structural issue a conventional buyer's lender will decline to finance than a newer home in a subdivision built in the last two decades.",

      "[MO] A missed mortgage payment on a house in this city runs the same course as anywhere else in Jackson County: Missouri gives a named trustee, not a court, the power to sell the property once RSMo 443.290 and RSMo 443.327 are triggered by default, and because this county's own population is well past the 50,000 mark RSMo 443.320 sets, that trustee has to publish notice for twenty straight issues of a daily paper before the sale can happen. This site's Missouri trustee-sale-timeline page covers the rest of that sequence, including the narrow conditions under which a one-year redemption right can attach afterward.",

      "[MO] The dollar figures behind a Missouri sale apply to this city exactly as they do anywhere else in the state -- RSMo 513.475 keeps $15,000 of home equity out of an unsecured creditor's reach right now, climbing to $40,000 on January 1, 2027 under a bill already signed, and RSMo 137.115 taxes an ordinary residential parcel at 19% of what it is worth.",

      "[MO] A property in this city sold for delinquent taxes rather than a missed mortgage payment follows RSMo 140.340's separate structure: an absolute right to redeem within one year of the sale, plus a further defeasible right that continues until the tax-sale purchaser actually acquires the collector's deed -- a distinct process from the trustee's-sale redemption above, with none of that redemption's four conditions attached.",

      "[MO] That one-year trustee's-sale redemption right, mentioned above, is not automatic -- it only attaches when four things are all true: the lender itself is the buyer at the sale, written notice of intent to redeem is given, a bond covering the full debt is posted within twenty days, and the redemption itself happens within a year of the sale date. This site's Missouri trustee-sale-timeline page walks through those four conditions in more depth than fits into a single city summary.",

      "[MO] This site's Missouri page covers the same trustee-sale, homestead, and probate rules described above in a fuller statewide context, alongside the handful of rules -- the earnings tax, the reassessment dispute -- that reach this city only because of the specific county it sits in.",

      "This city sits closest to Kansas City itself of the three larger Jackson County suburbs this site covers -- closer in than Lee's Summit or Blue Springs -- and it borders Sugar Creek and Grain Valley along its own eastern edge, both considerably smaller cities inside the same county and bound by the same Missouri statutes described above.",

      "[MO] An inherited house in this city, like an estate anywhere else in Jackson County, generally cannot be sold with clear title until Missouri probate resolves who has authority to sign for it. RSMo 473.780 lets a personal representative skip most ongoing court oversight when a will authorizes it, or when the will permits it and every heir consents; absent one of those two paths, the estate proceeds under supervised administration, with the probate court approving major steps -- a sale of the house among them.",

      "[MO] This city also sits inside the Jackson County reassessment dispute that followed the county's 2023 valuation cycle, though the dispute itself concerns the county's assessment process broadly rather than anything specific to this city. The full account of the Missouri State Tax Commission's order and the subsequent Court of Appeals ruling -- which revived the Commission's enforcement suit without deciding it -- is covered on this site's dedicated Jackson County reassessment page and this site's Jackson County page, not repeated in this summary.",

      "[MO] Missouri has no single statute requiring a general property-condition disclosure form, and that gap matters more for an older house near this city's historic square than for a newer subdivision home elsewhere in the county. Instead, the Missouri Merchandising Practices Act -- RSMo 407.020, whose RSMo 407.010 definition of \"merchandise\" expressly reaches real estate -- makes concealing, suppressing, or omitting a material fact about a house's condition an unlawful practice, enforceable the same way outright fraud or misrepresentation would be.",

      "[MO] An old house near the historic square in this city is not automatically a bad candidate for a conventional sale -- a well-maintained historic home can draw real buyer interest a fast, as-is cash sale would not capture, and an owner with time and no urgent deadline is usually better off listing through a realtor than accepting a discounted offer just because the house is older than most of the rest of the county's stock.",

      "[MO] None of this is legal advice. A homeowner in Independence facing a specific foreclosure notice, tax sale, or estate question should talk to a Missouri attorney who can review the actual paperwork for that property, not rely on a general city-level overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
      citations["jackson-county-reassessment"],
      citations["mo-merchandising-practices-act"],
    ],
  },

  "sell-my-house-fast-lees-summit-mo": {
    slug: "sell-my-house-fast-lees-summit-mo",
    body: [
      "Lee's Summit is a city of roughly 104,184 people about 16 miles southeast of the metro's core, inside Jackson County -- and, unlike Independence to its north, most of this city's own housing stock is considerably newer, built out through decades of steady subdivision growth rather than concentrated around a single historic square.",

      "[MO] Foreclosure inside this city follows the trustee-sale mechanism RSMo 443.290 and RSMo 443.327 set out for the whole state, not a courtroom process -- and because Jackson County's population sits well above the 50,000-person line in RSMo 443.320, a trustee selling a property in this city has to run notice in a daily newspaper for twenty insertions first, the same schedule every other Jackson County city in this footprint uses.",

      "[MO] A Lee's Summit homeowner sits under the same statewide numbers as every other Missouri seller in this footprint: a $15,000 homestead shield against an unsecured judgment under RSMo 513.475, set to become $40,000 on January 1, 2027, and a flat 19% residential assessment ratio under RSMo 137.115 that does not vary with a city's own size or growth rate.",

      "[MO] A narrow one-year redemption right can follow a trustee's sale in this city, but only under the same four conditions that apply anywhere in Missouri: the lender itself has to be the buyer at the sale, notice of intent to redeem has to be given, and a bond covering the full debt has to be posted within twenty days. This site's Missouri trustee-sale-timeline page lays out that sequence in full rather than repeating it in this summary.",

      "[MO] A property in this city sold for unpaid taxes rather than a missed mortgage payment carries its own separate redemption right under RSMo 140.340 -- an absolute right to redeem within one year of the tax sale, plus a further defeasible right that runs until the purchaser actually obtains the collector's deed.",

      "[MO] The redemption right attached to a trustee's sale, rather than a tax sale, only exists when four separate conditions all hold at once: the buyer at the sale is the lender itself, notice of intent to redeem is given at the sale or within the ten days before it, a bond covering the full debt is posted within twenty days afterward, and redemption happens within a year of the sale date. Miss any one and there is no redemption window at all for that particular sale.",

      "This city's own growth has run in the opposite direction from Independence's -- newer construction spreading south and east from the built-up Kansas City core rather than concentrating around an older historic center -- and that difference shows up most in how a house in this city compares against one in Independence or Blue Springs on age and condition, not in which statutes apply, since all three answer to the identical Jackson County rules described above.",

      "A small historic core near this city's original downtown, built up around the railroad stop the city itself grew out of, still sits alongside the much larger stretch of newer subdivision construction that surrounds it -- a contrast with Independence's far larger concentration of pre-war housing, and with the newer growth pattern found farther east in Blue Springs.",

      "This site's Jackson County page covers the county-wide picture behind these figures in fuller depth, including how the same trustee-sale notice schedule and reassessment dispute reach Kansas City, Independence, and Blue Springs alongside this city.",

      "[MO] Beyond Jackson County's own rules, this site's Missouri page walks through the same statewide homestead, assessment, and probate figures cited above in a fuller context that spans all 31 Missouri counties in this footprint, not just this one.",

      "[MO] Missouri has no dedicated statute requiring a seller to fill out a general property-condition form, in this city or anywhere else in the state -- the broadest protection instead comes from the Missouri Merchandising Practices Act, which treats concealing, suppressing, or omitting a material fact about a house's condition as an unlawful practice under RSMo 407.020, because RSMo 407.010 defines \"merchandise\" to expressly reach real estate. That protection covers a newer subdivision home in this city exactly as it covers an older one, regardless of how recently the house was built.",

      "[MO] Closing on a sale in this city carries no state or local transfer tax, the same constitutional protection every Missouri city in this footprint shares. Article X, Section 25 of the Missouri Constitution, adopted by voters in 2010, bars the state, Jackson County, and this city itself from ever creating a new tax on the sale or transfer of real estate.",

      "[MO] An inherited house in this city cannot pass to a buyer with clear title until Missouri probate sorts out who is authorized to sign for it. RSMo 473.780 allows independent administration -- skipping most ongoing court approval -- when a will authorizes it, or when every heir and devisee consents where the will permits; without one of those two paths, the estate instead proceeds under supervised administration, with the probate court's sign-off required at each major step.",

      "[MO] None of the above makes a fast cash sale the default answer for a seller in this city. An owner with time before a trustee's-sale notice is even published usually comes out ahead bringing the loan current, negotiating a repayment plan, or listing through a realtor at full market value, particularly given how much of this city's own housing stock is newer construction that draws steady conventional buyer interest.",

      "[MO] None of this is legal advice. A homeowner in Lee's Summit facing a specific foreclosure notice, tax sale, or estate question should talk to a Missouri attorney who can review the actual paperwork, not rely on a general city-level summary.",
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
      citations["mo-merchandising-practices-act"],
    ],
  },

  "sell-my-house-fast-lawrence-ks": {
    slug: "sell-my-house-fast-lawrence-ks",
    body: [
      "Lawrence is a city of roughly 96,207 people about 38 miles from the metro's core, home to the University of Kansas -- and the university's presence shapes this city's housing stock in a way no other tier-1 city in this footprint shares: a large share of the housing inside this city is rented out to students and university staff rather than owner-occupied.",

      "[KS] Every part of this city sits in Douglas County, Kansas, so it follows the same statewide Kansas rules as every other Kansas city in this footprint -- judicial foreclosure, a twelve-month redemption window, an uncapped homestead exemption, an 11.5% assessment ratio -- but this city's own rental-heavy profile changes how often one of those rules actually comes into play for a specific seller.",

      "[KS] The homestead exemption is exactly where this city's rental-heavy makeup changes an assumption a seller might otherwise carry over from an ordinary Kansas home sale. Article 15, Section 9 of the Kansas Constitution and K.S.A. 60-2301 keep an owner's own residence -- or a qualifying manufactured home, or as much as 160 acres of farmland -- entirely outside an unsecured creditor's reach no matter what it is worth, but only for someone who actually lives in the property. A landlord in this city whose house is occupied by tenants cannot claim that same shield for it, so an investor weighing a sale of a rented property should not price in the uncapped protection an owner-occupant next door legitimately has.",

      "[KS] A mortgage default on a property in this city, rental or owner-occupied, still runs through Kansas's judicial process everywhere in the state: a lawsuit and judgment under K.S.A. 60-2410, a court-confirmed sheriff's sale under K.S.A. 60-2415, and then a twelve-month redemption right under K.S.A. 60-2414, sometimes shortened to three months for an early, highly leveraged default. This site's Kansas right-of-redemption page walks through exactly how that three-month carve-out is calculated.",

      "[KS] A landlord selling a rental in this city to an investor buyer should also know that Kansas places its broader material-defect disclosure duty on the real estate licensee representing the seller, not on the seller directly, under K.S.A. 58-30,106 -- a licensee has to disclose adverse material facts actually known, including physical condition and title defects, to a buyer who is a customer rather than a client. That duty runs through the agent handling the sale whether the property is owner-occupied or a long-term rental.",

      "This city's own resale market is driven heavily by the university calendar in a way Eudora or Baldwin City nearby, both smaller and more conventionally residential, do not experience -- turnover in this city often clusters around the academic year, even though all three communities sit in the same county under the identical statutes described above.",

      "This site's Douglas County page covers the fuller county-wide picture behind these rental-heavy caveats, including how the same homestead limitation reaches a rental in Eudora or Baldwin City exactly as it reaches one in this city.",

      "[KS] A property in this city sold for delinquent taxes rather than a missed mortgage payment follows a different structure than the judicial-foreclosure timeline above: K.S.A. 79-2401a gives Douglas County its own two- or three-year holding period on property it bids off before pursuing a further sale, while K.S.A. 79-2803 cuts off redemption entirely once that further sale is actually held.",

      "[KS] Financing a purchase in this city, rental or owner-occupied, also carries none of the old Kansas mortgage-registration tax -- K.S.A. 79-3102 was repealed effective January 1, 2019, a fact worth confirming against an outdated closing estimate that might still list it.",

      "[KS] Owner financing comes up more often on a sale in this city than in most of the rest of this footprint, because a share of buyers near the university -- a recent graduate, a self-employed landlord, or someone rebuilding credit -- cannot always qualify for a conventional mortgage right away. Effective July 1, 2024, the Kansas Contract for Deed Act requires a seller under that kind of arrangement to hold fee simple title free of undisclosed encumbrances, and fixes how much time a defaulting buyer gets before losing the property: 30 days to cure if less than half the purchase price has been paid, 90 days if half or more has. This site's dedicated contract-for-deed comparison page covers that arrangement in depth.",

      "[KS] The same K.S.A. 58-30,106 licensee disclosure duty that reaches an ordinary rental sale in this city also reaches a sale made under a contract for deed -- the licensee representing the seller still owes a buyer-customer disclosure of adverse material facts actually known, regardless of which financing structure the parties choose.",

      "[KS] A landlord in this city with a rental in poor condition, tenants who are difficult to remove, or a lease that runs against a preferred closing date is often a genuinely good candidate for a fast cash sale, since a conventional buyer's lender and a normal listing timeline both tend to struggle with an occupied rental more than a vacant, owner-occupied home. An owner-occupied home in this city in good condition, with no urgent deadline, is a different story -- listing it through a realtor is very often the better outcome.",

      "[KS] None of this is legal advice. Whether a specific property in this city actually qualifies as a homestead, and what a specific lease or tenancy means for how quickly it can be sold, are questions for a Kansas attorney familiar with both real estate and landlord-tenant law, not a general city-level description of countywide rules.",
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
      citations["ks-mortgage-reg-tax"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-tax-sale-no-post-sale-redemption"],
    ],
  },

  "sell-my-house-fast-st-joseph-mo": {
    slug: "sell-my-house-fast-st-joseph-mo",
    body: [
      "St. Joseph is a city of roughly 70,634 people about 47 miles north of the metro's core, on the Missouri River in Buchanan County -- the only tier-1 city in that county, and the farthest north of any city this site covers. This city carries a real piece of national history: in 1860, it was the eastern starting point of the Pony Express, the short-lived horseback mail relay that once ran from this city all the way to California, and its riverfront core still reflects a much older river-and-rail town than the newer Kansas City suburbs farther south.",

      "[MO] Every part of this city sits in Buchanan County, Missouri, so it follows the same statewide Missouri rules as Jackson, Clay, Platte, and Cass Counties farther south -- but Buchanan County does not yet have its own dedicated hub page on this site, so a seller in this city looking for the county-level detail behind these figures should look to this site's Missouri state page and the relevant statewide statutes directly rather than a Buchanan County page that does not exist yet.",

      "[MO] A missed mortgage payment on a house in this city triggers the same trustee-sale mechanism as anywhere in Missouri: RSMo 443.290 and RSMo 443.327 let a trustee named in the loan documents sell the property directly on default, without a lawsuit. Buchanan County's own population, roughly 82,956, clears the 50,000-person line RSMo 443.320 sets, so that trustee has to publish notice for twenty insertions in a daily newspaper before the sale, the same schedule the larger Jackson, Clay, Platte, and Cass Counties use farther south.",

      "[MO] A narrow one-year redemption right can attach to a trustee's sale in this city under RSMo 443.410 and RSMo 443.420, but only when four conditions are all met: the lender itself buys at the sale, written notice of intent to redeem is given, a surety bond is posted within twenty days, and the redemption happens within a year of the sale. This site's Missouri trustee-sale-timeline page walks through that sequence step by step.",

      "[MO] The same statewide dollar figures apply to a house in this city as anywhere else in Missouri: RSMo 513.475 shields $15,000 of home equity from an unsecured creditor's judgment today, rising to $40,000 on January 1, 2027 under a bill already signed into law, and RSMo 137.115 assesses an ordinary residential parcel at 19% of its market value, regardless of how far the city sits from the metro core.",

      "[MO] A property in this city sold for delinquent taxes rather than a missed mortgage payment follows a separate structure under RSMo 140.340 -- an absolute right to redeem within one year of the tax sale, plus a further defeasible right that continues until the tax-sale purchaser actually acquires the collector's deed.",

      "[MO] Closing on a sale in this city carries no state or local transfer tax, the same constitutional protection every Missouri city in this footprint shares under Article X, Section 25 of the Missouri Constitution, adopted by voters in 2010 and binding on Buchanan County exactly as it binds Jackson County.",

      "[MO] An inherited house in this city cannot be sold with clear title until Missouri probate resolves who has authority to sign for it. RSMo 473.780 lets a personal representative skip most ongoing court oversight when a will authorizes it, or when the will permits it and every heir consents; absent one of those two paths, the estate proceeds under supervised administration, with the probate court's approval attaching to major steps.",

      "This city's own older river-town core, built up around its historic rail and river trade rather than postwar subdivision growth, means a house near that core more often faces the kind of repair and title issues a conventional lender will decline to finance than a house in a newer subdivision -- a genuine reason a fast, as-is cash sale can make more sense for a specific older property in this city than a general appeal to the city's own age would suggest on its own.",

      "[MO] Missouri law separately requires any seller in the state, this city included, to disclose in writing if a specific property contains a permitted or unpermitted solid waste disposal site or demolition landfill -- RSMo 260.213 -- early in the negotiation process, along with a warning that the buyer may be assuming liability to the state for remedial action at such a site. That is a description of the statewide disclosure duty itself, not a claim about any particular parcel in this city.",

      "This site's Missouri page covers the fuller statewide picture behind the figures above in more depth than a single city summary can, which matters more for a seller in this city than it does for a seller in a county that already has its own dedicated hub page on this site.",

      "[MO] None of the above makes a fast cash sale the automatically right choice for a seller in this city. An owner with time before a trustee's-sale notice is even published usually comes out ahead bringing the loan current or listing through a realtor, and an owner working through an estate in this city has real reason to confirm who actually holds authority to sign before assuming a sale, quick or otherwise, can move forward at all.",

      "[MO] None of this is legal advice. A homeowner in St. Joseph facing a specific foreclosure notice, tax sale, or probate question should talk to a Missouri attorney who can review the actual paperwork for that property, not rely on a general city-level overview.",
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
      citations["mo-seller-disclosure-solid-waste"],
    ],
  },

  "sell-my-house-fast-shawnee-ks": {
    slug: "sell-my-house-fast-shawnee-ks",
    body: [
      "Shawnee, Kansas is a city of roughly 69,417 people inside Wyandotte County, about 13 miles from the metro's core -- and its name causes a genuine, second kind of confusion on top of the two-Kansas-Citys problem this site addresses elsewhere. This city shares its name with Shawnee County, a different Kansas county roughly 50 miles to the west that contains Topeka, the state capital. Shawnee the city and Shawnee County are not the same place, do not share a border, and a seller researching this city can easily land on information about the wrong county entirely if the search does not specify which one is meant.",

      "[KS] Regardless of that naming overlap, this city sits in Wyandotte County, Kansas, so it follows the same statewide Kansas rules -- and the same Wyandotte County mechanics -- as Kansas City, Kansas next door, not anything specific to Shawnee County or Topeka roughly 50 miles away.",

      "[KS] A mortgage default on a house in this city runs through Kansas's judicial process rather than a Missouri-style trustee's sale: K.S.A. 60-2410 requires a lawsuit ending in a judgment, K.S.A. 60-2415 requires the district court to confirm the sheriff's sale, and K.S.A. 60-2414 then gives a defendant owner twelve months to redeem afterward, sometimes shortened to three months for an owner who defaulted early with little equity at stake.",

      "[KS] Kansas's homestead protection reaches a house in this city with no less force than it reaches one anywhere else in the state -- Article 15, Section 9 of the Kansas Constitution and K.S.A. 60-2301 keep an eligible homestead out of a forced sale no matter its dollar value, and Article 11, Section 1 fixes the residential assessment ratio at 11.5% of market value for a house in this city just as it does in Johnson County or the Shawnee County containing Topeka -- the constitutional percentage never changes; only the assessor's own value estimate does.",

      "[KS] A buyer financing a purchase in this city pays nothing under the old Kansas mortgage-registration tax, since K.S.A. 79-3102 was fully repealed effective January 1, 2019 -- a cost that no longer shows up on a Kansas closing statement anywhere in this footprint.",

      "[KS] A delinquent-tax sale on a house in this city follows the same before-the-sale-only redemption structure as everywhere else in Kansas: K.S.A. 79-2803 cuts off redemption once the sale itself is held, while K.S.A. 79-2401a gives Wyandotte County its own two- or three-year holding period on property it bids off before pursuing that further sale at all.",

      "This city sits west of Kansas City, Kansas within the same county, closer to Bonner Springs and Edwardsville than to the small, closely built suburbs -- Mission, Prairie Village, Fairway, Roeland Park, Westwood, Mission Hills, Merriam -- that ring the county's own eastern edge nearer Johnson County. Every one of those places answers to the same Wyandotte County rules described above regardless of which side of the county this city's own residents live closer to.",

      "This site's Wyandotte County page covers the fuller county-wide picture behind these statutes, including how they reach Kansas City, Kansas and the small cities ringing this county's own eastern edge, in more depth than fits in a single city-level summary.",

      "[KS] A seller working with an agent in this city should know the disclosure duty Kansas imposes runs through that agent, not the seller directly -- K.S.A. 58-30,106 requires a licensee to tell a buyer-customer about adverse material facts the licensee actually knows, the same rule reaching a sale anywhere else in Wyandotte County or the rest of this footprint.",

      "[KS] Because the Wyandotte County district court sits in Kansas City, Kansas rather than in this city, a judicial foreclosure or probate matter involving a house in this city is actually heard a few miles away, at the county seat, rather than at a courthouse inside this city's own limits.",

      "This city's own housing stock, built out mostly through postwar suburban growth west of the urban core, looks different from the older, denser neighborhoods inside Kansas City, Kansas itself, even though both places answer to the identical Wyandotte County statutes described above.",

      "A homeowner unsure whether a piece of mail, a lien notice, or a news article actually concerns this city or the Shawnee County containing Topeka should check the county name printed on a tax statement or deed, not the city name alone, before assuming which treasurer's office or board of county commissioners is actually involved.",

      "[KS] An inherited house in this city still has to clear Kansas's own probate test before it can be sold with clear title. Under K.S.A. 59-3202, a court decides whether the estate is administered as a simplified estate or a supervised estate, weighing its size, the heirs' agreement, its solvency, and the probable cost of settling it.",

      "[KS] None of the above makes a fast cash sale the right move just because this city's own name causes confusion with a county 50 miles away. An owner with real equity and no urgent deadline should confirm which Shawnee -- the city in Wyandotte County or the county containing Topeka -- any given piece of information actually describes, and weigh a normal listed sale before accepting a discounted cash offer just to resolve that confusion faster.",

      "[KS] None of this is legal advice. A homeowner in Shawnee, Kansas who is unsure whether a given source is describing this city or Shawnee County should confirm the actual county on a tax statement or parcel record before relying on it, and should talk to a Kansas attorney about anything time-sensitive.",
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
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-blue-springs-mo": {
    slug: "sell-my-house-fast-blue-springs-mo",
    body: [
      "Blue Springs is a city of roughly 60,539 people about 18 miles from the metro's core, inside Jackson County -- farther east than Lee's Summit and considerably newer, on average, than Independence to its north. Most of this city's own housing stock was built out during the same decades of eastward subdivision growth that shaped Lee's Summit, though on a smaller population base than either of its two larger Jackson County neighbors.",

      "[MO] Nothing about this city itself changes how a trustee's sale proceeds -- RSMo 443.290 and RSMo 443.327 hand that power to a trustee named in the loan paperwork rather than to a judge, and Jackson County's population, well above the 50,000 figure RSMo 443.320 sets, keeps every city inside it, this one included, on the slower twenty-insertion daily-newspaper notice track.",

      "[MO] Blue Springs carries the identical statewide figures RSMo 513.475 and RSMo 137.115 set for every Missouri seller in this footprint -- $15,000 of equity shielded from an unsecured creditor's judgment today, rising to $40,000 once the already-signed January 1, 2027 change takes effect, and a 19% assessment ratio on an ordinary residential parcel regardless of a city's own population.",

      "[MO] The $40,000 figure itself will not stay static after it takes effect, either -- the same law schedules a cost-of-living recalculation every three years afterward, the first one due April 1, 2029, though how large that first adjustment turns out to be is not yet set.",

      "[MO] A narrow one-year redemption right can follow a trustee's sale on a house in this city, gated by the same four conditions that apply anywhere in Missouri -- the lender itself has to buy at the sale, notice of intent to redeem has to be given, and a bond has to be posted within twenty days. The full mechanics of that sequence are covered on this site's Missouri trustee-sale-timeline page rather than repeated in this summary.",

      "Grain Valley, immediately east of this city, and Oak Grove farther out along the same corridor are both considerably smaller than this city, part of the same eastward growth pattern but at nowhere near this city's own scale.",

      "[MO] Closing on a sale in this city carries no state or local transfer tax, the constitutional protection every Missouri city in this footprint shares under Article X, Section 25 of the Missouri Constitution, adopted by voters in 2010.",

      "This city sits between Lee's Summit and Grain Valley along Jackson County's own eastern growth corridor -- farther from the built-up Kansas City core than Lee's Summit, but still considerably closer in than Grain Valley or Oak Grove past it -- and that position has made this city a steady, mid-sized suburb rather than either an old historic core like Independence or the largest of the county's newer suburbs like Lee's Summit.",

      "The county-wide detail behind these figures, including how the same trustee-sale notice schedule and the ongoing reassessment dispute reach every city sharing Jackson County with this one, is covered on this site's Jackson County page rather than repeated in this summary.",

      "[MO] Missouri law also requires any seller in the state, this city included, to disclose in writing if they know a property was used as a site for methamphetamine production, and separately to disclose if the property was the residence, storage site, or lab of someone convicted of a specified meth-related offense, if the seller knew or should have known of that conviction -- RSMo 442.606. That is a description of the statewide disclosure duty that would attach if either fact were true of a given property, not an assertion about any specific parcel in this city, and it applies the same way to a house in this city as to one anywhere else in Missouri, regardless of the city's own age or growth pattern.",

      "[MO] Probate works the same way for a house in this city as it does everywhere in Jackson County, and it decides who can actually sign a deed before any sale closes. RSMo 473.780 allows a personal representative to skip most day-to-day court oversight when a will authorizes doing so, or when the will allows it and every heir signs off; without one of those two paths, the estate instead moves through supervised administration, where the probate court's approval attaches to each major step, a sale of the property included.",

      "[MO] A property in this city sold for delinquent taxes rather than a missed mortgage payment follows RSMo 140.340's separate structure -- an absolute right to redeem within one year of the sale, plus a further defeasible right that continues until the tax-sale purchaser actually acquires the collector's deed, distinct from the conditional redemption tied to a trustee's sale.",

      "[MO] A notice of trustee's sale does not by itself make a fast cash offer the right call for a seller in this city. Bringing the loan current, working out a repayment plan with the lender, or listing through a realtor at full market value all tend to net more for an owner who still has time before that notice runs, and this city's own newer housing stock tends to draw real interest from conventional buyers once it is actually listed.",

      "[MO] None of this is legal advice. Blue Springs sellers weighing a specific foreclosure notice, tax sale, or estate question should talk with a Missouri attorney able to look at the actual paperwork involved, rather than lean on a general, city-wide description of the rules.",
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
      citations["mo-seller-disclosure-meth"],
    ],
  },

  "sell-my-house-fast-lenexa-ks": {
    slug: "sell-my-house-fast-lenexa-ks",
    body: [
      "Lenexa is a city of roughly 58,536 people inside Johnson County, about 15 miles from the metro's core -- closer in than Olathe, and roughly comparable in distance to Overland Park, though considerably smaller than either. It sits between the two, geographically and in scale, sharing Johnson County's own combination of high home values and unusually protective Kansas rules without carrying quite the same population or price level as its two larger neighbors.",

      "[KS] Every part of this city sits in Johnson County, Kansas, so it follows the identical Kansas rules that govern Overland Park and Olathe -- no Missouri statute reaches a property in this city, regardless of how close it sits to the state line running along the metro's eastern edge.",

      "[KS] The homestead exemption that shields Johnson County's high-equity housing stock reaches a house in this city with the same force it reaches one in Overland Park: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 protect an eligible homestead from forced sale under any process of law with no dollar limit on its value at all.",

      "[KS] That exemption pairs with the county's own tax-sale holding period under K.S.A. 79-2401a: when Johnson County bids off a property at a tax foreclosure sale, it holds that property for two years before pursuing a further sale, or three years when the property is a qualifying homestead. A seller in this city facing a tax delinquency generally has years, not weeks, before the county moves toward a further sale.",

      "[KS] An owner in this city carrying real equity in an owner-occupied home is frequently better protected against losing that equity than an owner in a smaller, less wealthy Kansas county elsewhere in this footprint -- often well enough protected that refinancing, negotiating directly with a creditor, or simply relying on the exemption itself is the sounder move rather than a fast cash sale.",

      "[KS] Lenexa's housing stock and price points differ from its neighbors', but a mortgage default in Lenexa reaches the courthouse the same way it does anywhere in Kansas. A lender cannot sell the house on its own initiative: K.S.A. 60-2410 and K.S.A. 60-2415 route the whole thing through a petition, a sheriff's sale, and a judge's confirmation before any deed changes hands. What follows that confirmation is the part most sellers underestimate — K.S.A. 60-2414 leaves twelve months to redeem, shortened to three only where the default came early against a heavily leveraged loan. The Kansas right-of-redemption page sets out precisely where that line falls.",

      "This city's own position between Overland Park to its east and Olathe to its southwest has made it a mix of established residential neighborhoods closer to the Johnson County core and newer development pushing toward the county's edges, without the sheer scale of either of its two larger neighbors -- a seller in this city is competing in a market shaped by both without matching the size of either.",

      "This site's Johnson County page walks through how the same uncapped homestead exemption and multi-year tax-sale holding period reach every city sharing this county, this one included, in more depth than a single city page can cover on its own.",

      "[KS] The old Kansas mortgage-registration tax does not reach a closing in this city any more than it reaches one in Overland Park or Olathe -- K.S.A. 79-3102 was repealed effective January 1, 2019, and that repeal applies uniformly across every Kansas county in this footprint.",

      "[KS] The same licensee-based disclosure duty reaches an agent-assisted sale in this city as anywhere else in Kansas: K.S.A. 58-30,106 requires the agent representing a seller to disclose adverse material facts actually known to a buyer-customer, a duty that runs through the agent rather than attaching to the seller by statute directly.",

      "[KS] The county's own multi-year holding period is separate from any right to redeem after the further sale itself -- once a tax foreclosure sale on a house in this city actually happens, K.S.A. 79-2803 ends redemption for good; the protection described above operates only in the years before that sale, not after it.",

      "[KS] An inherited house in this city still has to clear the same test every Kansas estate goes through under K.S.A. 59-3202, with a court, not the will alone, deciding whether the estate proceeds as a simplified or a supervised one based on its size, the heirs' own agreement, and whether it is solvent.",

      "This city has also grown a substantial logistics and business-park base in recent years, a different commercial character from Overland Park's larger retail and office core, though that difference speaks to the local economy rather than to which statutes reach a house sale in this city.",

      "[KS] The 11.5% residential assessment ratio Article 11, Section 1 of the Kansas Constitution sets reaches a house in this city under the same fixed percentage Overland Park and Olathe use -- what actually differs between the three is the county assessor's own market-value estimate for a given parcel, never the constitutional rate underneath it.",

      "[KS] A seller in this city should not treat a fast cash sale as the default just because Johnson County's rules run heavily in an owner's favor. An estate that needs an uncomplicated, quick close, a property carrying repair needs no conventional lender will finance, or an owner with little equity left once the mortgage and liens are counted can all be good reasons to sell for cash -- but real equity and no urgent deadline call for weighing this county's own protections first.",

      "[KS] None of this is legal advice. Whether a specific property in this city actually qualifies as a homestead, and how the county's own multi-year holding period applies to a specific parcel, are questions for a Kansas attorney or the Johnson County treasurer's office, not a general city-level summary.",
    ],
    claims: [
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-probate-simplified"],
    ],
  },
};
