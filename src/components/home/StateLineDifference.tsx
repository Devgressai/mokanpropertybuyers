import Link from "next/link";

interface SiloLink {
  href: string;
  label: string;
}

/**
 * Literal hrefs to four of the fourteen state-line silo pages (src/data/state-line.ts),
 * the same pattern the FAQ and how-it-works pages already use for this silo.
 * This section states that the legal difference exists and matters, and sends
 * the reader to the cited pages for the substance -- it makes no legal claim
 * of its own, so it carries no citation and isn't audited by check:state-claims.
 */
const SILO_LINKS: SiloLink[] = [
  { href: "/missouri-vs-kansas-foreclosure", label: "Missouri Foreclosure vs. Kansas Foreclosure" },
  { href: "/kansas-right-of-redemption", label: "Kansas Right of Redemption After Foreclosure" },
  { href: "/which-side-of-state-line-road", label: "Which Side of the State Line Is Your Property On?" },
  {
    href: "/homestead-exemption-missouri-vs-kansas",
    label: "Homestead Exemption: Missouri vs. Kansas",
  },
];

export default function StateLineDifference() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">The State-Line Difference</h2>
        <div className="mt-6 space-y-4 text-slate">
          <p>
            Two nearly identical houses a few miles apart, one on each side of the
            Missouri–Kansas line, can face genuinely different legal paths if the owner is behind
            on payments or taxes. Missouri allows a lender to foreclose without going to court;
            Kansas requires a judicial foreclosure and leaves the owner a period afterward to
            redeem the property. The two states also protect a different amount of home equity
            from creditors. That&apos;s not a technicality — it changes how much time a seller
            actually has and what their real options are.
          </p>
          <p>
            We don&apos;t restate the law here. The pages below do, with citations to the actual
            statutes:
          </p>
        </div>
        <ul className="mt-6 space-y-2">
          {SILO_LINKS.map((l) => (
            <li key={l.href}>
              <Link className="text-clay-ink underline" href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
