"use client";

import type { BreadcrumbItem, SeoPage } from "@/types/seo";
import PageShell from "./PageShell";
import PlaceLinkList from "./PlaceLinkList";

/**
 * Top of the hierarchy -- lists every county in the state, no parent to link
 * up to. `siloTopics` is a second, separate list -- the state-scoped
 * state-line pages (e.g. a Missouri trustee's-sale timeline) -- kept in its
 * own PlaceLinkList rather than folded into `counties` so a list of places
 * never ends up rendering legal topics.
 */
export default function StatePage({
  page,
  body,
  breadcrumbs,
  counties,
  siloTopics,
}: {
  page: SeoPage;
  body: string[];
  breadcrumbs: BreadcrumbItem[];
  counties: SeoPage[];
  siloTopics: SeoPage[];
}) {
  return (
    <PageShell page={page} body={body} breadcrumbs={breadcrumbs}>
      <PlaceLinkList title="Counties we buy in" items={counties} />
      <PlaceLinkList title="Legal topics for sellers in this state" items={siloTopics} />
    </PageShell>
  );
}
