import { states, counties, cities, type StateCode } from "@/data/geography";
import { SITE } from "@/lib/site";
import type { PageType, SeoPage } from "@/types/seo";

// Keyed by state code (e.g. "MO"), not by slug — despite the map holding StateDef values.
const stateByCode = new Map(states.map((s) => [s.code, s]));

function buildSeoPages(): SeoPage[] {
  const pages: SeoPage[] = [];

  for (const state of states) {
    const own = counties.filter((c) => c.state === state.code);
    pages.push({
      slug: state.slug,
      title: `Sell My House Fast in ${state.name} | ${SITE.name}`,
      h1: `Sell Your House Fast in ${state.name}`,
      type: "state",
      stateCode: state.code,
      childSlugs: own.map((c) => c.slug),
      priority: 100,
      metaDescription:
        `We buy houses, land, and small multifamily for cash across ${state.name}. ` +
        `${state.name} law sets the timeline — here is exactly how it works.`,
    });
  }

  for (const county of counties) {
    const state = stateByCode.get(county.state)!;
    pages.push({
      slug: county.slug,
      title: `Sell My House Fast in ${county.name}, ${county.state} | ${SITE.name}`,
      h1: `Sell Your House Fast in ${county.name}, ${county.state}`,
      type: "county",
      stateCode: county.state,
      parentSlug: state.slug,
      childSlugs: county.citySlugs,
      priority: 90,
      metaDescription:
        `Cash offers on houses, land, and small multifamily in ${county.name}, ` +
        `${state.name}. Any condition. You pick the closing date.`,
    });
  }

  const countyBySlug = new Map(counties.map((c) => [c.slug, c]));
  for (const city of cities) {
    const county = countyBySlug.get(city.countySlug)!;
    pages.push({
      slug: city.slug,
      title: `Sell My House Fast in ${city.name}, ${city.state} | ${SITE.name}`,
      h1: `Sell Your House Fast in ${city.name}, ${city.state}`,
      type: "city",
      stateCode: city.state,
      parentSlug: county.slug,
      nearbySlugs: nearestSiblings(city.slug),
      priority: city.tier === 1 ? 88 : city.tier === 2 ? 80 : 70,
      metaDescription:
        `Sell your ${city.name}, ${city.state} house as-is for cash. No repairs, ` +
        `no commissions, no fees. Get an offer and close on your timeline.`,
    });
  }

  return pages;
}

/**
 * Six nearest cities in the same state, ranked by distance.
 *
 * `d` below is a cheap equirectangular approximation (flat-earth hypot with a
 * cosine longitude correction), not true haversine distance in miles. That's
 * intentional: this only needs to rank cities relative to each other, not
 * report a real distance — don't "fix" this into a slower haversine, and
 * don't reuse `d` as an actual mile value.
 */
function nearestSiblings(slug: string): string[] {
  const self = cities.find((c) => c.slug === slug)!;
  return cities
    .filter((c) => c.slug !== slug && c.state === self.state)
    .map((c) => ({
      slug: c.slug,
      d: Math.hypot(c.lat - self.lat, (c.lon - self.lon) * Math.cos((self.lat * Math.PI) / 180)),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map((c) => c.slug);
}

export const seoPages: SeoPage[] = buildSeoPages();

const pageMap = new Map(seoPages.map((p) => [p.slug, p]));

export function getPageBySlug(slug: string): SeoPage | undefined {
  return pageMap.get(slug);
}
export function getPagesByType(type: PageType): SeoPage[] {
  return seoPages.filter((p) => p.type === type);
}
export function getPagesByState(code: StateCode): SeoPage[] {
  return seoPages.filter((p) => p.stateCode === code);
}
export function getAllSeoSlugs(): string[] {
  return seoPages.map((p) => p.slug);
}
