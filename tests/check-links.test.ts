// tests/check-links.test.ts
import { describe, expect, it } from "vitest";
import { analyzeLinks, auditLinks, type LinkNode } from "../scripts/check-links.mts";
import { getAllSeoSlugs } from "../src/lib/seo/pageIndex.js";
import { isIndexable } from "../src/lib/seo/indexation.js";
import { stateLinePages } from "../src/data/state-line.js";

describe("auditLinks (real page index, live content registry)", () => {
  // Wave 0B landed hand-written copy for five state-line pages, so
  // isIndexable() is now true for those five -- this asserts the real
  // wiring, not a hardcoded page count that would go stale the moment
  // Task 6 or 7 adds more content.
  it("reports at least one indexable page and 0 orphans / 0 hub-only", () => {
    const audit = auditLinks();
    expect(audit.checked).toBeGreaterThan(0);
    expect(audit.orphans).toEqual([]);
    expect(audit.hubOnly).toEqual([]);
  });

  it("gives every currently-indexable state-line page a contextual inbound link, not just the hub listing", () => {
    // Contextual = a parentSlug/nearbySlugs edge from a genuinely related
    // page, as opposed to only being reachable via a hub's automatic
    // listing. See the curated `relatedSlugs` cross-links in
    // src/data/state-line.ts.
    const stateLineSlugs = new Set(stateLinePages.map((d) => d.slug));
    const indexableStateLineSlugs = getAllSeoSlugs().filter(
      (slug) => stateLineSlugs.has(slug) && isIndexable(slug)
    );
    // Guards against this test silently checking nothing if content ever
    // regresses back out of the registry.
    expect(indexableStateLineSlugs.length).toBeGreaterThan(0);

    const audit = auditLinks();
    for (const slug of indexableStateLineSlugs) {
      expect(audit.orphans).not.toContain(slug);
      expect(audit.hubOnly).not.toContain(slug);
    }
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
