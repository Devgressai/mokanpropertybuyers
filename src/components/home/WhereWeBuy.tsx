import Link from "next/link";
import { counties, cities, states } from "@/data/geography";

/**
 * Server component -- safe to import src/data/geography directly here
 * because this file has no "use client" directive and never ships to the
 * browser as a client bundle. Population and county/city counts are derived
 * from the generated footprint at render time rather than hardcoded, so this
 * section can never drift out of sync with data/footprint.json.
 */
const TOP_COUNTY_COUNT = 6;
const TOP_CITY_COUNT = 6;

function topByPopulation<T extends { population: number }>(items: T[], count: number): T[] {
  return [...items].sort((a, b) => b.population - a.population).slice(0, count);
}

export default function WhereWeBuy() {
  const totalPopulation = counties.reduce((sum, c) => sum + c.population, 0);
  const topCounties = topByPopulation(counties, TOP_COUNTY_COUNT);
  const topCities = topByPopulation(cities, TOP_CITY_COUNT);

  return (
    <section className="bg-stone/30 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">Where We Buy</h2>
        <p className="mt-6 text-slate">
          We buy across {counties.length} counties in Missouri and Kansas — roughly{" "}
          {totalPopulation.toLocaleString()} people, on both sides of the state line, within about
          100 miles of Kansas City.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          {states.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="border border-stone bg-limestone px-4 py-2 font-medium text-clay-ink underline"
            >
              Sell your house fast in {s.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-ink">Largest counties we buy in</h3>
            <ul className="mt-3 space-y-2">
              {topCounties.map((c) => (
                <li key={c.slug}>
                  <Link className="text-clay-ink underline" href={`/${c.slug}`}>
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Largest cities we buy in</h3>
            <ul className="mt-3 space-y-2">
              {topCities.map((c) => (
                <li key={c.slug}>
                  <Link className="text-clay-ink underline" href={`/${c.slug}`}>
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
