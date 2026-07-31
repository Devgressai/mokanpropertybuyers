import Link from "next/link";

/**
 * A real section, not a footnote -- see the brief. Two distinct cases where
 * selling to us is the wrong move: the general listing-vs-cash trade (same
 * honesty already on /how-it-works and /faq) and the Kansas-specific
 * redemption-window case, which only exists because of the state-line
 * difference above. No day counts, no guarantees -- just the honest trade.
 */
export default function WrongMove() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">When Selling to Us Is the Wrong Move</h2>
        <div className="mt-6 space-y-4 text-slate">
          <p>
            A cash sale is a trade, not automatically the better option. If your house is in
            sound, mortgage-financeable condition and you have the time to make repairs, hold
            showings, and wait for a buyer&apos;s financing to close, listing with a real estate
            agent will usually net you more money than selling for cash — to us or to any other
            cash buyer. We&apos;d rather tell you that up front than let you find it out after
            closing.
          </p>
          <p>
            On the Kansas side specifically, an owner who still has meaningful equity and time
            left in a post-foreclosure redemption period often should not sell in a hurry at all.
            Selling quickly to skip the wait can mean giving up equity you were never at real risk
            of losing — see{" "}
            <Link className="underline hover:text-clay-ink" href="/kansas-right-of-redemption">
              how Kansas redemption rights work
            </Link>{" "}
            before deciding, and talk to a real estate agent or an attorney if you&apos;re not
            sure where you stand.
          </p>
          <p>
            A cash sale tends to make more sense when a property needs work you can&apos;t or
            don&apos;t want to fund, a traditional lender would decline to finance its condition,
            or a legal timeline — probate, a pending foreclosure, a tax sale — makes an open-market
            listing impractical. See{" "}
            <Link className="underline hover:text-clay-ink" href="/how-it-works">
              how the offer process works
            </Link>{" "}
            for the fuller comparison.
          </p>
        </div>
      </div>
    </section>
  );
}
