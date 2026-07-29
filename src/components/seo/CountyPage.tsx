"use client";

import type { BreadcrumbItem, SeoPage } from "@/types/seo";
import PageShell from "./PageShell";
import PlaceLinkList from "./PlaceLinkList";
import ParentLink from "./ParentLink";

/** Middle of the hierarchy -- lists its cities, links back up to its state. */
export default function CountyPage({
  page,
  body,
  breadcrumbs,
  state,
  cities,
}: {
  page: SeoPage;
  body: string[];
  breadcrumbs: BreadcrumbItem[];
  state?: SeoPage;
  cities: SeoPage[];
}) {
  return (
    <PageShell page={page} body={body} breadcrumbs={breadcrumbs}>
      <PlaceLinkList title="Cities we buy in" items={cities} />
      <ParentLink parent={state} label="See the whole state" />
    </PageShell>
  );
}
