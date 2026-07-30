import type { Metadata } from "next";
import Link from "next/link";
import StaticPageShell from "@/components/StaticPageShell";
import { SITE, hasNap } from "@/lib/site";

const TITLE = `About | ${SITE.name}`;
const DESCRIPTION =
  "What MoKan Property Buyers does and doesn't buy across the Kansas City metro.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return (
    <StaticPageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      h1="About MoKan Property Buyers"
    >
      <div className="mt-8 space-y-8 text-slate">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">What we do</h2>
          <p>{SITE.description}</p>
          <p>
            We buy directly, for cash, as-is. No repairs, no commissions, no fees — see{" "}
            <Link className="underline hover:text-clay-ink" href="/how-it-works">
              how the offer process works
            </Link>{" "}
            for the honest version of how a number gets arrived at and what happens after.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">What we don&apos;t do</h2>
          <p>
            We are not a real estate brokerage and don&apos;t list property on the open market —
            if your property is in sound, financeable condition and you have time to wait, a
            listing agent will usually get you more money than a cash sale to us or to any other
            cash buyer will.
          </p>
          <p>
            We are not a lender and don&apos;t arrange financing for buyers or sellers. We
            don&apos;t give a firm price before looking at a property, and we don&apos;t
            guarantee any specific offer, timeline, or outcome in advance.
          </p>
        </section>

        {hasNap() ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ink">Contact</h2>
            <p>{SITE.legalEntity}</p>
            <p>
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region}{" "}
              {SITE.address.postalCode}
            </p>
            <p>{SITE.phone}</p>
          </section>
        ) : (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ink">Get in touch</h2>
            <p>
              Business contact details for {SITE.name} are not yet published on this site. The
              fastest way to reach us is the{" "}
              <Link className="underline hover:text-clay-ink" href="/contact">
                contact form
              </Link>
              .
            </p>
          </section>
        )}
      </div>
    </StaticPageShell>
  );
}
