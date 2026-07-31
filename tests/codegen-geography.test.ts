// tests/codegen-geography.test.ts
//
// Unit tests for the read-boundary validation in the codegen script itself
// (as opposed to tests/geography.test.ts, which tests the generated output).
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assignCounty,
  lookupRealCounties,
  loadCrosswalk,
  parseCrosswalk,
  validateFootprintEntry,
  type StateCode,
} from "../scripts/codegen-geography.mts";
import { cities, counties } from "../src/data/geography";

const validCounty = {
  name: "Example County",
  state: "MO",
  geoid: "29999",
  lat: 39.1,
  lon: -94.5,
  dist: 10.2,
  pop: 12345,
};

describe("validateFootprintEntry", () => {
  it("passes through a well-formed record unchanged", () => {
    expect(validateFootprintEntry(validCounty, "county")).toEqual(validCounty);
  });

  it("defaults a missing population to null", () => {
    const { pop: _pop, ...rest } = validCounty;
    expect(validateFootprintEntry(rest, "county").pop).toBeNull();
  });

  it("rejects a state outside Missouri and Kansas, naming the offending record", () => {
    const nebraska = { ...validCounty, name: "Omaha", state: "NE", geoid: "31055" };
    expect(() => validateFootprintEntry(nebraska, "county")).toThrow(
      /Omaha[\s\S]*NE[\s\S]*31055[\s\S]*unsupported state/
    );
  });

  it("rejects a record missing its geoid", () => {
    const { geoid: _geoid, ...rest } = validCounty;
    expect(() => validateFootprintEntry(rest, "county")).toThrow(/geoid/);
  });

  it("rejects a record missing its name", () => {
    const { name: _name, ...rest } = validCounty;
    expect(() => validateFootprintEntry(rest, "place")).toThrow(/name/);
  });

  it("rejects a non-finite lat", () => {
    expect(() =>
      validateFootprintEntry({ ...validCounty, lat: "not-a-number" }, "place")
    ).toThrow(/lat/);
  });

  it("rejects a non-finite lon", () => {
    expect(() =>
      validateFootprintEntry({ ...validCounty, lon: Number.NaN }, "place")
    ).toThrow(/lon/);
  });

  it("rejects a non-finite dist", () => {
    expect(() =>
      validateFootprintEntry({ ...validCounty, dist: undefined }, "place")
    ).toThrow(/dist/);
  });
});

describe("parseCrosswalk", () => {
  it("parses a single-county row into a one-element county list keyed by state+place FIPS", () => {
    const map = parseCrosswalk("KS|20|64500|Shawnee city|Incorporated Place|A|Johnson County\n");
    expect(map.get("2064500")).toEqual(["Johnson County"]);
  });

  it("splits a multi-county row's comma-separated field into multiple county names", () => {
    const map = parseCrosswalk(
      "MO|29|38000|Kansas City city|Incorporated Place|A|Cass County, Clay County, Jackson County, Platte County\n"
    );
    expect(map.get("2938000")).toEqual([
      "Cass County",
      "Clay County",
      "Jackson County",
      "Platte County",
    ]);
  });

  it("ignores blank lines", () => {
    const map = parseCrosswalk("\nKS|20|64500|Shawnee city|Incorporated Place|A|Johnson County\n\n");
    expect(map.size).toBe(1);
  });
});

describe("lookupRealCounties", () => {
  it("fails loudly, naming the record, when the crosswalk has no row for a place's geoid", () => {
    const crosswalk = new Map<string, string[]>();
    expect(() =>
      lookupRealCounties(crosswalk, { name: "Nowhere", state: "KS", geoid: "2099999" })
    ).toThrow(/Nowhere[\s\S]*KS[\s\S]*2099999[\s\S]*crosswalk/);
  });
});

