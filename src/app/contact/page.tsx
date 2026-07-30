import type { Metadata } from "next";
import Link from "next/link";
import StaticPageShell from "@/components/StaticPageShell";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

const TITLE = `Request a Cash Offer | ${SITE.name}`;
const DESCRIPTION =
  "Tell us about your property and we'll follow up about a cash offer. No repairs, no commissions, no fees.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <StaticPageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      h1="Request Your Cash Offer"
    >
      <div className="mt-8 space-y-5 text-slate">
        <p>
          Tell us a bit about the property and how to reach you. We&apos;ll follow up to
          discuss a cash offer — no repairs, no commissions, no fees.
        </p>
        <p>
          Submitting this form does not obligate you to sell. If a cash offer isn&apos;t the
          right fit once you see the number, you&apos;re free to walk away — see{" "}
          <Link className="underline hover:text-clay-ink" href="/how-it-works">
            how the offer process works
          </Link>{" "}
          before you decide.
        </p>
      </div>
      <div className="mt-8">
        <ContactForm />
      </div>
    </StaticPageShell>
  );
}
