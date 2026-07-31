import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * Wave 0B (counties 9-20) -- twelve more county hub pages, all of them
 * smaller and farther out than the eight metro counties in
 * `county-content-metro.ts`. Same rules as every content map before this
 * one: every paragraph asserting law carries `[MO]` or `[KS]`, every legal
 * assertion traces to an entry in `citations` rather than being retyped, and
 * no deictic stand-in for a named state appears anywhere. See
 * docs/CITATION-LEDGER.md for what backs every citation used below.
 *
 * A genuinely different fact belongs on a smaller county's page than on a
 * metro county's: a market with a few thousand people has far fewer
 * comparable sales than Jackson or Johnson County, Kansas does, and that
 * scarcity is a real, useful fact for a seller rather than something to
 * paper over with a template. Two counties below happen to share a name
 * with a much larger county elsewhere in this footprint or in the country --
 * Johnson County, Missouri (Warrensburg, roughly 55,000 people) is not
 * Johnson County, Kansas (Overland Park, roughly 622,000 people, already
 * published), and Miami County, Kansas is not the better-known Miami County
 * in Ohio or Miami-Dade County in Florida. Both pages below say so
 * explicitly, because this exact confusion already produced a live factual
 * error elsewhere on this site (see docs/WAVE-0B-PREREQUISITES.md, the
 * Shawnee/Wyandotte county-assignment correction).
 */
