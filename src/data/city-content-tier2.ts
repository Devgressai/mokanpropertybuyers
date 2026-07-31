import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * Wave 0C -- the fourteen tier-2 city pages, the seventh content map. Each is
 * a child of a county already covered in `county-content-metro.ts`, with four
 * exceptions that are children of a county with no hub page yet
 * (Leavenworth County, Lyon County, Pettis County, and Johnson County,
 * Missouri) -- those four pages say so explicitly, the same way
 * `sell-my-house-fast-st-joseph-mo` in `city-content-tier1.ts` already does
 * for Buchanan County. Same rules as every content map before this one: every
 * paragraph asserting law carries `[MO]` or `[KS]`, every legal assertion
 * traces to an entry in `citations` rather than being retyped, and no
 * deictic stand-in for a named state -- or for "this city" as a substitute
 * for a state's name -- appears anywhere.
 *
 * This batch contains the two collisions this site exists to prevent. Three
 * of these fourteen cities -- Leawood, Gardner, Prairie Village -- sit in
 * Johnson County, KANSAS. A fourth, Warrensburg, sits in Johnson County,
 * MISSOURI, a different county roughly 65 miles away with the opposite
 * foreclosure procedure and opposite money rules. Every page below that
 * touches a Johnson County names the state alongside it in the same breath
 * -- "Johnson County, Kansas" or "Johnson County, Missouri" -- never
 * "Johnson County" alone. This is the same collision class that put eight
 * real Johnson County, Kansas suburbs on a Wyandotte County page before it
 * was caught and fixed; see docs/WAVE-0B-PREREQUISITES.md.
 *
 * Where a topic already has a home elsewhere on this site -- the Missouri or
 * Kansas state hub, one of the eight metro county pages, the state-line silo
 * -- this file links to it by name rather than re-deriving the same statute
 * mechanics a fifth or sixth time, both to keep these fourteen pages honest
 * about what is genuinely city-specific and because Raytown, Grandview, and
 * Grain Valley share Jackson County's statutes with four tier-1 cities
 * already; Liberty and Gladstone share Clay County's with the Clay County
 * hub; Belton and Raymore share Cass County's with the Cass County hub; and
 * Leawood, Gardner, and Prairie Village share Johnson County, Kansas's with
 * three tier-1 cities and the Johnson County hub. Every shared-statute
 * paragraph below is independently worded, not templated with the city name
 * swapped in -- see docs/CITATION-LEDGER.md for what backs each citation.
 */
