"use client";

import type { LegalClaim } from "@/types/legal";

/**
 * Renders a page's cited legal claims where the reader can actually see
 * them -- the citation is the point, not just an audited field in the data.
 * Someone deciding whether to believe a foreclosure timeline should see the
 * statute next to it. Renders nothing when there are no claims yet (true for
 * every state-line page until Tasks 4-8 land content), rather than an empty
 * heading.
 */
export default function LegalClaimList({ claims }: { claims?: LegalClaim[] }) {
  if (!claims || claims.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-ink">Sources</h2>
      <ul className="mt-3 space-y-3 text-sm text-slate">
        {claims.map((claim, i) => (
          <li key={i}>
            <p>{claim.claim}</p>
            <p className="text-clay-ink">
              {claim.state} — {claim.citation}
              {claim.sourceUrl && (
                <>
                  {" "}
                  (
                  <a className="underline" href={claim.sourceUrl}>
                    source
                  </a>
                  )
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
