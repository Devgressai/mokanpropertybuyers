import type { Metadata } from "next";
import Link from "next/link";
import StaticPageShell from "@/components/StaticPageShell";
import { SITE } from "@/lib/site";

const TITLE = `Frequently Asked Questions | ${SITE.name}`;
const DESCRIPTION =
  "Answers to the questions sellers actually ask before requesting a cash offer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/faq` },
};

interface Faq {
  question: string;
  answer: React.ReactNode;
}

const faqs: Faq[] = [
  {
    question: "How do you decide what to offer for my house?",
    answer: (
      <p>
        We look at recent sales of comparable properties, the property&apos;s condition, and
        the repair, holding, and resale costs a cash, as-is purchase carries. See{" "}
        <Link className="underline hover:text-clay-ink" href="/how-it-works">
          how it works
        </Link>{" "}
        for the full explanation, including why a cash offer is ordinarily lower than what the
        same house could bring fully repaired and listed.
      </p>
    ),
  },
  {
    question: "Do I have to make any repairs before selling?",
    answer: <p>No. We buy the property as-is, in its current condition.</p>,
  },
  {
    question: "Will I pay any commissions or fees?",
    answer: <p>No. No repairs, no commissions, no fees.</p>,
  },
  {
    question: "How is this different from listing with a real estate agent?",
    answer: (
      <p>
        Listing usually takes more time and requires repairs, showings, and a buyer&apos;s
        financing to fall into place, but it typically nets a higher price than a cash sale. A
        cash sale skips all of that at the cost of a lower price. If your house is in sound,
        financeable condition and you have time to wait, an agent will usually get you more
        money — see{" "}
        <Link className="underline hover:text-clay-ink" href="/how-it-works">
          how it works
        </Link>{" "}
        for the fuller comparison.
      </p>
    ),
  },
  {
    question: "Do I have to sell once I request an offer?",
    answer: (
      <p>
        No. Requesting an offer doesn&apos;t obligate you to anything. You can walk away at any
        point before closing.
      </p>
    ),
  },
  {
    question: "What areas and property types do you buy?",
    answer: <p>{SITE.description}</p>,
  },
  {
    question: "How do I know which state's rules apply to my property?",
    answer: (
      <p>
        Missouri and Kansas law genuinely differ on foreclosure, redemption, probate, and
        property tax. See{" "}
        <Link className="underline hover:text-clay-ink" href="/which-side-of-state-line-road">
          which side of the state line your property is on
        </Link>{" "}
        to check.
      </p>
    ),
  },
  {
    question: "What if my house is in foreclosure?",
    answer: (
      <p>
        Foreclosure works differently on the Missouri side than the Kansas side. See{" "}
        <Link className="underline hover:text-clay-ink" href="/missouri-vs-kansas-foreclosure">
          Missouri foreclosure vs. Kansas foreclosure
        </Link>{" "}
        for how the two compare, or go straight to{" "}
        <Link className="underline hover:text-clay-ink" href="/missouri-trustee-sale-timeline">
          the Missouri trustee&apos;s-sale timeline
        </Link>{" "}
        or{" "}
        <Link className="underline hover:text-clay-ink" href="/kansas-right-of-redemption">
          the Kansas right of redemption
        </Link>{" "}
        depending on where the property sits. We don&apos;t restate the law here — those pages
        cite the statutes directly and this one doesn&apos;t.
      </p>
    ),
  },
  {
    question: "What if I inherited the house and it's still in probate?",
    answer: (
      <p>
        Probate procedure also differs between the two states. See{" "}
        <Link className="underline hover:text-clay-ink" href="/probate-missouri-vs-kansas">
          Missouri probate vs. Kansas probate
        </Link>{" "}
        for how each handles selling estate real estate.
      </p>
    ),
  },
  {
    question: "What if I owe back property taxes?",
    answer: (
      <p>
        A tax sale is a separate process from a mortgage foreclosure, with its own timeline and
        redemption rules on each side of the line. See{" "}
        <Link className="underline hover:text-clay-ink" href="/tax-sale-missouri-vs-kansas">
          Missouri tax sales vs. Kansas tax sales
        </Link>
        .
      </p>
    ),
  },
  {
    question: "What happens after I request my cash offer?",
    answer: (
      <p>
        See{" "}
        <Link className="underline hover:text-clay-ink" href="/how-it-works">
          how it works
        </Link>{" "}
        for the step-by-step version — we don&apos;t promise a specific timeline here or there,
        since closing depends on title work, county recording, and, if applicable, where a
        foreclosure, tax sale, or probate case stands.
      </p>
    ),
  },
  {
    question: "Is a cash offer always the right choice?",
    answer: (
      <p>
        No. If your house is in good, mortgage-financeable condition and you have time to make
        repairs and wait for a buyer, listing it with a real estate agent will usually net you
        more money than selling for cash — to us or to anyone else. A cash sale tends to make
        more sense when the property needs work, financing would be hard for a traditional buyer
        to get, or a legal timeline (probate, foreclosure, a tax sale) makes waiting impractical.
      </p>
    ),
  },
  {
    question: "Is my information kept private?",
    answer: (
      <p>
        We use the information you submit only to evaluate your property and follow up about a
        possible offer.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <StaticPageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      h1="Frequently Asked Questions"
    >
      <div className="mt-8 space-y-8 text-slate">
        {faqs.map((faq, i) => (
          <section key={i} className="space-y-2">
            <h2 className="text-xl font-semibold text-ink">{faq.question}</h2>
            {faq.answer}
          </section>
        ))}
      </div>
    </StaticPageShell>
  );
}
