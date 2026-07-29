"use client";

import Link from "next/link";
import type { SeoPage } from "@/types/seo";
import { placeLabel } from "@/lib/seo/placeCopy";

/**
 * A titled list of links to other geo pages -- a state's counties, a
 * county's cities, or a city's nearby cities. Renders nothing when there is
 * nothing to list rather than showing an empty heading.
 */
export default function PlaceLinkList({ title, items }: { title: string; items: SeoPage[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link className="text-clay-ink underline" href={`/${item.slug}`}>
              {placeLabel(item)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
