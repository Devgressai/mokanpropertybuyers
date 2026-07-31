// tests/geography.test.ts
import { describe, expect, it } from "vitest";
import { states, counties, cities, slugifyPlace } from "@/data/geography";

describe("slugifyPlace", () => {
  it("strips Census entity suffixes", () => {
    expect(slugifyPlace("Kansas City city", "MO", "city"))
      .toBe("sell-my-house-fast-kansas-city-mo");
    expect(slugifyPlace("Bonner Springs city", "KS", "city"))
      .toBe("sell-my-house-fast-bonner-springs-ks");
  });

  it("drops apostrophes rather than hyphenating them", () => {
    expect(slugifyPlace("Lee's Summit city", "MO", "city"))
      .toBe("sell-my-house-fast-lees-summit-mo");
  });

  it("drops periods in abbreviated names", () => {
    expect(slugifyPlace("St. Joseph city", "MO", "city"))
      .toBe("sell-my-house-fast-st-joseph-mo");
  });

  it("state-scopes counties", () => {
    expect(slugifyPlace("Johnson County", "KS", "county"))
      .toBe("sell-my-house-fast-johnson-county-ks");
    expect(slugifyPlace("Johnson County", "MO", "county"))
      .toBe("sell-my-house-fast-johnson-county-mo");
  });
});

describe("footprint", () => {
  it("has both states", () => {
    expect(states.map((s) => s.code).sort()).toEqual(["KS", "MO"]);
  });

  it("has 53 counties, 31 Missouri and 22 Kansas", () => {
    expect(counties).toHaveLength(53);
    expect(counties.filter((c) => c.state === "MO")).toHaveLength(31);
    expect(counties.filter((c) => c.state === "KS")).toHaveLength(22);
  });

  // 141, not 144: three cities (El Dorado Springs, Stover, New Franklin) are
  // dropped by the codegen because every county they actually sit in is
  // outside the modeled footprint -- build-footprint.py filters counties and
  // places by distance independently, so a place can be in-radius while its
  // county is not. Parenting them to a nearest modeled county would have put
  // a false jurisdiction in the data. See docs/WAVE-0B-PREREQUISITES.md.
  it("has 141 city pages, all at or above 1,000 population", () => {
    expect(cities).toHaveLength(141);
    expect(Math.min(...cities.map((c) => c.population))).toBeGreaterThanOrEqual(1000);
  });

  it("drops the three places whose real county is outside the modeled footprint, rather than mis-parenting them", () => {
    const droppedSlugs = [
      "sell-my-house-fast-el-dorado-springs-mo",
      "sell-my-house-fast-stover-mo",
      "sell-my-house-fast-new-franklin-mo",
    ];
    const present = cities.map((c) => c.slug);
    for (const slug of droppedSlugs) {
      expect(present, slug).not.toContain(slug);
    }
    for (const county of counties) {
      for (const slug of droppedSlugs) {
        expect(county.citySlugs, `${county.slug} citySlugs`).not.toContain(slug);
      }
    }
  });

  it("keeps both Kansas Cities as distinct pages", () => {
    const kc = cities.filter((c) => c.name === "Kansas City");
    expect(kc).toHaveLength(2);
    expect(kc.map((c) => c.slug).sort()).toEqual([
      "sell-my-house-fast-kansas-city-ks",
      "sell-my-house-fast-kansas-city-mo",
    ]);
    expect(kc.find((c) => c.state === "MO")!.population).toBe(510704);
    expect(kc.find((c) => c.state === "KS")!.population).toBe(152933);
  });

  it("keeps both Johnson Counties as distinct pages", () => {
    const jo = counties.filter((c) => c.name === "Johnson County");
    expect(jo).toHaveLength(2);
    expect(jo.find((c) => c.state === "KS")!.population).toBe(622237);
    expect(jo.find((c) => c.state === "MO")!.population).toBe(54962);
  });

  it("assigns every city to a county that exists in the same state", () => {
    const bySlug = new Map(counties.map((c) => [c.slug, c]));
    for (const city of cities) {
      const county = bySlug.get(city.countySlug);
      expect(county, `${city.slug} -> ${city.countySlug}`).toBeDefined();
      expect(county!.state).toBe(city.state);
    }
  });

  it("produces globally unique slugs across every geographic type", () => {
    const all = [
      ...states.map((s) => s.slug),
      ...counties.map((c) => c.slug),
      ...cities.map((c) => c.slug),
    ];
    expect(new Set(all).size).toBe(all.length);
  });
});
