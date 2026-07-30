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
/** The silo's orientation page -- see the comment on `relatedSlugs` below. */
export const STATE_LINE_HUB_SLUG = "which-side-of-state-line-road";

export interface RelatedLink {
  slug: string;
  /**
   * Anchor text for this one source-page-to-target-page relationship. Always
   * authored here, never derived from the target's own `label` -- a target
   * linked from three different siblings should read three different ways,
   * not repeat the same string three times across the site.
   */
  anchor: string;
}

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
  /**
   * Curated topical cross-links to sibling silo pages. Absent on the hub
   * (`STATE_LINE_HUB_SLUG`), which links to every sibling via the automatic
   * silo index instead -- see `buildSeoPages()` in `pageIndex.ts`. Every
   * other page carries a small, genuinely-related set: its own topic
   * cluster, plus a link back to the hub so a reader (and a crawler) always
   * has a way back to "which side of the line am I on."
   */
  relatedSlugs?: RelatedLink[];
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
    relatedSlugs: [
      {
        slug: "kansas-right-of-redemption",
        anchor: "how long a Kansas owner has to redeem after that sale",
      },
      {
        slug: "missouri-trustee-sale-timeline",
        anchor: "the trustee's-sale steps on the Missouri side",
      },
      {
        slug: "deed-of-trust-vs-mortgage",
        anchor: "why Missouri's process runs through a trustee at all",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "confirm which state the property is actually in",
      },
    ],
  },
  {
    slug: "kansas-right-of-redemption",
    title: `Kansas Right of Redemption After Foreclosure | ${SITE.name}`,
    h1: "Kansas Right of Redemption After Foreclosure",
    label: "Kansas Redemption Rights",
    metaDescription:
      "What Kansas's post-sale redemption period is and how it works for a homeowner.",
    state: "KS",
    relatedSlugs: [
      {
        slug: "missouri-vs-kansas-foreclosure",
        anchor: "how the Missouri side of this same process differs",
      },
      {
        slug: "deed-of-trust-vs-mortgage",
        anchor: "why Kansas has no non-judicial shortcut at all",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "double-check the property is actually on the Kansas side",
      },
    ],
  },
  {
    slug: "missouri-trustee-sale-timeline",
    title: `How a Missouri Trustee's Sale Works | ${SITE.name}`,
    h1: "How a Missouri Trustee's Sale Works",
    label: "Missouri Trustee's Sale",
    metaDescription:
      "How Missouri's trustee's sale process moves from notice to sale, step by step.",
    state: "MO",
    relatedSlugs: [
      {
        slug: "missouri-vs-kansas-foreclosure",
        anchor: "how this compares to the Kansas side of the line",
      },
      {
        slug: "deed-of-trust-vs-mortgage",
        anchor: "the instrument that makes this non-judicial sale possible",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "confirm the property is actually in a Missouri county",
      },
    ],
  },
  {
    slug: "homestead-exemption-missouri-vs-kansas",
    title: `Homestead Exemption: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Homestead Exemption: Missouri vs. Kansas",
    label: "Homestead Exemption",
    metaDescription:
      "How Missouri and Kansas homestead exemptions compare, side by side.",
    relatedSlugs: [
      {
        slug: "property-tax-assessment-missouri-vs-kansas",
        anchor: "how the underlying assessed value is set",
      },
      {
        slug: "jackson-county-reassessment",
        anchor: "a real example of that assessed value changing",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which state's exemption rules even apply",
      },
    ],
  },
  {
    slug: "probate-missouri-vs-kansas",
    title: `Selling an Inherited House: Probate in Missouri vs. Kansas | ${SITE.name}`,
    h1: "Probate in Missouri vs. Kansas",
    label: "Probate: MO vs. KS",
    metaDescription:
      "How probate works differently in Missouri and Kansas for someone selling " +
      "an inherited house.",
    relatedSlugs: [
      {
        slug: "seller-disclosure-missouri-vs-kansas",
        anchor: "what an heir still has to disclose at sale",
      },
      {
        slug: "tax-sale-missouri-vs-kansas",
        anchor: "what happens if the taxes go unpaid during probate",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which state's probate court has jurisdiction",
      },
    ],
  },
  {
    slug: "property-tax-assessment-missouri-vs-kansas",
    title: `Property Tax Assessment: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Property Tax Assessment: Missouri vs. Kansas",
    label: "Property Tax Assessment",
    metaDescription:
      "How Missouri and Kansas assess residential property for tax purposes, " +
      "compared side by side.",
    relatedSlugs: [
      {
        slug: "homestead-exemption-missouri-vs-kansas",
        anchor: "an exemption that can reduce that assessed value",
      },
      {
        slug: "jackson-county-reassessment",
        anchor: "a Jackson County reassessment in practice",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which state's assessor even has jurisdiction",
      },
    ],
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
    relatedSlugs: [
      {
        slug: "property-tax-assessment-missouri-vs-kansas",
        anchor: "how Missouri and Kansas assessment methods compare",
      },
      {
        slug: "kansas-city-earnings-tax",
        anchor: "the other Jackson County-area tax that catches sellers off guard",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "confirm the property is actually in Jackson County",
      },
    ],
  },
  {
    slug: "transfer-tax-missouri-vs-kansas",
    title: `Real Estate Transfer Tax: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Real Estate Transfer Tax: Missouri vs. Kansas",
    label: "Transfer Tax",
    metaDescription:
      "How Missouri and Kansas each handle tax on a property transfer, compared " +
      "side by side.",
    relatedSlugs: [
      {
        slug: "property-tax-assessment-missouri-vs-kansas",
        anchor: "how the two states differ on ongoing property tax",
      },
      {
        slug: "kansas-city-earnings-tax",
        anchor: "the earnings tax that applies after closing, not at it",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which state's transfer tax rules apply",
      },
    ],
  },
  {
    slug: "tax-sale-missouri-vs-kansas",
    title: `Property Tax Sale: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Property Tax Sale: Missouri vs. Kansas",
    label: "Tax Sale: MO vs. KS",
    metaDescription: "How a property tax sale works in Missouri compared to Kansas.",
    relatedSlugs: [
      {
        slug: "contract-for-deed-missouri-vs-kansas",
        anchor: "another non-traditional way title changes hands",
      },
      {
        slug: "probate-missouri-vs-kansas",
        anchor: "how unpaid taxes intersect with an inherited property",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which state's tax sale process applies",
      },
    ],
  },
  {
    slug: "deed-of-trust-vs-mortgage",
    title: `Deed of Trust vs. Mortgage: What's the Difference? | ${SITE.name}`,
    h1: "Deed of Trust vs. Mortgage: What's the Difference?",
    label: "Deed of Trust vs. Mortgage",
    metaDescription:
      "What separates a deed of trust from a mortgage, and which one applies to your property.",
    relatedSlugs: [
      {
        slug: "missouri-vs-kansas-foreclosure",
        anchor: "how that difference plays out end to end",
      },
      {
        slug: "kansas-right-of-redemption",
        anchor: "the redemption right that follows a Kansas judicial sale",
      },
      {
        slug: "missouri-trustee-sale-timeline",
        anchor: "the trustee's-sale process this instrument enables",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which instrument actually secures this property",
      },
    ],
  },
  {
    slug: "contract-for-deed-missouri-vs-kansas",
    title: `Contract for Deed: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Contract for Deed: Missouri vs. Kansas",
    label: "Contract for Deed",
    metaDescription:
      "How a contract for deed is treated under Missouri law compared to Kansas law.",
    relatedSlugs: [
      {
        slug: "tax-sale-missouri-vs-kansas",
        anchor: "what happens when property taxes go unpaid instead",
      },
      {
        slug: "seller-disclosure-missouri-vs-kansas",
        anchor: "what a seller still owes a buyer under this arrangement",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which state's contract-for-deed rules apply",
      },
    ],
  },
  {
    slug: "seller-disclosure-missouri-vs-kansas",
    title: `Seller Disclosure Requirements: Missouri vs. Kansas | ${SITE.name}`,
    h1: "Seller Disclosure Requirements: Missouri vs. Kansas",
    label: "Seller Disclosure",
    metaDescription:
      "What Missouri and Kansas each require a home seller to disclose, compared " +
      "side by side.",
    relatedSlugs: [
      {
        slug: "probate-missouri-vs-kansas",
        anchor: "disclosure obligations for an inherited house specifically",
      },
      {
        slug: "contract-for-deed-missouri-vs-kansas",
        anchor: "a sale structure where disclosure rules still apply",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "which state's disclosure form actually applies",
      },
    ],
  },
  {
    slug: "kansas-city-earnings-tax",
    title: `The Kansas City Earnings Tax, Explained | ${SITE.name}`,
    h1: "The Kansas City Earnings Tax, Explained",
    label: "KC Earnings Tax",
    metaDescription:
      "What the Kansas City earnings tax is and who it applies to when a property sells.",
    state: "MO",
    relatedSlugs: [
      {
        slug: "jackson-county-reassessment",
        anchor: "the property-value side of Jackson County's tax picture",
      },
      {
        slug: "transfer-tax-missouri-vs-kansas",
        anchor: "the one-time tax due at closing instead",
      },
      {
        slug: "which-side-of-state-line-road",
        anchor: "confirm the property is actually inside Kansas City limits",
      },
    ],
  },
];

const stateLineBySlug = new Map(stateLinePages.map((d) => [d.slug, d]));

export function getStateLineDef(slug: string): StateLineDef | undefined {
  return stateLineBySlug.get(slug);
}
