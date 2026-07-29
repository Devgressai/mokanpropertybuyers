// tests/codegen-geography.test.ts
//
// Unit tests for the read-boundary validation in the codegen script itself
// (as opposed to tests/geography.test.ts, which tests the generated output).
import { describe, expect, it } from "vitest";
import { validateFootprintEntry } from "../scripts/codegen-geography.mts";

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
