"use client";

import type { ReactNode } from "react";
import type { BreadcrumbItem, SeoPage } from "@/types/seo";
import Breadcrumbs from "./Breadcrumbs";
import PageBody from "./PageBody";

/**
 * The shape every geo page shares: breadcrumbs, heading, body copy (or the
 * honest stub). What comes after the body -- a county list, a city list, a
 * link back up the hierarchy -- is genuinely different per page type, so it
 * is passed in as children rather than folded into this component.
 */
export default function PageShell({
  page,
  body,
  breadcrumbs,
  children,
}: {
  page: SeoPage;
  body: string[];
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 text-4xl font-semibold text-ink">{page.h1}</h1>
      <PageBody page={page} body={body} />
      {children}
    </main>
  );
}
