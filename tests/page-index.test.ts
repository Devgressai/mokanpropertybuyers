// tests/page-index.test.ts
import { describe, expect, it } from "vitest";
import {
  seoPages, getPageBySlug, getPagesByType, getPagesByState, getAllSeoSlugs,
} from "@/lib/seo/pageIndex";

describe("pageIndex", () => {
  it("indexes 2 state hubs, 53 counties, and 144 cities", () => {
    expect(getPagesByType("state")).toHaveLength(2);
    expect(getPagesByType("county")).toHaveLength(53);
    expect(getPagesByType("city")).toHaveLength(144);
  });

  it("gives every geographic page a state code", () => {
    for (const p of seoPages) {
      if (["state", "county", "city"].includes(p.type)) {
        expect(p.stateCode, p.slug).toMatch(/^(MO|KS)$/);
      }
    }
  });

  it("parents each county to its state hub", () => {
    const jackson = getPageBySlug("sell-my-house-fast-jackson-county-mo")!;
    expect(jackson.parentSlug).toBe("sell-my-house-fast-missouri");
    expect(jackson.stateCode).toBe("MO");
  });

  it("parents each city to a county in the same state", () => {
    for (const city of getPagesByType("city")) {
      const parent = getPageBySlug(city.parentSlug!);
      expect(parent, city.slug).toBeDefined();
      expect(parent!.type).toBe("county");
      expect(parent!.stateCode).toBe(city.stateCode);
    }
  });

  it("splits pages by state without losing any", () => {
    // getPagesByState filters on stateCode, which the four single-state
    // stateLine pages now carry too (Wave 0B) -- so the geographic total
    // alone is no longer the whole count; the single-state silo pages join it.
    const mo = getPagesByState("MO").length;
    const ks = getPagesByState("KS").length;
    const geoTotal = 2 + 53 + 144;
    const stateLineWithState = getPagesByType("stateLine").filter((p) => p.stateCode).length;
    expect(mo + ks).toBe(geoTotal + stateLineWithState);
    expect(mo).toBe(
      1 +
        31 +
        getPagesByType("city").filter((c) => c.stateCode === "MO").length +
        getPagesByType("stateLine").filter((p) => p.stateCode === "MO").length
    );
  });

  it("emits no duplicate slugs", () => {
    const all = getAllSeoSlugs();
    expect(new Set(all).size).toBe(all.length);
  });
});
