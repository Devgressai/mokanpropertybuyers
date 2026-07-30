// tests/legal-claim-list.test.ts
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import LegalClaimList from "../src/components/seo/LegalClaimList";
import type { LegalClaim } from "../src/types/legal";

function render(claims: LegalClaim[]): string {
  return renderToStaticMarkup(createElement(LegalClaimList, { claims }));
}

const base: LegalClaim = {
  state: "MO",
  claim: "Missouri's homestead exemption is $15,000.",
  citation: "RSMo 513.475",
  sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=513.475",
  verifiedOn: "2026-07-29",
  effectiveFrom: "2003-08-28",
};

describe("LegalClaimList pendingChange rendering", () => {
  it("renders no pendingChange markup at all when the field is absent", () => {
    const html = render([base]);
    expect(html).toContain("$15,000");
    expect(html).not.toMatch(/Scheduled to change|Proposed change|not yet law|not yet in force/);
  });

  it("renders an enacted pendingChange with its new value, effective date, and enacting citation", () => {
    const html = render([
      {
        ...base,
        pendingChange: {
          claim: "Homestead exemption rises to $40,000.",
          effectiveFrom: "2027-01-01",
          citation: "H.B. 1870 (2026), signed 2026-05-06, merged with S.B. 835 & 1111",
          status: "enacted",
        },
      },
    ]);
    expect(html).toContain("$40,000");
    expect(html).toContain("January 1, 2027");
    expect(html).toContain("H.B. 1870 (2026)");
    expect(html).toContain("Scheduled to change");
  });

  it("renders a proposed pendingChange differently from an enacted one, and does not read as scheduled", () => {
    const enacted = render([
      {
        ...base,
        pendingChange: {
          claim: "Homestead exemption rises to $40,000.",
          effectiveFrom: "2027-01-01",
          citation: "H.B. 1870 (2026)",
          status: "enacted",
        },
      },
    ]);
    const proposed = render([
      {
        ...base,
        pendingChange: {
          claim: "Homestead exemption would rise to $100,000.",
          effectiveFrom: "2028-01-01",
          citation: "S.J.R. 12 (2027)",
          status: "proposed",
          contingency: "Requires voter approval; not yet on any ballot.",
        },
      },
    ]);

    // Different wording for the two claim strengths -- not the same phrasing.
    expect(enacted).toContain("Scheduled to change");
    expect(enacted).not.toContain("Proposed change");
    expect(proposed).toContain("Proposed change, not yet law");
    expect(proposed).not.toContain("Scheduled to change:");

    // The proposed case must never read as certain/scheduled.
    expect(proposed).toMatch(/if it takes effect/i);
    expect(proposed).toContain("Requires voter approval; not yet on any ballot.");

    // The contingency note only shows up for the proposed change.
    expect(enacted).not.toContain("Requires voter approval");
  });

  it("makes the current rule and the pending rule distinguishable, not just both present", () => {
    const html = render([
      {
        ...base,
        pendingChange: {
          claim: "Homestead exemption rises to $40,000.",
          effectiveFrom: "2027-01-01",
          citation: "H.B. 1870 (2026)",
          status: "enacted",
        },
      },
    ]);

    // Both values appear...
    expect(html).toContain("$15,000");
    expect(html).toContain("$40,000");

    // ...but the copy explicitly marks which one is current law today and
    // which one is the future state, so a reader can't mistake one for the
    // other. This is the assertion that would fail if pendingChange were
    // rendered as an undifferentiated second claim.
    expect(html).toMatch(/rule above is what applies today/);

    // The current claim's own paragraph carries none of the future-tense
    // scheduling language -- it reads as a plain present-tense statement.
    const currentClaimIndex = html.indexOf("$15,000");
    const pendingIndex = html.indexOf("Scheduled to change");
    expect(currentClaimIndex).toBeGreaterThanOrEqual(0);
    expect(pendingIndex).toBeGreaterThan(currentClaimIndex);
  });

  it("includes the pendingChange source link when provided", () => {
    const html = render([
      {
        ...base,
        pendingChange: {
          claim: "Homestead exemption rises to $40,000.",
          effectiveFrom: "2027-01-01",
          citation: "H.B. 1870 (2026)",
          sourceUrl: "https://house.mo.gov/Bill.aspx?bill=HB1870",
          status: "enacted",
        },
      },
    ]);
    expect(html).toContain('href="https://house.mo.gov/Bill.aspx?bill=HB1870"');
  });
});
