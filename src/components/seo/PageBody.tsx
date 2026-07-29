"use client";

import type { SeoPage } from "@/types/seo";
import { noContentCopy } from "@/lib/seo/placeCopy";

/**
 * Hand-written body copy when there is any, otherwise the honest stub. Every
 * geo page type falls back to this same rule, so it lives in one place.
 */
export default function PageBody({ page, body }: { page: SeoPage; body: string[] }) {
  if (body.length > 0) {
    return (
      <div className="mt-8 space-y-5 text-slate">
        {body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    );
  }
  return <p className="mt-8 text-slate">{noContentCopy(page)}</p>;
}
