"use client";

import type { BreadcrumbItem, SeoPage } from "@/types/seo";
import type { LegalClaim } from "@/types/legal";
import PageShell from "./PageShell";
import LegalClaimList from "./LegalClaimList";
import PlaceLinkList from "./PlaceLinkList";
import RelatedLinkList, { type RelatedLinkItem } from "./RelatedLinkList";

/**
 * The state-line silo -- pages that compare Missouri and Kansas law rather
 * than describe a single place. There's no geographic parent/child hub here
 * (most of these are genuinely bi-state and belong to neither state's
 * hierarchy), so two different link sections stand in for it:
 *   - `siblings`: the full silo index. Populated only on the hub page
 *     ("which-side-of-state-line-road"), which links to all thirteen others.
 *   - `related`: a handful of curated, topically-related siblings plus a
 *     link back to the hub, each with anchor text written for this page --
 *     see `relatedSlugs` in `src/data/state-line.ts`.
 */
export default function StateLinePage({
  page,
  body,
  breadcrumbs,
  claims,
  siblings,
  related,
}: {
  page: SeoPage;
  body: string[];
  breadcrumbs: BreadcrumbItem[];
  claims?: LegalClaim[];
  siblings: SeoPage[];
  related: RelatedLinkItem[];
}) {
  return (
    <PageShell page={page} body={body} breadcrumbs={breadcrumbs}>
      <PlaceLinkList title="Explore the state-line silo" items={siblings} />
      <RelatedLinkList title="Related pages" items={related} />
      <LegalClaimList claims={claims} />
    </PageShell>
  );
}
