"use client";

import type { BreadcrumbItem, SeoPage } from "@/types/seo";
import PageShell from "./PageShell";
import PlaceLinkList from "./PlaceLinkList";
import ParentLink from "./ParentLink";

/** Bottom of the hierarchy -- cross-links to nearby cities, links back up to its county. */
export default function CityPage({
  page,
  body,
  breadcrumbs,
  county,
  nearby,
}: {
  page: SeoPage;
  body: string[];
  breadcrumbs: BreadcrumbItem[];
  county?: SeoPage;
  nearby: SeoPage[];
}) {
  return (
    <PageShell page={page} body={body} breadcrumbs={breadcrumbs}>
      <PlaceLinkList title="Nearby cities" items={nearby} />
      <ParentLink parent={county} label="See the whole county" />
    </PageShell>
  );
}
