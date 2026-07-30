import type { ReactNode } from "react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { BreadcrumbItem } from "@/types/seo";

/**
 * Shared chrome for the four static marketing pages (/how-it-works, /about,
 * /contact, /faq). These sit outside the SeoPage graph -- they have no
 * `page.h1`/`page.body` to hand to PageShell/PageBody -- but the visual
 * shell (breadcrumb, max-width column, h1 treatment) should still match the
 * rest of the site rather than reinvent it per page.
 */
export default function StaticPageShell({
  breadcrumbs,
  h1,
  children,
}: {
  breadcrumbs: BreadcrumbItem[];
  h1: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 text-4xl font-semibold text-ink">{h1}</h1>
      {children}
    </main>
  );
}
