// tests/check-pages.test.ts
import { describe, expect, it } from "vitest";
import { analyzePages, auditPages, type PageLike } from "../scripts/check-pages.mts";

describe("auditPages", () => {
  // 141, not 144: three cities (El Dorado Springs, Stover, New Franklin) are
  // dropped by the codegen because every county they actually sit in is
  // outside the modeled footprint -- build-footprint.py filters counties and
  // places by distance independently, so a place can be in-radius while its
  // county is not. Parenting them to a nearest modeled county would have put
  // a false jurisdiction in the data. See docs/WAVE-0B-PREREQUISITES.md.
  it("finds no duplicate slugs or titles in the real page index", () => {
    const audit = auditPages();
    expect(audit.duplicateSlugs).toEqual([]);
    expect(audit.duplicateTitles).toEqual([]);
  });

  it("resolves every real parentSlug and childSlug", () => {
    expect(auditPages().unresolvedRefs).toEqual([]);
  });

  it("counts 2 states, 53 counties, 141 cities", () => {
    const { countsByType } = auditPages();
    expect(countsByType.state).toBe(2);
    expect(countsByType.county).toBe(53);
    expect(countsByType.city).toBe(141);
  });
});

describe("analyzePages", () => {
  const base: PageLike[] = [
    { slug: "sell-my-house-fast-missouri", title: "Missouri", type: "state" },
    { slug: "sell-my-house-fast-kansas", title: "Kansas", type: "state" },
  ];

  it("reports a duplicate slug shared by two pages", () => {
    const pages: PageLike[] = [
      ...base,
      { slug: "sell-my-house-fast-jackson-county-mo", title: "Jackson", type: "county" },
      { slug: "sell-my-house-fast-jackson-county-mo", title: "Jackson Again", type: "county" },
    ];
    expect(analyzePages(pages).duplicateSlugs).toEqual(["sell-my-house-fast-jackson-county-mo"]);
  });

  it("reports a duplicate title shared by two different slugs", () => {
    const pages: PageLike[] = [
      ...base,
      { slug: "sell-my-house-fast-jackson-county-mo", title: "Same Title", type: "county" },
      { slug: "sell-my-house-fast-johnson-county-ks", title: "Same Title", type: "county" },
    ];
    expect(analyzePages(pages).duplicateTitles).toEqual(["Same Title"]);
  });

  it("reports a parentSlug that resolves to nothing", () => {
    const pages: PageLike[] = [
      ...base,
      {
        slug: "sell-my-house-fast-ghost-county-mo",
        title: "Ghost",
        type: "county",
        parentSlug: "sell-my-house-fast-nowhere",
      },
    ];
    expect(analyzePages(pages).unresolvedRefs).toEqual([
      "sell-my-house-fast-ghost-county-mo: parentSlug -> sell-my-house-fast-nowhere",
    ]);
  });

  it("reports a childSlug that resolves to nothing", () => {
    const pages: PageLike[] = [
      ...base,
      {
        slug: "sell-my-house-fast-jackson-county-mo",
        title: "Jackson",
        type: "county",
        childSlugs: ["sell-my-house-fast-nowhere-mo"],
      },
    ];
    expect(analyzePages(pages).unresolvedRefs).toEqual([
      "sell-my-house-fast-jackson-county-mo: childSlugs -> sell-my-house-fast-nowhere-mo",
    ]);
  });

  it("reports no issues and correct per-type counts for a well-formed set", () => {
    const pages: PageLike[] = [
      ...base,
      {
        slug: "sell-my-house-fast-jackson-county-mo",
        title: "Jackson",
        type: "county",
        parentSlug: "sell-my-house-fast-missouri",
        childSlugs: ["sell-my-house-fast-independence-mo"],
      },
      {
        slug: "sell-my-house-fast-independence-mo",
        title: "Independence",
        type: "city",
        parentSlug: "sell-my-house-fast-jackson-county-mo",
      },
    ];
    const audit = analyzePages(pages);
    expect(audit.duplicateSlugs).toEqual([]);
    expect(audit.duplicateTitles).toEqual([]);
    expect(audit.unresolvedRefs).toEqual([]);
    expect(audit.countsByType).toEqual({ state: 2, county: 1, city: 1 });
    expect(audit.total).toBe(4);
  });
});
