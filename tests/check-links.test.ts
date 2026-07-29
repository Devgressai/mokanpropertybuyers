// tests/check-links.test.ts
import { describe, expect, it } from "vitest";
import { analyzeLinks, auditLinks, type LinkNode } from "../scripts/check-links.mts";

describe("auditLinks (real page index, empty content registry)", () => {
  it("reports honestly that there are 0 indexable pages to check", () => {
    // The content registry is empty by design until Wave 0B lands copy, so
    // isIndexable() is false for every real slug -- this is the case the
    // gate must report as "nothing to check", not as a false "all OK".
    const audit = auditLinks();
    expect(audit.checked).toBe(0);
    expect(audit.orphans).toEqual([]);
    expect(audit.hubOnly).toEqual([]);
  });
});

describe("analyzeLinks", () => {
  const nodes: LinkNode[] = [
    {
      slug: "state-a",
      childSlugs: ["county-a"],
    },
    {
      slug: "county-a",
      parentSlug: "state-a",
      childSlugs: ["city-a", "city-b"],
    },
    {
      slug: "city-a",
      parentSlug: "county-a",
      nearbySlugs: ["city-b"],
    },
    {
      slug: "city-b",
      parentSlug: "county-a",
      nearbySlugs: ["city-a"],
    },
    // Not listed as anyone's child, has no parent, and nothing points at it.
    {
      slug: "city-orphan",
    },
  ];

  it("flags a page nothing links to as ORPHAN", () => {
    const audit = analyzeLinks(nodes, new Set(["city-orphan"]));
    expect(audit.checked).toBe(1);
    expect(audit.orphans).toEqual(["city-orphan"]);
    expect(audit.hubOnly).toEqual([]);
  });

  it("flags a page whose only inbound link is its parent's hub listing as HUB-ONLY", () => {
    // city-a and city-b link to each other via nearbySlugs (contextual), so
    // use a node with only a parent->child hub listing and no contextual
    // cross-link to isolate the HUB-ONLY case.
    const hubOnlyNodes: LinkNode[] = [
      { slug: "state-a", childSlugs: ["county-a"] },
      { slug: "county-a", parentSlug: "state-a", childSlugs: ["city-lonely"] },
      { slug: "city-lonely", parentSlug: "county-a" },
    ];
    const audit = analyzeLinks(hubOnlyNodes, new Set(["city-lonely"]));
    expect(audit.orphans).toEqual([]);
    expect(audit.hubOnly).toEqual(["city-lonely"]);
  });

  it("does not flag a page with a contextual (nearby) inbound link", () => {
    const audit = analyzeLinks(nodes, new Set(["city-a", "city-b"]));
    expect(audit.orphans).toEqual([]);
    expect(audit.hubOnly).toEqual([]);
  });

  it("only checks pages in the indexable set, ignoring everything else", () => {
    // city-orphan has no inbound edges of any kind in this fixture -- it
    // would be reported ORPHAN if checked, but it isn't in the indexable
    // set passed here, so it must not appear in the findings at all.
    const audit = analyzeLinks(nodes, new Set(["city-a"]));
    expect(audit.checked).toBe(1);
    expect(audit.orphans).toEqual([]);
  });

  it("reports 0 checked and no findings for an empty indexable set", () => {
    const audit = analyzeLinks(nodes, new Set());
    expect(audit.checked).toBe(0);
    expect(audit.orphans).toEqual([]);
    expect(audit.hubOnly).toEqual([]);
  });
});
