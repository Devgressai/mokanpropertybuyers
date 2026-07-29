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

  it("generates all 199 slugs with none repeated", async () => {
    const slugs = (await generateStaticParams()).map((p) => p.slug);
    expect(slugs).toHaveLength(199);
    expect(new Set(slugs).size).toBe(199);
  });

  it("keeps follow true and index false for a page with no hand-written content", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "sell-my-house-fast-missouri" }),
    });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
