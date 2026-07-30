import { citations } from "@/data/legal-citations";
import type { PageContent } from "@/data/content-registry";

/**
 * The transaction cluster -- probate, tax sale, contract for deed, and seller
 * disclosure. Same rules as the foreclosure and money clusters: every
 * paragraph asserting law names exactly one state and carries its `[MO]` or
 * `[KS]` label, and every legal assertion traces to `citations` rather than
 * being retyped. See docs/CITATION-LEDGER.md for what backs each entry.
 *
 * Ledger coverage is thinner here than in the previous two clusters, and this
 * file is written around that rather than around it. The ledger contains
 * `mo-probate-independent` and `ks-probate-simplified` (both used below), and
 * `mo-tax-sale-redemption` (also used below, alongside `mo-redemption` for
 * contrast). It contains no verified claim for a Kansas tax sale, and none at
 * all -- for either state -- for contract for deed or seller disclosure.
 *
 * Those gaps are handled the way the task brief for this cluster requires:
 * the probate and tax-sale pages are built on what IS verified, with an
 * explicit, honest statement of what is not covered and a pointer to the
 * official source instead of an invented paragraph; the contract-for-deed and
 * seller-disclosure pages carry no MO/KS-specific legal claims at all -- they
 * describe the general, jurisdiction-neutral mechanics of each topic and say
 * plainly, twice each, that this page has not verified either state's
 * specific rule closely enough to state it. Neither of those two pages
 * carries a `claims` array, because neither asserts law. That is a deliberate
 * outcome of the ledger's coverage, not an oversight -- see the Task 7 report
 * for the word counts this produced and why some fall under the 900-word
 * flagship floor the other two clusters cleared.
 */
