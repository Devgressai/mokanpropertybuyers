import Link from "next/link";

/**
 * Deliberately brief -- the full step-by-step (including the "what you give
 * up compared to listing" comparison) lives on /how-it-works. This section
 * exists so a homepage visitor gets the honest shape of the process without
 * leaving the page, not a duplicate of that page's copy. No day/hour counts
 * anywhere here -- see tests/homepage.test.ts.
 */
export default function HowOfferWorks() {
  return (
    <section className="bg-stone/30 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">How the Offer Works</h2>
        <div className="mt-6 space-y-4 text-slate">
          <p>
            We look at recent sales of comparable properties nearby, the property&apos;s
            condition, and what it would cost to repair, hold, and resell it. That math is why a
            cash, as-is offer is ordinarily lower than what the same property could bring on the
            open market once repaired and listed — we&apos;d rather say that plainly up front than
            let you find it out later.
          </p>
          <p>
            You get a specific number and no obligation to accept it. If you do move forward,
            there are no repairs to make, no agent commission, and no fees taken out at closing.
          </p>
          <p>
            <Link className="underline hover:text-clay-ink" href="/how-it-works">
              Read the full process
            </Link>{" "}
            for exactly how we arrive at a number, what happens after you accept, and when selling
            for cash isn&apos;t the right move.
          </p>
        </div>
      </div>
    </section>
  );
}
