export interface PageContent {
  slug: string;
  /** Paragraph blocks of hand-written body copy. */
  body: string[];
}

/**
 * Merge point for all hand-written page content. Wave 0B adds the state-line
 * silo here; later waves add counties, cities, and situations. Empty is a
 * valid state — it simply means nothing is indexable yet, which is true.
 *
 * Extension point: future waves `push(...)` a `Record<string, PageContent>`
 * onto this array rather than editing `merged` directly.
 */
const registries: Record<string, PageContent>[] = [];

const merged: Record<string, PageContent> = Object.assign({}, ...registries);

export function getPageContent(slug: string): PageContent | undefined {
  return merged[slug];
}

export function allContentSlugs(): string[] {
  return Object.keys(merged);
}
