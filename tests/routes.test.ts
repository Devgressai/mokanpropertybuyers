// tests/routes.test.ts
import { describe, expect, it } from "vitest";
import {
  generateStaticParams,
  generateMetadata,
} from "@/app/(geo)/[slug]/page";
import { getAllSeoSlugs } from "@/lib/seo/pageIndex";

describe("geo route", () => {
  it("statically generates every indexed geographic slug", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(getAllSeoSlugs().length);
  });

  it("generates both Kansas Citys", async () => {
    const slugs = (await generateStaticParams()).map((p) => p.slug);
    expect(slugs).toContain("sell-my-house-fast-kansas-city-mo");
    expect(slugs).toContain("sell-my-house-fast-kansas-city-ks");
  });

  it("generates all 213 slugs with none repeated", async () => {
    // 199 geographic (state/county/city) + 14 state-line silo pages (Wave 0B).
    const slugs = (await generateStaticParams()).map((p) => p.slug);
    expect(slugs).toHaveLength(199 + 14);
    expect(new Set(slugs).size).toBe(199 + 14);
  });

  it("keeps follow true and index false for a page with no hand-written content", async () => {
    // sell-my-house-fast-missouri was this test's example until Task 8
    // (Wave 0B) gave both state hubs hand-written content and made them
    // indexable on purpose. sell-my-house-fast-jackson-county-mo was this
    // test's next example until Wave 0C's first eight county hubs (see
    // src/data/county-content-metro.ts) gave it content too. Buchanan
    // County, Missouri is one of the 45 counties still untouched -- pick
    // another still-uncovered county here if a later wave reaches it.
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "sell-my-house-fast-buchanan-county-mo" }),
    });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
