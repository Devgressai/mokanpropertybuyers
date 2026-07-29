// tests/sitemap.test.ts
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { isIndexable } from "@/lib/seo/indexation";
import { getAllSeoSlugs } from "@/lib/seo/pageIndex";

describe("sitemap", () => {
  it("lists only indexable pages", () => {
    const urls = sitemap().map((e) => e.url);
    for (const slug of getAllSeoSlugs()) {
      const listed = urls.some((u) => u.endsWith(`/${slug}`));
      expect(listed, slug).toBe(isIndexable(slug));
    }
  });

  it("never advertises a noindex URL", () => {
    for (const entry of sitemap()) {
      const slug = entry.url.split("/").pop()!;
      if (getAllSeoSlugs().includes(slug)) expect(isIndexable(slug)).toBe(true);
    }
  });

  it("always includes the static paths", () => {
    const urls = sitemap().map((e) => e.url);
    for (const p of ["", "/how-it-works", "/about", "/contact", "/faq"]) {
      expect(urls).toContain(`https://mokanpropertybuyers.com${p}`);
    }
  });
});
