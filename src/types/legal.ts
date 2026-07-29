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
}