export const stateLineContentTransaction: Record<string, PageContent> = {
  "probate-missouri-vs-kansas": {
    slug: "probate-missouri-vs-kansas",
    body: [
      "Probate is the court-supervised process of settling a deceased person's estate -- collecting what they owned, paying valid debts and taxes, and distributing what is left to the heirs or beneficiaries a will names. A house is usually the single largest asset that has to pass through that process, and until probate resolves who has authority over it, nobody can sell it with clear, marketable title. What differs from one state's process to another is not whether that basic structure exists, but how much ongoing court oversight it requires along the way, and who gets to decide how much oversight applies.",

      "[MO] Missouri lets an estate skip most of that ongoing court oversight when the will authorizes it, or when the will permits it and every heir and devisee consents. Under RSMo 473.780, a personal representative administering the estate this way -- independent administration -- can proceed with settling and distributing the estate without adjudication, order, or direction from the probate court, in contrast to supervised administration, which requires the court's approval at each major step.",

      "[MO] The independent-administration route in RSMo 473.780 is triggered either by the will itself authorizing it, or -- where the will allows it -- by all heirs and devisees agreeing to it after the fact. Absent one of those two paths, a Missouri estate defaults to supervised administration, where the court's approval attaches to the steps a personal representative takes along the way, selling estate real estate included.",

      "[KS] Kansas draws the same basic line between more and less court oversight, but it draws it differently. Under K.S.A. 59-3202, when someone petitions to be appointed administrator or to have a will admitted to probate, a Kansas court decides whether the estate will be administered as a simplified estate or a supervised estate, weighing the size of the estate, the degree of kinship of the heirs and devisees, the estate's solvency, its nature, the heirs' and devisees' own wishes, the probable cost of administering and settling it, and any other pertinent matter.",

      "[KS] Kansas's K.S.A. 59-3202 test cuts in the other direction on complexity. A large estate, heirs who disagree, an unusual asset that needs careful handling, or an estate whose solvency is in question all push a Kansas court toward supervised administration instead of the simplified track, because the same factors that make a simplified estate appropriate -- small size, agreeable heirs, solvency, straightforward assets -- work in reverse when they are absent.",

      "Neither administration route removes the underlying requirement that whoever signs a deed to estate real estate actually has the legal authority to do it. A title company handling the closing will ask for letters testamentary or letters of administration -- the document a probate court issues naming who has authority to act for the estate -- before insuring title to the sale, regardless of how much day-to-day court oversight applied along the way.",

      "Confirming that authority early, rather than assuming it, matters most at the exact moment a sale is ready to close. A title company insuring a buyer's title will ask to see the letters naming who the probate court actually appointed before it will let a deed to the property record, and discovering only at the closing table that the wrong person signed a purchase contract is a delay every seller in this position would rather avoid.",

      "[MO] For a Missouri estate, the practical upshot is that the will's own language, or the heirs' agreement, decides upfront whether selling the house will involve going back to the probate court for approval at each step or not, and that is worth confirming with the personal representative or an attorney before assuming either answer.",

      "[KS] For a Kansas estate, the practical upshot is that the court makes that call itself, weighing the K.S.A. 59-3202 factors, and an heir or personal representative who wants to know whether a specific estate will be simplified or supervised should ask the probate court directly, rather than assume the outcome based on how a different estate was handled.",

      "An estate with time to work with, a personal representative or heirs who agree on what to do, and a house that does not need significant repair is very often better off listed through a realtor once probate authority is confirmed, rather than sold quickly and as-is. That combination -- time, cooperation, and a house in decent condition -- usually nets more money the ordinary way than a fast cash sale does, regardless of which administration track the estate is on.",

      "[MO] For a Missouri estate under independent administration specifically, the lack of a court-approval step at each turn is itself a reason a normal listed sale can move faster than people assume, once the personal representative actually has authority to sign -- it is not, on its own, a reason to accept a discounted cash offer instead of listing the property.",

      "[KS] For a Kansas estate, whether administration ends up simplified or supervised, an heir or personal representative with time and agreement among the interested parties is still usually better off listing the house through a realtor than accepting a fast, discounted cash offer -- a supervised track can take longer to get court approval for a sale, but that additional time does not, by itself, make a lower cash price the better outcome.",

      "None of this is legal advice, and probate is one of the areas where a lawyer is often genuinely necessary rather than merely helpful. Whether a will actually authorizes independent administration, whether every heir and devisee has truly consented, how a probate court is likely to weigh the multi-factor test that decides how much oversight a given estate gets, and who currently holds the legal authority to sign a deed are all questions that depend on the actual will, the actual heirs, and the actual estate -- not on a general comparison of two states' probate systems. An heir or personal representative who is not sure where a specific estate stands should talk to a probate attorney licensed in the state where the estate is being administered before assuming a sale can move forward.",
    ],
    claims: [citations["mo-probate-independent"], citations["ks-probate-simplified"]],
  },

  "tax-sale-missouri-vs-kansas": {
    slug: "tax-sale-missouri-vs-kansas",
    body: [
      "When property taxes go unpaid long enough, the taxing authority does not simply keep adding penalties forever -- eventually the county can sell the property, or a lien against it, to collect what is owed. A tax sale is a different legal process from a mortgage foreclosure: it is triggered by unpaid property taxes rather than an unpaid loan, and it runs through the county collector's or treasurer's office rather than through a lender or a court overseeing a mortgage default. Exactly how that sale happens, and what rights an owner keeps afterward, is set state by state.",

      "[MO] Missouri sets one of those rights out directly. Under RSMo 140.340, the owner, a lienholder, an occupant, or anyone else with an interest in land sold for delinquent taxes has an absolute right to redeem the property -- to pay what is owed and reclaim it -- at any time during the one year immediately following the tax sale. That right does not depend on posting a bond or meeting any other condition; it exists because the statute grants it outright.",

      "[MO] RSMo 140.340 does not cut that right off the moment the first year ends, either. After the initial one-year period, the same statute gives a defeasible right to redeem that continues until the tax-sale purchaser actually acquires the collector's deed -- the document that finally transfers ownership to the purchaser. In practice, an owner's window to redeem can run longer than exactly twelve months if the purchaser has not yet taken that additional step, though it is a right that can be cut off once the purchaser does take it, so it is not one to rely on indefinitely.",

      "[MO] It is worth keeping this tax-sale redemption right separate from a different Missouri redemption right covered elsewhere on this site: the one that can follow a mortgage trustee's sale under RSMo 443.410 and RSMo 443.420. That mortgage-foreclosure redemption right is gated by four specific conditions -- the lender has to be the buyer at the sale, written notice has to be given, a bond has to be posted, and it has to happen within a year -- and it addresses an unpaid loan, not unpaid taxes. The tax-sale redemption right under RSMo 140.340 is a separate process with its own one-year-plus-defeasible structure and none of those four conditions attached to it. An owner should not assume the rules for one kind of sale carry over to the other.",

      "This page does not describe how Kansas handles a property tax sale, because nothing has been checked against Kansas's own law closely enough to state it with confidence, and guessing would be worse than saying nothing. A Kansas owner facing a delinquent-tax situation should go directly to the county treasurer's office where the property sits, or to Kansas's own published law, rather than assume the Missouri process described above carries over to the Kansas side -- it does not, and this page takes no position on what actually does apply.",

      "[MO] None of this makes a cash sale the obviously right move for a Missouri owner facing a tax sale, before or after it happens. Before a sale is held, paying the delinquent taxes, working out a payment plan with the collector's office, or refinancing to cover the arrears usually preserves far more equity than selling the property outright. And within the one-year absolute redemption window RSMo 140.340 provides, or the longer defeasible window that can follow it, redeeming the property -- if the amount owed is affordable relative to the equity at stake -- typically nets an owner far more than accepting a cash offer for a property that redemption could have reclaimed outright.",

      "A Kansas owner in the same situation should treat the county treasurer's office as the first call to make about payment options or reclaiming the property, before considering any offer on it, precisely because this page does not know, and will not guess, how much time Kansas law actually gives an owner to act.",

      "None of this is legal advice. A specific parcel's tax-sale timeline, amount owed, and redemption deadline are set by the county collector's or treasurer's own records for that property, not by a general description of two states' rules, and an owner who is not sure where they stand should call that office, or a licensed attorney, directly and soon -- a tax-sale redemption deadline that passes is not one a court can extend afterward.",
    ],
    claims: [citations["mo-tax-sale-redemption"], citations["mo-redemption"]],
  },

  "contract-for-deed-missouri-vs-kansas": {
    slug: "contract-for-deed-missouri-vs-kansas",
    body: [
      "A contract for deed -- sometimes called a land contract or an installment land contract -- is a way to sell real estate without a traditional mortgage closing. The buyer takes possession and makes payments directly to the seller over time, often years, but the seller keeps legal title to the property until the buyer finishes paying under the contract's terms. Only then does a deed get recorded transferring title to the buyer. That is the reverse of a typical financed sale, where the buyer receives title at closing and the lender's mortgage or deed of trust is what stays on record until the loan is paid off.",

      "Sellers and buyers use this structure most often when a buyer cannot qualify for a conventional mortgage -- damaged credit, hard-to-document self-employment income, or a property a bank will not lend against in its current condition are common reasons. The seller effectively becomes the lender, collecting payments directly instead of through a bank, and takes on the risk of the buyer defaulting instead of a bank carrying that risk.",

      "The single biggest risk for a buyer under this kind of contract is what happens on default. Because the seller still holds legal title, a buyer who falls behind on payments can potentially lose the property, and every payment already made, through a process that in many places moves faster and offers far less protection than a mortgage foreclosure does for a borrower who already holds title. The single biggest risk for a seller runs the other way: getting a defaulting buyer out, and getting clear possession and title back, if that buyer will not leave voluntarily once payments stop.",

      "How exactly a default under this kind of contract gets unwound -- whether it moves through something closer to an eviction, something closer to a full mortgage foreclosure, or a process specific to contracts for deed themselves, and how much of what a buyer already paid gets credited back -- depends heavily on the state the property sits in, and the gap between those outcomes for a buyer is enormous.",

      "This page has not checked, closely enough to state with confidence, exactly what Missouri does with a defaulted contract for deed, or exactly what Kansas does, so neither is described as if it were settled. A buyer or seller under a contract for deed in Missouri or Kansas should ask a real estate attorney directly what happens on default before signing one or relying on one.",

      "A buyer under a contract for deed can generally protect their interest by recording the contract at the county recorder's or register of deeds' office where the property sits, putting the public record on notice of the buyer's equitable interest even though legal title has not transferred yet. Not every contract for deed gets recorded, and an unrecorded one is harder for a buyer to prove or protect if a dispute, or a sale to someone else, comes up later.",

      "A seller who is still owed payments under a contract for deed, and wants to convert that stream of future payments into cash now, is usually better off exploring a sale of the note or contract itself to a buyer of seller-financed notes, or simply continuing to collect the scheduled payments, before assuming a discounted cash sale of the underlying property is the only option. Selling the underlying property out from under an active, current contract for deed is not something a seller can generally do unilaterally while a buyer is current and in possession under it -- the buyer's rights under the contract do not disappear just because the seller wants to sell to someone else.",

      "A buyer under a contract for deed who has built real equity through payments already made, and who is current on those payments, is very often better off continuing to make them, or refinancing into a traditional mortgage once qualifying is realistic, than walking away from that equity for a cash offer on an equitable interest that a lender or title company may have real trouble valuing or insuring in the first place.",

      "None of this is legal advice. Whether a specific contract for deed is valid, properly recorded, currently in default, or subject to any right of redemption or reinstatement under the law of the state where the property sits is a question for a real estate attorney reviewing the actual contract, not a general description of how this kind of sale structure works.",
    ],
  },

  "seller-disclosure-missouri-vs-kansas": {
    slug: "seller-disclosure-missouri-vs-kansas",
    body: [
      "A seller disclosure is a written statement, completed by the seller before a sale closes, listing known material facts about a property's condition -- things like a leaking roof, a foundation problem, past water damage, a septic or well issue, or a known defect in a major system. The point of the form is to put a buyer on notice of what the seller actually knows, in the seller's own words, before the buyer finalizes a purchase and before an inspection contingency period closes.",

      "Selling a property 'as-is' is generally understood as a term about repair obligations and price -- the buyer is agreeing to take the property in its current condition rather than asking the seller to make repairs -- not as a substitute for a disclosure form or a blanket waiver of whatever disclosure duty otherwise applies. Whether, and exactly how, that distinction is written into a specific state's law is a separate question from the general market understanding of what 'as-is' means to a buyer and seller negotiating a price.",

      "This page has not verified, closely enough to state with confidence, exactly what Missouri requires a seller to put in writing before closing, or exactly what Kansas requires, so neither is described as if it were settled. A seller in Missouri or Kansas should ask a real estate agent or attorney licensed in that state exactly what form, if any, is required, and exactly what it has to say.",

      "A disclosure form, however a specific state structures it, is not a substitute for an independent inspection, and it does not require a seller to disclose defects the seller genuinely does not know about. It is a snapshot of what the seller is actually aware of at the time the form is signed, not a guarantee that nothing else could possibly be wrong with the property.",

      "Signing a disclosure form does not erase separate consequences for actively lying about a known, material problem rather than simply staying silent about something never asked. That distinction between what a specific disclosure form legally requires a seller to volunteer, and what ordinary fraud or misrepresentation law reaches regardless of any form, is exactly the kind of question a real estate attorney, not a general description like this one, is positioned to answer for a specific property and a specific state.",

      "In a typical agent-assisted sale, the listing agent usually gives the seller a disclosure form as one of the first documents to complete when a home goes on the market, well before an offer is even accepted, so a buyer's decision to make an offer, and later to remove an inspection contingency, is made with that information already in hand.",

      "A defect discovered between signing a disclosure form and closing -- a roof that starts leaking during an unusually heavy rain, for instance -- is not something most sellers can simply ignore because the form was already signed. The more common, safer practice is to update the buyer and the agent promptly rather than let a closing proceed on a disclosure both sides now know is out of date, even though the exact legal obligation to amend it has not been checked for a specific state on this page.",

      "A seller who has time, and whose known issues are the kind that can be repaired for materially less than what they cost at sale, is very often better off making those repairs, completing whatever disclosure paperwork applies honestly, and listing the property in the ordinary way -- that combination frequently nets more than an as-is cash sale, even after paying for the repairs. A cash, as-is sale becomes worth serious consideration mainly when the needed repairs are larger than the seller can afford or arrange, when the issues are severe enough that most conventional buyers' lenders will not finance the property in its current condition, or when there simply is not time to make repairs and wait through a normal listing process.",

      "None of this is legal advice, and this is another area where a real estate attorney or a state-licensed agent, not a general comparison like this one, is often genuinely necessary -- particularly for a seller who knows about a specific problem and is unsure whether, or how, it has to be written down. What Missouri actually requires a seller to put in writing, and what Kansas actually requires, including which transactions are exempt and what form has to be used, are questions this page leaves to that professional rather than answering on its own.",
    ],
  },
};
