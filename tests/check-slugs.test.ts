// tests/check-slugs.test.ts
import { describe, expect, it } from "vitest";
import { analyzeSlugs, auditSlugs } from "../scripts/check-slugs.mts";

describe("auditSlugs", () => {
  // 141, not 144: three cities (El Dorado Springs, Stover, New Franklin) are
  // dropped by the codegen because every county they actually sit in is
  // outside the modeled footprint -- build-footprint.py filters counties and
  // places by distance independently, so a place can be in-radius while its
  // county is not. Parenting them to a nearest modeled county would have put
  // a false jurisdiction in the data. See docs/WAVE-0B-PREREQUISITES.md.
  it("finds no duplicate slugs in the real footprint", () => {
    expect(auditSlugs().duplicates).toEqual([]);
  });

  it("finds no unscoped geographic slugs", () => {
    expect(auditSlugs().unscoped).toEqual([]);
  });

  it("audits every geographic page", () => {
    expect(auditSlugs().total).toBe(2 + 53 + 141);
  });
});

describe("analyzeSlugs", () => {
  it("reports a duplicate slug shared across two entries", () => {
    const result = analyzeSlugs(
      ["sell-my-house-fast-missouri", "sell-my-house-fast-kansas"],
      ["sell-my-house-fast-kansas-city-mo", "sell-my-house-fast-kansas-city-mo"]
    );
    expect(result.duplicates).toEqual(["sell-my-house-fast-kansas-city-mo"]);
  });

  it("reports a county/city slug missing its -mo/-ks suffix", () => {
    const result = analyzeSlugs(
      ["sell-my-house-fast-missouri"],
      ["sell-my-house-fast-johnson-county"]
    );
    expect(result.unscoped).toEqual(["sell-my-house-fast-johnson-county"]);
  });

  it("does not flag state hub slugs as unscoped even without a -mo/-ks suffix", () => {
    const result = analyzeSlugs(["sell-my-house-fast-missouri"], []);
    expect(result.unscoped).toEqual([]);
  });

  it("computes total as the combined count of state and geographic slugs", () => {
    const result = analyzeSlugs(
      ["sell-my-house-fast-missouri", "sell-my-house-fast-kansas"],
      ["sell-my-house-fast-olathe-ks"]
    );
    expect(result.total).toBe(3);
  });

  it("reports no issues for well-formed, unique, scoped input", () => {
    const result = analyzeSlugs(
      ["sell-my-house-fast-missouri", "sell-my-house-fast-kansas"],
      ["sell-my-house-fast-olathe-ks", "sell-my-house-fast-independence-mo"]
    );
    expect(result.duplicates).toEqual([]);
    expect(result.unscoped).toEqual([]);
  });
});
