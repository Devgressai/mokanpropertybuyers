interface BuyCategory {
  title: string;
  description: string;
}

/**
 * Concrete list of what actually gets bought -- deliberately more specific
 * than "any property" so a seller with land, farm ground, or a small
 * commercial building recognizes themselves rather than assuming this site
 * is single-family-only.
 */
const CATEGORIES: BuyCategory[] = [
  {
    title: "Houses in any condition",
    description:
      "Occupied or vacant, move-in ready or in need of major repair. We buy as-is, so nothing needs to be fixed before we look at it.",
  },
  {
    title: "Land and vacant lots",
    description: "Unimproved parcels, whether they're ready to build on or not.",
  },
  {
    title: "Farm ground",
    description: "Row crop, pasture, or a mix, in the counties we cover on both sides of the line.",
  },
  {
    title: "Small multifamily",
    description: "Duplexes, triplexes, and small apartment buildings.",
  },
  {
    title: "Small commercial",
    description: "Small commercial buildings and mixed-use properties.",
  },
  {
    title: "Creative-financing situations",
    description:
      "A property that owes more than it's worth, a title complication, or a seller who needs a structured deal instead of a lump sum at closing. Tell us the specifics and we'll tell you honestly whether we can help.",
  },
];

export default function WhatWeBuy() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">What We Buy</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <li key={c.title} className="border border-stone p-4">
              <p className="font-semibold text-ink">{c.title}</p>
              <p className="mt-1 text-slate">{c.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
