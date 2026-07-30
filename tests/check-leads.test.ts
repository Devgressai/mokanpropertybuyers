// tests/check-leads.test.ts
import { describe, expect, it } from "vitest";
import { runLeadSmokeTest, runMissingKeySmokeTest } from "../scripts/check-leads.mts";

describe("lead delivery smoke test", () => {
  it("produces an actual payload end to end, not just a 200-shaped result", async () => {
    const result = await runLeadSmokeTest();
    expect(result.ok).toBe(true);
  });

  it("proves a missing API key throws instead of silently succeeding", async () => {
    const result = await runMissingKeySmokeTest();
    expect(result.ok).toBe(true);
  });
});