export const countyContentOuter: Record<string, PageContent> = {
  "sell-my-house-fast-leavenworth-county-ks": {
    slug: "sell-my-house-fast-leavenworth-county-ks",
    body: [
      "Leavenworth County is the largest of the twelve counties on this page, roughly 83,518 people across four cities -- Leavenworth, Lansing, Basehor, and Tonganoxie -- about 25 miles from the Kansas City core. Fort Leavenworth, one of the oldest continuously operating Army posts west of the Mississippi and home to the Army's Command and General Staff College, sits inside this county, and the federal penitentiary that shares the city of Leavenworth's name sits nearby as well.",

      "[KS] All four cities sit in Kansas, so a homeowner selling anywhere in this county works under the same statewide Kansas rules covered on this site's Kansas hub page -- a judicial foreclosure process rather than a Missouri-style trustee's sale, a redemption right measured in months rather than a set dollar figure, and a homestead exemption capped by category, not by value.",

      "[KS] A missed mortgage payment in this county leads to a lawsuit, not a private sale: K.S.A. 60-2410 requires a judgment before a sheriff can sell the property under execution, and K.S.A. 60-2415 requires the district court to confirm that sale before a deed passes to the buyer. Nobody named in a Kansas deed of trust in this county has the power to sell the house directly the way a trustee could under a Missouri deed of trust.",

      "[KS] Once that sale is confirmed, K.S.A. 60-2414 still gives the owner a right to redeem -- twelve months as the default figure, narrowed to three months only for an owner who defaulted early with less than a third of the original debt paid down, and restored to the full year whenever total liens against the property stay under a third of its market value regardless of how soon the default came.",

      "[KS] Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 protect a qualifying homestead in this county the same way they do anywhere in Kansas -- no dollar ceiling at all, only a description of what counts: a manufactured home, one acre inside an incorporated city, or up to 160 acres of farmland. Article 11, Section 1 of the Kansas Constitution then assesses an ordinary residential property in this county at 11.5% of its market value, the identical ratio applied statewide.",

      "A permanent-change-of-station order is a genuine reason a homeowner in this county needs to sell faster than a normal listing allows, in a way that comes up far less often in a county without a major military post. An order with a fixed report date does not wait for a house to sell at full market value, and that timeline pressure, not anything about the property itself, is frequently what actually drives a fast sale near Fort Leavenworth.",

      "[KS] A service member's estate, or a retiree's, still has to clear the same Kansas probate test as any other estate in this county: under K.S.A. 59-3202, a Kansas court decides for itself whether an estate in this county proceeds as simplified or supervised, looking at how large it is, whether the heirs actually agree, whether it is solvent, and roughly what settling it is likely to cost. A frequent-mover's estate, split among heirs who no longer live near this county, tends to take longer to resolve than a straightforward local one.",

      "The four cities in this county are not one market. Leavenworth itself, the county seat, carries the fort, the penitentiary, and the largest share of the county's population and its older housing stock; Lansing sits just south of it, closely tied to the same institutions; Basehor and Tonganoxie, both smaller and farther from the fort, have grown as bedroom communities for commuters into the Kansas City core, with newer construction and a different buyer pool than Leavenworth's own older neighborhoods.",

      "Fort Leavenworth itself is a federal military reservation, and property inside its own boundaries is not sold on the open market the way a house in Leavenworth, Lansing, Basehor, or Tonganoxie is. A homeowner selling in this county is almost always selling property off-post, in one of the four incorporated cities above, where ordinary Kansas civil law -- not federal military jurisdiction -- governs the sale from start to finish.",

      "Basehor and Tonganoxie have grown briskly as commuter suburbs in recent years, and that growth shows up in a rising market-value estimate under the county assessor's own numbers, not in the 11.5% ratio itself. A newer subdivision home in either city is likely to see its assessed value climb faster than an older home in Leavenworth or Lansing, even though Article 11, Section 1 of the Kansas Constitution taxes both at the identical percentage.",

      "At roughly 83,518 people, this county's housing market looks more like the outer edge of the metro core than like the smaller, more rural counties elsewhere in this batch -- Leavenworth clears the population figures of some metro counties covered elsewhere on this site, even though it sits farther out and carries a distinct military economy those counties do not share.",

      "Time and equity, not urgency, are what most sellers in this county actually have -- which is why a conventional listing usually serves them better than a fast cash sale would. An owner with no fixed deadline and real equity in a Leavenworth, Lansing, Basehor, or Tonganoxie home is still generally better off listing conventionally; a cash sale earns real consideration mainly when a PCS order, a distant heir settling an estate, or a property needing repairs a conventional lender will not finance makes a normal listing timeline genuinely unworkable.",

      "[KS] None of this is legal advice. A Leavenworth County homeowner facing a foreclosure summons, a PCS deadline, or a probate question involving out-of-state heirs should talk to a Kansas attorney who can look at the actual paperwork, not rely on a general county overview like this one.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-probate-simplified"],
    ],
  },

  "sell-my-house-fast-buchanan-county-mo": {
    slug: "sell-my-house-fast-buchanan-county-mo",
    body: [
      "Buchanan County is anchored almost entirely by a single city: St. Joseph, roughly 70,634 of this county's total 82,956 people, sitting on the Missouri River about 41 miles north of the Kansas City core. St. Joseph is an old river city in the literal sense -- its housing stock dates back further, on average, than the newer subdivision growth found in the faster-growing counties south of the metro core.",

      "[MO] St. Joseph and the rest of Buchanan County sit in Missouri, so a homeowner selling in this county follows the same statewide rules as the larger Missouri counties closer to Kansas City -- a trustee-driven foreclosure rather than a lawsuit, a fixed dollar homestead exemption, and a flat statewide assessment ratio -- despite this county's own population and river-town character looking nothing like Jackson or Clay County.",

      "[MO] Missouri does not require a foreclosing lender to sue anyone: RSMo 443.290 lets a deed of trust name a trustee with the power of sale, and RSMo 443.327 lets that trustee sell the property once the borrower defaults, without a judge ever reviewing the file. RSMo 443.320 then sets how long notice of that sale has to run before it happens, and the length depends on the county's population.",

      "[MO] At roughly 82,956 people, Buchanan County clears the 50,000-population line RSMo 443.320 sets, so a trustee's sale in this county runs on the slower twenty-insertion daily-newspaper schedule -- the same schedule the larger metro counties use, not the four-week weekly schedule several of the smaller counties in this batch fall under.",

      "[MO] Redemption after a Buchanan County trustee's sale is not automatic: RSMo 443.410 and RSMo 443.420 grant it only if the lender itself purchases the property at the sale, the borrower delivers written notice of an intent to redeem no later than the sale itself, a surety bond for the full debt goes up inside twenty days of the sale, and the actual redemption happens before the one-year mark passes.",

      "[MO] The same statewide dollar figures apply to a Buchanan County home as anywhere else in Missouri: RSMo 513.475 protects $15,000 of home equity from an unsecured creditor's judgment today, rising to $40,000 on January 1, 2027 under a law already signed, and RSMo 137.115 assesses an ordinary residential parcel in this county, as everywhere in the state, at 19% of its market value.",

      "[MO] St. Joseph's older housing stock raises a disclosure question a newer subdivision rarely has to answer. RSMo 442.606 requires a Missouri seller who knows a property was used to produce methamphetamine to disclose that fact in writing, and to separately disclose if the property was the home, storage site, or lab of someone convicted of a related crime the seller knew or should have known about -- a real question for an older river-town property with a history that predates its current owner, in a way it rarely is for a house built in the last decade.",

      "St. Joseph itself carries a genuinely different market from the rest of the county: a historic downtown, older residential neighborhoods with houses built well before most of the newer construction found south of Kansas City, and a resale pace shaped by an economy less tied to the metro core's own growth than counties directly bordering Jackson or Clay County. A homeowner outside St. Joseph, in the county's smaller unincorporated areas, is working from an even thinner set of comparable sales than a St. Joseph seller sees.",

      "[MO] A Buchanan County property sold for delinquent taxes rather than a missed mortgage payment follows a different one-year track: RSMo 140.340 lets an owner, lienholder, or other interested party redeem land sold for delinquent taxes as an absolute right for a full year after the sale date, and as a defeasible right beyond that until the purchaser actually walks away with the collector's deed -- a distinct process from the trustee's-sale redemption above, worth knowing separately for an older river-town property where a tax bill can go unpaid for years before anyone acts on it.",

      "St. Joseph's position on the river that gave the state of Missouri its name cuts both ways for a St. Joseph seller. That river shaped the city's original growth and its historic downtown, but low-lying and older neighborhoods closer to the riverbank can carry flood-zone requirements a conventional mortgage lender takes seriously, and a buyer's own lender -- not any government rule -- is often the party that actually slows down or complicates financing on a flood-prone lot.",

      "[MO] The step-by-step version of a Missouri trustee's-sale timeline -- exactly how the twenty-insertion notice runs, and what the four redemption conditions actually require in practice -- lives on this site's dedicated Missouri trustee-sale-timeline page rather than being repeated at length on this one; a Buchanan County homeowner facing an actual notice should read that page for the mechanics, not just this county's own summary.",

      "The clock still running before a trustee's sale is what changes the answer for most sellers in this county. An owner with time before a notice of trustee's sale runs usually comes out ahead bringing a loan current or listing through a realtor, and an owner unsure whether an older property carries an undisclosed history or sits in a flood-prone area has real reason to have it inspected before assuming a quick, as-is sale is the only option.",

      "[MO] None of this is legal advice. A Buchanan County homeowner facing a foreclosure notice or a question about what an older property's history requires disclosing should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county summary.",
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

  "sell-my-house-fast-johnson-county-mo": {
    slug: "sell-my-house-fast-johnson-county-mo",
    body: [
      "Johnson County, Missouri is a different place from Johnson County, Kansas, and the two should never be confused. This Johnson County -- roughly 54,962 people across three cities, Warrensburg, Knob Noster, and Holden, about 48 miles southeast of the Kansas City core -- shares nothing with the Johnson County that contains Overland Park, roughly 622,237 people and already covered on this site's own Johnson County, Kansas page, beyond the name itself and the fact that both sit in this site's 53-county footprint.",

      "[MO] A homeowner who lands on this page while actually meaning the other Johnson County has the wrong state's rules in front of them entirely: this Johnson County follows Missouri law start to finish, while Johnson County, Kansas follows Kansas law start to finish, and the two bodies of law -- foreclosure procedure, redemption rights, homestead protection, tax assessment -- diverge sharply. Anyone unsure which Johnson County a specific address sits in should check a tax statement or parcel record, not assume from the name alone, and this site's Johnson County, Kansas page is the place to go if that is the county actually meant.",

      "[MO] All three cities in this Johnson County -- Warrensburg, Knob Noster, and Holden -- sit in Missouri, so a sale anywhere in this county runs under Missouri's own trustee-driven foreclosure process, dollar-figure homestead exemption, and flat statewide assessment ratio, none of which resembles the judicial process, uncapped homestead, or three-year county tax-sale holding period that actually governs a house in the other, far larger Johnson County to the west.",

      "[MO] Missouri lets a lender foreclose without filing suit: RSMo 443.290 allows a deed of trust to name a trustee with power of sale, and RSMo 443.327 lets that trustee sell the property directly on default. How long notice of that sale has to run before it happens turns on population under RSMo 443.320, and this county sits just over the dividing line -- at roughly 54,962 people, it clears the 50,000 threshold by a narrow margin, so a trustee's sale in this county still runs on the twenty-insertion daily-newspaper schedule rather than the shorter weekly track several smaller counties in this batch use.",

      "[MO] RSMo 443.410 and RSMo 443.420 create a redemption window in this county too, but it closes on four separate requirements rather than opening automatically: the buyer at the sale must be the lender itself, notice of an intent to redeem must reach the trustee at or ahead of the sale date, a bond covering the debt must post inside twenty days afterward, and the redemption itself must land within twelve months.",

      "[MO] RSMo 513.475 shields $15,000 of home equity in this county from an unsecured creditor's judgment right now, climbing to $40,000 on January 1, 2027 under an already-signed law, and RSMo 137.115 assesses an ordinary home at the same 19% of market value applied statewide, regardless of how this county's population compares with its much larger Kansas namesake.",

      "The University of Central Missouri, based in Warrensburg, and Whiteman Air Force Base, near Knob Noster, both shape this county's housing market in a way a purely agricultural county in this batch does not share -- a university-driven rental market in Warrensburg on one side, and a base-driven population of service members on rotating assignments on the other, each producing turnover for reasons that have nothing to do with the ordinary reasons a house changes hands.",

      "[MO] A service member's estate near the base, or a departing student's landlord settling one nearby, still has to clear Missouri probate before a house can pass to a buyer with clear title. Under RSMo 473.780, an estate qualifies for independent administration -- bypassing most day-to-day court sign-off -- only if the will authorizes it, or the will allows it and every heir agrees; otherwise supervised administration takes over, with the probate court signing off on major steps, a sale included.",

      "Warrensburg is by far the largest of this county's three cities and carries most of its resale activity, driven in part by the university; Knob Noster is smaller and tied closely to the base; and Holden, farther from both, is a quieter town with its own steadier, more conventional housing market and far fewer transactions in a typical year than either of the other two.",

      "A tax bill, deed, or GPS pin naming only \"Johnson County\" without a state attached is the single most reliable way to end up on the wrong page entirely. This Johnson County's own tax parcels are administered by the Johnson County, Missouri assessor's office based in Warrensburg, not by anything located in Olathe or Overland Park -- two cities that sit two states removed in name only.",

      "Without a fixed deadline forcing the decision, an owner in this county is usually better served waiting out a conventional listing. An owner with no fixed deadline is usually better off listing conventionally, particularly in Warrensburg where university-driven demand supports an active market; a cash sale becomes worth real consideration mainly for a rental between tenants, a distant heir's estate, or a base-driven relocation on a schedule a normal listing cannot match.",

      "[MO] None of this is legal advice, and confirming which Johnson County a specific property actually sits in is not a legal question at all -- it is a matter of checking the county on a tax bill or deed before assuming anything else. A homeowner in this Johnson County facing a foreclosure notice or a probate question should talk to a Missouri attorney who can review the actual paperwork.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-probate-independent"],
    ],
  },

  "sell-my-house-fast-pettis-county-mo": {
    slug: "sell-my-house-fast-pettis-county-mo",
    body: [
      "Pettis County is built around Sedalia -- home to the Missouri State Fair every August -- and the much smaller town of La Monte, roughly 43,530 people across the two cities combined, about 74 miles southeast of the Kansas City core. This county sits close enough to a key population line that it is worth naming directly: at 43,530 people, Pettis County falls under, not over, the 50,000-person mark, a fact the next section explains.",

      "[MO] Sedalia and La Monte both sit in Missouri, so this county follows the same statewide rules as its larger neighbors closer to Kansas City -- a trustee-driven foreclosure, a dollar-figure homestead exemption, a flat assessment ratio -- but at a population comfortably below the line that decides how long a foreclosure notice has to run before a sale.",

      "[MO] Missouri lets a lender foreclose through a trustee named in the deed of trust rather than through a lawsuit: RSMo 443.290 authorizes the power of sale, and RSMo 443.327 lets the trustee carry it out once default occurs. RSMo 443.320 sets the required notice period, and because Pettis County's population sits below the 50,000-person line, a trustee's sale in Pettis County runs on four successive weekly newspaper issues rather than the twenty-insertion daily schedule the larger metro counties and two others in this same batch use, with the last insertion no more than a week before the sale.",

      "[MO] Redemption is possible after a Pettis County trustee's sale under RSMo 443.410 and RSMo 443.420, though only when four things all happen: the lender buys the property at its own sale, the borrower gives written notice of intent to redeem before or at the sale, a bond for the debt is posted within the following twenty days, and the redemption itself is completed inside a year.",

      "[MO] RSMo 513.475 shields $15,000 of home equity from an unsecured creditor's judgment today, rising to $40,000 effective January 1, 2027 under a law Missouri has already signed, and RSMo 137.115 assesses an ordinary Pettis County home at the same statewide 19% of market value that applies in every other Missouri county in this footprint, large or small.",

      "A property sold for delinquent taxes rather than a missed mortgage payment follows its own separate track. Under RSMo 140.340, redemption is an absolute right for a full year following a Pettis County tax sale, available to the owner, a lienholder, or any other interested party, and it continues afterward as a defeasible right until the purchaser finally receives the collector's deed -- a genuinely different timeline from the trustee's-sale redemption above, and one worth knowing separately in a county where agricultural land, taxed differently from a residential lot, changes hands as often as a house does.",

      "The Missouri State Fair shapes Sedalia's own economy and its housing market in a way no other county in this batch experiences quite the same way -- a fairgrounds-driven local economy with seasonal demand spikes around fair time, on top of an otherwise ordinary county-seat housing market. La Monte, a small town of roughly 1,008 people well outside Sedalia's own orbit, sees far fewer transactions in a typical year and a buyer pool that looks nothing like Sedalia's own.",

      "[MO] An inherited Pettis County house, fairground-adjacent or not, still has to clear Missouri probate before a sale can close with clear title. Two paths lead to independent administration under RSMo 473.780 -- a will that authorizes it outright, or a will that permits it once every heir signs off -- and absent either one, the estate is administered under court supervision instead, with the probate judge approving each major step including a sale.",

      "Sedalia's fairground-driven bump in demand each August does not change any statute above -- it changes only how quickly a well-priced Sedalia home might sell in a given month, a seasonal pattern La Monte's smaller, steadier market does not share at all.",

      "[MO] A property in this county sold for delinquent taxes rather than a missed mortgage payment follows a different track than the trustee's-sale process above. This site's dedicated tax-sale comparison page covers Missouri's own RSMo 140.340 redemption right in full, and a Pettis County owner facing that specific situation should read it directly rather than assume the trustee's-sale conditions above apply the same way.",

      "A county of 43,530 people spread across essentially one mid-sized city and one small town has fewer comparable sales in a given month than a metro county sees in a week, and that scarcity is a real fact for a Pettis County seller to reckon with -- an appraiser or a realtor pricing a specific Pettis County home is working from a thinner set of recent sales than the same professional would find just across the county line closer to Kansas City.",

      "A fast cash sale rarely serves a seller with time still on the clock better than a conventional listing does in this county. An owner with time before a notice of trustee's sale is even published usually does better bringing a loan current or listing through a realtor, particularly in Sedalia where the fair supports a steadier stream of buyer interest than La Monte's smaller market sees; a cash sale earns real consideration mainly when repairs, an estate, or a deadline make waiting out that thinner market genuinely impractical.",

      "[MO] None of this is legal advice. A Pettis County homeowner facing a foreclosure notice, a delinquent-tax sale, or a question about how long redemption actually runs on a specific parcel should talk to a Missouri attorney who can review the real paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-probate-independent"],
    ],
  },

  "sell-my-house-fast-miami-county-ks": {
    slug: "sell-my-house-fast-miami-county-ks",
    body: [
      "Miami County, Kansas should not be confused with the more widely known Miami County in Ohio, or with Miami-Dade County in Florida -- this Miami County sits in eastern Kansas, roughly 35,320 people across three cities, Paola, Osawatomie, and Louisburg, about 39 miles from the Kansas City core. Its own northern line touches Johnson County, Kansas directly, and a meaningful share of this county's growth is Johnson County spillover: buyers priced out of Overland Park or Olathe looking for a lower-cost, more rural alternative still within a reasonable commute.",

      "[KS] All three cities sit in Kansas, so a sale anywhere in this county follows the same statewide Kansas rules that govern Johnson County to the north -- a judicial foreclosure process rather than a Missouri-style trustee's sale, a redemption right measured in months, and a homestead exemption capped by category rather than dollar value -- even though this county's own population is a small fraction of its wealthier neighbor's.",

      "[KS] A mortgage default in this county proceeds exactly as it does statewide: K.S.A. 60-2410 requires a lawsuit resulting in a judgment before a sheriff's sale can happen, and K.S.A. 60-2415 requires the district court to confirm that sale before a deed passes. No trustee named in a Miami County deed of trust has the power Missouri gives one just across the state line.",

      "[KS] K.S.A. 60-2414 then gives the owner twelve months to redeem after a confirmed sale, narrowed to three months only for an owner who defaulted early with less than a third of the debt paid down, and restored to the full year whenever total liens stay under a third of the property's market value regardless of how early the default came.",

      "[KS] Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 protect a qualifying homestead in this county with no dollar ceiling at all -- a manufactured home, one acre inside an incorporated city, or up to 160 acres of farmland, whichever description fits -- and Article 11, Section 1 of the Kansas Constitution assesses an ordinary residential property at the same 11.5% of market value applied everywhere in Kansas, Johnson County, Kansas included.",

      "[KS] A Miami County property bid off at a tax foreclosure sale does not go back on the market right away: K.S.A. 79-2401a requires the county to sit on it first, generally for two years, stretched to three when the property qualifies as a homestead, and only after that holding period ends does a further sale happen -- one that K.S.A. 79-2803 then closes off to any redemption at all. Everything that protects an owner in this county on the tax-sale side happens before that sale, during the county's own holding period, not after.",

      "Paola, the county seat, carries most of this county's resale activity and a mix of long-time residents and newer transplants from Johnson County, Kansas; Osawatomie, farther south along the Marais des Cygnes River, has an older, more industrial history and a slower housing market; and Louisburg, closest to the Johnson County, Kansas line, has seen the most direct spillover growth of the three, with newer construction pricing closer to its wealthier Kansas neighbor's outer edge than to the rest of this county.",

      "[KS] An estate in this county, farmland or a Johnson County-adjacent subdivision lot alike, still has to clear the same Kansas probate test used everywhere in the state: under K.S.A. 59-3202 a Kansas court -- not the parties themselves -- picks between simplified and supervised administration by weighing the estate's solvency, its overall size, how well the heirs get along, and what administering it is likely to cost.",

      "[KS] A seller working with an agent on a Johnson County-adjacent sale in this county should also know that Kansas puts its broader material-defect disclosure duty on the licensee representing the seller, not on the seller directly. K.S.A. 58-30,106 requires that licensee to disclose adverse material facts actually known -- environmental hazards, physical condition, and title defects among them -- to a buyer who is a customer rather than a client.",

      "[KS] This county's own three cities carry different price points precisely because of their distance from Johnson County's own line -- Louisburg's newer subdivisions trade closer to that wealthier neighbor's own prices than Osawatomie's older housing stock does, even though the identical 11.5% Kansas assessment ratio and identical Kansas homestead exemption reach every parcel in this county the same way.",

      "A buyer financing a purchase anywhere in this county also owes nothing under the old Kansas mortgage registration tax, phased out and fully repealed effective January 1, 2019 -- a cost that no longer shows up on a Louisburg, Osawatomie, or Paola closing statement, the same as it would not in neighboring Johnson County, Kansas.",

      "A homeowner selling in this county is working from a genuinely smaller pool of comparable sales than a Johnson County, Kansas seller a few miles north sees -- 35,320 people across three cities produces far fewer transactions in a given month than Overland Park alone generates, and a house priced off Johnson County comparables rather than this county's own thinner market risks being priced wrong in either direction.",

      "For an owner with real equity and no fixed deadline, a conventional listing is the stronger move in this county, not a fast cash sale. An owner with real equity and no fixed deadline, especially in Louisburg where demand spilling over from Johnson County, Kansas keeps a market moving, is usually better off listing conventionally; a cash sale earns real consideration mainly for a property in Osawatomie or Paola that would sit a long time in a smaller, slower Kansas market, or one tied to a deadline that cannot wait.",

      "[KS] None of this is legal advice. A Miami County homeowner facing a foreclosure summons, a tax-sale question, or uncertainty over whether a property qualifies as a homestead should talk to a Kansas attorney who can review the specific parcel, not rely on a general county overview.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-probate-simplified"],
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-lafayette-county-mo": {
    slug: "sell-my-house-fast-lafayette-county-mo",
    body: [
      "Lafayette County sits along the Missouri River's southern bank, roughly 33,196 people across four cities -- Lexington, Odessa, Higginsville, and Concordia -- about 42 miles east of the Kansas City core. Lexington in particular is an old river town, its downtown and residential streets built up well before the newer subdivision growth found closer to the metro core, and its housing stock reflects that age.",

      "[MO] All four cities sit in Missouri, so this county follows the same statewide rules as its larger neighbors nearer Kansas City -- but at roughly 33,196 people, Lafayette County sits well below the 50,000-population line that decides how long a Missouri foreclosure notice has to run, unlike Buchanan County or Johnson County, Missouri elsewhere in this same batch.",

      "[MO] Missouri's foreclosure process runs through a trustee, not a courtroom: RSMo 443.290 lets a deed of trust name a trustee with the power of sale, and RSMo 443.327 authorizes that trustee to sell a defaulted property directly. Because this county falls under the 50,000-person threshold RSMo 443.320 sets, a trustee's sale in Lafayette County runs on four successive weekly newspaper issues rather than the daily schedule a larger county uses, with the final insertion no more than a week before the sale itself.",

      "[MO] A one-year window to redeem can open after a Lafayette County trustee's sale, but RSMo 443.410 and RSMo 443.420 tie it to four conditions holding together: the lender itself buying at the sale, the borrower's written notice of intent to redeem arriving at or before the sale, a bond for the debt posted inside twenty days, and the redemption itself closing out within the year.",

      "[MO] RSMo 513.475 shields $15,000 of equity in a Lafayette County home from an unsecured creditor's judgment today, rising to $40,000 on January 1, 2027 under an already-signed law, and RSMo 137.115 assesses an ordinary residential parcel in Lafayette County at the same 19% of market value applied to every Missouri county in this footprint.",

      "A tax sale, rather than a mortgage default, follows its own separate schedule under RSMo 140.340 -- a full year in which the right to redeem is absolute, and a further stretch after that in which it survives only until the purchaser actually takes delivery of the collector's deed. That distinction matters in a county where farmland changes hands nearly as often as residential lots, since agricultural parcels in this county are frequently caught up in tax-sale proceedings that a purely residential county rarely sees at the same scale.",

      "[MO] A Lafayette County closing carries no state or local transfer tax, and the reason runs deeper than an ordinary statute: Missouri voters wrote the ban directly into Article X, Section 25 of the state constitution back in 2010, closing the door on the state, this county, or any other Missouri political subdivision ever taxing a home or farmland sale -- a genuinely relevant fact for an heir in this county selling inherited farmland who might otherwise expect a transfer cost that Missouri does not actually charge.",

      "The four cities in this county differ sharply. Lexington, the county seat, carries the oldest housing stock and the deepest local history of any city in this county; Higginsville and Concordia are smaller, steadier rural towns with far less turnover; and Odessa, closest to the Kansas City metro's own eastern edge, has absorbed more of the newer growth spreading out from Lafayette County's more built-up neighbors, giving it a different pace than the other three.",

      "[MO] Farmland in this county often passes through several heirs jointly, and a sale cannot close with clear title until Missouri probate sorts out who is actually authorized to sign. RSMo 473.780 opens the door to independent administration, free of most ongoing court oversight, when the will itself authorizes it or when the will permits it and every heir consents; without either path, supervised administration takes over, with the court approving each major step, a sale of land among them.",

      "Lexington's own downtown includes the site of the Battle of Lexington, an early Civil War engagement, and that historic character draws a narrow but real buyer interest in older homes near it -- a niche market a fast, as-is cash sale would not capture the same way a patient, conventionally marketed listing could.",

      "A fast cash sale can still make sense for a Lafayette County heir facing a farmland parcel tied up in a stalled probate, or an owner whose Odessa or Concordia property needs repairs a conventional buyer's lender will not finance, even where the historic-district demand described above does not reach the specific property in question.",

      "This county's own river-bottom farmland, much of it in agricultural use rather than residential subdivision, means an appraisal or a realtor's comparable-sales analysis in this county often has to draw on a smaller and more scattered set of recent transactions than a denser residential county nearby provides -- a genuine constraint on how quickly and how precisely a specific Lafayette County property can be priced.",

      "Not every seller in this county benefits from a fast cash sale; an heir with time and no urgent deadline typically does better working with a local realtor instead. An owner with time before a trustee's-sale notice runs, or an heir with a farmland parcel and no urgent deadline, is usually better off listing conventionally or working directly with a local realtor familiar with agricultural land; a cash sale earns real consideration mainly for a property needing repairs a conventional lender will not finance, or an estate that cannot wait out a thin, slow-moving market.",

      "[MO] None of this is legal advice. A Lafayette County homeowner facing a foreclosure notice, a farmland tax-sale question, or an estate involving agricultural property should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county summary.",
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

  "sell-my-house-fast-lyon-county-ks": {
    slug: "sell-my-house-fast-lyon-county-ks",
    body: [
      "Lyon County is the most distant county in this batch of twelve, roughly 32,172 people concentrated almost entirely in a single city, Emporia -- home to Emporia State University -- about 96 miles from the Kansas City core. That distance puts Lyon County on the far edge of this site's entire 53-county footprint, closer in practice to central Kansas than to the metro area this site otherwise focuses on.",

      "[KS] Emporia sits in Kansas, so this county follows the same statewide Kansas rules that govern Johnson County or Wyandotte County far closer to the metro core -- a judicial foreclosure process, a redemption right measured in months, and a homestead exemption with no dollar cap -- even though a sale in this county is competing in a market that looks nothing like the Kansas City suburbs.",

      "[KS] A mortgage default in this county proceeds through the courts, not a private trustee's sale: K.S.A. 60-2410 requires a lawsuit ending in a judgment, and K.S.A. 60-2415 requires the district court to confirm the resulting sheriff's sale before a deed can issue -- the same two-step judicial process required everywhere in Kansas, regardless of how far a county sits from the metro core.",

      "[KS] K.S.A. 60-2414 then gives the owner twelve months to redeem the property after that sale, shortened to three months only for an owner who defaulted early and had less than a third of the debt paid off, and restored to the full year whenever total liens stay under a third of the property's value no matter how early the default happened.",

      "[KS] The homestead exemption and the property-tax ratio apply without modification for distance: Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 shield a qualifying Lyon County homestead from forced sale with no dollar limit, and Article 11, Section 1 of the Kansas Constitution assesses an ordinary residential home in this county at the same 11.5% of market value applied statewide.",

      "[KS] A buyer financing a purchase in this county also owes nothing under Kansas's old mortgage registration tax, since K.S.A. 79-3102 was fully repealed effective January 1, 2019 -- a closing-cost line item that no longer appears on a Kansas closing statement in this county or anywhere else in the state.",

      "Emporia's own economy leans heavily on Emporia State University, and that university presence shapes this county's housing market the way Douglas County's does around the University of Kansas, on a smaller scale -- a rental-heavy share of the local housing stock, and a resale pace that often follows the academic calendar rather than the ordinary seasonal pattern a purely residential Kansas county sees.",

      "At 96 miles from the metro core and roughly 32,172 people concentrated in one city, this county sits at the genuine edge of what this site's footprint covers -- a homeowner in this county is selling into a market with a fraction of the comparable sales a Johnson County, Kansas or Wyandotte County seller has available, and pricing a specific property accordingly takes more local knowledge than a metro-area comparable-sales approach provides.",

      "A landlord with a Emporia rental sitting vacant between semesters, or dealing with a difficult tenant, is often a stronger candidate for a fast cash sale than an owner-occupied home in good condition with no deadline -- the same distinction Douglas County's own rental market draws, just at Lyon County's smaller scale and greater distance from the metro core.",

      "[KS] Kansas's tax-sale process runs on two separate steps for a Lyon County property bid off at a foreclosure sale: first, K.S.A. 79-2401a locks in a county holding period before any further sale can happen -- two years as the default, three for a qualifying homestead -- and second, K.S.A. 79-2803 shuts the door on redemption completely the moment that further sale takes place, unlike the post-sale window a mortgage foreclosure allows.",

      "[KS] An Emporia estate, student-rental or owner-occupied, still has to clear the same K.S.A. 59-3202 test as any Kansas estate: a court works through the same factors as anywhere else in Kansas -- how big the estate is, whether the heirs see eye to eye, its solvency, the probable cost of administering it -- before choosing between a simplified and a supervised track.",

      "Lyon County's own distance and university-driven economy set it apart from the smaller, purely agricultural counties elsewhere in this batch -- Emporia's rental market and academic-calendar turnover look more like a smaller-scale Douglas County than like Pottawatomie or Franklin County's farmland-driven pace.",

      "[KS] Emporia's own market-value estimates trend below the metro core's, even though the 11.5% assessment ratio itself is identical everywhere in Kansas -- a lower base value at the same percentage produces a correspondingly lower tax bill than a comparable home would draw closer to Johnson County, one of the few practical advantages of selling this far out.",

      "A buyer financing a purchase in this county also owes nothing under the old Kansas mortgage registration tax, repealed statewide effective January 1, 2019 -- a fact that reaches a Lyon County closing exactly as it does one 96 miles closer to the metro core.",

      "A conventional listing usually beats a fast cash sale for an owner-occupied home in good condition with no urgent deadline in this county. An owner-occupied home in good condition with no urgent deadline is still generally better off listed conventionally, even at this distance from the metro core; a cash sale earns real consideration mainly for a rental between tenants, a property needing repairs a lender will not finance, or an estate that cannot wait out a slower, more rural market.",

      "[KS] None of this is legal advice. A Lyon County homeowner facing a foreclosure summons or a rental-property question should talk to a Kansas attorney who can review the actual paperwork, not rely on a general county overview.",
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

  "sell-my-house-fast-pottawatomie-county-ks": {
    slug: "sell-my-house-fast-pottawatomie-county-ks",
    body: [
      "Pottawatomie County sits at the far edge of this site's Kansas footprint, roughly 26,382 people across two cities, Wamego and St. George, about 96 miles from the Kansas City core -- essentially tied with Lyon County, in this same batch, as the most distant county this site covers. Unlike Lyon County's single-city university market, Pottawatomie County is genuinely rural, its two cities small and its population spread across farmland in between.",

      "[KS] Wamego and St. George both sit in Kansas, so a sale in this county follows the same statewide Kansas rules covered on this site's Kansas hub page -- judicial foreclosure, a redemption right measured in months, and an uncapped homestead exemption -- but at this county's own scale, where a foreclosure or a probate filing is a rare event compared with how often either happens in a metro county.",

      "[KS] A mortgage default in this county runs through the same two-step judicial process required everywhere in Kansas: K.S.A. 60-2410 requires a lawsuit resulting in a judgment, and K.S.A. 60-2415 requires the district court to confirm the sheriff's sale before a deed can pass -- no trustee's sale, and no private process outside the courthouse, regardless of how rural the county.",

      "[KS] K.S.A. 60-2414 then gives the owner twelve months to redeem after a confirmed sale, narrowed to three months only when the default came early and less than a third of the debt had been paid down, with the full year restored whenever total liens stay under a third of the property's market value.",

      "[KS] Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 protect a qualifying Pottawatomie County homestead with no dollar cap, covering a manufactured home, one acre inside a city, or up to 160 acres of farmland -- a description that reaches a meaningful share of property in a county this agricultural more directly than it does in a denser suburban county. Article 11, Section 1 of the Kansas Constitution assesses an ordinary residential property at the same 11.5% of market value applied statewide.",

      "[KS] When a Pottawatomie County estate needs settling, K.S.A. 59-3202 still governs how it proceeds: a court, not the will by itself, chooses between simplified and supervised administration after considering the estate's solvency, its size, how much the heirs agree, and what settling it is expected to cost -- a small farm estate with agreeable heirs is more likely to qualify as simplified than a larger or contested one.",

      "Wamego, the larger of the two cities at roughly 4,846 people, carries most of this county's resale activity and its own small-town commercial center; St. George, considerably smaller, sees far fewer transactions in a typical year and a buyer pool drawn almost entirely from the immediate area rather than from anywhere farther out.",

      "A county of 26,382 people spread across two small cities and the farmland between them has genuinely few comparable sales in a given month -- an appraisal in this county often has to reach back further in time, or farther afield, to find a truly comparable recent sale than an appraisal in a denser county would need to.",

      "[KS] The same two-step Kansas tax-sale timeline reaches a Pottawatomie County property bid off at a foreclosure sale: the county must first sit on the property under K.S.A. 79-2401a's holding period -- two years ordinarily, three if it qualifies as a homestead -- before any further sale can proceed, and K.S.A. 79-2803 then forecloses any redemption right the moment that further sale happens.",

      "Pottawatomie County borders Riley County to its west, home to Kansas State University in Manhattan, and St. George in particular sees some spillover growth from that university market -- a different driver than Wamego's own more self-contained small-town economy, even though both cities answer to the identical Kansas statutes above.",

      "[KS] A seller in this county working through an agent should also know that Kansas places its broader material-defect disclosure duty on the licensee representing the seller rather than on the seller directly. K.S.A. 58-30,106 requires that licensee to disclose adverse material facts actually known -- physical condition and title defects included -- to a buyer who is a customer rather than a client.",

      "A single acre inside Wamego or St. George qualifies for the uncapped homestead protection the same way a suburban lot near Overland Park would, but the surrounding farmland many owners in this county also hold does not automatically carry the same protection unless it independently qualifies as part of the up to 160 acres the exemption separately allows for agricultural land.",

      "Wamego's own tourism-adjacent economy, built in part around its riverside location and small-town festivals, gives it a somewhat steadier flow of buyer interest than St. George sees on its own, even though both cities sit under the identical statewide statutes described above.",

      "An owner-occupied home with no urgent deadline rarely needs what a fast cash sale offers in this county. An owner-occupied home with no urgent deadline, particularly in Wamego where a steadier local market exists, is usually better off listed conventionally; a cash sale earns real consideration mainly for a property that would sit a long time in St. George's thinner market, or one tied to an estate or a repair need a conventional lender will not finance.",

      "[KS] None of this is legal advice. A Pottawatomie County homeowner facing a foreclosure summons or an estate question should talk to a Kansas attorney who can review the actual paperwork for that property, not rely on a general county overview.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-probate-simplified"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-broker-disclosure-duty"],
    ],
  },

  "sell-my-house-fast-franklin-county-ks": {
    slug: "sell-my-house-fast-franklin-county-ks",
    body: [
      "Franklin County sits along Interstate 35, roughly 26,125 people across two cities, Ottawa and Wellsville, about 53 miles from the Kansas City core. Ottawa itself, the county seat and home to Ottawa University, has grown in part because of that interstate corridor -- a position that draws newer commercial and residential development along the highway in a way a county farther from I-35 does not see.",

      "[KS] Both cities sit in Kansas, so this county follows the same statewide Kansas rules covered on this site's Kansas hub page -- judicial foreclosure, a months-long redemption right, an uncapped homestead exemption -- and Franklin County's own position on a major interstate corridor does not change any of it; the same law reaches a house a mile off I-35 in Ottawa and one on a quiet farm road well away from it.",

      "[KS] A mortgage default in this county proceeds the way it does everywhere in the state: K.S.A. 60-2410 requires a lawsuit and a judgment, and K.S.A. 60-2415 requires the district court to confirm the sheriff's sale before a deed transfers -- no trustee-driven private sale exists in Kansas the way one does under a Missouri deed of trust.",

      "[KS] K.S.A. 60-2414 gives the owner twelve months to redeem after that sale, narrowed to three months for an owner who defaulted early with less than a third of the debt paid off, restored to the full year whenever total liens stay under a third of the property's market value.",

      "[KS] A qualifying Franklin County homestead carries the same protection as any other in the state under Kan. Const. Art. 15 Section 9 and K.S.A. 60-2301 -- shielded from forced sale regardless of value -- while Article 11, Section 1 of the Kansas Constitution taxes an ordinary residential parcel in this county at 11.5% of its market-value estimate, a ratio the county's own highway-driven growth does nothing to change.",

      "[KS] Growth along an interstate corridor brings its own disclosure question. K.S.A. 12-6a20 requires a Kansas seller of property subject to a special assessment or located in an improvement district -- the kind of financing tool a growing corridor county sometimes uses to fund new roads or utilities -- to disclose that fact to the buyer, with a good-faith estimate if the exact amount isn't yet known, and to get the buyer's written acknowledgment of it. A seller near newer development along I-35 in this county should confirm whether a specific parcel carries a special assessment before assuming it doesn't.",

      "Ottawa carries most of this county's population and its resale activity, driven by both the university and the interstate corridor's commercial growth; Wellsville, a much smaller town of roughly 1,930 people well off the highway, has a slower, more conventional small-town housing market with far less of that corridor-driven turnover.",

      "A seller near Ottawa's newer growth areas along I-35 is often working with a more active, faster-moving market than a seller in Wellsville or in the county's more rural stretches sees -- a genuinely different pace within the same county, tied more to proximity to the interstate than to which side of the county line a property sits on.",

      "[KS] Every Kansas county, Franklin County included, runs the identical two-step process once it bids off a property at a tax foreclosure sale: K.S.A. 79-2401a first forces a holding period -- two years by default, three when the property qualifies as a homestead -- before a further sale can be pursued at all, and K.S.A. 79-2803 then wipes out any redemption right the instant that further sale is held.",

      "[KS] An Ottawa or Wellsville estate still has to clear the same K.S.A. 59-3202 probate test as anywhere else in Kansas: a court -- again, not the will alone -- sorts a Franklin County estate into either a simplified or a supervised track based on its solvency, how sizeable it is, whether the heirs are in agreement, and the likely cost of seeing it through.",

      "Ottawa University adds a modest rental-driven segment to this county's housing market, smaller than Douglas County's own university-driven rental share around Lawrence, but still a real reason some Ottawa-area homes turn over on a different schedule than an ordinary owner-occupied residence would.",

      "Special assessments tend to cluster in the newer growth areas nearest the interstate, not in Wellsville or in this county's more rural stretches, so a seller's actual exposure to the disclosure duty above depends heavily on which side of the county a specific property sits on.",

      "[KS] Kansas repealed its old mortgage registration tax outright, effective January 1, 2019, when the legislature retired K.S.A. 79-3102 for good -- so a buyer financing a purchase anywhere in this county, Ottawa or Wellsville alike, never sees that line item on a closing statement, any more than a buyer would near Overland Park.",

      "A seller comparing a fast cash offer against a normal listing in this county should weigh the interstate corridor's own faster pace honestly: a well-priced Ottawa home near I-35 often draws real buyer interest within a normal listing window, while a Wellsville property farther from the highway may need more patience -- the right comparison depends on where in the county the specific property actually sits, not on the county as a whole.",

      "An Ottawa owner with real equity and no urgent deadline gains more from a conventional listing than from a fast cash sale, given how active that corridor's market already is. An owner in Ottawa with real equity and no urgent deadline is usually better off listing conventionally, given the corridor's own active market; a cash sale earns real consideration mainly for a Wellsville property that would sit a long time in a slower market, or a special-assessment situation complicated enough that a conventional buyer's lender balks at it.",

      "[KS] None of this is legal advice. A Franklin County homeowner facing a foreclosure summons or unsure whether a specific parcel carries a special assessment should talk to a Kansas attorney who can review the actual paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
      citations["ks-homestead"],
      citations["ks-assessment-115"],
      citations["ks-seller-disclosure-special-assessment"],
      citations["ks-tax-sale-county-holding-period"],
      citations["ks-tax-sale-no-post-sale-redemption"],
      citations["ks-probate-simplified"],
      citations["ks-mortgage-reg-tax"],
    ],
  },

  "sell-my-house-fast-ray-county-mo": {
    slug: "sell-my-house-fast-ray-county-mo",
    body: [
      "Ray County is one of the smaller Missouri River bottom counties in this batch, roughly 23,182 people concentrated mostly in a single city, Richmond, about 34 miles northeast of the Kansas City core. Like Lafayette and Saline Counties elsewhere in this batch, Ray County's land is heavily agricultural, and its housing stock, away from Richmond itself, is older and more scattered than the newer subdivision growth found closer to the metro core.",

      "[MO] Richmond and the rest of Ray County sit in Missouri, so this county follows the same statewide rules as its larger neighbors nearer Kansas City -- but at roughly 23,182 people, Ray County sits well below the 50,000-population threshold that decides how long a Missouri foreclosure notice has to run, the same side of that line as Pettis, Lafayette, Saline, and Henry Counties elsewhere in this batch.",

      "[MO] A Missouri lender forecloses through a trustee, not a lawsuit: RSMo 443.290 lets a deed of trust name a trustee with power of sale, and RSMo 443.327 lets that trustee sell the property once the borrower defaults. Because this county falls under RSMo 443.320's 50,000-person line, a trustee's sale in Ray County runs on four successive weekly newspaper issues, the last one no more than a week before the sale, rather than the daily schedule a larger county follows.",

      "[MO] RSMo 443.410 and RSMo 443.420 do not hand every Ray County borrower a redemption right automatically -- it depends on the lender being the one who buys at the sale, on written notice of an intent to redeem reaching the trustee at or before the sale, on a bond for the debt going up within twenty days after, and on the redemption itself happening inside the following year.",

      "[MO] RSMo 513.475 shields $15,000 of home equity in this county from an unsecured creditor's judgment today, rising to $40,000 on January 1, 2027 under a law already signed, and RSMo 137.115 assesses an ordinary Ray County home at the same statewide 19% of market value applied everywhere in Missouri, agricultural county or metro suburb alike.",

      "[MO] An inherited house in this county, farmland or otherwise, still has to clear Missouri probate before it can pass with clear title. Under RSMo 473.780, a personal representative can proceed through independent administration -- free of most ongoing court oversight -- when a will authorizes it, or when the will allows it and every heir agrees; failing either condition, the estate is administered under court supervision, with a sale among the major steps requiring the probate court's sign-off. In a county where family farmland often passes through several heirs at once, getting that consent lined up can take longer than it does for a single-owner residential estate.",

      "[MO] A Ray County property sold for delinquent taxes rather than a missed mortgage payment carries its own separate track: RSMo 140.340 hands any interested party an unconditional right to redeem for the first year after the sale, followed by a weaker, defeasible right that only lasts until the purchaser finally obtains the collector's deed -- worth knowing separately from the trustee's-sale redemption above, particularly for farmland that can sit with a delinquent tax bill longer than a residential lot typically would.",

      "[MO] Article X, Section 25 of the Missouri Constitution reaches a Ray County closing too, the same constitutional wall against a transfer tax that voters built statewide in 2010 -- one that blocks the state, this county, and every other Missouri political subdivision alike from ever taxing a home or farmland sale.",

      "Richmond, the county seat, carries nearly all of this county's resale activity and its own small but steady residential market; the rest of Ray County is largely unincorporated farmland, where a house changes hands far less often and a comparable sale can be difficult to find within a reasonable distance or timeframe.",

      "Ray County's own farmland economy places it closer to Lafayette and Saline Counties elsewhere in this batch than to a more suburban county nearer the metro core -- a genuinely rural market where a house or a farm parcel, not a subdivision lot, is the typical listing.",

      "A Richmond homeowner and a farmland heir outside Richmond are not solving the same problem when a fast sale gets proposed -- the town homeowner is usually weighing price and timeline against an ordinary listing, while the farmland heir is often weighing whether probate can even clear in time to close a sale of any kind before a deadline.",

      "A county this size and this agricultural has genuinely thin comparable-sales data outside Richmond itself -- an appraiser pricing a rural Ray County property is often working from sales that happened months or years earlier, or from a farm sale rather than a residential one, in a way a denser county nearby does not require.",

      "The calculation changes for a Richmond owner only once a trustee's-sale notice actually runs -- short of that, bringing the loan current or listing conventionally usually wins. An owner in Richmond with time before a trustee's-sale notice runs is usually better off bringing a loan current or listing conventionally; an heir to farmland outside Richmond, working through probate with multiple family members, has real reason to sort out who can actually sign for the property before assuming any sale, fast or otherwise, can move forward.",

      "[MO] None of this is legal advice. A Ray County homeowner facing a foreclosure notice or an estate involving multiple heirs to farmland should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county summary.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-probate-independent"],
      citations["mo-tax-sale-redemption"],
      citations["mo-transfer-tax-ban"],
    ],
  },

  "sell-my-house-fast-saline-county-mo": {
    slug: "sell-my-house-fast-saline-county-mo",
    body: [
      "Saline County is another Missouri River bottom county in this batch, roughly 23,049 people across three cities -- Marshall, Slater, and Sweet Springs -- about 74 miles east of the Kansas City core. Marshall, the county seat and home to Missouri Valley College, carries the large majority of this county's population, while Slater and Sweet Springs are small towns whose economies lean on the surrounding farmland more directly than Marshall's own.",

      "[MO] All three cities sit in Missouri, so Saline County follows the same statewide rules as its larger metro neighbors -- but at roughly 23,049 people, it sits well below the 50,000-population line that decides how long a Missouri foreclosure notice has to run, on the same side of that line as Ray, Lafayette, Pettis, and Henry Counties in this same batch.",

      "[MO] Missouri's foreclosure process runs through a named trustee, not a courtroom: RSMo 443.290 authorizes a deed of trust to carry a power of sale, and RSMo 443.327 lets the trustee sell the property directly on default. Because this county falls under RSMo 443.320's 50,000-person threshold, a trustee's sale in Saline County runs on four successive weekly newspaper issues, the final one no more than a week before the sale, rather than the daily schedule used in a larger county.",

      "[MO] Whether a one-year redemption right actually exists after a Saline County trustee's sale comes down to four separate facts under RSMo 443.410 and RSMo 443.420: was the lender the buyer at the sale, was written notice of an intent to redeem given at or before it, was a bond for the debt posted within the following twenty days, and did the redemption itself happen inside the year.",

      "[MO] RSMo 513.475 protects $15,000 of home equity in this county from an unsecured creditor's judgment right now, rising to $40,000 on January 1, 2027 under an already-signed law, and RSMo 137.115 assesses an ordinary Saline County home at the same 19% of market value applied statewide, regardless of the county's own agricultural character.",

      "[MO] A property sold for delinquent taxes rather than a mortgage default runs on its own separate track: RSMo 140.340 grants an unqualified, year-long right to redeem to any interested party, running from the sale date, with a second, defeasible right layered on top that expires the moment the purchaser actually secures the collector's deed -- a genuinely relevant distinction in a county where agricultural parcels can sit with delinquent taxes longer than a residential lot typically would before anyone acts.",

      "[MO] A seller in this county, whether of an older Marshall home or a rural parcel outside it, should also know that Missouri has no single statute requiring a general property-condition disclosure form. Its broadest protection against a seller's silence about a known defect instead comes from the Missouri Merchandising Practices Act, which RSMo 407.020 and RSMo 407.010 make clear reaches real estate: concealing, suppressing, or omitting a material fact in connection with a sale is an unlawful practice regardless of whether a specific disclosure form exists for it.",

      "[MO] An inherited Saline County house, Marshall residence or rural parcel alike, still has to clear Missouri probate before a sale can close with clear title. RSMo 473.780 permits independent administration -- free of most ongoing court sign-off -- whenever a will authorizes it or the will allows it and every heir agrees; failing that, the estate moves through supervised administration instead, with the court's approval attaching to each major step.",

      "[MO] A Saline County seller pays no transfer tax at closing either, courtesy of the same Article X, Section 25 that Missouri voters added to their own constitution in 2010 -- language that forecloses the state, this county, and every other political subdivision from ever taxing a home sale.",

      "Marshall's own resale market, supported by Missouri Valley College, is steadier and more active than either Slater or Sweet Springs, both considerably smaller towns where a house can sit on the market far longer simply for lack of buyer traffic rather than anything wrong with the property itself. The college also brings a modest rental-driven segment to Marshall's market that neither smaller town shares.",

      "Saline County's own river-bottom farmland ties it more closely to Lafayette and Ray Counties elsewhere in this batch than to a purely suburban county nearer the metro core, and a seller in this county should expect the same thinner comparable-sales picture that farmland-heavy county shares.",

      "[MO] The same constitutional transfer-tax ban that reaches Ray and Lafayette Counties reaches a Saline County closing too, and it costs nothing extra to confirm before comparing a cash offer with a normal listing -- Article X, Section 25 leaves no room for a county-by-county exception anywhere in Missouri.",

      "A Marshall seller weighing a cash offer against Missouri Valley College's own steady rental demand faces a different calculation than a Slater or Sweet Springs seller facing a genuinely thin buyer pool -- the same statutes govern both, but the practical urgency behind accepting a discounted cash offer is not the same in the two settings.",

      "For a Marshall owner with no urgent deadline, a conventional listing is the stronger move, not a fast cash sale. An owner in Marshall with no urgent deadline is usually better off listing conventionally, given the college-supported local market; a cash sale earns real consideration mainly for a Slater or Sweet Springs property that would otherwise sit for a long stretch, or a rural parcel with a delinquent-tax history complicated enough to concern a conventional buyer's lender.",

      "[MO] None of this is legal advice. A Saline County homeowner facing a foreclosure notice, a tax-sale question, or uncertainty over what a specific defect requires disclosing should talk to a Missouri attorney who can review the actual paperwork, not rely on a general county overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-tax-sale-redemption"],
      citations["mo-merchandising-practices-act"],
      citations["mo-probate-independent"],
      citations["mo-transfer-tax-ban"],
    ],
  },

  "sell-my-house-fast-henry-county-mo": {
    slug: "sell-my-house-fast-henry-county-mo",
    body: [
      "Henry County sits farther south than the river-bottom counties elsewhere in this batch, roughly 22,485 people across two cities, Clinton and Windsor, about 65 miles southeast of the Kansas City core. Clinton, the county seat, sits on the Harry S. Truman Reservoir -- known locally as Truman Lake -- and that lake shapes the county's housing market in a way none of the agricultural river-bottom counties in this same batch experience: a share of Henry County's housing stock is lake-oriented seasonal or vacation property rather than a full-time residence.",

      "[MO] Clinton and Windsor both sit in Missouri, so Henry County follows the same statewide rules as its larger neighbors closer to Kansas City -- but at roughly 22,485 people, it is the smallest of the twelve counties in this batch by population, and it sits well under the 50,000-person line that decides how long a Missouri foreclosure notice has to run.",

      "[MO] Missouri lets a lender foreclose through a trustee named in the deed of trust rather than through a lawsuit: RSMo 443.290 authorizes that power of sale, and RSMo 443.327 lets the trustee carry out the sale once the borrower defaults. Because this county falls under RSMo 443.320's 50,000-person threshold, a trustee's sale in Henry County runs on four successive weekly newspaper issues, the last one no more than a week before the sale, the same shorter schedule several other smaller counties in this batch use.",

      "[MO] A Henry County trustee's sale can carry a one-year redemption right under RSMo 443.410 and RSMo 443.420, but every one of four conditions has to hold: the lender itself must be the buyer at the sale, the borrower's written notice of intent to redeem must arrive at or before it, a bond for the debt must be posted within twenty days afterward, and the redemption itself must be completed before the year runs out.",

      "[MO] RSMo 513.475 shields $15,000 of home equity in this county from an unsecured creditor's judgment today, climbing to $40,000 on January 1, 2027 under a law Missouri has already signed, and RSMo 137.115 assesses an ordinary Henry County home at the same 19% of market value that applies statewide, lakefront property included.",

      "[MO] A lakefront or vacation home in this county gets the benefit of the identical constitutional transfer-tax ban that covers every Missouri closing -- Missouri voters folded it into Article X, Section 25 of their own constitution in 2010, and it stops the state, this county, and every other political subdivision from ever taxing a home sale. That matters more in a lake county than in a purely residential suburb, because a second home or vacation property changes hands, and gets weighed against a straightforward cash offer, differently than a primary residence does.",

      "[MO] A lake or town property left to heirs in this county still has to clear Missouri probate before a sale can close with clear title. RSMo 473.780 opens independent administration to an estate -- free of most day-to-day court oversight -- when the will authorizes it, or the will permits it and every heir agrees; short of either condition, supervised administration governs instead, with the court's sign-off attaching to major steps, a sale of lake property included.",

      "[MO] A Henry County property sold for delinquent taxes rather than a missed mortgage payment follows RSMo 140.340's own separate track: a full year of unconditional redemption rights starting at the sale, with a further, weaker right afterward that lasts only until the purchaser finally takes the collector's deed -- nothing like the trustee's-sale redemption's four conditions above.",

      "Clinton carries most of this county's year-round population and resale activity, along with the lake-driven vacation-property segment of the market; Windsor, farther from the lake and considerably smaller, has a quieter, more conventional small-town housing market with far less of that seasonal turnover.",

      "A lake property in this county often sells on a different timeline than an ordinary full-time residence -- buyer interest can concentrate heavily around the warmer months, and an owner trying to sell a vacation home in the off-season is working against a much thinner buyer pool than the same property would draw in summer. Windsor's own market moves at a steadier, less seasonal pace than Clinton's lake-driven segment, since it draws almost none of the vacation-property demand concentrated around the reservoir's shoreline.",

      "A homeowner weighing a lake-property sale against a fast cash offer should factor in not just price but timing -- an off-season cash sale trades away the summer buyer pool's stronger demand for certainty now, a genuine tradeoff a purely town-based Henry County seller in Windsor does not face the same way.",

      "An heir inheriting a Henry County lake house from a relative who used it seasonally faces a different practical question than an heir inheriting a Windsor town home -- deciding whether to keep making off-season lake-property costs work, sell into next summer's buyer pool, or take a faster off-season sale is a genuinely different calculation than settling an ordinary town-home estate.",

      "Timing decides this one more than anything else in this county -- waiting for the season when lake buyers are actually looking tends to pay off better than a fast cash sale. An owner with a well-maintained lake or town home and no urgent deadline is usually better off listing conventionally and timing a sale around the season when lake buyers are actually looking; a cash sale earns real consideration mainly for a property needing repairs a conventional lender will not finance, or a seller who genuinely cannot wait for the next warm-weather selling window.",

      "[MO] None of this is legal advice. A Henry County homeowner facing a foreclosure notice or weighing how season affects a lake-property sale should talk to a Missouri attorney or a local realtor familiar with the lake market, not rely on a general county overview.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["mo-homestead"],
      citations["mo-assessment-19"],
      citations["mo-transfer-tax-ban"],
      citations["mo-probate-independent"],
      citations["mo-tax-sale-redemption"],
    ],
  },
};
