"use client";

import Link from "next/link";

export interface RelatedLinkItem {
  slug: string;
  anchor: string;
}

/**
 * Curated topical cross-links between state-line silo pages. Unlike
 * `PlaceLinkList`, the anchor text here is authored per source page (see
 * `relatedSlugs` in `src/data/state-line.ts`) rather than the target's own
 * label -- a page linked from several siblings should read differently from
 * each one, not repeat the same anchor string everywhere it's linked.
 */
export default function RelatedLinkList({
  title,
  items,
}: {
  title: string;
  items: RelatedLinkItem[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.slug}>
            <Link className="text-clay-ink underline" href={`/${item.slug}`}>
              {item.anchor}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
