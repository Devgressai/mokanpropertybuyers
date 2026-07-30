// tests/legal-citations.test.ts
import { describe, expect, it } from "vitest";
import { citations } from "../src/data/legal-citations";
import { claimIsCited, auditClaimList } from "../scripts/check-state-claims.mts";

describe("citation ledger", () => {
  it("cites and dates every entry", () => {
    for (const [id, c] of Object.entries(citations)) {
      expect(claimIsCited(c), id).toBe(true);
      expect(c.verifiedOn, id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("labels every entry with a state", () => {
    for (const [id, c] of Object.entries(citations)) {
      expect(c.state, id).toMatch(/^(MO|KS)$/);
    }
  });

  it("gives every entry a source URL", () => {
    for (const [id, c] of Object.entries(citations)) {
      expect(c.sourceUrl, id).toMatch(/^https:\/\//);
    }
  });

  it("passes the state-claims audit gate with no problems", () => {
    for (const [id, c] of Object.entries(citations)) {
      expect(auditClaimList(id, [c]), id).toEqual([]);
    }
  });

  it("carries a citation of its own on every pendingChange", () => {
    for (const [id, c] of Object.entries(citations)) {
      if (c.pendingChange) {
        expect(c.pendingChange.citation.trim().length, id).toBeGreaterThan(0);
      }
    }
  });

  it("requires a contingency note on every proposed pendingChange", () => {
    for (const [id, c] of Object.entries(citations)) {
      if (c.pendingChange?.status === "proposed") {
        expect(c.pendingChange.contingency?.trim().length, id).toBeGreaterThan(0);
      }
    }
  });
});
