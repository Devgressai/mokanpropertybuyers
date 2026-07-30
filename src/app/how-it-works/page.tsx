import type { Metadata } from "next";
import Link from "next/link";
import StaticPageShell from "@/components/StaticPageShell";
import { SITE } from "@/lib/site";

const TITLE = `How It Works | ${SITE.name}`;
const DESCRIPTION =
  "How a cash offer actually gets made, what happens after you accept, and when selling for cash is not the right move.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/how-it-works` },
};

export default function HowItWorksPage() {
  return (
    <StaticPageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "How It Works" }]}
      h1="How It Works"
    >
      <div className="mt-8 space-y-8 text-slate">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">1. You tell us about the property</h2>
          <p>
            Send us the address, a general sense of condition, and a way to reach you through{" "}
            <Link className="underline hover:text-clay-ink" href="/contact">
              the contact form
            </Link>
            . That&apos;s the only thing we need from you to start.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">2. We arrive at a number</h2>
          <p>
            We look at recent sales of comparable properties nearby, the property&apos;s
            condition, and what it would cost to repair, hold, and resell it. A cash, as-is
            offer works backward from what the property could sell for once it&apos;s in
            market-ready condition, minus the repairs, carrying costs, and resale risk we&apos;re
            taking on by buying it as-is. That math is why a cash offer is ordinarily lower
            than what the same house could bring on the open market once repaired and listed —
            see the comparison below.
          </p>
          <p>
            We can&apos;t give you an exact figure without seeing the property, and we don&apos;t
            publish a formula or a percentage-of-value promise here — those vary by property and
            we&apos;d rather tell you honestly that it depends than give you a number we can&apos;t
            back up.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">3. We present the offer — no obligation</h2>
          <p>
            You get a specific number and can ask questions about how we arrived at it. Nothing
            is owed if you decide not to move forward, at this step or any later one, right up
            until closing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">4. If you accept, we close</h2>
          <p>
            No repairs, no commissions, no fees. We don&apos;t ask you to fix anything before
            closing, there&apos;s no agent commission because there&apos;s no agent, and we
            don&apos;t charge you anything to buy the property.
          </p>
          <p>
            We don&apos;t promise a specific closing date up front. Title work, county recording
            schedules, and — if the property is tied up in probate, a tax sale, or a pending
            foreclosure — the specific legal steps that have to clear first, all affect how long
            closing actually takes, and those vary property to property and county to county.
            We&apos;ll tell you what we know about your specific timeline once we&apos;re looking
            at your specific situation, not before.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">
            What you give up compared to listing
          </h2>
          <p>
            A cash sale is a trade, not a strictly better option. In exchange for skipping
            repairs, showings, financing contingencies, and an open-ended closing timeline, you
            typically accept a lower price than a fully repaired, professionally listed home
            would bring on the open market. If your home is in sound, mortgage-financeable
            condition and you have the time to make repairs, hold showings, and wait for a
            buyer&apos;s financing to close, listing with a real estate agent will usually net
            you more money than a cash sale to us or to any other cash buyer. We&apos;d rather
            tell you that plainly than let you find it out after closing.
          </p>
          <p>
            A cash sale tends to make more sense when the property needs work you can&apos;t or
            don&apos;t want to fund, when a traditional buyer&apos;s mortgage lender would decline
            to finance the property&apos;s condition, or when the timeline pressure of probate,
            a pending foreclosure, or a tax sale makes an open-market listing impractical. If
            none of that applies to your situation, we&apos;d encourage you to at least talk to a
            local real estate agent before you decide.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">Selling across the state line</h2>
          <p>
            Missouri and Kansas law genuinely differ on foreclosure, redemption, probate, and
            property tax — see{" "}
            <Link className="underline hover:text-clay-ink" href="/which-side-of-state-line-road">
              which side of the state line your property is on
            </Link>{" "}
            if you&apos;re not sure which rules apply to you.
          </p>
        </section>
      </div>
    </StaticPageShell>
  );
}
