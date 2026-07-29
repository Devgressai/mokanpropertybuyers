// scripts/check-links.mts
//
// Gate: every indexable page has at least one inbound internal link. Reported
// as two distinct findings, because they mean different things:
//
//   ORPHAN    — nothing links here at all. A hard failure.
//   HUB-ONLY  — the only thing linking here is the automatic parent-to-child
//               listing (a state's county list, a county's city list) --
//               reachable, but with no link from anywhere else. A sibling
//               project found 65 of 106 guides in exactly this shape: the
//               orphan check passed at zero while those guides had exactly
//               one inbound link, their own index page. Collapsing this into
//               a single pass/fail hides that.
//
// With the content registry empty (true until Wave 0B lands hand-written
// copy), isIndexable() is false for every real slug, so there is nothing to
// check yet -- that is reported honestly rather than as a false "all OK".
import { seoPages } from "../src/lib/seo/pageIndex.js";
import { isIndexable } from "../src/lib/seo/indexation.js";
import { getAllSeoSlugs } from "../src/lib/seo/pageIndex.js";

export interface LinkNode {
  slug: string;
  parentSlug?: string;
  childSlugs?: string[];
  nearbySlugs?: string[];
}

export interface LinkAudit {
  checked: number;
  orphans: string[];
  hubOnly: string[];
}

/**
 * Pure graph analysis, decoupled from the real page index so it can be
 * exercised with known-bad input in tests.
 *
 * The link graph is built from exactly what the geo route renders:
 *   - a page's `childSlugs` become a "hub" inbound edge to each child (the
 *     automatic PlaceLinkList a state/county renders for its counties/cities)
 *   - a page's `parentSlug` becomes a "contextual" inbound edge to that
 *     parent (the ParentLink + breadcrumb a county/city renders up)
 *   - a page's `nearbySlugs` become "contextual" inbound edges (the sibling
 *     cross-links a city page renders)
 *
 * A page is HUB-ONLY when its only inbound edges are hub edges; ORPHAN when
 * it has no inbound edges of either kind.
 */
export function analyzeLinks(nodes: LinkNode[], indexableSlugs: Set<string>): LinkAudit {
  const hubInbound = new Map<string, Set<string>>();
  const contextualInbound = new Map<string, Set<string>>();

  const add = (map: Map<string, Set<string>>, target: string, source: string) => {
    if (!map.has(target)) map.set(target, new Set());
    map.get(target)!.add(source);
  };

  for (const node of nodes) {
    for (const child of node.childSlugs ?? []) add(hubInbound, child, node.slug);
    if (node.parentSlug) add(contextualInbound, node.parentSlug, node.slug);
    for (const nearby of node.nearbySlugs ?? []) add(contextualInbound, nearby, node.slug);
  }

  const orphans: string[] = [];
  const hubOnly: string[] = [];
  let checked = 0;

  for (const slug of indexableSlugs) {
    checked++;
    const hub = hubInbound.get(slug)?.size ?? 0;
    const contextual = contextualInbound.get(slug)?.size ?? 0;
    if (hub + contextual === 0) orphans.push(slug);
    else if (contextual === 0) hubOnly.push(slug);
  }

  return { checked, orphans: orphans.sort(), hubOnly: hubOnly.sort() };
}

export function auditLinks(): LinkAudit {
  const nodes: LinkNode[] = seoPages.map((p) => ({
    slug: p.slug,
    parentSlug: p.parentSlug,
    childSlugs: p.childSlugs,
    nearbySlugs: p.nearbySlugs,
  }));
  const indexableSlugs = new Set(getAllSeoSlugs().filter(isIndexable));
  return analyzeLinks(nodes, indexableSlugs);
}

function main(): void {
  const { checked, orphans, hubOnly } = auditLinks();

  if (checked === 0) {
    console.log("check:links OK — 0 indexable pages, nothing to check");
    return;
  }

  console.log(`checked: ${checked} indexable page(s)`);
  console.log(`orphans (no inbound links): ${orphans.length}`);
  console.log(`hub-only (parent listing only): ${hubOnly.length}`);
  for (const o of orphans) console.error(`ORPHAN    ${o}`);
  for (const h of hubOnly) console.log(`HUB-ONLY  ${h}`);

  if (orphans.length) {
    console.error(`\ncheck:links FAILED — ${orphans.length} orphaned page(s)`);
    process.exit(1);
  }
  console.log(`\ncheck:links OK — ${checked} indexable page(s), 0 orphans`);
}

if (process.argv[1]?.includes("check-links")) main();
