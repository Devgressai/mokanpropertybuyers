import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo/pageIndex";
import { isIndexable } from "@/lib/seo/indexation";
import { SITE } from "@/lib/site";

const STATIC_PATHS = ["", "/how-it-works", "/about", "/contact", "/faq"];

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
