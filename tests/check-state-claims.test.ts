// tests/check-state-claims.test.ts
import { describe, expect, it } from "vitest";
import { findUnlabeledBlends, claimIsCited, auditClaimList } from "../scripts/check-state-claims.mts";

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

describe("citation enforcement", () => {
  it("reports a claim whose citation is empty", () => {
    const result = auditClaimList("sell-my-house-fast-missouri", [
      { state: "MO", claim: "Homestead is $15,000.", citation: "", verifiedOn: "2026-07-29" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("sell-my-house-fast-missouri");
    expect(result[0]).toContain("Homestead is $15,000.");
  });

  it("reports a claim whose citation is only whitespace", () => {
    expect(auditClaimList("x", [
      { state: "KS", claim: "Redemption is 12 months.", citation: "   ", verifiedOn: "2026-07-29" },
    ])).toHaveLength(1);
  });

  it("accepts a cited claim", () => {
    expect(auditClaimList("x", [
      { state: "MO", claim: "Homestead is $15,000.",
        citation: "RSMo 513.475", verifiedOn: "2026-07-29" },
    ])).toEqual([]);
  });

  it("reports a claim with no verifiedOn date", () => {
    expect(auditClaimList("x", [
      { state: "MO", claim: "Homestead is $15,000.",
        citation: "RSMo 513.475", verifiedOn: "" },
    ])).toHaveLength(1);
  });

  it("accepts a claim carrying effectiveFrom", () => {
    expect(auditClaimList("x", [
      { state: "MO", claim: "Trustee sale notice runs 20 insertions.",
        citation: "RSMo 443.320", verifiedOn: "2026-07-29",
        effectiveFrom: "1989-08-28" },
    ])).toEqual([]);
  });

  it("accepts an enacted pendingChange that carries its own citation", () => {
    expect(auditClaimList("x", [
      { state: "MO", claim: "Homestead is $15,000.",
        citation: "RSMo 513.475", verifiedOn: "2026-07-29",
        pendingChange: {
          claim: "Homestead rises to $40,000.",
          effectiveFrom: "2027-01-01",
          citation: "H.B. 1870 (2026)",
          status: "enacted",
        } },
    ])).toEqual([]);
  });

  it("accepts a proposed pendingChange that carries a contingency", () => {
    expect(auditClaimList("x", [
      { state: "KS", claim: "Residential assessment rate is 11.5%.",
        citation: "Kan. Const. Art. 11 §1", verifiedOn: "2026-07-29",
        pendingChange: {
          claim: "Assessment increases capped at 3% annually.",
          effectiveFrom: "2026-01-01",
          citation: "HCR 5011 (2025)",
          status: "proposed",
          contingency: "requires two-thirds passage in both chambers and statewide voter approval",
        } },
    ])).toEqual([]);
  });

  it("rejects a proposed pendingChange with no contingency", () => {
    const result = auditClaimList("x", [
      { state: "KS", claim: "Residential assessment rate is 11.5%.",
        citation: "Kan. Const. Art. 11 §1", verifiedOn: "2026-07-29",
        pendingChange: {
          claim: "Assessment increases capped at 3% annually.",
          effectiveFrom: "2026-01-01",
          citation: "HCR 5011 (2025)",
          status: "proposed",
        } },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("contingency");
  });

  it("rejects a proposed pendingChange whose contingency is only whitespace", () => {
    expect(auditClaimList("x", [
      { state: "KS", claim: "Placeholder.",
        citation: "K.S.A. 1-1", verifiedOn: "2026-07-29",
        pendingChange: {
          claim: "Placeholder future rule.",
          effectiveFrom: "2027-01-01",
          citation: "HCR 0000 (2025)",
          status: "proposed",
          contingency: "   ",
        } },
    ])).toHaveLength(1);
  });

  it("rejects a pendingChange with no citation of its own", () => {
    const result = auditClaimList("x", [
      { state: "MO", claim: "Homestead is $15,000.",
        citation: "RSMo 513.475", verifiedOn: "2026-07-29",
        pendingChange: {
          claim: "Homestead rises to $40,000.",
          effectiveFrom: "2027-01-01",
          citation: "",
          status: "enacted",
        } },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("pendingChange");
  });

  it("rejects a pendingChange whose citation is only whitespace", () => {
    expect(auditClaimList("x", [
      { state: "KS", claim: "Placeholder current rule.",
        citation: "K.S.A. 1-1", verifiedOn: "2026-07-29",
        pendingChange: {
          claim: "Placeholder future rule.",
          effectiveFrom: "2027-01-01",
          citation: "   ",
          status: "enacted",
        } },
    ])).toHaveLength(1);
  });
});
