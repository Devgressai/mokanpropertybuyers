import type { BreadcrumbItem, SeoPage } from "@/types/seo";

/**
 * Strips the boilerplate lede off an SeoPage's H1 to get a bare place name
 * ("Sell Your House Fast in Jackson County, MO" -> "Jackson County, MO").
 * Pure string work, no lookups -- safe to call from client components.
 */
export function placeLabel(page: SeoPage): string {
  return page.h1.replace(/^Sell Your House Fast in /, "");
}

/**
 * Home > ... ancestor chain ... > current page (current page has no href).
 * `parent`/`grandparent` must already be resolved -- this module does no
 * lookups of its own, so it never needs the page index or content registry
 * and stays safe to import from a "use client" file.
 */
export function buildBreadcrumbs(
  page: SeoPage,
  parent?: SeoPage,
  grandparent?: SeoPage
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  if (grandparent) items.push({ label: placeLabel(grandparent), href: `/${grandparent.slug}` });
  if (parent) items.push({ label: placeLabel(parent), href: `/${parent.slug}` });
  items.push({ label: placeLabel(page) });
  return items;
}

/**
 * Honest fallback copy for a page with no hand-written body yet. States only
 * what is true today: we buy property there, in any condition, and will make
 * an offer. No stats, no guarantees, no timeline promises, no superlatives.
 */
export function noContentCopy(page: SeoPage): string {
  const place = placeLabel(page);
  if (page.type === "city") {
    return `We buy houses in ${place} in any condition. Tell us about the property and we will make an offer.`;
  }
  return `We buy houses, land, and small multifamily for cash throughout ${place}. Tell us about the property and we will make an offer.`;
}
