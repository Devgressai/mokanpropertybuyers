"use client";

import Link from "next/link";
import type { BreadcrumbItem } from "@/types/seo";

/**
 * Pure presentational trail. It renders exactly the items it is given --
 * building the ancestor chain requires walking parent/grandparent slugs
 * through the page index, which happens server-side in the route and is
 * passed down already resolved.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link className="underline hover:text-clay-ink" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
