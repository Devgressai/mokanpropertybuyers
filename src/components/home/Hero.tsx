import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * The single h1 for the homepage. Everything else on the page is an h2 or
 * lower -- see tests/homepage.test.ts. The CTA is an in-page anchor to the
 * offer form at the bottom of the page (#offer), not a route, so check:hrefs
 * skips it (it only resolves hrefs starting with "/").
 */
export default function Hero() {
  return (
    <section className="bg-river-deep px-6 py-16 text-limestone sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Sell Your House, Land, or Small Multifamily Property for Cash
        </h1>
        <p className="mt-6 text-lg text-stone">{SITE.description}</p>
        <p className="mt-4 text-stone">
          Tell us about the property and we&apos;ll follow up with a cash offer — no repairs, no
          commissions, no fees, and no obligation to accept.
        </p>
        <div className="mt-8">
          <Link
            href="#offer"
            className="inline-block bg-clay px-6 py-3 text-lg font-medium text-limestone"
          >
            Request my cash offer
          </Link>
        </div>
      </div>
    </section>
  );
}
