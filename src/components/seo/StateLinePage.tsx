"use client";

import type { BreadcrumbItem, SeoPage } from "@/types/seo";
import type { LegalClaim } from "@/types/legal";
import PageShell from "./PageShell";
import LegalClaimList from "./LegalClaimList";

/**
 * The state-line silo -- pages that compare Missouri and Kansas law rather
 * than describe a single place. No parent/child hub list: most of these are
 * genuinely bi-state and belong to neither state's hierarchy. The only
 * addition over the shared PageShell is the cited claim list under the body.
 */
export default function StateLinePage({
  page,
  body,
  breadcrumbs,
  claims,
}: {
  page: SeoPage;
  body: string[];
  breadcrumbs: BreadcrumbItem[];
  claims?: LegalClaim[];
}) {
  return (
    <PageShell page={page} body={body} breadcrumbs={breadcrumbs}>
      <LegalClaimList claims={claims} />
    </PageShell>
  );
}
