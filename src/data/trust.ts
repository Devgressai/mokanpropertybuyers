/**
 * HONESTY RULE: every value here must be real and independently verifiable.
 * Components render these ONLY when populated, so an empty file ships nothing
 * false. Do NOT invent stats, ratings, review counts, or a person.
 * Populating this requires user-supplied verified figures (spec §13, blocker 6).
 */
export interface TrustStat {
  value: string;
  label: string;
}

export const trustStats: TrustStat[] = [];
export const reviews: never[] = [];
