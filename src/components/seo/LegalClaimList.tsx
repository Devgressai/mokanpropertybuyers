"use client";

import type { LegalClaim } from "@/types/legal";

/** ISO date -> "January 1, 2027", parsed as UTC so it never shifts a day. */
function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Renders a claim's scheduled-but-not-yet-in-force change, if it has one.
 * Enacted and proposed changes are worded differently on purpose: an enacted
 * change is certain to happen on its effective date, a proposed one is
 * contingent and may never happen. Neither reads as the current rule -- the
 * claim above this block is the current rule, and this block says so.
 */
function PendingChangeNotice({ change }: { change: NonNullable<LegalClaim["pendingChange"]> }) {
  const source = change.sourceUrl && (
    <>
      {" "}
      (
      <a className="underline" href={change.sourceUrl}>
        source
      </a>
      )
    </>
  );

  if (change.status === "enacted") {
    return (
      <p className="mt-1 text-clay-ink">
        <span className="font-medium text-ink">Scheduled to change:</span>{" "}
        {change.claim} Effective {formatDate(change.effectiveFrom)}, under {change.citation}
        {source}. The rule above is what applies today; this is what it becomes.
      </p>
    );
  }

  return (
    <p className="mt-1 text-clay-ink">
      <span className="font-medium text-ink">Proposed change, not yet law:</span>{" "}
      {change.claim} If it takes effect, that would happen {formatDate(change.effectiveFrom)}, under{" "}
      {change.citation}
      {source}.{" "}
      {change.contingency && <>{change.contingency} </>}
      The rule above remains current law unless and until this passes.
    </p>
  );
}

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
            {claim.pendingChange && <PendingChangeNotice change={claim.pendingChange} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
