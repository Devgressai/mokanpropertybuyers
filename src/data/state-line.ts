import type { StateCode } from "@/data/geography";
import { SITE } from "@/lib/site";

/**
 * The fourteen anchor pages that explain how Missouri and Kansas law
 * genuinely differs for someone selling a distressed property -- foreclosure,
 * redemption, homestead, probate, assessment, transfer and tax sale, deed of
 * trust versus mortgage. A California competitor cannot have these pages, and
 * no local competitor has written them; that's the whole reason this silo
 * exists.
 *
 * This file wires slugs, titles, and meta only. No prose and no legal claim
 * lives here -- Tasks 4-8 add hand-written body copy and cited claims to the
 * content registry once the citation ledger is verified.
 */
export interface StateLineDef {
  slug: string;
  title: string;
  h1: string;
  /**
   * Explicit breadcrumb/link label -- see the comment on `SeoPage.label`.
   * These h1s are topic sentences, not "Sell Your House Fast in X", so
   * `placeLabel()` needs this rather than a regex strip.
   */
  label: string;
  metaDescription: string;
  /** Present only for a page that belongs to one state's law, not a comparison. */
  state?: StateCode;
}

export const stateLinePages: StateLineDef[] = [
  {
    slug: "which-side-of-state-line-road",
    title: `Which Side of the State Line Is Your Property On? | ${SITE.name}`,
    h1: "Which Side of the State Line Is Your Property On?",
    label: "State Line Lookup",
    metaDescription:
      "A quick way to check which state your property sits in, and why that " +
      "matters for a Missouri or Kansas sale.",
  },
  {
    slug: "missouri-vs-kansas-foreclosure",
    title: `Missouri Foreclosure vs. Kansas Foreclosure | ${SITE.name}`,
    h1: "Missouri Foreclosure vs. Kansas Foreclosure",
    label: "Foreclosure: MO vs. KS",
    metaDescription:
      "How Missouri and Kansas foreclosure law differs, laid out side by side " +
      "for a homeowner facing one.",
  },
  {
    slug: "kansas-right-of-redemption",
    title: `Kansas Right of Redemption After Foreclosure | ${SITE.name}`,
    h1: "Kansas Right of Redemption After Foreclosure",
    label: "Kansas Redemption Rights",
    metaDescription:
      "What Kansas's post-sale redemption period is and how it works for a homeowner.",
    state: "KS",
  },
  {
    slug: "missouri-trustee-sale-timeline",
    title: `How a Missouri Trustee's Sale Works | ${SITE.name}`,
    h1: "How a Missouri Trustee's Sale Works",
    label: "Missouri Trustee's Sale",
    metaDescription:
      "How Missouri's trustee's sale process moves from notice to sale, step by step.",
    state: "MO",
  },
  {
    slug: "homestead-exemption-missouri-vs-kansas",
    title: `Homestead Exemption: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Homestead Exemption: Missouri vs. Kansas",
    label: "Homestead Exemption",
    metaDescription:
      "How Missouri and Kansas homestead exemptions compare, side by side.",
  },
  {
    slug: "probate-missouri-vs-kansas",
    title: `Selling an Inherited House: Probate in Missouri vs. Kansas | ${SITE.name}`,
    h1: "Probate in Missouri vs. Kansas",
    label: "Probate: MO vs. KS",
    metaDescription:
      "How probate works differently in Missouri and Kansas for someone selling " +
      "an inherited house.",
  },
  {
    slug: "property-tax-assessment-missouri-vs-kansas",
    title: `Property Tax Assessment: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Property Tax Assessment: Missouri vs. Kansas",
    label: "Property Tax Assessment",
    metaDescription:
      "How Missouri and Kansas assess residential property for tax purposes, " +
      "compared side by side.",
  },
  {
    slug: "jackson-county-reassessment",
    title: `Jackson County Reassessment: What It Means for Sellers | ${SITE.name}`,
    h1: "Jackson County Reassessment: What It Means for Sellers",
    label: "Jackson County Reassessment",
    metaDescription:
      "What a Jackson County reassessment is and how it can affect a property " +
      "before it sells.",
    state: "MO",
  },
  {
    slug: "transfer-tax-missouri-vs-kansas",
    title: `Real Estate Transfer Tax: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Real Estate Transfer Tax: Missouri vs. Kansas",
    label: "Transfer Tax",
    metaDescription:
      "How Missouri and Kansas each handle tax on a property transfer, compared " +
      "side by side.",
  },
  {
    slug: "tax-sale-missouri-vs-kansas",
    title: `Property Tax Sale: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Property Tax Sale: Missouri vs. Kansas",
    label: "Tax Sale: MO vs. KS",
    metaDescription: "How a property tax sale works in Missouri compared to Kansas.",
  },
  {
    slug: "deed-of-trust-vs-mortgage",
    title: `Deed of Trust vs. Mortgage: What's the Difference? | ${SITE.name}`,
    h1: "Deed of Trust vs. Mortgage: What's the Difference?",
    label: "Deed of Trust vs. Mortgage",
    metaDescription:
      "What separates a deed of trust from a mortgage, and which one applies to your property.",
  },
  {
    slug: "contract-for-deed-missouri-vs-kansas",
    title: `Contract for Deed: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Contract for Deed: Missouri vs. Kansas",
    label: "Contract for Deed",
    metaDescription:
      "How a contract for deed is treated under Missouri law compared to Kansas law.",
  },
  {
    slug: "seller-disclosure-missouri-vs-kansas",
    title: `Seller Disclosure Requirements: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Seller Disclosure Requirements: Missouri vs. Kansas",
    label: "Seller Disclosure",
    metaDescription:
      "What Missouri and Kansas each require a home seller to disclose, compared " +
      "side by side.",
  },
  {
    slug: "kansas-city-earnings-tax",
    title: `The Kansas City Earnings Tax, Explained | ${SITE.name}`,
    h1: "The Kansas City Earnings Tax, Explained",
    label: "KC Earnings Tax",
    metaDescription:
      "What the Kansas City earnings tax is and who it applies to when a property sells.",
    state: "MO",
  },
];
