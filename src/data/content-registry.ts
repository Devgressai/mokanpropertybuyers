import type { LegalClaim } from "@/types/legal";
import { stateLineContentForeclosure } from "@/data/state-line-content-foreclosure";
import { stateLineContentMoney } from "@/data/state-line-content-money";
import { stateLineContentTransaction } from "@/data/state-line-content-transaction";
import { stateHubContent } from "@/data/state-hub-content";
import { countyContentMetro } from "@/data/county-content-metro";
import { countyContentOuter } from "@/data/county-content-outer";
import { countyContentRural } from "@/data/county-content-rural";
import { cityContentTier1 } from "@/data/city-content-tier1";
import { cityContentTier2 } from "@/data/city-content-tier2";
import { cityContentTier3a } from "@/data/city-content-tier3a";
import { cityContentTier3b } from "@/data/city-content-tier3b";
import { cityContentTier4a } from "@/data/city-content-tier4a";

export interface PageContent {
  slug: string;
  /** Paragraph blocks of hand-written body copy. */
  body: string[];
  /**
   * Statements of law made by this page. Every entry is audited by
   * `check:state-claims` for a non-empty citation and verification date.
   * Absent on pages that assert no law.
   */
  claims?: LegalClaim[];
}

/**
 * Merge point for all hand-written page content. Wave 0B adds the state-line
 * silo here; later waves add counties, cities, and situations. Empty is a
 * valid state — it simply means nothing is indexable yet, which is true.
 *
 * Extension point: future waves `push(...)` a `Record<string, PageContent>`
 * onto this array rather than editing `merged` directly.
 */
const registries: Record<string, PageContent>[] = [
  stateLineContentForeclosure,
  stateLineContentMoney,
  stateLineContentTransaction,
  stateHubContent,
  countyContentMetro,
  countyContentOuter,
  countyContentRural,
  cityContentTier1,
  cityContentTier2,
  cityContentTier3a,
  cityContentTier3b,
  cityContentTier4a,
];

/** Exported for `check:content-slugs`: a collision is invisible after merge. */
export const contentRegistries: Record<string, PageContent>[] = registries;

const merged: Record<string, PageContent> = Object.assign({}, ...registries);

export function getPageContent(slug: string): PageContent | undefined {
  return merged[slug];
}

export function allContentSlugs(): string[] {
  return Object.keys(merged);
}
