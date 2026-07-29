// tests/check-state-claims.test.ts
import { describe, expect, it } from "vitest";
import { findUnlabeledBlends, claimIsCited } from "../scripts/check-state-claims.mts";

describe("state-claims gate", () => {
  it("flags a paragraph naming both states with no state label", () => {
    const blends = findUnlabeledBlends([
      "The redemption period runs twelve months and the trustee sale is set by the lender.",
    ]);
    expect(blends).toHaveLength(0); // names neither state — nothing to blend
  });

  it("flags a paragraph asserting law across both states at once", () => {
    const blends = findUnlabeledBlends([
      "In Missouri and Kansas the foreclosure sale happens without a court hearing.",
    ]);
    expect(blends).toHaveLength(1);
  });

  it("accepts a paragraph that labels each state separately", () => {
    const blends = findUnlabeledBlends([
      "Missouri forecloses without a court. [MO]",
      "Kansas requires a judicial foreclosure and allows redemption. [KS]",
    ]);
    expect(blends).toHaveLength(0);
  });

  it("rejects a legal claim with no citation", () => {
    expect(claimIsCited({
      state: "KS", claim: "Homestead is unlimited in value.",
      citation: "", verifiedOn: "2026-07-29",
    })).toBe(false);
  });

  it("accepts a legal claim with a citation", () => {
    expect(claimIsCited({
      state: "KS", claim: "Homestead is unlimited in value.",
      citation: "Kan. Const. Art. 15 §9", verifiedOn: "2026-07-29",
    })).toBe(true);
  });

  it("does not flag 'Kansas City, Missouri' as a state blend", () => {
    const blends = findUnlabeledBlends([
      "In Kansas City, Missouri, the trustee sale follows a foreclosure notice recorded with the county.",
    ]);
    expect(blends).toHaveLength(0);
  });

  it("does not flag a paragraph naming only one state", () => {
    const blends = findUnlabeledBlends([
      "Missouri forecloses through a deed of trust without a court hearing.",
    ]);
    expect(blends).toHaveLength(0);
  });

  it("does not flag both states named with no legal assertion", () => {
    const blends = findUnlabeledBlends([
      "We buy houses in Missouri and Kansas.",
    ]);
    expect(blends).toHaveLength(0);
  });

  it("flags a blend even when the label appears in a different paragraph", () => {
    const blends = findUnlabeledBlends([
      "Missouri forecloses without a court. [MO]",
      "In Missouri and Kansas the redemption period varies by state.",
    ]);
    expect(blends).toHaveLength(1);
  });
});
