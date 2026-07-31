import { ContactForm } from "@/components/ContactForm";

/**
 * Anchor target for the hero's "Request my cash offer" link (#offer).
 * ContactForm is the existing client component from /contact -- reused here
 * rather than rebuilt, per the brief.
 */
export default function OfferFormSection() {
  return (
    <section id="offer" className="bg-river-deep px-6 py-16 text-limestone">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold">Request Your Cash Offer</h2>
        <p className="mt-4 text-stone">
          Tell us about the property and how to reach you. Submitting this form doesn&apos;t
          obligate you to sell — you can walk away at any point before closing.
        </p>
        <div className="mt-8 bg-limestone p-6 text-ink">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
