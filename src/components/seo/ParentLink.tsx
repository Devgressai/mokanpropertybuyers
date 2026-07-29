"use client";

import Link from "next/link";
import type { SeoPage } from "@/types/seo";
import { placeLabel } from "@/lib/seo/placeCopy";

/** A single "see the whole X" link up to a county's state or a city's county. */
export default function ParentLink({ parent, label }: { parent?: SeoPage; label: string }) {
  if (!parent) return null;
  return (
    <p className="mt-10 text-sm">
      <Link className="text-clay-ink underline" href={`/${parent.slug}`}>
        {label} ({placeLabel(parent)})
      </Link>
    </p>
  );
}
