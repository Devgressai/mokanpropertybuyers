import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * The foreclosure cluster -- the most consequential pages on the site. Every
 * paragraph that states law names exactly one state and carries its `[MO]`
 * or `[KS]` label; every legal assertion traces to `citations` rather than
 * being retyped. See docs/CITATION-LEDGER.md for what backs each entry, and
 * `docs/superpowers/plans/2026-07-29-wave-0b-state-line-silo.md` (Tasks 5-7)
 * for the content contract this file is written against.
 */
export const stateLineContentForeclosure: Record<string, PageContent> = {
  "missouri-vs-kansas-foreclosure": {
    slug: "missouri-vs-kansas-foreclosure",
    body: [
      "Missouri and Kansas meet at a single street through the middle of the Kansas City metro, and a homeowner who falls behind on a mortgage payment lands in one of two entirely different systems depending on which side of that street the house sits on. The two states do not run a shared process with local variations -- they run opposite processes, built on different legal instruments, moving on different timelines, with different chances for an owner to get the property back after a sale. Nothing below applies evenly on both sides of that line.",

      "[MO] Missouri lets a lender foreclose without ever setting foot in a courtroom. Under RSMo 443.290, a Missouri mortgage or deed of trust can carry a power of sale in the lender or a trustee, and under RSMo 443.327, a trustee holding that power can sell the property directly once the loan is in default. No lawsuit gets filed, no judge reviews the file, and no court date exists anywhere on the calendar for the sale itself.",

      "[MO] Before that trustee's sale can happen, Missouri law requires published notice, and how long that notice has to run depends on the county's population. RSMo 443.320 requires at least twenty insertions in a daily newspaper, continued through the day of the sale, in any county of 50,000 people or more; in a smaller county, four successive weekly issues are enough, with the last one no more than a week before the sale. Buchanan, Cass, Platte, Clay, and Jackson Counties -- the five largest Missouri counties in this footprint -- all clear that 50,000 line, so a trustee's sale in any of them runs on the slower daily-newspaper schedule. Most of the smaller Missouri counties in this same footprint fall under that number and move on the shorter weekly track instead. There is no single Missouri notice period; it depends on where the county sits relative to that line.",

      "[MO] Missouri also has a narrow one-year redemption right after that same trustee's sale, but it is not automatic and applies to far fewer sales than people assume. Under RSMo 443.410 and RSMo 443.420, redemption exists only when four things are all true: the purchaser at the trustee's sale is the lender itself, or someone bidding on the lender's behalf, rather than an outside investor; the person seeking to redeem gives written notice of that intent either at the sale itself or within the ten days immediately before it; a surety bond covering the full debt, interest, costs, and other charges is posted within twenty days after the sale; and the redemption itself happens within one year of the sale date. Miss any one of those four and there is no redemption period at all. Neither the flat claim that Missouri has no redemption, nor the flat claim that a Missouri seller automatically gets a year to undo a sale, is accurate -- both skip the conditions that decide which one is true for a given sale.",

      "[KS] Kansas runs a fundamentally different process. There is no Kansas statute giving a lender the power to direct a trustee to sell a property outside of court. Under K.S.A. 60-2410, a foreclosure is a civil lawsuit that ends in a judgment, followed by a sheriff's sale conducted under execution; under K.S.A. 60-2415, the district court must then confirm that the sale was conducted regularly and lawfully before a deed can issue to the buyer. Every Kansas foreclosure passes through a judge at least twice -- once for the judgment, once for the sale's confirmation.",

      "[KS] After a Kansas sheriff's sale is confirmed, the owner is still not necessarily out. K.S.A. 60-2414 gives a defendant owner the right to redeem the property at any time within twelve months from the day of the sale. Twelve months is the default period, and it is a real right that exists independent of who bought the property at the sale.",

      "[KS] That twelve-month period narrows to three months only in one specific circumstance: when the default that led to the sale occurred before one-third of the original debt secured by the mortgage or lien had been paid. But K.S.A. 60-2414 carves the shortened window right back out for a low-leverage owner -- if the total of every mortgage and lien against the property comes to less than one-third of the property's market value, the court orders the full twelve-month period regardless of how little of the debt was actually paid down before default. A Kansas owner who made a large down payment, or who has built real equity over time, does not fall into the three-month bucket just because the default came early; the statute is written around how leveraged the property is, not simply around how many payments were missed.",

      "[MO] Run start to finish, Missouri's own timeline has no lawsuit to file, no judgment to obtain, and no confirmation hearing to wait on -- just the newspaper notice the county's population requires, then the sale itself, and, only in the narrow four-condition scenario described above, a year in which redemption is possible.",

      "[KS] Kansas's timeline runs on an entirely different clock: a petition, a judgment, a sheriff's sale, and a confirmation hearing before a district judge, followed by a guaranteed redemption window of at least three months and, for most owners, a full twelve, that exists whether or not the owner does anything to invoke it.",

      "For a homeowner working out what to do next, the practical difference is enormous. A Missouri process can run its entire course in a matter of weeks. A Kansas process generally takes months before a sale happens at all, and then keeps an owner's options open for months longer after that. Which side of the state line a property sits on changes not just which set of rules applies, but how much time an owner actually has to work with.",

      "[MO] None of this means a cash sale is the right move for every Missouri owner facing a trustee's sale. If a sale has not yet been noticed, there is usually time to bring the loan current, negotiate a repayment plan, or list the property and sell it through a realtor at full market value -- any of which typically nets more than a fast, as-is cash sale. And in the rare case where all four redemption conditions above are actually met, working through that notice-and-bond process to redeem the property may be worth far more than what a cash sale would pay. A cash sale is worth serious consideration once time has genuinely run out or carrying the property is no longer realistic, not simply because a notice arrived in the mail.",

      "[KS] Selling for cash is even less often the right move on the Kansas side. A homeowner with real equity -- enough that the total of all mortgages and liens against the property is less than a third of its market value -- is very likely entitled to a full twelve months to redeem after a sheriff's sale, whether or not much of the debt was paid down before default. Twelve months, on top of the months a judicial foreclosure typically takes to reach a sale in the first place, is a long runway to refinance, negotiate with the lender, or simply sell the property the ordinary way once things stabilize. A Kansas owner with meaningful equity and time on their side is usually better off not selling to us at all.",

      "None of this is legal advice, and it is not a substitute for a lawyer who can look at an actual notice, deed, or court filing. Deadlines in this area, once missed, are not undone by a change of mind -- a homeowner who is unsure where they stand should talk to a licensed attorney before the next date on their own paperwork arrives, not after it.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
    ],
  },

  "kansas-right-of-redemption": {
    slug: "kansas-right-of-redemption",
    body: [
      "[KS] When a Kansas mortgage or deed of trust goes into default and the lender forecloses, losing the sheriff's sale does not automatically mean losing the property for good. Kansas law gives a defendant homeowner a statutory right to redeem -- to pay off what is owed and reclaim clear title -- for a fixed period after the sale, and that right exists independent of what the buyer at the sale intends to do with the property.",

      "[KS] That right attaches to a specific kind of sale. Kansas has no power-of-sale statute that lets a lender foreclose outside of court, so every Kansas foreclosure proceeds as a lawsuit: a judgment under K.S.A. 60-2410, then a sheriff's sale under execution, then confirmation by the district court under K.S.A. 60-2415 before a deed can issue to the buyer. The redemption period below runs from that confirmed sale date, not from the date the lawsuit was filed or the judgment entered.",

      "[KS] The baseline rule, under K.S.A. 60-2414, is twelve months. A defendant owner may redeem the property at any time within twelve months from the day of the sale, and that right does not depend on who bought the property at the sale or on posting any bond to preserve it -- the statute grants the full year outright.",

      "[KS] The twelve-month period shortens to three months in one specific situation: when the default that triggered the foreclosure happened before the owner had paid off one-third of the original debt secured by the mortgage or lien. Read on its own, that sounds like it would catch most owners who default relatively early in a loan.",

      "[KS] K.S.A. 60-2414 immediately narrows that shortened window back down, though. If the total of every mortgage and lien against the property adds up to less than one-third of the property's market value, the court still orders the full twelve-month redemption period, regardless of how little of the debt was actually paid before default. In practice, that means an owner with substantial equity -- a low loan balance relative to the home's value -- gets the full year even after an early default. The three-month window is reserved for owners who are both early in default and heavily leveraged; it is not the outcome in every Kansas foreclosure.",

      "[KS] Picture two Kansas owners who each fall behind and end up foreclosed on. The first bought recently with a small down payment and still owes nearly the full purchase price; if that owner defaults early, before a third of the debt is paid off, the court is likely to set the shortened three-month period. The second owner has been paying the loan down for years, or made a large down payment, and owes far less relative to the home's value -- even an early default does not shrink that owner's redemption period, because the total liens against the property fall under the one-third-of-market-value line K.S.A. 60-2414 sets. How much equity is left in the property matters more than the calendar date of the default.",

      "[KS] The twelve or three months in K.S.A. 60-2414 belong specifically to the \"defendant owner\" -- the person who was named as the defendant in the foreclosure lawsuit and held title when it was filed. That is a narrower and more specific status than simply living in the house or paying the loan bill, and it is worth confirming directly against the foreclosure judgment and the recorded deed rather than assuming it from who happens to be receiving mail at the property.",

      "[KS] The reason the statute measures leverage rather than the length of time since default is fairly straightforward. An owner who is heavily leveraged and defaults quickly has little of their own money in the property yet, while an owner who has paid down a large share of the debt, or put a substantial amount down at purchase, has significantly more equity at stake and more reason to be given a full year to work out a way to keep the property. K.S.A. 60-2414 draws that line at one-third of the property's market value, not at any fixed dollar figure or a set number of months of payment history.",

      "[KS] For a homeowner, the practical value of the redemption period is that a sheriff's sale is not the end of the road. Redeeming clears the debt and any need to move out, but it also takes real money, since the entire point of redemption is paying off what is owed rather than simply waiting out a clock. Whether redeeming makes sense for a given owner is a math problem specific to that owner's remaining equity, other debts, and ability to raise funds within the window -- not a question with one universal answer.",

      "[KS] This is exactly why selling for cash is frequently not the right move for a Kansas homeowner in this position. An owner with substantial equity -- the same low-leverage owner who keeps the full twelve months under the carve-out above -- has a long runway to refinance, sell through a realtor at full market value, or bring in a partner to help redeem, any of which is likely to net more than an as-is cash sale made under time pressure. A cash sale becomes worth serious consideration mainly when the redemption window is closing, equity is thin or gone once the debt and sale costs are counted, or there is no realistic way to raise the money to redeem or keep carrying the property.",

      "None of this is a substitute for reading the actual judgment and sale documents in a specific case, or for advice from a licensed Kansas attorney. [KS] Redemption deadlines run on fixed calendar dates set by the sale itself, not by when an owner gets around to acting, and a right that exists on the day of the sale can expire completely a year later with no extension available.",
    ],
    claims: [
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
    ],
  },

  "missouri-trustee-sale-timeline": {
    slug: "missouri-trustee-sale-timeline",
    body: [
      "[MO] A Missouri trustee's sale does not start with a lawsuit. Under RSMo 443.290, a Missouri mortgage or deed of trust can include a power of sale naming a trustee, and under RSMo 443.327, that trustee can sell the property directly once the loan is in default, without the lender filing suit and without a judge ever reviewing the file. The whole process runs through the trustee named in the original loan documents, not through a courtroom.",

      "[MO] The first concrete step a homeowner usually sees is the published notice of sale. RSMo 443.320 sets how long and how often that notice has to run before the trustee can actually hold the sale, and the required schedule depends on the county's population -- meaning the same default can move on very different calendars depending on which Missouri county the property is in.",

      "[MO] That population line isn't abstract in this metro. Jackson County (roughly 718,000 people), Clay County (roughly 260,000), Platte County (roughly 112,000), Cass County (roughly 112,000), and Buchanan County (roughly 83,000) are all comfortably above the 50,000 mark and trigger the daily-newspaper requirement, while most of the smaller counties in this same 100-mile footprint fall under that number and use the shorter weekly-newspaper track instead. A trustee's sale in one of those smaller counties can be published and completed noticeably faster than one in a larger county running the twenty-insertion daily schedule.",

      "[MO] That population threshold is fixed at the county level, not the city level, and it does not move with a city's own growth or a particular neighborhood's density. A property inside Kansas City, Missouri, but recorded in a smaller adjoining county follows that county's notice schedule, not Jackson County's -- the trustee looks at where the property is recorded, not at how large or well-known the surrounding city is.",

      "[MO] The sale itself is conducted at whatever public location the published notice names, and it is open to bidders generally -- the lender itself, or an outside investor, or anyone else who shows up and bids. Who wins that bid matters enormously for what happens next, because it controls whether any redemption right survives the sale at all.",

      "[MO] RSMo 443.410 and RSMo 443.420 give a narrow one-year redemption right after that sale, but only when four specific things line up. First, the buyer at the sale has to be the lender itself, or someone bidding on the lender's behalf -- a redemption right does not survive a sale to an outside investor. Second, the person who wants to redeem has to give written notice of that intent, either at the sale itself or in the ten days immediately before it. Third, within twenty days after the sale, that person has to post a surety bond covering the full amount of the debt, interest, costs, and any other charges. Fourth, the redemption itself -- paying what's owed and reclaiming the property -- has to happen within one year of the sale date. Skip any one of those four and the redemption right simply is not available.",

      "[MO] That combination is why blanket statements about Missouri redemption are usually wrong in one direction or the other. Saying Missouri has no redemption at all ignores the narrow right that does exist. Saying a Missouri seller automatically gets a year to undo a trustee's sale ignores how rarely all four conditions line up -- a sale to a third-party investor forecloses the redemption right before it can even be tested.",

      "[MO] Throughout the process, the trustee acts as the party named in the loan documents to carry out the sale, not as an advocate for either the lender or the homeowner. The trustee's job is to follow RSMo chapter 443 as written -- publish notice on the required schedule, conduct the sale as advertised, and issue a trustee's deed to whoever's bid wins -- and nothing in that role requires weighing whether the outcome is fair to the homeowner, because the statute has already set the process the trustee has to follow.",

      "[MO] The notice period and the redemption right are governed by separate parts of the statute, and surviving one does not extend the other. Once the sale happens, the published-notice clock is done; what happens after that depends entirely on whether the four redemption conditions above are actually met, not on how much notice ran beforehand or how close the sale came to the legal minimum.",

      "[MO] Put the pieces together and a Missouri trustee's sale can move from a first missed payment to a completed sale in a matter of months, and depending on the county, the published-notice period alone can run considerably shorter once the process actually starts. There is no waiting on a court docket, no judgment to obtain, and no confirmation hearing standing between notice and sale.",

      "[MO] None of that means a cash sale is the right move at every point along this timeline. Before a notice of sale has even been published, there is usually time to bring the loan current, work out a repayment plan with the lender, or list the property and sell it at full market value through a realtor -- steps that typically net an owner more than an as-is cash sale. Even after a notice starts running, refinancing or a short sale may still be realistic depending on how much time is left. A cash sale is worth serious consideration once a sale date is close, the loan cannot realistically be brought current, and there is no lender-purchaser scenario that would preserve a redemption right worth pursuing -- not simply because a notice arrived.",

      "This is not legal advice, and it is not a substitute for reading the actual notice, deed of trust, and any bond or notice-of-intent paperwork tied to a specific sale. [MO] The twenty-day and ten-day windows above run on fixed calendar dates, not on when an owner gets around to acting, and missing one closes off an option that cannot be reopened afterward.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
    ],
  },

  "deed-of-trust-vs-mortgage": {
    slug: "deed-of-trust-vs-mortgage",
    body: [
      "A mortgage and a deed of trust do the same basic job: both give a lender a lien against a property that secures a loan, and both let the lender force a sale if the borrower stops paying. The difference is structural. A mortgage is a two-party document -- borrower and lender -- and enforcing it generally means the lender has to sue the borrower and get a court to order the property sold. A deed of trust adds a third party, a trustee, who holds legal title as security and who can sell the property directly on default, without the lender filing a lawsuit first.",

      "[MO] Missouri is a deed-of-trust state in practice, and the difference is not just paperwork. RSMo 443.290 lets a Missouri mortgage or deed of trust carry a power of sale, and RSMo 443.327 lets the trustee named in it exercise that power by selling the property directly on default. That is the entire reason a Missouri foreclosure can move without a lawsuit -- the power-of-sale clause and the trustee are what make the non-judicial process possible, not just a label on the loan documents.",

      "[KS] Kansas has no equivalent power-of-sale statute. Whatever a Kansas security instrument is called, enforcing it runs through a lawsuit: a judgment under K.S.A. 60-2410, a sheriff's sale under execution, and confirmation by the district court under K.S.A. 60-2415 before a deed can issue. The name on the loan documents does not create a non-judicial shortcut in Kansas -- that shortcut does not exist as a matter of Kansas law, regardless of what the instrument is called.",

      "The instrument itself typically travels alongside a separate promissory note -- the borrower's actual written promise to repay -- and either kind of security instrument exists only to give the lender a way to collect against the property if that separate promise is broken. Neither a mortgage nor a deed of trust is enforceable on its own without the underlying debt behind it; the security instrument is the collateral mechanism, not the obligation itself.",

      "[MO] In a Missouri deed of trust, the named trustee holds bare legal title to the property as security only -- the borrower keeps equitable ownership and possession throughout the life of the loan -- and it is that structure, combined with RSMo 443.290's power-of-sale language, that lets the trustee act directly on default instead of the lender needing a court's permission first.",

      "[KS] A Kansas mortgage, by contrast, does not introduce a trustee holding title at all; it is a two-party lien running directly between the borrower and the lender. That simpler structure is not itself what makes Kansas foreclosure judicial, though -- even a Kansas loan document written with trust language would still require a judgment and a court-confirmed sale, because no Kansas statute gives any trustee the power to sell a property without going through court first.",

      "[MO] For a homeowner, the label on loan paperwork is a clue but not the deciding factor. The words \"power of sale\" create an enforceable, non-judicial shortcut under Missouri law, because RSMo 443.290 and RSMo 443.327 are what give that clause any effect in the first place.",

      "[KS] Under Kansas law, the same words create no shortcut of any kind. No Kansas statute gives a power-of-sale clause legal effect; K.S.A. 60-2410 and K.S.A. 60-2415 assume a judgment and a court-confirmed sheriff's sale instead, regardless of what the loan documents call the security instrument.",

      "A homeowner who is unsure which kind of instrument secures a given loan can usually find out in a few minutes. The recorded document at the county recorder's or register of deeds' office will say directly whether it is titled a mortgage or a deed of trust, and if it is a deed of trust, it will name the trustee. The original closing paperwork typically says the same thing on its very first page, above the signature lines.",

      "Reading the loan paperwork itself will not tell an owner which timeline applies to a given property -- the location of the property will. The same clause means one thing in Missouri and something else entirely in Kansas, and only the county the property sits in decides which.",

      "[MO] A Missouri deed of trust with a power-of-sale clause means less time to act than many owners assume, but less time is not the same as no options. Before any notice of sale is published, refinancing, a repayment plan, or a normal listed sale are usually the better outcome for an owner's bottom line than an as-is cash sale.",

      "[KS] A Kansas mortgage enforced through a judicial foreclosure generally leaves months of court process before a sale even happens, plus a further redemption period after it. That is usually time better spent listing the property, negotiating with the lender, or refinancing than accepting a fast cash offer out of the gate.",

      "None of the above is legal advice. Which instrument secures a given loan, and what it actually allows a lender to do, is a question best answered by reading the recorded document itself or asking a licensed attorney in the state where the property sits -- not by assuming the label on the paperwork settles it. The instrument's name is a starting point for that conversation, not the end of it, and the state the property sits in will always matter more than the word printed at the top of the document.",
    ],
    claims: [citations["mo-nonjudicial"], citations["ks-judicial"]],
  },

  "which-side-of-state-line-road": {
    slug: "which-side-of-state-line-road",
    body: [
      "State Line Road is not a metaphor. For miles through the Kansas City metro, it is the literal boundary between Missouri and Kansas, and two houses that look identical -- built the same year, by the same builder, on the same kind of block -- can be governed by completely different rules purely because of which side of that street they sit on. Which state a property is in changes the process a homeowner falls into if things go wrong, not just which flag flies over the county courthouse.",

      "The most reliable way to check which side a property is on is the county. Property in Jackson, Clay, Platte, Cass, or Buchanan County sits in Missouri. Property in Johnson, Wyandotte, Leavenworth, Douglas, or Shawnee County sits in Kansas. A street address alone can be misleading near the line -- Kansas City is the name of cities on both sides of the border, one in Missouri and one in Kansas, so the city name by itself does not answer the question the way the county does.",

      "Zip codes do not reliably answer it either. Some Kansas City-area zip codes sit entirely on one side of the line despite a name that might suggest otherwise, and a mailing address assigned by the postal service follows delivery routes, not county boundaries. A county assessor's parcel record, or a plat map, will show the county directly -- and the county is what determines the state.",

      "A property's parcel identification number, printed on the most recent tax statement or looked up on the county assessor's website, always specifies the county it belongs to. If a homeowner has that number but is not sure how to read it, a short call to the assessor's office will confirm the county and, with it, the state -- faster and more reliably than trying to interpret a zip code or a Kansas City street address.",

      "This is not only true near the moment of a foreclosure. Which state a property sits in also determines things like how a homeowner's exemption from creditors works, how the property is assessed for tax purposes, and what a seller has to disclose before closing -- topics this site covers state by state elsewhere. Foreclosure and redemption are simply the two areas where the difference is most likely to matter under real time pressure, which is why this page addresses them first.",

      "Properties with addresses directly on State Line Road itself are the clearest example of the boundary running through this metro. One side of the street is in Kansas and the other is in Missouri, with the state line running down the centerline of the road, so two houses facing each other across the same street can be on opposite sides of the border despite sharing the same road name in their address.",

      "[MO] If the property is on the Missouri side, foreclosure, if it ever comes to that, runs through a trustee named in the deed of trust rather than through a lawsuit. RSMo 443.290 and RSMo 443.327 let that trustee sell the property directly on default, on a notice timeline set by RSMo 443.320. A narrow one-year redemption right can survive that sale, but only under four specific conditions, covered in depth on this site's Missouri trustee's-sale timeline page.",

      "[KS] If the property is on the Kansas side, foreclosure runs through a lawsuit, a judgment, and a sheriff's sale confirmed by the district court -- K.S.A. 60-2410 and K.S.A. 60-2415 require all of it, with no non-judicial shortcut available regardless of what the loan documents call the security instrument. A defendant owner generally gets twelve months to redeem after that sale under K.S.A. 60-2414, sometimes shortened to three, covered in depth on this site's Kansas redemption-rights page.",

      "The practical result is that the same kind of default plays out on very different clocks depending on which side of State Line Road a house sits on. A Missouri process can complete in a matter of weeks once it starts; a Kansas process generally takes months before a sale even happens. Neither timeline is universally better or worse for a given owner -- it depends entirely on how much equity is at stake and how much time that owner actually needs.",

      "[MO] For a Missouri owner, knowing the state does not automatically mean a cash sale is the right move. Before any notice of sale has run, there is usually time to bring a loan current, negotiate directly with the lender, or list the property and sell it at full market value -- all of which typically nets more than an as-is cash sale.",

      "[KS] For a Kansas owner, the same caution applies even more strongly. A judicial foreclosure takes months to reach a sale, and a defendant owner with real equity in the property is likely entitled to a full twelve months to redeem after that sale under K.S.A. 60-2414. An owner with that much time and that much equity is usually better off refinancing, negotiating, or listing the property than accepting a fast cash offer.",

      "None of the above is legal advice, and it does not replace confirming a property's county and reading the actual notice or court filing in a specific case. A homeowner who is not sure which side of the line a property falls on, or which process applies to it, should confirm the county first -- everything else follows from that one fact.",
    ],
    claims: [
      citations["mo-nonjudicial"],
      citations["mo-notice-period"],
      citations["mo-redemption"],
      citations["ks-judicial"],
      citations["ks-redemption-12mo"],
      citations["ks-redemption-3mo"],
    ],
  },
};
