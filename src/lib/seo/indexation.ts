import { getPageContent } from "@/data/content-registry";
import { getPageBySlug } from "@/lib/seo/pageIndex";

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

/**
 * Additional gate for the state-line silo: a `stateLine` page's H1 promises a
 * named legal comparison ("X: Missouri vs. Kansas"), so clearing the
 * word-count floor is not enough on its own -- a page can pad past 600 words
 * of jurisdiction-neutral mechanics and an honest admission that neither
 * state's rule was checked, and still be a promise-versus-delivery mismatch
 * at index time. Requiring at least one verified `claims` entry ties
 * indexability to the same ledger that `check:state-claims` audits, so a
 * comparison page only enters the index once it actually compares something.
 *
 * This does NOT apply to state/county/city pages: their titles describe a
 * place, not a legal comparison, so the word-count floor alone is the right
 * bar for them. Do not widen this to other page types without re-deriving the
 * reasoning above for each one.
 *
 * A future contributor may be tempted to "fix" a page stuck in this state by
 * lowering the bar (e.g. treating any `claims` array, even empty, as
 * sufficient, or dropping the check because a page has "enough words"). Don't
 * -- the fix is to add a verified claim to the ledger, not to relax the gate.
 * See docs/WAVE-0B-PREREQUISITES.md for the two pages currently waiting here.
 */
function isTopicallyIndexable(slug: string, claims: unknown[] | undefined): boolean {
  const page = getPageBySlug(slug);
  if (page?.type !== "stateLine") return true;
  return (claims?.length ?? 0) > 0;
}

export function isIndexable(slug: string): boolean {
  const content = getPageContent(slug);
  if (!content) return false;
  if (!isBodyIndexable(content.body)) return false;
  return isTopicallyIndexable(slug, content.claims);
}

export function robotsFor(slug: string): { index: boolean; follow: boolean } {
  return { index: isIndexable(slug), follow: true };
}
