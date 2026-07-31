import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * Wave 0C, batch 2 -- fourteen more tier-3 city pages, the tenth content map.
 * Four counties behind this batch (Vernon, Cooper, Bourbon, Clinton) carry no
 * hub page anywhere in this site's registry as of this map's own commit, and
 * each of the four cities sitting in one of them -- Nevada, Boonville, Fort
 * Scott, Cameron -- says so explicitly rather than pointing at a page that
 * does not exist. Cameron's own second county, DeKalb, has no hub page
 * either. Three cities in this batch straddle a county line the same way
 * Smithville and Excelsior Springs did in the batch before this one: Oak
 * Grove reaches into Lafayette County, Pleasant Hill reaches into Jackson
 * County, and Bonner Springs is the only city in this site's entire
 * footprint that reaches into three counties at once -- Wyandotte (its
 * primary, per geography.ts), Leavenworth, and Johnson County, KANSAS. Two
 * of this batch's fourteen cities -- Roeland Park and De Soto -- sit in that
 * same Johnson County, Kansas, never written bare, because a differently
 * named Johnson County, Missouri exists roughly 65 miles away with the
 * opposite foreclosure procedure and opposite money rules, and a published
 * page on this site has already shipped that exact mistake once before it
 * was caught.
 *
 * Same binding rules as every content map before this one: every paragraph
 * asserting law carries `[MO]` or `[KS]`, never both; every legal assertion
 * traces to a real entry in `citations` rather than being retyped from
 * memory; and no deictic stand-in for a named state appears anywhere. Every
 * page also names its own city rather than falling back on "this city" as a
 * generic stand-in -- an audit of the forty city pages written before this
 * one found up to 23 uses of "this city" on a single page, a template
 * fingerprint this map avoids by naming the place, using "the city," or
 * reaching for a genuine local descriptor wherever a sentence is about the
 * place. Every sentence below is worded fresh for this map -- not copied
 * from city-content-tier3a.ts, either county
 * content map, or either tier-1/tier-2 city map -- because the exhaustive
 * duplication gate checks every 160-character window across the whole
 * registry, not just within this file. The risk this map is most exposed to
 * is its own internal one: three Jackson County commuter towns (Oak Grove,
 * Pleasant Hill's secondary county, Greenwood), two Leavenworth County
 * exurbs (Basehor, Tonganoxie), and two Johnson County, Kansas cities
 * (Roeland Park, De Soto) all restate the same handful of Missouri or Kansas
 * statutes, so each restatement below deliberately varies sentence order and
 * vocabulary rather than swapping only the place name.
 */
export const cityContentTier3b: Record<string, PageContent> = {
  "sell-my-house-fast-oak-grove-mo": {
    slug: "sell-my-house-fast-oak-grove-mo",
    body: [
      "Oak Grove is a Jackson County city of roughly 8,907 people about 25 miles from the metro's core, sitting at the far eastern edge of the county along Interstate 70 -- the last incorporated Jackson County stop before the highway crosses into Lafayette County farmland. A former Missouri Pacific Railroad depot town, Oak Grove's own downtown still follows the old rail grid laid out well before the interstate replaced the railroad as the corridor's main artery.",

      "[MO] Oak Grove sits in Jackson County, Missouri, so it follows the same statewide Missouri rules reaching Kansas City, Independence, and every other city in this county -- but Oak Grove's own position right at the county's eastern edge sets it apart from the built-up suburbs closer to the urban core.",

      "[MO] A homeowner in Oak Grove whose own valuation jumped sharply in 2023 or 2024 is caught up in the same dispute reaching every other Jackson County parcel: the Missouri State Tax Commission's August 6, 2024 order found the county's reassessment skipped required notice and inspections on steep increases, Jackson County fought that finding in court, and the Missouri Court of Appeals let the Commission's enforcement suit go forward this past December without deciding the underlying question. This site's Jackson County page covers that dispute in full; an Oak Grove owner disputing a specific number should start there rather than assume the litigation has settled anything yet.",

      "[MO] Missing a mortgage payment on an Oak Grove house triggers the identical trustee mechanism every Jackson County property answers to: RSMo 443.290 vests a named trustee with the power of sale, RSMo 443.327 lets that trustee exercise it without a lawsuit, and because Jackson County's own population -- roughly 718,560 -- clears RSMo 443.320's 50,000-person line many times over, notice ahead of an Oak Grove sale runs the full twenty daily-newspaper insertions rather than a smaller county's shorter weekly track.",

      "[MO] Undoing an Oak Grove trustee's sale afterward comes down to three separate conditions under RSMo 443.410 and RSMo 443.420: the property has to end up back with the lender itself rather than an outside buyer, the former owner has to have already put an intent to redeem on paper, and a bond covering the debt has to be filed within twenty days of the sale -- absent any one of the three, nothing is left to redeem.",

      "[MO] The same two statewide numbers reach an Oak Grove sale as anywhere else in Missouri -- RSMo 513.475's $15,000 equity shield against an unsecured judgment, rising to $40,000 once January 1, 2027 arrives, and RSMo 137.115's flat 19% residential assessment ratio, a rate Oak Grove's own position at the county's edge does nothing to change.",

      "[MO] Falling behind on property taxes, rather than a mortgage, sends an Oak Grove parcel down RSMo 140.340's separate path instead -- a full year of unconditional redemption counted from the tax sale itself, and a weaker right that lingers afterward until the purchaser actually collects the collector's deed.",

      "This site's Jackson County page and its own Lafayette County page both cover the fuller detail behind these figures -- the first walking through how the same rules reach Independence and Lee's Summit alongside Oak Grove, the second covering Odessa and Higginsville just across the county line to the east.",

      "[MO] An Oak Grove estate still has to clear Missouri's own probate gate before a house can change hands. RSMo 473.780 opens independent administration, and the lighter oversight that comes with it, only where a will itself authorizes that path or allows it once every heir agrees; short of either, supervised administration governs and the court reviews a sale step by step.",

      "[MO] No transfer tax attaches to an Oak Grove closing either, courtesy of Article X, Section 25 of the Missouri Constitution -- a rule Missouri voters wrote into the constitution in 2010 that reaches Oak Grove with the same force it reaches Kansas City itself.",

      "Oak Grove's own footprint reaches slightly across the county line into Lafayette County as well, which matters for a genuinely practical reason -- a parcel on that side answers to the Lafayette County courthouse and treasurer rather than Jackson County's, even though the identical statewide Missouri statutes above reach either side the same way.",

      "[MO] RSMo 442.606 imposes a two-part duty on an Oak Grove seller who has actual knowledge a house once served as a methamphetamine lab: the fact itself must go into writing for the buyer, and if the seller also knew, or reasonably should have, that the same address sheltered or supplied a person with a qualifying conviction, that too requires its own separate written notice -- a duty reaching an older rail-town house near downtown exactly as it reaches a newer home farther out.",

      "Oak Grove's own pace differs from Blue Springs and Grain Valley closer to the built-up core of the county -- newer subdivision growth has pushed east along Interstate 70 toward this stretch of the county more slowly than it has toward those two, leaving Oak Grove with an older average housing stock and a smaller, steadier resale market than either of its more built-up neighbors.",

      "None of the above makes a fast cash sale the default choice for a seller in Oak Grove. An owner with no trustee's-sale notice already in motion and no fixed estate deadline is usually better off listing conventionally, since Oak Grove's smaller but steady commuter demand has kept a well-priced house moving even without the newer-construction draw Blue Springs and Grain Valley offer.",

      "A cash sale earns real consideration in Oak Grove for an older rail-era house carrying repair needs a conventional lender will not finance, a Lafayette County-line parcel whose title has gotten complicated by which side of the county it actually sits on, or an estate that needs to close on a fixed date -- not as the first move for a seller with time and a marketable house.",

      "[MO] None of this is legal advice. An Oak Grove homeowner facing a specific foreclosure notice, tax bill, or probate filing, or unsure which county's courthouse actually handles a parcel near the Lafayette County line, should talk to a Missouri attorney who can review the actual paperwork rather than rely on a general city-level summary.",

      "The old Missouri Pacific depot itself no longer runs passenger service, but Oak Grove's downtown grid still follows the rail line's original layout, a detail a buyer drawn to Oak Grove's older housing stock often notices well before anything the statutes above ever touch.",
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
      citations["jackson-county-reassessment"],
    ],
  },

  "sell-my-house-fast-parkville-mo": {
    slug: "sell-my-house-fast-parkville-mo",
    body: [
      "Parkville is a Platte County city of roughly 8,859 people about 10.4 miles from the metro's core, built up along a stretch of Missouri River bluffs where Park University -- a private college founded in 1875 -- anchors a compact, walkable downtown considerably older than the newer subdivision growth found elsewhere in the county. English Landing Park, a riverfront green space at the foot of that downtown, floods on a regular enough cycle that longtime residents plan around it rather than treat it as a rare event.",

      "[MO] All of Parkville sits inside Platte County, Missouri, so a house sale in this bluff-top city follows the same statewide Missouri rules reaching Platte City, Weston, and every other city in this county -- a trustee-driven foreclosure process, a dollar-figure homestead exemption, and a flat statewide assessment ratio, none of which bends for a riverfront address.",

      "[MO] A missed mortgage payment on a Parkville house sets off the identical mechanism as anywhere in the county: RSMo 443.290 gives the deed of trust's own named trustee the power of sale, RSMo 443.327 lets that trustee use it without ever filing suit, and because Platte County's population -- roughly 111,940 -- clears RSMo 443.320's 50,000-person line comfortably, notice ahead of a Parkville sale has to run the full twenty insertions in a daily newspaper.",

      "[MO] A right to undo that sale afterward is the exception under RSMo 443.410 and RSMo 443.420, not the rule -- it exists only where the lender itself bought the property back, the borrower had already put an intent to redeem in writing, and a bond for the full debt went up inside twenty days of the sale.",

      "[MO] The same statewide dollar figures reach a Parkville sale as anywhere in Missouri: $15,000 of equity sits beyond an unsecured creditor's reach under RSMo 513.475 today, climbing to $40,000 on January 1, 2027, while RSMo 137.115 taxes an ordinary residential parcel in Parkville at 19% of its market value whether that parcel sits on the bluff or down near the river.",

      "[MO] Unpaid property taxes, as distinct from a missed loan payment, route a Parkville property through RSMo 140.340 instead -- a full, unconditional year of redemption from the tax-sale date, plus a weaker right that survives afterward until the purchaser actually secures the collector's deed.",

      "This site's Platte County page covers the fuller detail behind these figures, including how the same twenty-insertion notice schedule reaches Platte City, Riverside, Weston, and Weatherby Lake alongside Parkville itself.",

      "[MO] A Parkville estate still has to clear Missouri probate before a house can pass with clear title. RSMo 473.780 permits independent administration, and the lighter oversight it brings, only where the will itself authorizes that path or allows it with every heir's consent; anything less sends the estate into supervised administration, with the court reviewing a sale step by step.",

      "[MO] Closing on a Parkville house carries no state or local transfer tax either -- Article X, Section 25 of the Missouri Constitution has barred one since Missouri voters adopted it in 2010, a rule reaching Parkville's riverfront parcels exactly as it reaches an inland lot elsewhere in the county.",

      "Parkville's own history with the Missouri River cuts two ways for a seller in this bluff-top city -- the same setting that gives the historic downtown its character also means a low-lying parcel closer to the water can carry flood-zone requirements a conventional lender's underwriting takes seriously, a practical financing hurdle distinct from anything the statutes above address.",

      "Park University's own presence gives Parkville a modest rental-driven segment of its housing market that a purely residential Platte County town like Weatherby Lake or Weston does not share to the same degree.",

      "[MO] A Parkville seller who knows a specific parcel contains a permitted or unpermitted solid waste disposal site or demolition landfill cannot stay quiet about it -- RSMo 260.213 requires a signed written notice early in the negotiation disclosing the site's existence and location, along with a warning that the buyer may be assuming liability to the state for any remedial cleanup, a genuinely relevant question for an older riverfront lot with a longer history than a newer subdivision parcel carries.",

      "Platte City, the county seat, and Weston, an older river town of its own farther north, both carry a different character than Parkville's own university-and-arts-district identity -- a difference in local flavor within one county, not in which statutes reach any of the three.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Parkville. An owner of a well-kept home on the bluff, away from the flood-prone lower blocks, with no pressing deadline, is usually still better off testing a normal listing first, since Parkville's own historic downtown and university connection continue to draw real buyer interest a discounted quick sale would leave on the table.",

      "A cash sale earns genuine consideration in Parkville specifically for a lower-lying property whose flood-zone status has stalled a conventional buyer's financing, a rental between Park University-connected tenants that an owner wants off the books quickly, or an estate needing to close on a fixed date -- not as the default answer for a seller with time and a marketable house on higher ground.",

      "[MO] None of this is legal advice. A Parkville homeowner facing a specific foreclosure notice, tax bill, or a flood-zone disclosure question should talk to a Missouri attorney who can review the actual paperwork, not rely on a general city-level overview.",

      "Park University's own bluff-top campus has occupied the same site since the 1870s, longer than any other institution in this county's own roster of cities, and that continuity is part of why Parkville's downtown reads as considerably older than the newer commercial strips found in Riverside or along Platte City's own more recent growth corridors.",
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
      citations["mo-seller-disclosure-solid-waste"],
    ],
  },

  "sell-my-house-fast-pleasant-hill-mo": {
    slug: "sell-my-house-fast-pleasant-hill-mo",
    body: [
      "Pleasant Hill is a Cass County city of roughly 8,679 people about 26.1 miles from the metro's core, built up around a railroad junction where two old freight lines once crossed -- a history still visible today in the Amtrak Missouri River Runner station downtown, one of only a handful of passenger-rail stops anywhere in this site's 53-county footprint.",

      "[MO] Most of Pleasant Hill sits in Cass County, Missouri, which is where this page's legal treatment is anchored, but a portion of the city's own footprint reaches north into Jackson County as well -- a distinction that decides which county courthouse and treasurer actually handle a specific parcel, even though Cass and Jackson Counties answer to the identical statewide Missouri statutes below.",

      "[MO] Whichever side of that county line a Pleasant Hill parcel sits on, the same trustee-driven foreclosure reaches it: RSMo 443.290 hands the power of sale to the trustee named in the deed of trust, and RSMo 443.327 lets that trustee exercise it directly, with no courtroom involved at any point.",

      "[MO] Both Cass County, at roughly 111,732 people, and Jackson County, at roughly 718,560, clear RSMo 443.320's 50,000-person line by a wide margin, so a Pleasant Hill trustee's sale runs the full twenty-insertion daily-newspaper notice regardless of which county actually handles the filing.",

      "[MO] A Pleasant Hill borrower does not automatically get a second chance after a trustee's sale -- RSMo 443.410 and RSMo 443.420 open that door only when the lender itself ends up owning the property from the sale, a written intent to redeem was already on file, and a bond for the full debt amount was posted inside the following twenty days.",

      "[MO] RSMo 513.475 keeps $15,000 of home equity out of an unsecured creditor's reach in Pleasant Hill today, a figure rising to $40,000 once January 1, 2027 arrives, while RSMo 137.115 taxes an ordinary residential parcel in Pleasant Hill at 19% of its market value regardless of whether that parcel's own courthouse sits in Harrisonville or Independence.",

      "[MO] Missouri skips a dedicated property-condition disclosure form entirely, in Pleasant Hill as everywhere else in the state -- instead, RSMo 407.020 folds real estate into the Missouri Merchandising Practices Act's own reach, making it unlawful to conceal, suppress, or omit a fact a buyer would consider material, with RSMo 407.010 spelling out that \"merchandise\" covers a house sale just as much as any other transaction.",

      "[MO] A tax delinquency, rather than a mortgage default, moves a Pleasant Hill property under RSMo 140.340 instead -- a full year of unconditional redemption from the sale date, and a weaker right that continues afterward until the purchaser actually obtains the collector's deed.",

      "This site's Cass County page and its own Jackson County page both cover the fuller detail behind these figures -- the first walking through how the same rules reach Harrisonville, Belton, and Raymore alongside Pleasant Hill, the second covering the reassessment dispute touching the sliver of Pleasant Hill that sits inside Jackson County's own boundary.",

      "[MO] An heir inheriting a Pleasant Hill house still has to clear Missouri's own probate question first. RSMo 473.780 opens independent administration only where a will authorizes it or allows it with every heir's consent; short of either, supervised administration governs and a judge reviews the sale.",

      "[MO] No transfer tax touches a Pleasant Hill closing either, courtesy of Article X, Section 25 of the Missouri Constitution, in place since Missouri voters approved it in 2010 -- a rule that draws no distinction based on which county a specific parcel sits in.",

      "The Amtrak stop downtown, on the twice-daily Missouri River Runner route between Kansas City and St. Louis, gives Pleasant Hill a genuine transit connection no other city in this batch shares, and it has kept the historic downtown around the depot a real draw for a buyer specifically looking for that character rather than newer subdivision construction. A house within walking distance of the platform tends to hold its own resale value even when a comparable property farther from the tracks sits on the market longer, a genuinely local pattern tied to Pleasant Hill's own rail heritage rather than to anything the statutes above touch.",

      "Harrisonville, the Cass County seat farther south, and Lee's Summit, just across the Jackson County line to the north, both carry more active resale markets than Pleasant Hill's own smaller, rail-heritage downtown, though the identical statutes reach all three.",

      "None of the above makes a fast cash sale the default answer for a seller in Pleasant Hill. An owner with no trustee's-sale notice already published and no fixed estate deadline is usually still better off listing conventionally, since the depot-area buyer interest described above has held up well even as newer construction elsewhere in the county draws its own separate demand.",

      "A cash sale earns real consideration in Pleasant Hill specifically for a house whose parcel sits across the Jackson County line and has picked up a title complication as a result, an estate needing to close by a fixed date, or a property carrying repair needs no conventional lender will finance -- not as the first move for a seller with time and a clean title.",

      "[MO] None of this is legal advice. A Pleasant Hill homeowner unsure which county actually handles a specific parcel should confirm that directly with the Cass County or Jackson County recorder, and take any foreclosure or probate question to a Missouri attorney rather than rely on this overview.",
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

  "sell-my-house-fast-nevada-mo": {
    slug: "sell-my-house-fast-nevada-mo",
    body: [
      "Nevada is the county seat of Vernon County, roughly 8,262 people about 87.6 miles from the metro's core -- pronounced locally \"nuh-VAY-duh,\" not like the state it shares a spelling with. Cottey College, a small private women's college founded in 1884, sits inside city limits, and the local Bushwhacker Museum keeps alive Vernon County's own Civil War-era history as a base for pro-Confederate guerrilla fighters, a history the county still markets itself around today.",

      "[MO] Every acre of Nevada sits in Missouri, inside Vernon County, so Missouri law reaches a house sale in this Vernon County seat start to finish -- but this is a genuinely smaller, thinner market than Jackson, Clay, or Cass County, with far fewer comparable recent sales to price a specific house against.",

      "[MO] Foreclosure on a Nevada house still runs through the same trustee mechanism RSMo 443.290 and RSMo 443.327 set up statewide -- a named trustee sells on default, with no lawsuit at any point -- but Vernon County's own population, roughly 19,710, sits well under the 50,000-resident line RSMo 443.320 uses, so notice ahead of a Nevada sale runs through four weekly newspaper issues instead, the last one landing no more than a week before the sale.",

      "[MO] Getting that sale reversed afterward is the exception under RSMo 443.410 and RSMo 443.420 -- only where the lender itself bought back the property, the borrower had already put an intent to redeem in writing, and a bond for the full debt went up within twenty days does a one-year redemption period actually open.",

      "[MO] The same two dollar-and-percentage figures Missouri sets statewide reach a Nevada sale regardless of Vernon County's own small size -- RSMo 513.475 shields $15,000 of equity from an unsecured creditor's judgment today, climbing to $40,000 once 2027 begins, and RSMo 137.115 taxes an ordinary Nevada home at 19% of its market value, a rate no different than what a much larger county in this footprint pays.",

      "[MO] A tax delinquency, rather than a defaulted loan, moves a Nevada property under RSMo 140.340 instead, guaranteeing a clean first year of redemption from the sale date and a narrower right that lingers afterward until the purchaser actually holds the collector's deed.",

      "[MO] Vernon County itself carries no dedicated hub page in this site's registry as of this writing, so a Nevada seller wanting county-specific depth beyond this summary should rely on the statewide Missouri pages until that gap in the footprint closes.",

      "[MO] Before a Nevada house can change hands out of an estate, Missouri probate has to settle who is actually authorized to sign the deed -- RSMo 473.780 lets a personal representative skip most court oversight only if the will itself calls for independent administration or allows it once every heir signs on; anything less means supervised administration and a judge's sign-off on the sale.",

      "[MO] Missouri's constitutional transfer-tax ban reaches Nevada the same way it reaches everywhere else in the state -- Article X, Section 25 has forbidden the state, every county, and every city from taxing a real-estate transfer since Missouri voters wrote it into the constitution in 2010.",

      "Cottey College's own small, residential student body brings a modest rental market to a handful of blocks near campus, a genuinely different segment of Nevada's housing stock than the single-family homes making up most of the rest of the city -- and the city's own local pronunciation is enough of a fixture that a newcomer getting it wrong is an easy way to be pegged as one.",

      "[MO] No single Missouri statute forces a seller anywhere in this footprint, Nevada included, to fill out a general property-condition disclosure form -- the real backstop against staying quiet about a known defect is the Missouri Merchandising Practices Act, whose RSMo 407.010 definition of \"merchandise\" expressly reaches real estate and whose RSMo 407.020 treats a concealed or omitted material fact as unlawful regardless of whether any specific form was ever signed.",

      "Vernon County's own remaining towns are considerably smaller than Nevada itself, leaving the city as the only real commercial and educational hub for a genuinely rural stretch of southwest Missouri -- a concentration of buyer demand into one city that a county with several similarly sized towns would not show.",

      "[MO] The trade-off in a market this size cuts both ways: fewer active buyers outside Cottey College's own hiring and enrollment cycle means a Nevada house can sit unsold for a longer stretch once listed, but that same thinness also removes pressure toward an unnecessarily fast decision.",

      "A fast cash sale is not the obvious answer for a seller in Nevada just because this small city's own buyer pool runs thinner than the metro's. Absent an actual trustee's-sale notice already published or a hard estate deadline, an owner typically comes out ahead listing conventionally and accepting that this smaller market simply takes longer to sell in.",

      "Where a cash sale genuinely fits Nevada is narrower than it might first appear: a landlord's rental near campus caught between tenants, an heir whose estate has to close by a set date, or a house whose repair list is long enough that a market this size has no lender willing to finance it -- not a seller who simply has time and a house in decent shape.",

      "[MO] None of the above is legal advice, and a small-county foreclosure notice, tax bill, or probate filing touching a Nevada property deserves a Missouri attorney's own review of the actual paperwork rather than a general description of statewide rules.",
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

  "sell-my-house-fast-boonville-mo": {
    slug: "sell-my-house-fast-boonville-mo",
    body: [
      "Boonville is the county seat of Cooper County, roughly 7,782 people about 98.8 miles from the metro's core -- the farthest city in this site's entire footprint from the Kansas City core, sitting on a Missouri River bluff along Interstate 70. The Katy Trail, a rail-to-trail conversion running the length of the old Missouri-Kansas-Texas Railroad, passes directly through downtown, and a riverboat casino built along the water has operated under a series of different owners since the late 1990s.",

      "[MO] Every acre of Boonville sits in Missouri, inside Cooper County, so Missouri law reaches a house sale in this river town start to finish -- but at nearly 99 miles out, this is a genuinely smaller and slower market than anywhere closer to the metro core in this footprint, with far fewer comparable recent sales to price a specific house against.",

      "[MO] Cooper County's own foreclosure mechanics follow the identical two Missouri statutes used everywhere in the state -- a deed of trust names its own trustee under RSMo 443.290, and RSMo 443.327 authorizes that trustee to sell directly once a borrower defaults, no lawsuit required. What differs for Boonville is the notice clock: with roughly 16,947 residents, Cooper County falls well short of the 50,000-person threshold RSMo 443.320 sets, so a weekly newspaper carries the sale notice four separate times, wrapping up no later than a week before the sale itself.",

      "[MO] A Boonville borrower cannot count on getting the house back after a trustee's sale -- RSMo 443.410 and RSMo 443.420 make that possible only when three things all happened: the lender itself ended up as the buyer, a written intent to redeem was already on record, and a bond covering the debt was posted within the following twenty days.",

      "[MO] Distance from the metro core buys a Boonville seller no different set of dollar figures than a Jackson County seller gets -- RSMo 513.475 currently protects $15,000 of home equity from an unsecured judgment, a figure set to climb to $40,000 once January 1, 2027 arrives, and RSMo 137.115 fixes an ordinary residential parcel's assessment at 19% of its own market value, river-bluff lot or inland farmhouse alike.",

      "[MO] A separate statute, RSMo 140.340, governs what happens after unpaid taxes rather than a missed loan payment cost someone a Boonville property -- a full, no-conditions year to redeem starting at the tax sale, plus a lesser right that carries on even past that year until the purchaser actually gets the collector's deed.",

      "[MO] Cooper County itself has no hub page in this site's registry as this map goes live, leaving the statewide Missouri pages as the best available county-adjacent reference for a Boonville seller until that gap closes.",

      "[MO] A Boonville house tied up in an estate still has to pass through Missouri's own probate gate first -- RSMo 473.780 permits independent administration, which spares the estate most routine court sign-off, only where the will itself authorizes it or allows it with every heir's agreement; failing that, supervised administration takes over.",

      "[MO] Article X, Section 25 of the Missouri Constitution reaches a Boonville closing the same way it reaches one anywhere else in the state, forbidding any transfer tax on real estate since Missouri voters wrote the ban into the constitution back in 2010.",

      "The Katy Trail's own presence through downtown Boonville draws cyclists and hikers passing through on a multi-day trip, a real if modest tourism draw for a house within walking distance of the trailhead, while the riverboat casino brings a different, more transactional kind of visitor traffic that has little bearing on the resale market for an ordinary house nearby.",

      "[MO] Missouri does not leave a Boonville seller's knowledge of a house's meth history to guesswork -- RSMo 442.606 turns actual knowledge that a property was used to manufacture the drug into a mandatory written disclosure, with a further written disclosure required only when the seller separately knew, or had reason to know, that the property once housed or supplied someone convicted of a related offense, a real question given how much of Boonville's own housing predates modern construction standards.",

      "At nearly 99 miles from the metro core, Boonville functions as its own small regional hub for Cooper County rather than as an extension of anywhere closer to Kansas City, and an appraiser pricing a specific Boonville house is working from a genuinely thinner and more geographically scattered set of comparable sales than one would find in any of the metro counties this site otherwise covers.",

      "[MO] That thinness cuts two directions at once: a Boonville listing can sit considerably longer than one closer to the metro core, but it also removes the pressure to rush into an unnecessarily fast decision.",

      "Without an actual foreclosure notice or a hard estate deadline already in motion, an owner in Boonville is usually better off listing through a realtor and accepting the longer timeline this market genuinely requires, rather than assuming a fast cash sale is the only realistic option this far from the metro core.",

      "The situations where a cash sale actually fits Boonville are specific ones: an estate that has to close by a set date, a house whose repair needs push it outside what a conventional lender in a market this size will finance, or an owner already late on payments with a trustee's-sale notice on the way.",

      "[MO] None of the above is legal advice, and a small-county foreclosure notice, tax bill, or probate filing touching a Boonville property deserves a Missouri attorney's own review of the actual paperwork rather than a general description of statewide rules.",
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
      citations["mo-seller-disclosure-solid-waste"],
    ],
  },

  "sell-my-house-fast-basehor-ks": {
    slug: "sell-my-house-fast-basehor-ks",
    body: [
      "Basehor is a Leavenworth County city of roughly 7,719 people about 18.9 miles from the metro's core, sitting along the K-7 highway corridor connecting the Kansas City core to Leavenworth and Fort Leavenworth farther north. Basehor-Linwood USD 458 has grown alongside the city itself, and new subdivision construction along K-7 has made this one of the faster-growing small cities in this county over the past decade.",

      "[KS] Basehor sits entirely inside Leavenworth County, Kansas, so this K-7 corridor city runs on the identical statewide rulebook as Leavenworth, Lansing, and Tonganoxie -- a judicial foreclosure requirement, an uncapped homestead exemption, and the same tax-sale mechanics reaching every single one of them -- this corridor's own faster growth pace notwithstanding.",

      "[KS] K.S.A. 60-2410 is the reason no trustee in Basehor can sell a defaulted property on their own signature the way one could just across the state line -- a lender has to sue first, and only after winning a judgment does K.S.A. 60-2415 let a sheriff's sale proceed, subject to the district court's own confirmation.",

      "[KS] A confirmed sheriff's sale in Basehor starts K.S.A. 60-2414's own countdown -- ordinarily twelve months for the owner to redeem, compressed to three months if the default came early against a loan still owing most of its balance, though that shorter window reopens to the full year whenever the total liens outstanding fall under a third of the property's own value.",

      "[KS] Nothing about Basehor's own K-7 growth changes Kansas's homestead protection -- Kan. Const. Art. 15 Section 9, backed by K.S.A. 60-2301, exempts a qualifying homestead from an unsecured creditor's judgment altogether, without any ceiling on how much that home is actually worth.",

      "[KS] Leavenworth County must hold a Basehor property it bids off at a tax sale for two years before pursuing any further sale, three years if the parcel qualifies as a homestead -- that's K.S.A. 79-2401a's own rule -- and K.S.A. 79-2803 then cuts off redemption entirely the moment that further sale is actually held.",

      "[KS] Newer construction along K-7 pushes up the market-value estimate a Basehor parcel carries, but the 11.5% figure Article 11, Section 1 of the Kansas Constitution applies to that estimate never moves -- the same residential ratio reaches an older Basehor lot and a brand-new one alike.",

      "A Basehor seller looking for county-level depth beyond this summary can find it on this site's Leavenworth County page, which walks through how the same exemption, holding period, and courthouse process reach Lansing, Leavenworth, and Tonganoxie too.",

      "[KS] Closing on a Basehor purchase, new-construction subdivision or older resale alike, involves none of the old Kansas mortgage-registration tax -- lawmakers repealed the statute behind it, K.S.A. 79-3102, statewide effective January 1, 2019.",

      "[KS] A Basehor estate's own path through probate is a Kansas judge's decision under K.S.A. 59-3202, not something the family gets to pick on its own -- the estate's size, whether its heirs actually get along, its solvency, and the likely expense of a fuller administration all shape whether it ends up simplified or supervised.",

      "Basehor's own growth is tied to a different commute pattern than Leavenworth's or Lansing's own institutional economies -- a newer Basehor resident is more often commuting into the Kansas City core itself along K-7 and I-70 than working at Fort Leavenworth or the correctional facility that shapes those two cities' own labor markets. That commute pattern has drawn a younger, family-oriented buyer pool into Basehor's own newer subdivisions over the past decade, a genuinely different demographic mix than the older, more institutionally tied households found closer to Fort Leavenworth itself.",

      "[KS] Basehor's own recent subdivision boom carries a real closing-day consequence: K.S.A. 12-6a20 requires a seller to disclose any special assessment or improvement-district fee tied to that new construction, with a good-faith estimate standing in when the exact figure isn't set yet, and requires the buyer's own written acknowledgment before the sale closes.",

      "Tonganoxie, a similarly fast-growing Leavenworth County exurb a few miles west, has followed a different corridor -- U.S. 24/40 rather than K-7 -- and draws a somewhat different commuter than Basehor's own growth does, even though both answer to the identical Kansas statutes above. Leavenworth and Lansing, closer to the fort and the correctional facility, round out the rest of this county's four cities with an older, more established housing stock than either of the two exurbs shows.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Basehor. An owner in a newer subdivision with real equity and no urgent deadline is usually still better off listing conventionally, since the same growth fueling new construction along that K-7 corridor keeps demand for existing homes just as strong.",

      "A cash sale earns genuine consideration in Basehor for an older, pre-boom house carrying repair needs a conventional lender will not finance, or a property whose special-assessment paperwork has stalled a conventional closing -- not the default choice for a seller sitting on real, meaningful equity with no particular rush to close before any deadline arrives.",

      "[KS] None of this is legal advice. A Basehor homeowner facing a specific foreclosure summons, special-assessment question, or probate filing should talk to a Kansas attorney who can review the actual paperwork, not rely on a general city-level overview -- particularly where a newer subdivision's own paperwork has not yet caught up with how quickly the surrounding growth has moved.",
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
      citations["ks-seller-disclosure-special-assessment"],
    ],
  },

  "sell-my-house-fast-bonner-springs-ks": {
    slug: "sell-my-house-fast-bonner-springs-ks",
    body: [
      "Bonner Springs is a Wyandotte County city of roughly 7,621 people about 15.8 miles from the metro's core, sitting along the Kansas River where it carries a genuinely unusual distinction in this site's footprint: the city's own boundaries actually cross into three counties at once. The National Agricultural Center and Hall of Fame, a museum built around the history of American farming, sits inside city limits, and an outdoor amphitheater on the edge of town draws touring concert acts from across the region each summer.",

      "[KS] Most of Bonner Springs sits in Wyandotte County, Kansas, which is where this page's legal treatment is anchored -- but the city's own footprint reaches west into Leavenworth County and south into Johnson County, Kansas as well, a three-county straddle no other city in this site's entire footprint shares.",

      "The reason that straddle actually matters is a practical one: a specific Bonner Springs parcel's own courthouse and tax-sale treasurer depend on which of Wyandotte, Leavenworth, or Johnson County, Kansas that parcel happens to sit in, even though every one of the three applies the identical statewide Kansas statutes below to it.",

      "[KS] Whichever of the three counties actually handles a specific Bonner Springs parcel, the same judicial foreclosure process reaches it -- K.S.A. 60-2410 requires a lawsuit ending in a judgment, and K.S.A. 60-2415 requires the district court to confirm the sheriff's sale before a deed can issue.",

      "[KS] K.S.A. 60-2414 hands a Bonner Springs owner a year to redeem once the sheriff's sale is confirmed, not before -- a window Kansas trims to three months only for a borrower who defaulted early on a loan still mostly unpaid, and restores to the full twelve months whenever the property's combined liens stay under a third of its value.",

      "[KS] The homestead exemption applies to a Bonner Springs house the same way no matter which of the three counties holds its tax record -- K.S.A. 60-2301, grounded in Kan. Const. Art. 15 Section 9, puts a qualifying homestead beyond an unsecured creditor's reach entirely, with no dollar figure capping the protection.",

      "[KS] A delinquent-tax sale anywhere in Bonner Springs follows the same before-the-sale-only structure Kansas uses everywhere -- K.S.A. 79-2803 cuts off redemption the moment the sale itself happens, while K.S.A. 79-2401a still requires whichever county actually runs the sale to hold a bid-off property for two years, three when it qualifies as a homestead, before pursuing a further sale.",

      "[KS] Property in Bonner Springs carries the identical 11.5% residential assessment ratio Article 11, Section 1 of the Kansas Constitution sets statewide, regardless of which of the three counties' own assessors actually sets the underlying market-value estimate for a given parcel.",

      "This site's Wyandotte County page, its Johnson County, Kansas page, and its Leavenworth County page each cover the fuller countywide picture behind these figures from their own side of the line, rather than this summary repeating all three in full.",

      "[KS] A Kansas probate judge, applying K.S.A. 59-3202, is the one who actually decides whether a Bonner Springs estate gets the lighter simplified track or the fuller supervised one, regardless of which of the three counties happens to hold the property's own tax record.",

      "[KS] Financing a purchase anywhere in Bonner Springs no longer triggers the old Kansas mortgage-registration tax either -- K.S.A. 79-3102 was repealed statewide effective January 1, 2019, a repeal that reaches every Bonner Springs parcel regardless of which county's own recorder handles the deed.",

      "The National Agricultural Center and Hall of Fame and the amphitheater both draw visitors from well beyond Bonner Springs's own city limits, a fact about local tourism and events rather than about which of the three counties actually reaches a specific house sale nearby, notwithstanding how often a visitor asks which county the museum itself technically sits in.",

      "Kansas City, Kansas, the much larger city carrying the bulk of Wyandotte County's own population, sits closer to the urban core than Bonner Springs's own smaller, more small-town footprint, even though both answer to identical Wyandotte County-anchored statutes wherever a Bonner Springs parcel actually sits on that side of the line. Edwardsville, a smaller Wyandotte County city farther east along the same Kansas River corridor, shares Bonner Springs's own small-town scale without the added complexity of touching three separate counties at once.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Bonner Springs. An owner with real equity and no urgent deadline is usually still better off listing conventionally and confirming which of the three counties actually holds a specific parcel's own records, rather than assuming a fast, discounted sale is the only option this three-county straddle allows.",

      "A cash sale earns genuine consideration in Bonner Springs specifically when the three-county straddle has muddied a title enough that a conventional buyer's lender balks, or when an owner already faces a scheduled sheriff's sale with the clock running -- not as a default response to the city's own unusual boundary.",

      "[KS] None of this is legal advice. A Bonner Springs homeowner unsure which of the three counties actually handles a specific parcel should confirm that directly against a tax statement or plat map, and take any foreclosure or probate question to a Kansas attorney rather than relying on this overview -- a mistaken assumption about which county's own recorder holds a deed can delay a closing far longer than confirming it up front ever would.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-assessment-115"],
      citations["ks-probate-simplified"],
      citations["ks-mortgage-reg-tax"],
    ],
  },

  "sell-my-house-fast-fort-scott-ks": {
    slug: "sell-my-house-fast-fort-scott-ks",
    body: [
      "Fort Scott is the county seat of Bourbon County, roughly 7,565 people about 88.1 miles from the metro's core -- the most distant Kansas city in this batch, and the only one built around an actual 1840s U.S. Army post established to help keep peace along the frontier. Fort Scott National Historic Site, the restored fort itself, sits at the center of downtown, and the surrounding blocks carry some of the oldest housing stock anywhere in this site's footprint.",

      "[KS] Every part of Fort Scott sits in Kansas, inside Bourbon County, so a house sale in this historic fort town answers to Kansas's statewide statutes throughout -- but this is a genuinely smaller, thinner market than Johnson or Wyandotte County, with far fewer comparable recent sales to price a specific house against and a noticeably slower overall pace of turnover.",

      "[KS] Fort Scott offers no shortcut for a defaulting borrower's lender -- K.S.A. 60-2410 requires filing suit and winning a judgment before anything else can happen, and K.S.A. 60-2415 then requires a district judge's own confirmation of the sheriff's sale that follows, regardless of how far Fort Scott sits from the metro core.",

      "[KS] Redemption in Fort Scott does not begin until K.S.A. 60-2415's confirmation is entered -- from that point, K.S.A. 60-2414 gives the owner twelve months, shortened to three only where an early default struck a loan still heavily leveraged, and restored to a full year wherever total liens amount to less than a third of the property's value.",

      "[KS] Fort Scott's own distance from the metro core does nothing to weaken Kansas's homestead rule -- K.S.A. 60-2301 and Kan. Const. Art. 15 Section 9 together place a qualifying homestead entirely out of an unsecured creditor's hands, and the exemption carries no ceiling tied to the home's own value.",

      "[KS] Bourbon County follows Kansas's own two-step tax-sale process: K.S.A. 79-2401a forces the county to sit on a bid-off Fort Scott property for two years, three if it's a homestead, before any further sale, and once that further sale actually happens, K.S.A. 79-2803 closes the door on redemption for good.",

      "[KS] No dedicated Bourbon County hub page exists yet anywhere in this site's registry, so a seller in Fort Scott looking for county-level depth behind these figures should treat the statewide Kansas pages as the fuller reference for the time being.",

      "[KS] Distance from the metro core has no bearing on Fort Scott's own assessment math -- Article 11, Section 1 of the Kansas Constitution fixes residential property at 11.5% of value everywhere in the state, and only the county assessor's estimate of what a specific Fort Scott parcel is worth actually differs county to county.",

      "[KS] Given how much of Fort Scott's own housing predates modern construction, a seller should pay particular attention to Kansas's radon-disclosure rule -- K.S.A. 58-3078a requires disclosing any known elevated radon reading in writing, with the sale contract itself carrying the state's own required warning language, a genuinely more common issue in a century-old basement than in newer construction.",

      "[KS] Financing a purchase in Fort Scott no longer triggers Kansas's former mortgage-registration tax either -- K.S.A. 79-3102 was fully repealed statewide effective January 1, 2019.",

      "[KS] A Kansas probate judge, applying K.S.A. 59-3202, decides whether a Fort Scott estate gets the lighter simplified track or the fuller supervised one, weighing the estate's size, the heirs' own relationship, its solvency, and the likely cost of a fuller administration.",

      "Fort Scott National Historic Site itself draws a steady if modest stream of history-minded visitors each year, a fact about local tourism rather than about which statutes reach a house sale nearby -- and much of the housing surrounding the old fort predates the Civil War era the site itself commemorates. A handful of bed-and-breakfast conversions near the fort have found a niche market among those visitors, a modest but real commercial use for an older house that a purely residential block farther from the historic site does not share.",

      "Bourbon County's own remaining towns are considerably smaller than Fort Scott itself, leaving it as the only real commercial center for a genuinely rural stretch of southeast Kansas -- a concentration of buyer demand into one city that a county with several similarly sized towns would not show, though that concentration still translates into far fewer transactions in a typical month than a metro-area suburb would see.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Fort Scott. An owner of a well-kept historic home near the fort, with time and no pressing deadline, is usually still better off testing a normal listing first, since this fort town's own genuine architectural character continues to draw specific buyer interest a fast, discounted sale would not capture.",

      "A cash sale earns real consideration in Fort Scott for a house whose age has produced repair needs a conventional lender will not finance, an estate that needs to close before a fixed date, or an owner already facing a scheduled sheriff's sale with the clock already running -- not as the default answer for a seller with time and a marketable historic home.",

      "[KS] None of this is legal advice. A specific foreclosure judgment, radon disclosure, or probate question touching a house in Fort Scott deserves a Kansas attorney's own review of the actual paperwork, not a general city-level overview like the one above.",
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
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-cameron-mo": {
    slug: "sell-my-house-fast-cameron-mo",
    body: [
      "Cameron is a Clinton County city of roughly 7,324 people about 48.2 miles from the metro's core, built up around the junction of Interstate 35 and U.S. Highway 36 -- a crossroads position the city itself markets around, close enough to that junction that logistics and trucking employment shapes its economy in a way most other small cities in this footprint do not share. The Western Reception, Diagnostic and Correctional Center, a large state prison, also sits just outside city limits and ranks among the county's own largest employers.",

      "[MO] Most of Cameron sits in Clinton County, Missouri, which is where this page's legal treatment is anchored -- but a portion of the city's own footprint reaches west into DeKalb County as well, a distinction that decides which county courthouse and treasurer actually handle a specific parcel, even though Clinton and DeKalb Counties answer to the identical statewide Missouri statutes below.",

      "[MO] Whichever side of that county line a Cameron parcel sits on, the same trustee mechanism reaches it: RSMo 443.290 vests the power of sale in the trustee named on the deed of trust, and RSMo 443.327 lets that trustee use it without a lawsuit. Clinton County's own population, roughly 21,548, and DeKalb County's, roughly 9,899, both sit well under RSMo 443.320's 50,000-person line, so a Cameron trustee's sale runs on the shorter track -- four successive weekly newspaper notices, the last one no more than a week before the sale -- regardless of which county actually handles the filing.",

      "[MO] RSMo 443.410 and RSMo 443.420 make redemption the exception after a Cameron trustee's sale, not the default -- available only if the lender itself bought back the property, the former owner already put an intent to redeem in writing, and a bond covering the debt was filed within the twenty days that followed.",

      "[MO] The same two statewide numbers reach a Cameron sale as anywhere in Missouri: RSMo 513.475's $15,000 equity shield, rising to $40,000 in 2027, and RSMo 137.115's flat 19% assessment ratio, unaffected by which side of the Clinton-DeKalb County line a specific parcel sits on.",

      "[MO] A tax delinquency, rather than a mortgage default, routes a Cameron property through RSMo 140.340 instead -- a full year of unconditional redemption from the tax-sale date, and a weaker right that continues afterward until the purchaser actually secures the collector's deed.",

      "[MO] No dedicated hub page exists yet for either Clinton County or DeKalb County anywhere in this site's registry, so a Cameron seller wanting county-specific depth beyond this summary should rely on the statewide Missouri pages until that gap in the footprint closes.",

      "[MO] Signing a deed out of a Cameron estate takes Missouri probate's blessing first -- RSMo 473.780 lets the personal representative bypass most routine court sign-off only under independent administration, available when a will directly authorizes it or when the will permits it and every heir agrees to it; anything less puts the sale under supervised administration, with a judge reviewing each major step.",

      "[MO] No transfer tax touches a Cameron closing either -- Article X, Section 25 of the Missouri Constitution has barred one since Missouri voters adopted it in 2010, a rule that draws no distinction based on which county a specific parcel sits in.",

      "Cameron's own position at the I-35/US-36 junction has drawn warehousing, trucking, and light-manufacturing employment that a small city off the interstate rarely sees, a genuinely diversified economic base beyond the correctional center that gives Cameron's resale market a steadier floor than a purely agricultural Clinton County town might have.",

      "[MO] A Cameron seller who actually knows a specific parcel contains a permitted or unpermitted solid waste disposal site or demolition landfill owes RSMo 260.213's own written disclosure -- signed, dated, and delivered early in the negotiation -- spelling out the site's location and warning that the buyer could be assuming liability to the state for cleaning it up.",

      "Corrections-department employment at the nearby state prison often runs on transfer and shift-bid schedules rather than a hard relocation deadline, a real but secondary factor in how quickly some Cameron sellers need to close compared with an owner working the interstate-driven logistics economy described above, whose own schedule can shift with a single dispatcher's phone call.",

      "Plattsburg and Lathrop, both smaller Clinton County towns farther from the interstate junction, see far less of the truck-stop and warehouse-driven commerce that shapes Cameron's own economy today, even though the identical Missouri statutes above reach all three of these towns just the same.",

      "None of the above makes a fast cash sale the default answer for a seller in Cameron. An owner with no trustee's-sale notice already published and no fixed estate deadline is usually still better off listing conventionally, since the crossroads economy described above has kept steady demand for housing near the interstate.",

      "A cash sale earns real consideration in Cameron specifically for a house whose parcel straddles the Clinton-DeKalb County line and has picked up a title complication as a result, an estate needing to close on a fixed date, or a property carrying repair needs no conventional lender in a market this size will finance.",

      "[MO] None of this is legal advice. A Cameron homeowner unsure which county actually handles a specific parcel should confirm that directly with the Clinton County or DeKalb County recorder, and take any foreclosure or probate question to a Missouri attorney rather than rely on this general overview.",
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

  "sell-my-house-fast-roeland-park-ks": {
    slug: "sell-my-house-fast-roeland-park-ks",
    body: [
      "Roeland Park is one of the smallest cities by area in Johnson County, Kansas, roughly 6,712 people about 5.4 miles from the metro's core, entirely landlocked by Fairway, Mission, Overland Park, and Shawnee on every side. Barely three square miles in total, this inner-ring city built out almost entirely in the postwar decades of the mid-twentieth century, giving it an older, more uniform housing stock than the newer subdivisions found farther southwest in the same county.",

      "[KS] Every single acre of Roeland Park sits in Johnson County, Kansas -- not the differently named Johnson County, Missouri roughly 65 miles southeast, which this site instead treats on its Warrensburg page -- so Kansas law governs a house sale in this landlocked city in full, and no Missouri statute enters into it at any point.",

      "[KS] A defaulted Roeland Park mortgage cannot be foreclosed by a trustee acting alone the way a Missouri deed of trust would allow -- K.S.A. 60-2410 sends the lender to court for a judgment first, and K.S.A. 60-2415 puts the district court in charge of confirming whatever sheriff's sale results.",

      "[KS] Confirmation of the sheriff's sale is what starts the clock under K.S.A. 60-2414 for a Roeland Park owner -- twelve months ordinarily, three months if the default came early against a loan still mostly unpaid, with the full year reinstated whenever combined liens run under a third of the property's own market value.",

      "[KS] Roeland Park's own small footprint changes absolutely nothing about Kansas's homestead rule -- under K.S.A. 60-2301 and Kan. Const. Art. 15 Section 9, a qualifying homestead cannot be reached by an unsecured creditor's judgment at all, regardless of what the home itself happens to be worth today.",

      "[KS] A Roeland Park owner behind on property taxes rather than mortgage payments gets a genuinely long runway before losing the property for good -- K.S.A. 79-2401a keeps the county from pursuing a further sale on a bid-off parcel for two years, extended to three whenever a homestead is involved.",

      "[KS] This site's Johnson County, Kansas page covers the fuller countywide picture behind the exemption and the multi-year holding period, including how the same rules reach Merriam, Mission, and the rest of the closer-in cluster surrounding this small city.",

      "[KS] Article 11, Section 1 of the Kansas Constitution fixes every Roeland Park parcel's residential assessment at 11.5% of value, the identical ratio reaching a newer subdivision home farther southwest in the county -- only the county assessor's own underlying market-value figure actually differs from house to house, never that percentage.",

      "[KS] The old Kansas mortgage-registration tax simply no longer applies to a Roeland Park closing either -- K.S.A. 79-3102, the statute that once imposed it, was repealed statewide effective January 1, 2019.",

      "[KS] K.S.A. 59-3202 hands the simplified-or-supervised decision to a Kansas probate judge rather than to the family itself -- factoring in a Roeland Park estate's own size, how cooperative the heirs actually are, whether the estate can cover what it owes, and the likely cost of running a fuller administration.",

      "[KS] Given how much of Roeland Park's own housing predates the newer construction found farther southwest in Johnson County, Kansas, a seller working with an agent should know Kansas puts the burden of catching a known defect on the licensee handling the sale, not the seller personally -- K.S.A. 58-30,106 requires that licensee to flag adverse facts actually known to a buyer who counts only as a customer, physical condition and title problems included.",

      "Fairway, Mission, Overland Park, and Shawnee border Roeland Park on every single side, leaving almost no room left to grow outward -- a genuine ceiling on future development that a still-expanding Johnson County, Kansas suburb farther out does not face. What growth it has seen instead has come from redeveloping existing lots rather than annexing new land, a slower and more incremental pattern than the large-scale subdivision construction found in a newer part of the county, and one that has kept Roeland Park's own street grid largely unchanged for decades even as the surrounding suburbs have continued expanding around it.",

      "Merriam and Mission, both nearby in the same closer-in cluster of older Johnson County, Kansas cities, share Roeland Park's own postwar-built character and small footprint, a genuinely different pattern of age and scale from Overland Park's or Olathe's own considerably newer growth farther out in the same county's own southwestern reaches.",

      "None of the above makes a fast cash sale the default answer for a seller in Roeland Park. An owner of an older, well-kept house in Roeland Park with real equity and no urgent deadline is usually still better off listing conventionally instead, since its own small, landlocked footprint has not stopped it from drawing steady buyer interest from people specifically looking for its closer-in location and its own shorter commute into the metro core.",

      "A cash sale earns genuine consideration in Roeland Park for an older house carrying real deferred maintenance a conventional lender will not finance, or an estate racing against a fixed closing deadline -- not as the first move for an owner with plenty of time on their side and no such pressure.",

      "[KS] None of this is legal advice. A specific foreclosure judgment, tax-sale timeline, or probate filing touching a Roeland Park house calls for a Kansas attorney's own look at the actual paperwork, not a general city-level summary like the one above.",
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

  "sell-my-house-fast-de-soto-ks": {
    slug: "sell-my-house-fast-de-soto-ks",
    body: [
      "De Soto sits at the far western edge of Johnson County, Kansas, roughly 6,539 people about 21.8 miles from the metro's core, on a stretch of the former Sunflower Army Ammunition Plant site that Panasonic has since begun redeveloping into a large electric-vehicle battery plant -- one of the biggest single construction projects anywhere in this site's footprint, and a genuine driver of new housing demand in a city that had grown slowly for decades before it was announced.",

      "[KS] De Soto sits entirely within Johnson County, Kansas, a different place altogether from Johnson County, Missouri roughly 65 miles to the southeast -- this site treats that Missouri county on its own Warrensburg page -- so a house sale in De Soto answers to Kansas law from start to finish, with no Missouri statute entering the picture at all.",

      "[KS] Foreclosing a defaulted De Soto mortgage always means going through the courthouse, never around it -- K.S.A. 60-2410 requires the lender to win a lawsuit first, and K.S.A. 60-2415 requires a district judge to confirm the resulting sheriff's sale before title can transfer.",

      "[KS] K.S.A. 60-2414's own redemption period does not begin for a De Soto owner until the sheriff's sale is actually confirmed -- twelve months as the general rule, cut to three for an early default on a heavily leveraged loan, and restored to a full twelve whenever total liens stay below a third of the property's value.",

      "[KS] The Panasonic-driven growth reshaping De Soto has no bearing on Kansas's own homestead exemption -- K.S.A. 60-2301, paired with Kan. Const. Art. 15 Section 9, removes a qualifying homestead from an unsecured creditor's reach without capping that protection at any particular dollar figure.",

      "[KS] K.S.A. 79-2401a gives this county its own multi-year holding period on a De Soto property it bids off at a tax foreclosure sale -- two years generally, three for a qualifying homestead -- while K.S.A. 79-2803 shuts off redemption completely once that sale is actually held.",

      "[KS] This site's Johnson County, Kansas page covers the fuller countywide picture behind these figures, including how the same uncapped exemption and holding period reach Gardner and Edgerton nearer De Soto's own far-western edge.",

      "[KS] Property in De Soto carries the identical 11.5% residential assessment ratio Article 11, Section 1 of the Kansas Constitution sets statewide -- the Panasonic project's own construction activity changes the underlying market-value estimate an assessor sets for nearby parcels over time, never that fixed percentage itself.",

      "[KS] The Panasonic project's own scale has brought new roads, utilities, and infrastructure to De Soto's own growth areas, and Kansas law does not let a seller stay quiet about the cost of that: K.S.A. 12-6a20 requires disclosing any special assessment or improvement-district fee to a buyer, with a good-faith estimate standing in when the final figure isn't set yet, and the buyer's own written acknowledgment before closing.",

      "[KS] De Soto financing also comes entirely free of the old Kansas mortgage-registration tax -- lawmakers retired that statute, K.S.A. 79-3102, for good, effective January 1, 2019.",

      "[KS] Whether a De Soto estate proceeds as simplified or fully supervised is a Kansas judge's own call under K.S.A. 59-3202, weighing the estate's size, how well its heirs get along, its solvency, and what a fuller administration would likely cost.",

      "The Panasonic plant's own construction workforce has already pushed rental demand and new-home construction in De Soto well above what De Soto's own historically modest growth rate would predict, a genuinely different driver than the university- or interstate-driven growth found in other cities in this footprint. Local reporting on the project has described thousands of construction jobs at the site's peak build-out, a scale of activity that has drawn short-term workers into the local rental market well beyond what a city this size would otherwise support.",

      "Gardner and Edgerton, De Soto's own nearer neighbors at the western edge of Johnson County, Kansas, have seen a smaller version of the same construction-driven growth, while Overland Park and Olathe closer to the built-up core carry a far older, more established housing stock than any of the three. The Sunflower site's own decades as a federal ammunition plant left behind an environmental cleanup history a buyer's lender sometimes asks about directly, separate from anything the statutes above require a seller to volunteer -- an older parcel near the plant's own former boundary can carry a genuinely different due-diligence timeline than a newer subdivision lot built well clear of that history.",

      "None of the above makes a fast cash sale the obvious answer for a seller in De Soto. An owner with real equity and no urgent deadline is usually still better off listing conventionally, since the same Panasonic-driven construction boom happening nearby keeps interest in existing homes just as strong too.",

      "A cash sale still earns genuine consideration in De Soto for a thin-equity owner once a mortgage and any liens are counted, or a property whose special-assessment status has complicated a conventional buyer's own financing -- not the default choice for a seller with real equity to spare and no particular reason to rush.",

      "[KS] None of this is legal advice. A De Soto homeowner unsure whether a specific parcel carries a special assessment, or facing a foreclosure judgment or probate question, should talk to a Kansas attorney who can review the actual paperwork rather than rely on a general overview like this one.",
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
      citations["ks-seller-disclosure-special-assessment"],
    ],
  },

  "sell-my-house-fast-eudora-ks": {
    slug: "sell-my-house-fast-eudora-ks",
    body: [
      "Eudora sits along the Kansas River between Lawrence and De Soto, roughly 6,466 people about 29.9 miles from the metro's core, in Douglas County. The city's own name honors Eudora Young Barker, a Shawnee woman on whose land the original townsite was platted in the 1850s, and Eudora's own housing stock today is overwhelmingly owner-occupied rather than the rental-heavy mix found closer to the University of Kansas.",

      "[KS] Every single part of Eudora sits in Kansas, inside Douglas County, so a house sale in this river town answers to the same statewide Kansas statutes reaching Lawrence and Baldwin City alongside it -- judicial foreclosure, an uncapped homestead exemption, and a fixed statewide assessment ratio, none of which bends for Eudora's own smaller, more residential character.",

      "[KS] There is simply no private, out-of-court foreclosure option for a Eudora mortgage -- K.S.A. 60-2410 forces the lender into a lawsuit that ends in a judgment, and only after K.S.A. 60-2415's district-court confirmation of the sheriff's sale does a buyer actually take title.",

      "[KS] A Eudora owner's right to redeem under K.S.A. 60-2414 runs from the date of confirmation, not the sale itself -- twelve months in the ordinary case, three months only where an early default hit a loan still owing most of what was borrowed, and back to twelve whenever the property's combined liens fall under a third of its value.",

      "[KS] Because Eudora's own housing stock leans so heavily owner-occupied rather than rented out, Kansas's homestead rule reaches more of Eudora's own houses in practice than it reaches in Lawrence's rental-heavy market a few miles east -- K.S.A. 60-2301 and Kan. Const. Art. 15 Section 9 put a qualifying homestead beyond any unsecured creditor's judgment, with the exemption's protection carrying no dollar ceiling, though it belongs to the resident owner rather than a landlord.",

      "[KS] A delinquent-tax sale in Douglas County holds a bid-off Eudora property for a full two years before the county even pursues a further sale, three years when the property actually qualifies as a homestead, all under K.S.A. 79-2401a.",

      "This site's Douglas County page covers the fuller countywide picture behind these figures, including how Lawrence's own university-driven rental market changes the practical reach of the homestead exemption there in a way Eudora's more conventional ownership pattern does not share.",

      "[KS] Property in Eudora carries the identical 11.5% residential assessment ratio Article 11, Section 1 of the Kansas Constitution sets statewide, applied to whatever market-value estimate the county's own assessor sets for a specific parcel.",

      "[KS] A Eudora buyer's own closing statement carries no line item for the former Kansas mortgage-registration tax either, since K.S.A. 79-3102 went off the books statewide on January 1, 2019.",

      "[KS] K.S.A. 59-3202 leaves the simplified-versus-supervised choice for a Eudora estate to a Kansas probate court, not to the family -- the estate's size, the heirs' cooperation, solvency, and the probable cost of administering it all factor into that decision.",

      "[KS] A Eudora seller's own agent, not the seller, carries Kansas's broader duty to catch a known defect -- K.S.A. 58-30,106 obligates a licensee representing the seller to tell a customer-buyer about adverse material facts actually known, from title issues to the property's physical condition.",

      "Sitting on the Kansas River between Lawrence and De Soto gives Eudora a genuinely different position than either of its larger neighbors -- close enough to commute to the university town's own job market, but far enough to keep a smaller, quieter, more conventional residential character than Lawrence's own academic-calendar-driven turnover. The De Soto side of that positioning has taken on new weight as the Panasonic battery plant's own construction workforce has spread rental demand outward along the river corridor, giving Eudora a second commute option beyond Lawrence that it did not have as recently as a few years ago.",

      "Baldwin City, the third of Douglas County's three incorporated cities, sits farther south and carries its own small-college character built around Baker University, a genuinely different draw than either Lawrence's larger university or Eudora's own purely residential market. All three cities answer to the identical Douglas County-anchored statutes above, but a homeowner comparing Eudora's own market against either neighbor should expect a genuinely different buyer profile in each: a Lawrence sale competes against a large, rotating pool of student and staff renters converting to ownership, a Baldwin City sale draws from a smaller pool tied to Baker University's own faculty and staff, and a Eudora sale draws overwhelmingly from families and commuters looking for an established, owner-occupied neighborhood rather than anything tied to either college.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Eudora. An owner-occupied home in genuinely good condition with no urgent deadline is usually still better off listed conventionally, since Eudora's own steady, owner-occupied character has kept demand for existing homes reasonably consistent over time.",

      "A cash sale earns genuine consideration in Eudora for a house carrying real repair needs a conventional lender will not finance, or for an estate that needs an uncomplicated and genuinely fast close -- not as the default answer for an owner-occupant with equity and time to spare.",

      "[KS] None of this is legal advice. A Eudora homeowner facing a foreclosure judgment, a tax-sale question, or a probate filing should talk to a Kansas attorney who can review the actual paperwork directly, not rely on a general city-level overview like this one.",
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

  "sell-my-house-fast-greenwood-mo": {
    slug: "sell-my-house-fast-greenwood-mo",
    body: [
      "Greenwood is a small Jackson County city of roughly 6,123 people about 22.1 miles from the metro's core, sitting along U.S. Highway 50 between Lee's Summit and the Cass County line, bordering Lake Winnebago's own small residential footprint to the south. Far smaller than Lee's Summit or Blue Springs closer to the built-up core of the county, Greenwood has grown gradually as a quiet commuter town rather than through the large-scale subdivision development found elsewhere in eastern Jackson County.",

      "[MO] Every acre of Greenwood sits in Jackson County, Missouri, so it follows the same statewide rules reaching Kansas City, Lee's Summit, and every other city in this county -- Missouri law throughout, with Greenwood's own small size changing nothing about which statutes apply.",

      "[MO] A Greenwood homeowner whose own 2023 or 2024 valuation jumped sharply is part of the same dispute touching every Jackson County parcel -- the State Tax Commission's own order found the county's reassessment skipped required notice and physical inspections, the county challenged that finding in court, and the Missouri Court of Appeals let the Commission's enforcement suit proceed this past December without resolving whose numbers were actually correct. A Greenwood owner disputing a specific figure has an active process to raise with the assessor, not a settled outcome either way, and this site's Jackson County page covers that dispute at length.",

      "[MO] Missing a mortgage payment on a Greenwood house triggers the same trustee mechanism every Jackson County property answers to -- RSMo 443.290 gives a named trustee the power of sale, and RSMo 443.327 lets that trustee exercise it directly, with Jackson County's own population clearing RSMo 443.320's 50,000-person line by a wide margin, so notice ahead of a Greenwood sale runs the full twenty daily-newspaper insertions.",

      "[MO] Three separate conditions, not one, decide whether a Greenwood trustee's sale can be undone under RSMo 443.410 and RSMo 443.420: the lender itself has to be the one who ends up owning the property, the borrower has to have already filed a written intent to redeem, and a bond for the full debt has to go up inside twenty days of the sale date.",

      "[MO] The same statewide dollar figures reach a Greenwood sale as anywhere else in Missouri -- $15,000 of equity shielded from an unsecured judgment under RSMo 513.475 today, rising to $40,000 in 2027, and RSMo 137.115's flat 19% residential assessment ratio, a rate Greenwood's own small size does nothing to change.",

      "[MO] Falling behind on property taxes, as distinct from a mortgage, sends a Greenwood parcel through RSMo 140.340 instead -- a full year of unconditional redemption from the tax-sale date, and a weaker right that lingers afterward until the purchaser actually collects the collector's deed.",

      "This site's Jackson County page covers the fuller countywide detail behind these figures, including how the same rules and the same reassessment dispute reach Lee's Summit, Blue Springs, and Oak Grove alongside Greenwood.",

      "[MO] Missouri probate decides who can actually put pen to paper on a Greenwood deed before a sale closes -- under RSMo 473.780, independent administration frees a personal representative from most ongoing court oversight, but only if a will calls for it outright or allows it once every heir consents; short of that, supervised administration takes over and a judge signs off on the sale itself.",

      "[MO] No transfer tax attaches to a Greenwood closing either, courtesy of Article X, Section 25 of the Missouri Constitution -- a rule Missouri voters wrote into the constitution in 2010, reaching this small city with the same force it reaches Kansas City itself.",

      "Lake Winnebago, a small, separately incorporated lake community bordering Greenwood to the south, draws a different kind of buyer than Greenwood's own more conventional street-grid neighborhoods -- private lake access rather than an ordinary residential lot, a distinction in local character rather than in which statutes reach either city.",

      "[MO] RSMo 260.213 puts a real burden on a Greenwood seller who actually knows a parcel houses a solid waste disposal site or a demolition landfill, permitted or not -- a written notice, signed and dated, has to reach the buyer early in the negotiation, spelling out the site's location and flagging the possibility that the buyer could inherit liability to the state for cleaning it up.",

      "Lee's Summit, immediately north along the same U.S. 50 corridor, carries a far larger and more active resale market than Greenwood's own smaller, quieter footprint -- a difference in scale within the same county, not in which statutes reach either city.",

      "None of the above makes a fast cash sale the default answer for a seller in Greenwood. An owner with no trustee's-sale notice already published and no fixed estate deadline is usually still better off listing conventionally, since this small city's own steady commuter demand has kept a well-priced house moving even without Lee's Summit's own larger buyer pool.",

      "A cash sale earns real consideration in Greenwood for a house carrying repair needs a conventional lender will not finance, an estate needing to close on a fixed date, or an owner already behind on payments with a trustee's-sale notice approaching -- not as the first move for a seller with time and a marketable house.",

      "[MO] None of this is legal advice. A Greenwood homeowner disputing a specific assessment, facing a foreclosure notice, or settling an estate should talk to a Missouri attorney who can review the actual paperwork rather than rely on a general city-level summary.",
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
      citations["mo-seller-disclosure-solid-waste"],
      citations["jackson-county-reassessment"],
    ],
  },

  "sell-my-house-fast-tonganoxie-ks": {
    slug: "sell-my-house-fast-tonganoxie-ks",
    body: [
      "Tonganoxie is a Leavenworth County city of roughly 6,102 people about 26.8 miles from the metro's core, its own name honoring Chief Tonganoxie, a 19th-century Delaware (Lenape) leader whose people were relocated to this part of Kansas before the city was platted around the rail line that later became the U.S. 24/40 corridor. Newer subdivision growth along that corridor has made Tonganoxie one of the faster-growing small cities in this county over the past decade, a pace of change the city's own downtown core, still centered on a handful of blocks near the old rail depot, has absorbed without losing much of its original small-town layout.",

      "[KS] Tonganoxie sits entirely inside Leavenworth County, Kansas, so its own house sales run on Kansas's statewide rulebook from start to finish -- a judicial foreclosure requirement, an uncapped homestead protection, and the same tax-sale mechanics that also govern Leavenworth, Lansing, and Basehor.",

      "[KS] Kansas routes every single Tonganoxie foreclosure through the same courthouse door -- K.S.A. 60-2410 requires a judgment before a sheriff's sale can happen at all, and K.S.A. 60-2415 requires a district judge to sign off on that sale before it becomes final.",

      "[KS] Once K.S.A. 60-2415's own confirmation lands, K.S.A. 60-2414 opens a redemption window for a Tonganoxie owner -- twelve months by default, three months if the default arrived early against a loan still carrying most of its balance, and a full twelve months again whenever total liens sit under a third of the property's own value.",

      "[KS] Kansas draws no meaningful distinction between a Tonganoxie homestead and one anywhere else in the state -- Kan. Const. Art. 15 Section 9 together with K.S.A. 60-2301 takes a qualifying homestead off the table for an unsecured creditor's judgment entirely, and does so without ever capping the exemption to a specific dollar amount.",

      "[KS] Tonganoxie's own tax-foreclosed parcels sit under county ownership for two full years before Leavenworth County can pursue a further sale, three years if the parcel is a homestead, under K.S.A. 79-2401a -- and K.S.A. 79-2803 then closes off redemption completely the instant that further sale actually takes place, a sharper cutoff than the twelve-month window a mortgage foreclosure allows.",

      "This site's Leavenworth County page covers the fuller countywide picture behind these figures, including how the same uncapped exemption and multi-year holding period reach Basehor, Lansing, and Leavenworth alongside Tonganoxie.",

      "[KS] A house built decades ago in Tonganoxie and a newer home finished last year along the U.S. 24/40 corridor pay the identical 11.5% rate Article 11, Section 1 of the Kansas Constitution sets for residential property statewide -- new construction changes what the county assessor thinks a parcel is worth, not the percentage applied to that number.",

      "[KS] The old Kansas mortgage-registration tax simply hasn't applied to a Tonganoxie closing since lawmakers repealed K.S.A. 79-3102 outright, effective January 1, 2019.",

      "[KS] A Kansas probate court, not the heirs themselves, decides under K.S.A. 59-3202 whether a Tonganoxie estate qualifies for the lighter simplified track or needs a fuller supervision, weighing its size, the heirs' relationship, solvency, and likely administration costs.",

      "Tonganoxie's own growth has followed the U.S. 24/40 corridor rather than the K-7 highway Basehor's own newer subdivisions have grown along a few miles east -- a different commuter draw between the two fast-growing Leavenworth County exurbs, even though both answer to identical Kansas statutes. A Tonganoxie commuter is somewhat more likely to be heading toward Lawrence or Topeka along that corridor than toward the Kansas City core directly, a distinction that shapes which direction a specific buyer's own daily drive actually runs.",

      "[KS] The duty to flag a known material defect in a Tonganoxie sale falls squarely on the licensee representing the seller under Kansas law, not on the seller directly -- K.S.A. 58-30,106 requires disclosing adverse facts actually known to a buyer who is merely a customer, title problems and physical condition alike.",

      "Tonganoxie Days, an annual community festival held downtown each fall, draws visitors from across the county, a fact about local events rather than about which statutes reach a house sale elsewhere in the city. The festival itself grew out of the city's own Delaware Township roots, and the surrounding farmland that once supplied a much smaller nineteenth-century settlement has, over the past two decades, given way to the same kind of subdivision growth reshaping Basehor a few miles east -- a pattern common to both exurbs even though each city's own downtown retains a genuinely separate identity built around its own rail-era main street.",

      "None of the above makes a fast cash sale the obvious answer for a seller in Tonganoxie. An owner sitting on real equity in a newer subdivision, with no urgent deadline pressing, is usually still better off going the conventional-listing route, since the U.S. 24/40 corridor's own growth has kept demand for existing homes just as strong as it has for new construction.",

      "A cash sale earns genuine consideration in Tonganoxie for an older, pre-growth house carrying real repair needs a conventional lender will not finance, or an estate that genuinely cannot wait out a normal listing timeline -- not the default choice for a seller with equity and no fixed deadline in sight.",

      "[KS] None of this is legal advice. A Tonganoxie homeowner facing a specific foreclosure summons or probate filing should talk to a Kansas attorney who can review the actual paperwork directly, not rely on a general city-level overview like this one.",
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
      citations["ks-broker-disclosure-duty"],
    ],
  },
};