export const cityContentTier2: Record<string, PageContent> = {
  "sell-my-house-fast-leavenworth-ks": {
    slug: "sell-my-house-fast-leavenworth-ks",
    body: [
      "Leavenworth is generally recognized as the oldest incorporated city in Kansas, founded in 1854 the same year the Kansas Territory itself was organized, and it grew up alongside Fort Leavenworth, the Army post established in 1827 just north of downtown that is still an active installation today -- among the oldest continuously operated posts west of the Mississippi. Roughly 37,034 people live in Leavenworth, in Leavenworth County, about 24 miles from the metro's core.",

      "A soldier or civilian employee attached to Fort Leavenworth often sells on a schedule Leavenworth's civilian sellers rarely face: a permanent-change-of-station order arrives with a hard report date attached, sometimes only weeks out, and a house that would otherwise sit on a normal listing calendar for months has to close before that date instead. That timing pressure is a real, practical fact about this specific market -- it does not change which state's law reaches the sale.",

      "[KS] No Leavenworth County hub page exists on this site yet -- a seller wanting county-level depth behind the numbers below should rely on the statewide Kansas pages instead, since a dedicated Leavenworth County page is not yet part of this footprint.",

      "[KS] Every acre of Leavenworth sits in Kansas, so a mortgage default in the city goes to court rather than to a trustee acting alone. K.S.A. 60-2410 requires the lender to win a lawsuit first, K.S.A. 60-2415 then requires a district judge to confirm the resulting sheriff's sale before a deed can issue, and only after that confirmation does K.S.A. 60-2414 start a defaulting owner's clock running -- twelve months ordinarily, cut to three when the default came early against a loan still carrying most of its original balance.",

      "[KS] A homeowner selling because a PCS order is forcing a fast close is not the same as a homeowner selling because equity is at risk -- and Kansas's own homestead rule matters more to the second group. Kan. Const. Art. 15 Section 9 together with K.S.A. 60-2301 keeps an eligible homestead, or up to 160 acres of farmland, entirely out of an unsecured creditor's reach with no dollar ceiling written into the exemption at all.",

      "[KS] Property in Leavenworth is assessed the same way it is assessed anywhere else in the state: Article 11, Section 1 of the Kansas Constitution fixes the residential ratio at 11.5% of market value, a figure this county's own assessor applies to whatever value estimate a specific parcel carries, with nothing about a military-adjacent local economy changing the constitutional percentage itself.",

      "[KS] A house in Leavenworth financed with a mortgage no longer carries the old Kansas mortgage-registration tax on its closing statement -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, and the repeal reaches a closing in the city exactly as it reaches one anywhere else in Kansas.",

      "[KS] A delinquent-tax sale in this county works on the same before-the-sale-only structure Kansas uses statewide: K.S.A. 79-2803 shuts off redemption the moment the sale itself happens, while K.S.A. 79-2401a still requires the county to sit on a bid-off property for two years before pursuing a further sale, three when the property qualifies as a homestead.",

      "[KS] A seller working with an agent in Leavenworth should also know Kansas places the duty to flag a known material defect on the licensee, not on the seller directly -- K.S.A. 58-30,106 requires that licensee to disclose adverse facts actually known to a buyer who counts only as a customer, the same rule that reaches an agent-assisted sale anywhere else in this footprint.",

      "Lansing, Basehor, and Tonganoxie share this county with Leavenworth, and Lansing in particular sits close enough to Fort Leavenworth's own gate that its housing market moves on much the same relocation rhythm the city's does -- a rhythm driven by transfer orders rather than by the ordinary seasonal pattern a purely civilian Kansas market would follow.",

      "[KS] Settling an estate that owns a house in Leavenworth still means clearing the same K.S.A. 59-3202 test every Kansas estate faces -- a court, not the will by itself, weighs the estate's size, the heirs' own agreement, its solvency, and the likely cost of administering it before deciding whether a simplified or a supervised process applies.",

      "[KS] A seller in Leavenworth also has to put any known elevated radon reading in writing, and the sale contract itself has to carry Kansas's own required warning language calling radon a class-A carcinogen and recommending a test before closing -- K.S.A. 58-3078a applies to a house near Fort Leavenworth exactly as it applies anywhere else the state, PCS timeline or not.",

      "A hard PCS deadline is a genuinely good reason to consider a fast cash sale in Leavenworth -- a conventional buyer's financing timeline and a normal listing calendar both struggle to beat a report date measured in weeks. A homeowner without that deadline, and without a pressing default or estate question, is usually still better served listing through a realtor and letting a normal sale run its course, exactly as an owner anywhere else in this footprint would be.",

      "[KS] None of this is legal advice, and a PCS deadline in particular is not something a general city page can resolve for a specific family -- how much of a house's equity actually stays protected, and how a specific redemption clock runs, depends on the loan documents and the timeline in front of a Kansas attorney, not on the description above.",
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
      citations["ks-broker-disclosure-duty"],
      citations["ks-probate-simplified"],
      citations["ks-seller-disclosure-radon"],
    ],
  },

  "sell-my-house-fast-leawood-ks": {
    slug: "sell-my-house-fast-leawood-ks",
    body: [
      "Leawood is one of the wealthiest cities in this entire footprint, roughly 33,980 people on large residential lots and around the shops of Town Center Plaza, about 13.5 miles from the metro's core. It sits in Johnson County, Kansas -- not the differently named Johnson County, Missouri, roughly 65 miles to the southeast, which answers to an entirely different set of statutes described on this site's Warrensburg page.",

      "[KS] Because Leawood sits in Johnson County, Kansas, a house in the city answers to Kansas law start to finish -- no Missouri trustee, no Missouri notice period, and no Missouri redemption right reaches a property inside it, regardless of how the word \"Johnson\" alone might be misread against a county on the far side of the state.",

      "[KS] The rule that matters most for a Leawood homeowner is Kansas's own uncapped homestead shield. Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 keep an eligible homestead safe from a forced sale under any process of law with no dollar limit on its value written into the exemption -- and because home values in the city run well above almost anywhere else in this footprint, that missing ceiling protects far more real equity in Leawood than the identical rule protects in a more modestly priced Kansas city.",

      "[KS] That protection compounds with this Kansas county's own tax-sale holding period. K.S.A. 79-2401a requires Johnson County, Kansas to sit on a property it bids off at a tax foreclosure sale for two years before pursuing a further sale, stretching to three years specifically when the property qualifies as a homestead -- and given how much of Leawood's housing stock is large, owner-occupied, and long-held, that three-year figure reaches an unusually large share of the parcels in it.",

      "[KS] Put the uncapped exemption and the three-year window together, and a Leawood owner carrying real equity is very often better protected than almost anyone else in this footprint against losing that equity to an unsecured creditor or a tax delinquency -- protected well enough that refinancing, negotiating directly with the county treasurer, or simply relying on the exemption's own shield is frequently the sounder move, not selling to us at all.",

      "[KS] A missed mortgage payment on a Leawood house, whatever the equity picture looks like, still runs through Kansas's judicial process rather than a Missouri-style trustee's sale: K.S.A. 60-2410 requires the lender to sue and win a judgment, K.S.A. 60-2415 requires a district judge to confirm the sheriff's sale, and only then does K.S.A. 60-2414 open a redemption window -- twelve months as the default, three when an early default came against a heavily leveraged loan.",

      "Overland Park borders Leawood to the west and Prairie Village to the north, and all three sit under the identical Johnson County, Kansas statutes described above -- what separates them is scale and price point, Leawood generally trading at the top of that range, not which state's rules apply to any one of the three.",

      "[KS] This site's Johnson County, Kansas page walks through the same uncapped exemption and multi-year holding period in a fuller countywide context, covering how they reach Overland Park, Olathe, Gardner, and every other city sharing this county with Leawood -- not repeated at length in this summary.",

      "[KS] Financing a purchase in Leawood also skips the old Kansas mortgage-registration tax entirely -- K.S.A. 79-3102 was repealed effective January 1, 2019, and given how many local purchases involve financing at a high loan amount, that repealed fee would have meant a meaningfully larger closing cost than it once did anywhere cheaper in this footprint.",

      "[KS] Kansas puts the duty to flag a known material defect on the licensee handling a sale in Leawood, not on the seller directly -- K.S.A. 58-30,106 requires that agent to tell a buyer who is only a customer about adverse facts actually known, from a title problem to a hazard the property carries, a duty running through the agent regardless of the price point involved.",

      "[KS] The 11.5% residential assessment ratio Article 11, Section 1 of the Kansas Constitution sets is identical in Leawood to what it is everywhere else in the state -- what differs, and differs sharply in this particular market, is the market-value estimate underneath that ratio, which runs well above the footprint's average given how the local housing stock is priced.",

      "[KS] Large-lot zoning has shaped Leawood since it incorporated in the 1950s, and much of that zoning survives largely unchanged today -- a fact about local land-use planning, not about the statewide statutes above, but one reason a comparable house in the city tends to sit on more land than one in a denser, older Kansas suburb closer to the urban core.",

      "[KS] None of the above means a cash sale is never the right call in Leawood -- a thin-equity owner once a large mortgage and any liens are counted, an estate needing an uncomplicated and fast close, or a property carrying repair needs no conventional lender will finance can all make a cash sale the sensible answer in this market too. The point is that Leawood's own combination of high equity and unusually protective Kansas rules deserves a genuine look at what is actually at stake before a quick sale becomes the assumed default.",

      "[KS] None of this is legal advice, and whether a specific Leawood property genuinely qualifies as a homestead under the constitutional definition is a fact question for a Kansas attorney or the Johnson County, Kansas, treasurer's office, not something a general city overview can settle on its own.",
    ],
    claims: [
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-assessment-115"],
    ],
  },

  "sell-my-house-fast-liberty-mo": {
    slug: "sell-my-house-fast-liberty-mo",
    body: [
      "Liberty is the county seat of Clay County, roughly 30,794 people about 13 miles from the metro's core, built around a historic town square that has anchored the city since well before the Northland's postwar suburban growth spread north from Kansas City. William Jewell College sits inside city limits, a small private college that has shaped Liberty's own character since the 1800s in a way none of Clay County's newer suburbs share.",

      "[MO] Because a house in Liberty sits in Clay County, Missouri, Missouri law governs it start to finish -- the same trustee-driven foreclosure process, the same statewide dollar figures, and the same probate rules that reach every other city in this footprint's 31 Missouri counties, this county's own courthouse sitting inside the city notwithstanding.",

      "[MO] A missed mortgage payment on a house in Liberty sets off the same non-judicial process as anywhere in the state: RSMo 443.290 gives a named trustee the power of sale, RSMo 443.327 lets that trustee actually carry out the sale once default occurs, and no lawsuit or judge is required at any point in that sequence.",

      "[MO] Because Clay County's own population, roughly 259,772, clears the 50,000-person line RSMo 443.320 sets by a wide margin, a trustee's sale on a house in Liberty runs on the slower schedule -- twenty insertions in a daily newspaper, continued through the sale date -- rather than the shorter four-week schedule a smaller Missouri county in this footprint would use.",

      "[MO] Whether a Liberty owner ever gets a chance to redeem after that sale turns on four things happening together, not one: the trustee's buyer has to be the lender itself rather than an outside investor, the borrower has to give written notice of an intent to redeem, and a surety bond covering the debt has to go up within twenty days of the sale. This site's Missouri trustee-sale-timeline page walks through that four-part test in full rather than repeating it in this summary.",

      "[MO] The same statewide dollar figures apply to a house in Liberty as anywhere else in Missouri -- $15,000 of home equity currently sits outside an unsecured creditor's reach under RSMo 513.475, climbing to $40,000 on January 1, 2027 once an already-signed law takes effect, and RSMo 137.115 taxes an ordinary residential parcel in the city, as everywhere in the state, at 19% of its market value.",

      "[MO] Unpaid property taxes, rather than a missed mortgage payment, send a Liberty house down an entirely separate track under RSMo 140.340 -- a full year of absolute redemption rights running from the tax sale itself, with a further, weaker right continuing after that year until the purchaser actually collects the deed. Nothing about the trustee's-sale conditions above carries over to this different process.",

      "Gladstone sits a few miles south of Liberty, also inside Clay County and considerably larger in population, though Liberty's own historic square and small-college presence give it an older, more established character than Gladstone's own more purely postwar residential growth -- a difference in age and feel, not in which Missouri statutes reach either city.",

      "[MO] This site's Clay County page covers the fuller Northland picture behind these figures, including how the same twenty-insertion notice schedule and homestead figures reach Gladstone, Smithville, Kearney, and every other city sharing this county with this one.",

      "[MO] An heir who inherits a house in Liberty cannot simply list it -- Missouri probate first decides who actually holds the authority to sign for it. RSMo 473.780 opens the door to independent administration, skipping most routine court sign-off, whenever the will itself authorizes that path or every heir agrees to it where the will allows; without either one, the estate falls under supervised administration, where the probate division reviews each major step, a sale of the house among them.",

      "[MO] Closing on a sale in Liberty carries no state or local transfer tax, either -- the same constitutional protection under Article X, Section 25 of the Missouri Constitution that reaches every Missouri city in this footprint, adopted by voters in 2010 and unchanged since.",

      "[MO] An older home near Liberty's historic square is not automatically a poor candidate for a conventional sale -- a well-kept historic property close to the square, or near the William Jewell campus, can draw real buyer interest a fast, discounted cash sale would not capture, and an owner with time and no pressing deadline is usually better off testing that market first.",

      "The Jesse James Bank Museum, housed in the original 1858 bank building the James-Younger gang is generally credited with robbing in broad daylight in 1866, still sits on Liberty's own historic square -- a well-documented piece of local history with no bearing on which statutes reach a house sale.",

      "[MO] A seller in Liberty who knows a specific house was ever used to produce methamphetamine has to put that fact in writing for the buyer, and separately disclose in writing if the seller knew or should have known the property was the residence, storage site, or lab of someone convicted of a related offense -- RSMo 442.606, a duty reaching an older home near the historic square exactly as it reaches a newer one farther out in the county.",

      "[MO] None of this is legal advice. A specific notice, sale, or probate filing touching a house in Liberty deserves a Missouri attorney's own read of the actual documents -- a general description of the statewide rules, however accurate, is not a substitute for that.",
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

  "sell-my-house-fast-raytown-mo": {
    slug: "sell-my-house-fast-raytown-mo",
    body: [
      "Raytown sits directly against Kansas City's own eastern city limits, inside Jackson County, home to roughly 29,097 people packed into one of the smaller and more built-out footprints of any city in this county. Most of its housing dates to the postwar decades rather than the newer subdivision growth found farther out in Lee's Summit or Blue Springs, giving Raytown an older, denser housing stock than most of the rest of Jackson County outside Kansas City and Independence themselves. That older housing stock means a Raytown buyer touring the market today runs into a house needing an updated roof, panel, or set of windows more often than one built within the last twenty years.",

      "[MO] Sitting entirely inside Jackson County, Missouri, Raytown follows the identical statewide rules Kansas City and Independence do, right up against its own border -- there is no separate Raytown-specific statute, and no Kansas rule reaches a house in the city no matter how close it sits to the state line running through the wider metro.",

      "[MO] A trustee, not a court, handles a mortgage default on a house in Raytown, the same as anywhere in Missouri -- RSMo 443.290 and RSMo 443.327 authorize that trustee to sell the property directly once default occurs, without ever filing suit, and because Jackson County's population sits well above the 50,000-person mark RSMo 443.320 sets, the notice preceding that sale has to run for twenty insertions in a daily paper first.",

      "[MO] Because so much of Raytown's housing predates the modern era of standardized loan documents, an older Raytown deed of trust occasionally carries terms a newer subdivision loan elsewhere in the county would not -- a fact worth confirming against the actual recorded instrument rather than assuming a template applies, though the underlying RSMo 443.290 and RSMo 443.327 authority itself does not change based on a document's age.",

      "[MO] The statewide dollar figures apply in Raytown without modification: $15,000 of equity stays outside an unsecured creditor's reach under RSMo 513.475 today, rising to $40,000 effective January 1, 2027, and RSMo 137.115 assesses an ordinary residential parcel in the city, older housing stock included, at 19% of its market value regardless of the home's own age or condition.",

      "[MO] Raytown also sits inside the same Jackson County reassessment dispute affecting Kansas City, Independence, and every other city in the county -- the Missouri State Tax Commission's August 6, 2024 order found the 2023 cycle skipped required notice and inspection, and the Missouri Court of Appeals revived the Commission's enforcement suit on December 30, 2025 without deciding it on the merits. A Raytown homeowner whose own valuation jumped sharply has an active process to raise with the assessor, not a settled outcome either way; the fuller account lives on this site's dedicated Jackson County reassessment page.",

      "Independence borders Raytown immediately to the north and Kansas City to the west, and a house near either boundary can look nearly identical on a map to one well inside its own limits -- but the actual parcel address, not the map, decides which city's own code applies, even though every one of these neighboring cities answers to the identical Missouri statutes above.",

      "[MO] The fuller Jackson County picture behind these figures -- the same trustee-sale notice schedule and the reassessment dispute reaching Kansas City, Independence, Lee's Summit, Blue Springs, and Grandview and Grain Valley alongside Raytown -- is covered on this site's Jackson County page rather than repeated in this summary.",

      "[MO] Missouri has no single statute requiring a general property-condition disclosure form, a gap that matters more for Raytown's older housing stock than for a newer subdivision elsewhere in the county -- instead, the Missouri Merchandising Practices Act makes concealing, suppressing, or omitting a known material fact about a house's condition an unlawful practice under RSMo 407.020, because RSMo 407.010 defines \"merchandise\" to expressly include real estate.",

      "[MO] A house in Raytown held through an estate still cannot pass with clear title until Missouri probate resolves who is authorized to sign. RSMo 473.780 allows independent administration -- skipping most ongoing court oversight -- when a will authorizes it or permits it with every heir's consent; lacking either, supervised administration applies, and the probate court signs off on a sale of the house along with every other major step.",

      "[MO] A tax sale on a house in Raytown, separate from any mortgage default, runs on RSMo 140.340's own timeline -- an absolute right to redeem within a year of the sale, plus a further defeasible right lasting until the tax-sale purchaser actually gets the collector's deed.",

      "[MO] A Raytown closing, older house or newer, carries no state or local transfer tax either, the same constitutional bar reaching every Missouri city in this footprint -- Article X, Section 25 of the Missouri Constitution has kept the state, Jackson County, and Raytown itself from creating one since voters adopted it in 2010.",

      "[MO] None of the above turns a fast cash sale into the obvious choice for a Raytown seller. An older Raytown house with real title or repair issues a conventional lender will not finance is a genuine candidate for a cash sale, but an owner disputing a sharp reassessment has an active process to pursue first, and an owner with time before any notice is even published is usually better off bringing a loan current or listing conventionally.",

      "[MO] None of this is legal advice. A Raytown homeowner facing a specific notice, assessment dispute, or estate question should talk to a Missouri attorney who can review the actual paperwork, not rely on a general city-level summary.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["jackson-county-reassessment"],
      citations["mo-probate-independent"],
      citations["mo-merchandising-practices-act"],
      citations["mo-transfer-tax-ban"],
    ],
  },

  "sell-my-house-fast-gladstone-mo": {
    slug: "sell-my-house-fast-gladstone-mo",
    body: [
      "Gladstone is a Clay County suburb of roughly 27,329 people, wedged between North Kansas City and Liberty about 8 miles north of downtown Kansas City -- one of the more densely built residential cities in the Northland, laid out mostly through steady postwar subdivision growth rather than around a historic town center the way Liberty, its own county seat neighbor, was.",

      "[MO] A house anywhere in Gladstone sits in Clay County, Missouri, so it answers to the identical statewide rules governing Liberty, Kearney, and every other Clay County city -- Missouri law throughout, with nothing about its own smaller, more residential footprint changing which statutes reach it.",

      "[MO] Missing a mortgage payment on a house in Gladstone sets off the same trustee-driven mechanism Missouri uses everywhere: RSMo 443.290 hands a named trustee the power of sale, and RSMo 443.327 lets that trustee carry out the sale on default, with no court date ever appearing on the calendar. Because Clay County's population is well above the 50,000-person figure RSMo 443.320 sets, the notice preceding that sale runs for twenty insertions in a daily newspaper.",

      "[MO] RSMo 443.410 and RSMo 443.420 leave the door open to a one-year redemption after that sale, but the door only actually opens when the lender itself ends up the buyer, the borrower gives written notice of an intent to redeem, and a bond covering the full debt is posted inside twenty days -- miss any one of the three and there is nothing left to redeem. This site's Missouri trustee-sale-timeline page walks through the full sequence.",

      "[MO] The statewide money figures reach a house in Gladstone exactly as they reach one anywhere else in Missouri: RSMo 513.475 shields $15,000 of equity from an unsecured creditor's judgment today, a figure rising to $40,000 on January 1, 2027 under a law already signed, and RSMo 137.115 taxes an ordinary residential parcel at 19% of its market value regardless of a city's own size.",

      "[MO] Missouri law separately requires any seller, in Gladstone or anywhere else in the state, to disclose in writing if the seller knows a property was used to produce methamphetamine, and to make a further written disclosure if the property was the residence, storage site, or lab of someone convicted of a specified meth-related offense the seller knew or should have known about -- RSMo 442.606. That describes a statewide duty that attaches if either fact is true of a given parcel, not a claim about any specific Gladstone house.",

      "North Kansas City borders Gladstone immediately to the south, a small, largely commercial-and-residential city squeezed between the river and the interstate, while Liberty sits just north as the county seat -- Gladstone occupies a middle position between the two, more purely residential than either neighbor and without a downtown square or riverfront commercial core of its own.",

      "[MO] This site's Clay County page covers the county-wide detail behind these figures in fuller depth, including how the same twenty-insertion notice schedule and statewide dollar figures reach Liberty, Smithville, Kearney, and Excelsior Springs alongside Gladstone.",

      "[MO] Losing a house to unpaid taxes rather than a missed mortgage payment triggers a wholly different Missouri process -- RSMo 140.340 guarantees a full year of redemption after the tax sale itself, no conditions attached, with a lesser right surviving even past that year until the purchaser finally collects the deed.",

      "[MO] Selling a house that passed through an estate in Gladstone still waits on the same Missouri probate question that governs anywhere else in the state: who actually has authority to sign. A will authorizing independent administration, or one that allows it with every heir on board, lets RSMo 473.780 bypass most of the court oversight a sale would otherwise need; short of that, supervised administration takes over, and the probate court reviews a sale of the house the same as any other major step.",

      "[MO] Closing on a sale in Gladstone carries no state or local transfer tax -- the same constitutional bar under Article X, Section 25 of the Missouri Constitution reaching every Missouri city in this footprint since Missouri voters adopted it in 2010.",

      "Gladstone's own commercial corridor runs along North Oak Trafficway, a strip of shopping and dining that has anchored the Northland's retail base since well before the newer commercial development farther out in Liberty or Kearney took shape -- a fact about local commerce, not about which statutes reach a house sale nearby.",

      "[MO] A homeowner in Gladstone selling a house that once contained a permitted or unpermitted solid waste disposal site or demolition landfill has to disclose that fact in writing early in the negotiation, along with a warning that the buyer may be assuming liability for remedial action -- RSMo 260.213. That is a description of a statewide duty that would attach if either condition applied to a specific parcel, not a claim that it does.",

      "[MO] None of the above turns a fast cash sale into the default choice for a seller in Gladstone. Time before a trustee's-sale notice is even published is usually better off bringing the loan current or testing a normal listing first, since the local housing stock -- steady and mostly postwar -- tends to hold real appeal for a conventional buyer once it actually goes on the market.",

      "[MO] None of this is legal advice. A Gladstone homeowner sitting on a specific foreclosure notice, tax bill, or estate question gets more out of a Missouri attorney who can look at the documents themselves than out of any general summary, this one included.",
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
      citations["mo-seller-disclosure-solid-waste"],
    ],
  },

  "sell-my-house-fast-belton-mo": {
    slug: "sell-my-house-fast-belton-mo",
    body: [
      "Belton sits at the northern edge of Cass County's own growth corridor, roughly 25,534 people about 20 miles south of downtown Kansas City, right where Interstate 49 crosses into the county from Jackson County to the north. A heritage rail line, the Belton, Grandview & Kansas City Railroad, still runs weekend excursion trips out of Belton, a small tourist draw with no bearing on which statutes govern a house sale in the city, though it is a genuine point of local civic pride that shows up in the city's own tourism marketing.",

      "[MO] Every part of Belton sits in Cass County, Missouri, so it follows the identical statewide rules that reach Raymore next door and every other Cass County city -- Missouri law throughout, regardless of how close its own northern edge sits to the Jackson County line.",

      "[MO] A missed mortgage payment on a house in Belton runs through the same trustee-driven process as anywhere in Missouri: RSMo 443.290 gives a named trustee the power to sell on default, RSMo 443.327 lets that power actually be exercised, and because Cass County's own population, roughly 111,732, clears the 50,000-person threshold RSMo 443.320 sets by more than double, the notice preceding a sale in the city has to run for twenty insertions in a daily newspaper, the same schedule Jackson County to the north uses.",

      "[MO] Under RSMo 443.410 and RSMo 443.420, redeeming after that sale is possible for exactly one year, and only when three separate things are all true at once -- the lender itself, not an outside investor, bought at the sale; the borrower gave written notice of an intent to redeem; and a bond covering the full debt went up within twenty days. The full mechanics live on this site's Missouri trustee-sale-timeline page.",

      "[MO] The same statewide dollar figures reach a house in Belton as anywhere else in Missouri -- $15,000 of equity is shielded from an unsecured creditor's judgment under RSMo 513.475 today, rising to $40,000 effective January 1, 2027, and RSMo 137.115 assesses an ordinary residential parcel in the city at 19% of its market value, the identical rate applied statewide.",

      "[MO] Belton has absorbed a substantial share of Cass County's newer subdivision construction over the past two decades, growth pushing south along the interstate from the built-up Jackson County line -- a genuinely different pattern from Harrisonville, the county seat farther south, or the smaller, slower-turnover towns like Archie and Garden City well outside the I-49 corridor.",

      "[MO] A house lost to delinquent taxes rather than a missed mortgage payment answers to RSMo 140.340 instead, a statute that hands the owner a full year of unconditional redemption rights from the sale date, with a weaker but still real right to redeem persisting after that year until the tax-sale buyer finally collects the deed.",

      "This site's Cass County page covers the fuller county-wide picture behind these figures, including how the same twenty-insertion notice schedule and statewide dollar figures reach Raymore, Harrisonville, Peculiar, and every other city sharing this county with Belton.",

      "[MO] An inherited Belton house cannot close with a buyer until Missouri probate settles who actually holds signing authority over it. RSMo 473.780 permits independent administration -- and the lighter court oversight that comes with it -- only when a will authorizes that route, or allows it and every heir agrees; otherwise, the probate court has to approve a sale of the house as one of several required steps.",

      "[MO] No state or local transfer tax reaches a closing in Belton either -- Article X, Section 25 of the Missouri Constitution, adopted by voters in 2010, bars the state, Cass County, and the city itself from ever creating one.",

      "[MO] A rapidly growing subdivision base means more Belton parcels are being assessed for the first time as new construction than as a reassessment of an older home, but the identical 19% ratio under RSMo 137.115 applies to a brand-new house exactly as it applies to an older one closer to the county seat.",

      "Belton has not seen anything resembling Jackson County's own 2023 reassessment dispute -- that dispute concerns Jackson County's assessment roll specifically, and Cass County's own assessor's office has followed an entirely separate cycle, unaffected by whatever the State Tax Commission ordered on the other side of the county line, even for a Belton parcel sitting just south of that county's own border.",

      "[MO] RSMo 442.606 puts two separate written-disclosure duties on a Missouri seller, and both reach a house in Belton as much as anywhere else in the state: telling the buyer if the seller knows a specific property was ever used to manufacture methamphetamine, and telling the buyer, in a second and distinct disclosure, if that same property once housed or stored drugs for someone the seller knew -- or should have known -- was convicted of a qualifying offense.",

      "[MO] None of the above makes a fast cash sale the automatic right call in Belton. An owner with time before a notice of trustee's sale is even published usually still comes out ahead bringing a loan current or listing conventionally, particularly given how much steady buyer demand Belton's newer construction continues to draw.",

      "[MO] None of this is legal advice. A Belton owner staring at a real foreclosure notice, tax bill, or probate filing needs a Missouri attorney's eyes on the actual paperwork -- the overview above only orients, it does not decide anything for a specific property.",
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

  "sell-my-house-fast-grandview-mo": {
    slug: "sell-my-house-fast-grandview-mo",
    body: [
      "Grandview is a Jackson County city of roughly 25,436 people about 15 miles south of downtown Kansas City, and it carries a genuine piece of presidential history: the National Park Service's Harry S. Truman Farm Home sits inside the city, the working farm where a young Truman spent over a decade before his political career began, decades before the postwar subdivisions that make up most of Grandview's housing today were built.",

      "[MO] A house anywhere in Grandview sits in Jackson County, Missouri, so it follows the identical statewide rules Kansas City, Independence, and every other Jackson County city do -- Missouri law throughout, with its own smaller, more residential scale changing nothing about which statutes reach it.",

      "[MO] A mortgage default on a house in Grandview runs through the same trustee-driven mechanism as anywhere in Missouri, not a lawsuit: RSMo 443.290 hands a named trustee the power to sell on default, and RSMo 443.327 lets that power actually be carried out. Because Jackson County's population sits well above the 50,000-person figure RSMo 443.320 sets, notice preceding that sale runs for twenty insertions in a daily paper, the same schedule every other city sharing this county follows.",

      "[MO] Grandview also sits inside the Jackson County reassessment dispute that has followed the county's 2023 valuation cycle -- the Missouri State Tax Commission's August 6, 2024 order found the reassessment skipped required notice and physical inspections, and on December 30, 2025 the Missouri Court of Appeals revived the Commission's own enforcement suit without ruling on the merits. A Grandview homeowner whose own valuation jumped sharply has a genuine, still-open process to raise with the county assessor, not a settled result -- the fuller account lives on this site's dedicated Jackson County reassessment page.",

      "[MO] Two statewide dollar figures reach a house in Grandview exactly as they reach one anywhere in Missouri, reassessment dispute notwithstanding -- RSMo 513.475 keeps $15,000 of equity out of an unsecured creditor's judgment today, a figure already scheduled to jump to $40,000 on January 1, 2027, and RSMo 137.115 fixes an ordinary residential parcel's assessment at 19% of market value, a ratio the dispute above never actually challenges.",

      "[MO] Whether redemption follows a trustee's sale on a Grandview house at all depends on RSMo 443.410 and RSMo 443.420 lining up three separate facts -- the lender, not a third-party investor, has to be the one who bought at the sale; a written notice of intent to redeem has to go out; and a bond covering the debt has to be posted inside twenty days. This site's Missouri trustee-sale-timeline page covers that sequence in full.",

      "Belton and Grandview sit at opposite ends of the same railroad heritage line -- the Belton, Grandview & Kansas City Railroad that gives Grandview half its name -- but the two cities sit in different counties: this one in Jackson, Belton to the south in Cass, each answering to the identical Missouri statutes but through a different county courthouse and a different county assessor.",

      "[MO] The fuller Jackson County picture -- the same twenty-insertion notice schedule and reassessment dispute reaching Kansas City, Independence, Raytown, Grain Valley, and every other city sharing this county with Grandview -- is covered on this site's Jackson County page rather than repeated in this summary.",

      "[MO] An estate holding a house in Grandview cannot pass clear title to a buyer until Missouri probate works out who is actually authorized to sign for it -- the same question every Jackson County estate has to answer first. RSMo 473.780 spares a personal representative most ongoing court review whenever a will authorizes that route, or permits it with every heir and devisee on board; absent one of those two paths, supervised administration takes over instead, with the court's sign-off required at each major step, a sale of the house included.",

      "[MO] A delinquent-tax sale, as opposed to a mortgage default, follows RSMo 140.340 instead: an owner gets a flat, condition-free year to redeem starting at the sale, and a narrower right survives even after that year until the tax-sale buyer actually takes possession of the collector's deed.",

      "[MO] The Truman Farm Home's presence inside city limits draws a modest but steady stream of history-minded visitors, a fact about Grandview's own tourism footprint rather than about its housing market -- a house near the historic farm site answers to the identical zoning and title rules as any other parcel in the city.",

      "[MO] No transfer tax attaches to a closing in Grandview either, the identical constitutional bar every Missouri city in this footprint relies on -- Article X, Section 25 of the Missouri Constitution has kept the state, Jackson County, and the city itself from creating one since Missouri voters adopted it in 2010.",

      "[MO] A sharp valuation jump or a foreclosure notice does not, by itself, make a fast cash sale the obvious answer for a Grandview seller. An owner disputing a sharp 2023 or 2024 valuation increase has an active process to pursue with the county assessor, not a foregone conclusion either way, and an owner with time before a trustee's-sale notice is even published usually comes out ahead bringing the loan current or listing conventionally.",

      "[MO] None of this is legal advice. A Grandview homeowner facing a specific foreclosure notice, reassessment dispute, or estate question should talk to a Missouri attorney who can review the actual paperwork, not rely on a general city-level overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["jackson-county-reassessment"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
    ],
  },

  "sell-my-house-fast-gardner-ks": {
    slug: "sell-my-house-fast-gardner-ks",
    body: [
      "Gardner sits in the southwestern reach of Johnson County, Kansas, roughly 25,378 people about 27 miles from the metro's core -- newer and faster-growing than the closer-in Johnson County, Kansas cities this site covers, and home to the actual marked split of the Santa Fe and Oregon-California Trails, a stone monument standing where westbound wagon traffic once physically divided depending on which trail a party had chosen.",

      "[KS] Every part of Gardner sits in Johnson County, Kansas -- not the differently named Johnson County, Missouri, roughly 65 miles southeast, that this site's Warrensburg page covers -- so a house in the city answers to Kansas law throughout, with no Missouri statute reaching it regardless of that shared county name.",

      "[KS] New subdivision construction has driven most of Gardner's growth over the past two decades, and a newer Gardner subdivision more often carries a special assessment or improvement-district fee tied to that construction than an older Johnson County, Kansas home closer to the built-up core does. K.S.A. 12-6a20 requires a Kansas seller to disclose any such special assessment or fee to a buyer -- making a good-faith estimate if the exact figure is not yet fixed -- and to get the buyer's written acknowledgment of that disclosure before closing.",

      "[KS] A mortgage default on a Gardner house still runs through the same judicial process as anywhere in Kansas: K.S.A. 60-2410 requires the lender to win a lawsuit, K.S.A. 60-2415 requires a district judge to confirm the sheriff's sale, and only afterward does K.S.A. 60-2414 start a redemption clock -- twelve months by default, three when an early default hit a heavily leveraged loan.",

      "[KS] The uncapped homestead exemption reaches a house in Gardner with the same force it reaches one in Overland Park or Leawood -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale with no dollar limit at all, a genuine protection even in Gardner's newer, more moderately priced subdivisions relative to this Kansas county's wealthier core.",

      "[KS] That exemption pairs with the county's own tax-sale holding period -- K.S.A. 79-2401a requires Johnson County, Kansas to sit on a bid-off property for two years before pursuing a further sale, three years when the property is a qualifying homestead -- giving a Gardner owner facing delinquent taxes rather than a mortgage default years, not weeks, before the county even moves toward a further sale.",

      "Gardner's own newer growth stands apart from Olathe and Overland Park to its east, and from Spring Hill and Edgerton nearby, which are smaller still and growing more slowly -- a difference in pace and scale, not in which Kansas statutes reach any of them, since every one of these cities sits in the identical Johnson County, Kansas.",

      "[KS] The county-wide version of this same story -- how the uncapped exemption and the multi-year holding period reach Overland Park, Olathe, Leawood, and the rest of the sixteen cities in this county -- has its own fuller treatment on this site's Johnson County, Kansas page rather than a repeat of it in this summary.",

      "[KS] A closing on a house in Gardner also skips the old Kansas mortgage-registration tax -- K.S.A. 79-3102 was repealed outright effective January 1, 2019, and that repeal reaches a newer subdivision closing in the city exactly as it reaches one anywhere else in the state.",

      "[KS] A Gardner tax bill runs on the same fixed 11.5% figure Article 11, Section 1 of the Kansas Constitution assigns to residential property everywhere in the state -- a brand-new subdivision house and an older home nearby pay the identical rate, and only the county assessor's own dollar estimate of what each parcel is worth actually differs between them.",

      "[KS] An inherited Gardner house still has to clear the same K.S.A. 59-3202 test every Kansas estate faces, a court weighing the estate's size, the heirs' agreement, and its solvency before deciding whether simplified or supervised administration applies.",

      "[KS] A seller in Gardner working with an agent should also know that Kansas puts the duty to disclose a known material defect on that licensee, not on the seller directly -- K.S.A. 58-30,106 requires the agent representing a seller to tell a buyer-customer about adverse facts actually known, new-construction defect claims included, the same rule reaching an agent-assisted sale anywhere else in Johnson County, Kansas.",

      "[KS] A buyer moving into one of Gardner's newer subdivisions occasionally finances the purchase through a contract for deed instead of an ordinary mortgage, and the Kansas Contract for Deed Act, in force since mid-2024, controls that structure once it's used: the seller must hold title clear of most undisclosed encumbrances, and a buyer who falls behind still gets written notice and real time to catch up before losing the property outright, the exact length depending on how much of the price has already been paid down. This site's dedicated page on the arrangement goes through the mechanics in more depth than fits in this summary.",

      "[KS] A Gardner seller shouldn't treat a fast cash sale as the obvious answer just because the market is growing fast. A homeowner with real equity in a newer subdivision home and no urgent deadline is usually still better off listing conventionally, particularly given how steady buyer demand has stayed for the newer construction driving Gardner's own growth -- a cash sale earns real consideration mainly for a thin-equity owner, an estate needing a fast close, or a property carrying repair needs a conventional lender will not finance.",

      "[KS] None of this is legal advice. A Gardner homeowner unsure whether a specific special assessment, homestead question, or estate matter has been resolved correctly should talk to a Kansas attorney who can review the actual paperwork, not rely on a general city-level summary.",
    ],
    claims: [
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-assessment-115"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-seller-disclosure-special-assessment"],
      citations["ks-probate-simplified"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-contract-for-deed-act"],
      citations["ks-contract-for-deed-notice-cure"],
    ],
  },

  "sell-my-house-fast-raymore-mo": {
    slug: "sell-my-house-fast-raymore-mo",
    body: [
      "Raymore sits a few miles south of Belton along the same Interstate 49 growth corridor, roughly 25,306 people about 21.5 miles from downtown Kansas City -- a Cass County city that has absorbed much of its own real population growth in the last two decades, considerably more recently and more rapidly than Harrisonville, the county seat, or Pleasant Hill farther east. Most of that growth has landed within the last twenty years, giving Raymore a housing stock that skews meaningfully newer than either neighbor's own.",

      "[MO] Sitting entirely inside Cass County, Missouri, Raymore follows the same statewide rules Belton and every other Cass County city do -- Missouri law throughout, regardless of how closely its own newer subdivisions resemble Belton's just to the north.",

      "[MO] A missed mortgage payment on a house in Raymore runs through the same trustee-driven process Missouri uses everywhere: RSMo 443.290 hands a named trustee the power to sell a defaulted property, and RSMo 443.327 lets that power actually be exercised, without a lawsuit at any point. Cass County's population, roughly 111,732, clears the 50,000-person mark RSMo 443.320 sets by more than double, so notice preceding a sale in the city has to run for twenty insertions in a daily newspaper.",

      "[MO] RSMo 443.410 and RSMo 443.420 give a defaulting Raymore owner a shot at redeeming afterward, but it only materializes when the lender itself is the one who bought the property at the sale, the owner gave written notice of an intent to redeem, and a bond covering the debt was posted within twenty days of the sale -- the complete sequence is covered on this site's Missouri trustee-sale-timeline page rather than repeated in this summary.",

      "[MO] The statewide dollar figures reach a house in Raymore exactly as they reach one anywhere else in Missouri -- $15,000 of equity is shielded from an unsecured creditor's judgment under RSMo 513.475 today, becoming $40,000 on January 1, 2027, and RSMo 137.115 fixes the residential assessment ratio at 19% of market value regardless of a city's own growth rate.",

      "[MO] Because so much of Raymore's own housing stock is recent construction, a larger share of local parcels are being assessed for the first time as new build than as a reassessment of an existing home -- but the identical 19% figure under RSMo 137.115 applies to a house finished last year exactly as it applies to an older, long-settled home over in Harrisonville or Pleasant Hill.",

      "Raymore and Belton to its north have grown along the same interstate corridor over roughly the same span of years, drawing a similar newer-construction buyer pool -- but they remain two separate cities inside the same county, each with its own municipal code, its own city council, and its own permitting process, even though both answer to the identical Missouri statutes described above.",

      "[MO] This site's Cass County page covers the county-wide picture behind these figures in fuller depth, including how the same twenty-insertion notice schedule reaches Belton, Harrisonville, Peculiar, and every other city sharing this county with Raymore.",

      "[MO] Unpaid property taxes send a Raymore house down RSMo 140.340's own separate path instead of a mortgage default's -- a full, unconditional year to redeem measured from the tax sale itself, and even after that year has run, a weaker right to redeem still lingers until the purchaser actually collects the deed.",

      "[MO] A house in Raymore that passed through someone's estate cannot change hands with clear title until a Missouri court settles who has authority over it. Where a will authorizes independent administration, or allows it and every heir agrees, RSMo 473.780 spares the personal representative most of the ordinary court review that otherwise attaches to a sale; without one of those two conditions, supervised administration governs instead, and a judge signs off on the sale itself.",

      "[MO] No state or local transfer tax reaches a closing in Raymore, either -- Article X, Section 25 of the Missouri Constitution, adopted by Missouri voters back in 2010, bars the state, Cass County, and the city itself from ever imposing one at all.",

      "Downtown revitalization in Raymore's own original town center has drawn new small businesses in recent years even as growth has pushed outward along the interstate -- a two-track pattern of old-core investment and new-edge subdivision growth happening at the same time, in the same city, a fact about the city's own development pattern rather than about which Missouri statutes reach either half of it.",

      "[MO] Newer construction is no exception to RSMo 442.606's written-disclosure rule -- a seller in Raymore who actually knows a house was used to make methamphetamine has to say so in writing, and a second, separate written disclosure applies if the seller knew or should have known someone convicted of a qualifying meth offense once lived in, stored drugs in, or ran a lab out of that same house.",

      "[MO] Time before a notice of trustee's sale even runs usually favors bringing the loan current or listing conventionally for a Raymore owner. An owner with time before a notice of trustee's sale is even published usually still comes out ahead bringing a loan current or listing through a realtor, particularly given how much steady demand Raymore's newer housing stock continues to draw from conventional buyers.",

      "[MO] None of this is legal advice. A Raymore owner working through an actual, real-world foreclosure notice, tax bill, or probate filing is far better served by a licensed Missouri attorney reviewing that specific paperwork than by any general description of the statewide rules given above.",
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

  "sell-my-house-fast-emporia-ks": {
    slug: "sell-my-house-fast-emporia-ks",
    body: [
      "Emporia sits roughly 99.4 miles from the metro's core, the farthest city this entire site covers, in Lyon County -- a genuinely different market from anywhere closer to the Kansas City line, built around Emporia State University and long associated with William Allen White, the newspaper editor whose Emporia Gazette made Emporia nationally known in the early 1900s. Roughly 24,105 people live within its limits.",

      "[KS] Lyon County has no dedicated hub page on this site yet, given how far outside the closer-in metro counties it sits, so an Emporia seller looking for the county-level detail behind the figures below should treat the statewide Kansas pages as the more complete reference rather than a Lyon County page that does not exist.",

      "[KS] Distance does not change which law governs, though -- every acre of Emporia sits in Kansas, so a house in the city answers to the identical statewide statutes reaching Johnson County or Wyandotte County, nearly a hundred miles closer to the state line, with nothing about the city's own remoteness altering which rule applies.",

      "[KS] A mortgage default on a house in Emporia runs through Kansas's judicial process the same way it does anywhere in the state -- K.S.A. 60-2410 requires the lender to win a lawsuit first, K.S.A. 60-2415 requires the district court sitting in the city to confirm the resulting sheriff's sale, and only then does K.S.A. 60-2414 open a redemption window, twelve months as the default or three when an early default hit a heavily leveraged loan.",

      "[KS] The uncapped homestead exemption reaches a house in Emporia exactly as it reaches one in the closer-in metro core -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield an eligible homestead from forced sale with no dollar limit written into the exemption, regardless of how much lower local home values run compared with Johnson County's.",

      "[KS] A delinquent-tax sale in Emporia follows the same before-the-sale-only structure Kansas uses statewide -- K.S.A. 79-2803 shuts off redemption once the sale itself happens, while K.S.A. 79-2401a still requires Lyon County to sit on a bid-off property for two years before a further sale, three when the property qualifies as a homestead.",

      "Emporia's own resale market moves on a rhythm the closer-in metro core does not share -- turnover in the college town often clusters around Emporia State's own academic calendar, a genuinely rural-college-town pattern rather than the faster, more continuous churn of Johnson County's suburban market, even though the identical Kansas statutes above reach both.",

      "[KS] Property in Emporia is assessed at the same fixed 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets statewide, applied to a market-value estimate that runs well below what the same ratio produces on a comparable home closer to the metro core -- the percentage itself never moves; only the underlying value estimate does.",

      "[KS] A house financed in Emporia also carries none of the old Kansas mortgage-registration tax -- K.S.A. 79-3102 was repealed effective January 1, 2019, a repeal that reaches a closing in the city exactly as it reaches one anywhere else in the state, however far Emporia sits from the metro core.",

      "[KS] Settling an estate that owns a house in Emporia still means clearing the same K.S.A. 59-3202 test every Kansas estate faces -- a court, not the will alone, decides whether the estate proceeds as simplified or supervised, weighing its size, the heirs' agreement, and its solvency.",

      "The William Allen White House, the editor's own longtime residence, is preserved today as a Kansas state historic site inside city limits -- a well-documented piece of local history entirely separate from anything above, and no indication of what a specific house nearby is actually worth or how quickly it might actually sell in the local market.",

      "[KS] A rural or small-town buyer in Emporia occasionally finances a purchase through a contract for deed rather than a bank mortgage, and where that happens, the Kansas Contract for Deed Act -- in force since mid-2024 -- requires the seller to hold title free of most undisclosed encumbrances and gives a defaulting buyer real written notice and a real chance to catch up before losing the property, rather than an immediate forfeiture.",

      "A buyer or inspector traveling from the closer-in metro core faces a genuinely longer trip reaching Emporia than reaching almost anywhere else in this footprint -- a practical fact about distance, not a change in which statutes apply, and one reason turnover in the college town can move more slowly than in a city sitting closer to the core.",

      "[KS] Being nearly a hundred miles from the metro core does not, by itself, make a fast cash sale the obvious answer for an Emporia seller. A homeowner with real equity and nothing urgent forcing a decision usually comes out ahead testing a normal listing first, even in a smaller market that moves more slowly than the closer-in cities this site covers -- it is a genuinely long time-on-market, a repair a conventional lender will not touch, or a hard deadline that tips the balance toward cash, not the mileage on its own.",

      "[KS] None of this is legal advice, and distance from the metro core is no substitute for legal counsel either -- an Emporia homeowner with a specific foreclosure notice, tax sale, or estate question should bring the actual paperwork to a Kansas attorney rather than rely on a general city-level overview like this one.",
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
      citations["ks-contract-for-deed-act"],
      citations["ks-contract-for-deed-notice-cure"],
    ],
  },

  "sell-my-house-fast-prairie-village-ks": {
    slug: "sell-my-house-fast-prairie-village-ks",
    body: [
      "Prairie Village is one of the earliest large-scale planned suburban developments in the entire Kansas City metro, laid out beginning in the 1940s with curving streets and a shopping village built into the plan from the start -- a design that still shapes Prairie Village today. Its own population runs roughly 22,900, in Johnson County, Kansas, about 8.4 miles from the metro's core -- closer in than almost any other city in this footprint.",

      "[KS] Prairie Village sits in Johnson County, Kansas, not the differently named Johnson County, Missouri, roughly 65 miles southeast, described on this site's Warrensburg page -- a house in the city answers to Kansas law throughout, with no Missouri statute reaching it regardless of the county name the two share.",

      "[KS] Because Prairie Village was built out decades ago, most of its housing stock is now considerably older than the newer subdivisions found in Gardner or Spring Hill farther out in the same county -- a difference in age that shapes which houses in the city actually draw a conventional lender's real interest, but not which state's statutes reach a sale.",

      "[KS] The uncapped homestead exemption reaches a house in Prairie Village with the same force it reaches one in neighboring Leawood -- Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 keep an eligible homestead safe from forced sale under any process of law with no dollar limit at all, a meaningful protection given how much equity a longtime owner in this close-in, well-established city has often built up.",

      "[KS] That exemption pairs with a second Kansas rule specific to this county: K.S.A. 79-2401a makes Johnson County, Kansas hold a bid-off property for two full years before any further sale, stretching to three when the parcel qualifies as a homestead -- so a Prairie Village homeowner facing delinquent taxes generally has years, not weeks, before the county moves toward that further sale.",

      "[KS] A mortgage default on a house in Prairie Village still runs through Kansas's judicial process, not a Missouri-style trustee's sale: K.S.A. 60-2410 requires the lender to win a lawsuit, K.S.A. 60-2415 requires a district judge to confirm the sheriff's sale, and only then does K.S.A. 60-2414 open a twelve-month redemption window, cut to three when an early default hit a heavily leveraged loan.",

      "Leawood borders Prairie Village to the south and Roeland Park and Mission sit just to its west, all four sharing Johnson County, Kansas's own statutes -- but Prairie Village's own older, planned-community housing stock gives it a genuinely different resale profile than Leawood's larger, more recently built homes, even though the underlying law reaching any of the four cities does not actually differ at all.",

      "[KS] For the countywide version of the same protections -- how the uncapped exemption and the multi-year holding period play out across Leawood, Overland Park, and the rest of the sixteen cities in this county -- this site's Johnson County, Kansas page goes into that depth rather than this one repeating it.",

      "[KS] Because so much of Prairie Village's own housing stock is decades old, a licensee handling a local sale often has more accumulated knowledge of a specific property's quirks than a licensee selling new construction elsewhere in the county would -- and K.S.A. 58-30,106 makes that knowledge legally relevant, requiring the seller's agent to disclose adverse material facts actually known to a buyer who counts only as a customer.",

      "[KS] A closing on a house in Prairie Village also skips the old Kansas mortgage-registration tax -- K.S.A. 79-3102 was repealed effective January 1, 2019, the same repeal reaching a closing anywhere else in Johnson County, Kansas.",

      "[KS] Property in Prairie Village is assessed at the identical fixed 11.5% ratio Article 11, Section 1 of the Kansas Constitution sets statewide -- what varies, and varies meaningfully given how established and sought-after the location is, is the underlying market-value estimate the county assessor sets for a given parcel.",

      "J.C. Nichols, the developer behind the Country Club Plaza in Kansas City, Missouri, laid out much of Prairie Village's original street plan in the postwar years -- a planning legacy that survives in its curving streets and central shopping village today, a fact about local design history rather than about which state's law actually reaches a house sale in the city.",

      "[KS] Once a delinquent-tax sale in this county is actually held, K.S.A. 79-2803 shuts off any further right to redeem -- Kansas only permits redemption before that sale, never after, so the county's own multi-year holding period described above is where a homeowner's real protection lives, not a window that opens back up once the sale itself happens.",

      "[KS] None of the above makes a fast cash sale the obvious answer for a Prairie Village homeowner. An older home in genuinely poor condition, or an estate needing a fast and uncomplicated close, can be a strong candidate for a cash sale -- but an owner with real equity built up over decades and no urgent deadline is very often better off listing through a realtor first, given how much Prairie Village's own established location tends to draw conventional buyer interest.",

      "[KS] None of this is legal advice. A Prairie Village homeowner unsure whether a specific property actually qualifies as a homestead, or exactly how the county's own multi-year holding period applies to a specific parcel, should talk directly to a Kansas attorney or the Johnson County, Kansas, treasurer's office rather than rely on a general city-level summary like this one.",
    ],
    claims: [
      citations["ks-homestead"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-broker-disclosure-duty"],
      citations["ks-mortgage-reg-tax"],
      citations["ks-assessment-115"],
      citations["ks-tax-sale-no-post-sale-redemption"],
    ],
  },

  "sell-my-house-fast-sedalia-mo": {
    slug: "sell-my-house-fast-sedalia-mo",
    body: [
      "Sedalia is the seat of Pettis County, roughly 22,086 people about 77 miles southeast of the metro's core -- well past the closer-in Missouri counties this site covers, and home to the Missouri State Fair every August since 1901, an event that draws far more visitors to Sedalia for a couple of weeks a year than its own population would suggest. Composer Scott Joplin lived in Sedalia in the 1890s, and wrote the Maple Leaf Rag there before it became one of the best-known ragtime compositions ever published, a piece of musical history the city still leans on in its own tourism marketing today.",

      "[MO] Pettis County itself has no dedicated hub page on this site -- unlike Jackson, Clay, Platte, or Cass Counties farther north -- so the statewide Missouri page is the more complete reference for the county-level mechanics behind the figures below.",

      "[MO] A house anywhere in Sedalia still sits in Missouri, so it answers to the same statewide rules reaching Kansas City or Jackson County, nearly 80 miles closer to the metro core -- distance from the closer-in counties changes nothing about which statutes apply.",

      "[MO] Pettis County's own population, roughly 43,530, actually falls under the 50,000-person line RSMo 443.320 sets for trustee's-sale notice -- unlike Jackson, Clay, Platte, Cass, or Buchanan Counties, all of which clear that line and use the slower twenty-insertion daily-newspaper schedule. A trustee's sale on a house in Sedalia instead runs on four successive weekly newspaper issues, with the last insertion no more than a week before the sale -- a meaningfully faster notice timeline than almost anywhere else in this footprint's larger counties.",

      "[MO] The trustee's own authority to sell does not depend on that population line, though -- RSMo 443.290 and RSMo 443.327 give a named trustee the power to sell a defaulted property directly, without ever filing suit, in Pettis County exactly as in Jackson County; only the length of the notice that has to run before the sale changes with the county's population.",

      "[MO] A trustee's sale in Sedalia can still carry a one-year redemption right, but RSMo 443.410 and RSMo 443.420 only grant it when three things all line up -- the lender itself, and not some outside investor, was the buyer at the sale; the borrower gave written notice of intent to redeem; and a bond covering the full debt was posted inside twenty days of the sale.",

      "[MO] The faster notice schedule this county's own population produces changes nothing about the dollar figures underneath it -- $15,000 of equity sits outside an unsecured creditor's reach under RSMo 513.475 for now, a figure a signed bill raises to $40,000 on January 1, 2027, and RSMo 137.115 still taxes an ordinary residential parcel in Sedalia at the same 19% of market value used in every larger county in this footprint.",

      "Sedalia's own economy leans on the State Fairgrounds and a modest manufacturing base rather than the faster private-sector job growth driving the closer-in metro core, and turnover in the local housing market often trends noticeably behind the pace Jackson or Clay County sees, though every one of the statutes described above still reaches a Sedalia house with identical force.",

      "[MO] Property lost for unpaid taxes, rather than through a mortgage default, runs on RSMo 140.340's separate schedule -- a guaranteed year of redemption rights from the date of the tax sale, with a further, weaker right persisting past that year until the purchaser finally obtains the collector's deed.",

      "[MO] An heir hoping to sell a house in Sedalia out of an estate still has to satisfy Missouri probate first, regardless of how far the city sits from the larger, closer-in counties in this footprint. RSMo 473.780 allows independent administration -- bypassing most ongoing court oversight -- only when a will authorizes it or permits it with every heir's agreement; failing both, supervised administration takes hold instead, with the court approving a sale of the house as one major step among several.",

      "[MO] No state or local transfer tax reaches a closing in Sedalia, either -- the same constitutional bar under Article X, Section 25 of the Missouri Constitution that reaches every Missouri city in this footprint, adopted by voters in 2010.",

      "The Missouri State Fair draws well over a hundred thousand visitors to Sedalia across its own run every August, filling short-term lodging and putting real, if temporary, pressure on the local housing and rental market for a couple of weeks each summer -- a real seasonal fact about the local economy, unrelated to which statutes actually reach a house sale the rest of the year.",

      "[MO] A faster notice schedule doesn't make a fast cash sale the obvious answer for a Sedalia seller, either. An owner with time before a trustee's-sale notice is even published -- and that notice runs faster in Sedalia than in a larger county, so there is genuinely less runway once it starts -- usually still comes out ahead bringing the loan current or listing conventionally if there is time left to do it.",

      "[MO] None of this is legal advice, and the county's own genuinely faster weekly-notice schedule makes getting prompt advice more valuable in Sedalia than in a much bigger county. A Sedalia owner with a real notice, tax bill, or probate filing already in hand should get it in front of a licensed Missouri attorney quickly, not treat this general overview as any kind of final word.",
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
    ],
  },

  "sell-my-house-fast-warrensburg-mo": {
    slug: "sell-my-house-fast-warrensburg-mo",
    body: [
      "Warrensburg is home to the University of Central Missouri and sits roughly 51.4 miles southeast of the metro's core, in Johnson County, MISSOURI -- and the state matters on this page as much as the name, since this county of roughly 54,962 people shares nothing but a name with the far larger, far wealthier Johnson County, Kansas that surrounds Overland Park, Olathe, Leawood, Gardner, and Prairie Village on the opposite side of the state line. Roughly 19,673 people live within Warrensburg itself, a population that skews younger than most of this footprint given how much of it turns over with the university's own enrollment cycle.",

      "[MO] Every part of Warrensburg sits in Missouri, so a house in the city answers to Missouri's trustee-driven foreclosure process, Missouri's own homestead and assessment figures, and Missouri probate -- never the judicial foreclosure process, the uncapped homestead exemption, or the Kansas probate test that reach a Johnson County, Kansas city with an almost identical name roughly 65 miles to the northwest.",

      "[MO] This county's own population sits just over the 50,000-person line RSMo 443.320 sets for trustee's-sale notice -- narrowly clearing it, the way this site's Missouri state page already flags Johnson County, Missouri doing, unlike Pettis County to the east, which falls just under that same line. A trustee's sale on a house in Warrensburg therefore runs on the slower twenty-insertion daily-newspaper schedule, not the four-week weekly schedule a smaller Missouri county nearby would use.",

      "[MO] The trustee's own power to sell comes from RSMo 443.290 and RSMo 443.327, the same two statutes reaching every other Missouri county in this footprint -- a named trustee sells a defaulted property directly in Warrensburg, with no lawsuit and no judge, exactly as in Jackson County to the northwest, even though this county's own population barely clears the line that sets how long notice has to run first.",

      "[MO] A narrow one-year redemption right can attach to that sale under RSMo 443.410 and RSMo 443.420, but only when four conditions hold together -- the lender itself buying at the sale, written notice of an intent to redeem, and a bond covering the full debt posted within twenty days.",

      "[MO] Missouri's own homestead and assessment figures reach a house in this county without modification, name confusion or not: RSMo 513.475 currently protects $15,000 of equity from an unsecured creditor's judgment, climbing to $40,000 on January 1, 2027 under a bill already signed, and RSMo 137.115 taxes an ordinary residential parcel at 19% of market value -- none of which resembles the uncapped exemption or the 11.5% ratio that actually govern a house across the state line in Kansas's own Johnson County instead.",

      "Whiteman Air Force Base, home to the B-2 stealth bomber, sits just outside Knob Noster in this same county, and like Fort Leavenworth to the north, its presence means some sellers in this county move on a permanent-change-of-station timeline rather than an ordinary one -- a genuine, practical fact about this county's market that has nothing to do with which state's statutes reach a specific house.",

      "This county has no dedicated hub page on this site yet, so a Warrensburg seller looking for the county-level detail behind these figures should treat the statewide Missouri page as the fuller reference -- and should double check, on a tax statement or deed, that the words \"Johnson County\" printed there carry Missouri alongside them, not Kansas, given how easily the two get confused.",

      "[MO] Missouri probate, not a will by itself, decides who can sign for an inherited house in this county before it changes hands -- the identical test used everywhere else in the state, regardless of which Johnson County a piece of mail might seem to reference. RSMo 473.780 lets a personal representative bypass most routine court review if the will authorizes doing so, or allows it with every heir's consent; lacking either condition, the estate proceeds under supervised administration, and the court approves a sale of the house along with other major steps.",

      "[MO] A house lost to unpaid taxes rather than a defaulted mortgage answers to RSMo 140.340's own timeline -- a clean, condition-free year of redemption running from the tax sale itself, with a lesser right to redeem surviving past that year until the tax-sale buyer actually takes the collector's deed.",

      "[MO] No state or local transfer tax reaches a closing in Warrensburg either, the same constitutional bar under Article X, Section 25 of the Missouri Constitution reaching every Missouri city in this footprint.",

      "[MO] A hard PCS deadline tied to Whiteman Air Force Base is a genuine reason to weigh a fast cash sale in Warrensburg -- a conventional buyer's financing timeline rarely beats a report date measured in weeks, and a base transfer can arrive with less notice than a typical civilian relocation would. A homeowner without that deadline, and without a pressing default, is usually still better off bringing a loan current or listing conventionally, and should not assume Kansas's own more protective homestead rule reaches a house on this side of the state line, because it does not.",

      "[MO] None of this is legal advice, and confirming which Johnson County a given piece of information actually describes matters more in Warrensburg than almost anywhere else in this footprint. A Warrensburg homeowner should verify the state printed on an actual tax statement or deed before assuming any rule applies, and a Missouri attorney, not a general summary, is who should field a specific foreclosure, tax, or estate question from there.",
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
    ],
  },

  "sell-my-house-fast-grain-valley-mo": {
    slug: "sell-my-house-fast-grain-valley-mo",
    body: [
      "Grain Valley is a small commuter city on Jackson County's own eastern edge, roughly 16,609 people about 20 miles from downtown Kansas City along the Interstate 70 corridor -- smaller and quieter than Blue Springs immediately to its west, and one of the smallest cities in this footprint's largest county. Most residents commute west into the built-up Kansas City core for work rather than finding it locally.",

      "[MO] A house anywhere in Grain Valley sits in Jackson County, Missouri, so it follows the identical statewide rules Kansas City, Independence, Lee's Summit, and Blue Springs all do -- Missouri law throughout, regardless of how much smaller its own population is than any of those larger neighbors.",

      "[MO] Missing a mortgage payment on a Grain Valley house triggers the identical trustee mechanism the rest of Jackson County uses -- RSMo 443.290 hands the named trustee power of sale, RSMo 443.327 lets that trustee actually carry it out, and because the county's own population sits well above the 50,000-person mark RSMo 443.320 sets, notice still has to run for twenty insertions in a daily newspaper even for a city this size.",

      "[MO] Grain Valley also sits inside the same Jackson County reassessment dispute affecting every other city sharing this county -- the Missouri State Tax Commission's August 6, 2024 order found the 2023 cycle skipped required notice and inspection on parcels facing sharp increases, and the Missouri Court of Appeals revived the Commission's own enforcement suit on December 30, 2025 without deciding it on the merits. A Grain Valley homeowner whose own valuation jumped sharply has an active process to raise with the county assessor, not a settled result -- the fuller account lives on this site's dedicated Jackson County reassessment page.",

      "[MO] A small city's population buys no exception to Missouri's statewide dollar figures -- RSMo 513.475 keeps $15,000 of equity out of an unsecured creditor's reach today, on schedule to become $40,000 on January 1, 2027, and RSMo 137.115 assesses an ordinary residential parcel in Grain Valley at the same 19% of market value a much larger Jackson County city like Kansas City itself carries.",

      "[MO] Whether a redemption right ever follows a trustee's sale in Grain Valley comes down to RSMo 443.410 and RSMo 443.420's own three-part test -- the lender, not a third-party investor, has to be the buyer at the sale; the borrower has to give written notice of an intent to redeem; and a bond covering the debt has to be posted inside twenty days of the sale.",

      "Blue Springs sits immediately west of Grain Valley along the same I-70 corridor, considerably larger and with a much more active resale market of its own, while Oak Grove sits farther east, smaller still -- Grain Valley occupies a genuine middle position on that corridor, growing steadily but at nowhere near either larger neighbor's own scale, even though all three answer to identical Jackson County statutes.",

      "[MO] This site's Jackson County page covers the fuller county-wide picture behind these figures, including how the same twenty-insertion notice schedule and reassessment dispute reach Kansas City, Independence, Blue Springs, Raytown, and Grandview alongside this smaller commuter city.",

      "[MO] An estate holding a house in Grain Valley still has to clear Missouri probate before a sale can close with clear title, exactly as anywhere else in Jackson County. RSMo 473.780 spares a personal representative most ongoing court review when a will authorizes that path, or permits it with every heir's consent; without one of those two routes, supervised administration applies instead, requiring the probate court's approval at each major step, selling the house included.",

      "[MO] A delinquent-tax sale, unlike a mortgage default, sends a Grain Valley house down RSMo 140.340's own path -- a flat year of unconditional redemption from the sale date, followed by a narrower right that survives even after that year until the tax-sale buyer actually gets the collector's deed.",

      "[MO] A closing in Grain Valley carries no transfer tax whatsoever -- Article X, Section 25 of the Missouri Constitution has barred the state, Jackson County, and every city inside it, this one included, from creating one since 2010.",

      "Grain Valley has grown steadily as commuters priced out of Blue Springs or Lee's Summit look one exit farther out along I-70, a pattern that has kept new subdivision construction going even while the historic core along its own original main street stays small and largely unchanged.",

      "[MO] RSMo 260.213 requires early written notice, before negotiations get far along, whenever a Missouri seller knows a parcel contains a solid waste dump or demolition landfill, licensed or not -- and that notice has to flag the buyer's possible exposure to state-ordered cleanup costs, a duty Grain Valley's own sellers carry exactly as a seller in downtown Kansas City does.",

      "[MO] Grain Valley's newer construction has kept buyer interest steady enough that an owner with time before a trustee's-sale notice is even published usually still comes out ahead listing instead of taking a cash offer. An owner with time before a trustee's-sale notice is even published usually still comes out ahead bringing the loan current or listing through a realtor, and an owner disputing a sharp reassessment has an active process to pursue first rather than a foregone conclusion to accept either way.",

      "[MO] None of this is legal advice. A Grain Valley owner working through a real foreclosure notice, reassessment dispute, or estate question needs a Missouri attorney looking at the actual documents involved -- a small city's own general overview, this one included, cannot settle a specific case.",
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
      citations["jackson-county-reassessment"],
      citations["mo-seller-disclosure-solid-waste"],
    ],
  },
};
