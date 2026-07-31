// tests/state-line.test.ts
import { describe, expect, it } from "vitest";
import { stateLinePages } from "@/data/state-line";
import { getAllSeoSlugs, getPagesByType, getPageBySlug } from "@/lib/seo/pageIndex";
import { buildBreadcrumbs } from "@/lib/seo/placeCopy";

describe("state-line silo", () => {
  it("defines 14 anchor pages", () => {
    expect(stateLinePages).toHaveLength(14);
  });

  it("registers every one in the page index", () => {
    expect(getPagesByType("stateLine")).toHaveLength(14);
    for (const p of stateLinePages) expect(getPageBySlug(p.slug)).toBeDefined();
  });

  it("keeps total slugs unique after adding the silo", () => {
    const all = getAllSeoSlugs();
    expect(new Set(all).size).toBe(all.length);
    expect(all).toHaveLength(196 + 14);
  });

  it("never collides with a geographic slug", () => {
    for (const p of stateLinePages) expect(p.slug).not.toMatch(/-(mo|ks)$/);
  });

  it("prioritizes the silo above city pages and below state hubs", () => {
    for (const p of getPagesByType("stateLine")) {
      expect(p.priority).toBe(95);
    }
  });

  it("parents a single-state page to its state hub and leaves comparison pages unparented", () => {
    const mo = getPageBySlug("missouri-trustee-sale-timeline")!;
    expect(mo.stateCode).toBe("MO");
    expect(mo.parentSlug).toBe("sell-my-house-fast-missouri");

    const ks = getPageBySlug("kansas-right-of-redemption")!;
    expect(ks.stateCode).toBe("KS");
    expect(ks.parentSlug).toBe("sell-my-house-fast-kansas");

    const comparison = getPageBySlug("missouri-vs-kansas-foreclosure")!;
    expect(comparison.stateCode).toBeUndefined();
    expect(comparison.parentSlug).toBeUndefined();
  });

  it("does not leak a full h1 sentence into the breadcrumb label", () => {
    const page = getPageBySlug("missouri-vs-kansas-foreclosure")!;
    const crumbs = buildBreadcrumbs(page);
    const last = crumbs[crumbs.length - 1];
    expect(last.label).not.toBe(page.h1);
    expect(last.label).toBe(page.label);
  });
});
