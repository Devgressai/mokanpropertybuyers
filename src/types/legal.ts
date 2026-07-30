import type { StateCode } from "@/data/geography";

/**
 * A statement of law. Every field is required because the failure mode this
 * type exists to prevent is a confident, uncited, state-ambiguous assertion.
 */
export interface LegalClaim {
  state: StateCode;
  claim: string;
  /** Statute, constitutional article, or named official source. Never empty. */
  citation: string;
  sourceUrl?: string;
  /** ISO date the claim was checked against its source. */
  verifiedOn: string;
  /**
   * ISO date this rule took effect. Omit when the rule is long-settled.
   */
  effectiveFrom?: string;
  /**
   * A scheduled change to this rule that is enacted but not yet in force.
   * Rendered to the reader, because a seller planning around a deadline needs
   * to know the rule changes before their timeline ends.
   */
  pendingChange?: {
    /** What it becomes. */
    claim: string;
    /** ISO date it takes effect. */
    effectiveFrom: string;
    /** The enacting instrument, e.g. "H.B. 1870 (2026)". */
    citation: string;
    sourceUrl?: string;
    /**
     * "enacted" — signed into law; the effectiveFrom date is certain (e.g.
     * Missouri's H.B. 1870 homestead increase). "proposed" — passed only
     * partway through the process (e.g. a Kansas constitutional amendment
     * still needing voter approval) and may never take effect at all.
     * These are not the same claim strength and must not be rendered the same way.
     */
    status: "enacted" | "proposed";
    /**
     * Required when status is "proposed". What still has to happen, e.g.
     * "requires voter approval; failed to reach the ballot in 2025 -- died
     * in the Kansas Senate before a statewide vote could be scheduled."
     */
    contingency?: string;
  };
}
