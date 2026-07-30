// tests/check-content-slugs.test.ts
import { describe, expect, it } from "vitest";
import { findDuplicateContentSlugs, auditContentSlugs } from "../scripts/check-content-slugs.mts";

describe("findDuplicateContentSlugs", () => {
  it("reports a slug defined in two maps", () => {
    expect(findDuplicateContentSlugs([
      { "a": {}, "b": {} },
      { "b": {}, "c": {} },
    ])).toEqual(["b"]);
  });

  it("reports each colliding slug once even across three maps", () => {
    expect(findDuplicateContentSlugs([{ "a": {} }, { "a": {} }, { "a": {} }])).toEqual(["a"]);
  });

  it("accepts disjoint maps", () => {
    expect(findDuplicateContentSlugs([{ "a": {} }, { "b": {} }])).toEqual([]);
  });

  it("accepts a single map", () => {
    expect(findDuplicateContentSlugs([{ "a": {}, "b": {} }])).toEqual([]);
  });
});

describe("auditContentSlugs", () => {
  it("finds no duplicates in the real registry", () => {
    expect(auditContentSlugs().duplicates).toEqual([]);
  });
});
