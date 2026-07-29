"use client";

import type { BreadcrumbItem, SeoPage } from "@/types/seo";
import PageShell from "./PageShell";
import PlaceLinkList from "./PlaceLinkList";

/** Top of the hierarchy -- lists every county in the state, no parent to link up to. */
export default function StatePage({
  page,
  body,
  breadcrumbs,
  counties,
}: {
  page: SeoPage;
  body: string[];
  breadcrumbs: BreadcrumbItem[];
  counties: SeoPage[];
}) {
  return (
    <PageShell page={page} body={body} breadcrumbs={breadcrumbs}>
      <PlaceLinkList title="Counties we buy in" items={counties} />
    </PageShell>
  );
}
