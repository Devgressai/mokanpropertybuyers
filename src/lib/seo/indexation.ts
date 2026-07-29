import { getPageContent } from "@/data/content-registry";

/**
 * A page earns `index, follow` by having hand-written body copy at or above
 * this floor. Below it, the page still renders and still passes link equity,
 * but it stays out of the index.
 *
 * Sierra indexed 748 pages and drew 9 clicks in three months. The page count
 * was never the constraint; publishing thin pages to reach it was the risk.
 */
export const MIN_INDEXABLE_WORDS = 600;

export function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Pure threshold check, split out from `isIndexable` so the boundary itself
 * (599 vs. 600 words) is testable without needing real content in the
 * registry — the registry is empty until content waves land, and staying
 * empty is correct, not a test fixture problem to work around.
 */
export function isBodyIndexable(body: string[]): boolean {
  return wordCount(body) >= MIN_INDEXABLE_WORDS;
}

export function isIndexable(slug: string): boolean {
  const content = getPageContent(slug);
  if (!content) return false;
  return isBodyIndexable(content.body);
}

export function robotsFor(slug: string): { index: boolean; follow: boolean } {
  return { index: isIndexable(slug), follow: true };
}
