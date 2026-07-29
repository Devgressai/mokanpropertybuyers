/**
 * Central site identity.
 *
 * PLACEHOLDER VALUES are marked below. They are deliberately obvious rather
 * than plausible: a fake-but-realistic phone number is worse than a visibly
 * unset one, because it ships silently. Nothing here may be invented.
 * See docs/superpowers/specs/2026-07-29-mokan-property-buyers-design.md §13.
 */
export const SITE = {
  name: "MoKan Property Buyers",
  url: "https://mokanpropertybuyers.com",
  description:
    "We buy houses, land, and small multifamily for cash across the Kansas City metro — both sides of the state line, and 100 miles out.",
  /** PLACEHOLDER — blocker #3 */
  phone: "",
  /** PLACEHOLDER — blocker #4 */
  address: { street: "", city: "", region: "", postalCode: "", country: "US" },
  /** PLACEHOLDER — blocker #2 */
  legalEntity: "",
  email: "",
} as const;

/** True when real NAP has landed. Schema and call CTAs check this. */
export const hasNap = (): boolean =>
  SITE.phone !== "" && SITE.address.street !== "" && SITE.legalEntity !== "";