describe("assignCounty", () => {
  const jackson = { slug: "sell-my-house-fast-jackson-county-mo", name: "Jackson County", lat: 39.0, lon: -94.4 };
  const clay = { slug: "sell-my-house-fast-clay-county-mo", name: "Clay County", lat: 39.3, lon: -94.4 };
  const vernon = { slug: "sell-my-house-fast-vernon-county-mo", name: "Vernon County", lat: 37.8, lon: -94.3 };
  const candidates = [jackson, clay, vernon];
  const place = { name: "Test Place", state: "MO" as StateCode, geoid: "2900000", lat: 39.0, lon: -94.4 };

  it("assigns the single real county directly when only one of the place's real counties is modeled", () => {
    const result = assignCounty(place, ["Jackson County"], candidates);
    expect(result).not.toBeNull();
    expect(result!.primary.slug).toBe(jackson.slug);
    expect(result!.countyNames).toEqual(["Jackson County"]);
  });

  it("breaks a tie among a place's own real, modeled counties by nearest centroid -- never across the full list", () => {
    // A place near Jackson's centroid but real-county-constrained to Clay and Vernon
    // only must land on Clay (nearer of the two, not the unconstrained nearest overall).
    const result = assignCounty(place, ["Clay County", "Vernon County"], candidates);
    expect(result).not.toBeNull();
    expect(result!.primary.slug).toBe(clay.slug);
  });

  it("returns null -- no primary at all -- when none of the place's real counties are modeled, rather than inventing a parent", () => {
    // An earlier version fell back to the nearest modeled county here. That put
    // a false jurisdiction in the data -- "El Dorado Springs, Vernon County" --
    // which the first authoring pass to reach that page would have published on
    // a site whose whole premise is getting the jurisdiction right. The city is
    // dropped by the codegen instead. See docs/WAVE-0B-PREREQUISITES.md.
    const result = assignCounty(place, ["Cedar County"], candidates);
    expect(result).toBeNull();
  });
});

describe("county assignment regression guard (live Census crosswalk)", () => {
  // This is the actual bug-class guard: it recomputes every city's primary
  // county straight from the authoritative Census place-county crosswalk and
  // the same nearest-modeled-county tiebreak codegen-geography.mts uses, then
  // checks that the committed geography.ts agrees. If the assignment logic
  // ever regresses back to the old unconstrained nearest-centroid heuristic,
  // this is the test that catches it -- verified by temporarily corrupting a
  // known assignment (Shawnee -> Wyandotte) while writing this test, which
  // failed loudly as expected before being reverted.
  it("recomputes every city's countySlug from the live crosswalk and matches geography.ts", async () => {
    const crosswalk = await loadCrosswalk(resolve(import.meta.dirname, "../scripts/.cache"));
    const countiesByState = new Map<StateCode, typeof counties>();
    for (const c of counties) {
      const list = countiesByState.get(c.state) ?? [];
      list.push(c);
      countiesByState.set(c.state, list);
    }
    for (const city of cities) {
      const real = lookupRealCounties(crosswalk, city);
      const assignment = assignCounty(city, real, countiesByState.get(city.state)!);
      // Every city still in geography.ts must have a real modeled parent;
      // the ones that did not were dropped by the codegen, not parented falsely.
      expect(assignment, city.slug).not.toBeNull();
      expect(assignment!.primary.slug, city.slug).toBe(city.countySlug);
    }
  });

  it("gives every city a non-empty countiesAll that includes its own assigned county", () => {
    for (const city of cities) {
      expect(city.countiesAll.length, city.slug).toBeGreaterThan(0);
      expect(city.countiesAll, city.slug).toContain(city.countySlug);
    }
  });

  it("resolves Shawnee, KS to Johnson County (not Wyandotte) and Kansas City, MO to all four counties it spans", () => {
    const shawnee = cities.find((c) => c.slug === "sell-my-house-fast-shawnee-ks");
    expect(shawnee?.countySlug).toBe("sell-my-house-fast-johnson-county-ks");

    const kcmo = cities.find((c) => c.slug === "sell-my-house-fast-kansas-city-mo");
    expect([...(kcmo?.countiesAll ?? [])].sort()).toEqual(
      [
        "sell-my-house-fast-cass-county-mo",
        "sell-my-house-fast-clay-county-mo",
        "sell-my-house-fast-jackson-county-mo",
        "sell-my-house-fast-platte-county-mo",
      ].sort()
    );
  });
});
