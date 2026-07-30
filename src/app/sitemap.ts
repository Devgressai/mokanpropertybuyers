import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo/pageIndex";
import { isIndexable } from "@/lib/seo/indexation";
import { SITE } from "@/lib/site";

// Only paths with a route that actually exists today belong here. Advertising
// a URL that 404s is worse than advertising a noindex page — Google indexes
// the 404 and the site loses the crawl budget for nothing. Add an entry the
// same commit its page ships, never before.
// Pending, not yet built: "/how-it-works", "/about", "/contact", "/faq".
const STATIC_PATHS = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((p) => ({
    url: `${SITE.url}${p}`,
    priority: p === "" ? 1 : 0.6,
  }));

  // A sitemap entry is a claim that the URL should rank. Advertising a
  // noindex URL sends Google two contradictory signals about the same page.
  const pageEntries = seoPages
    .filter((p) => isIndexable(p.slug))
    .map((p) => ({ url: `${SITE.url}/${p.slug}`, priority: p.priority / 100 }));

  return [...staticEntries, ...pageEntries];
}
