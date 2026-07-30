// src/lib/leads.ts
//
// Lead delivery, isolated from Next.js and from Resend.
//
// The lesson this file exists to enforce (spec §12): IronCrest and Boise Bath
// both lost leads silently for two weeks after a Resend key rotation --
// nothing errored, nothing alerted, the form kept returning success.
// Sacramento Bath's quote endpoint only ever console.log'd the lead and
// returned 200. Neither failure is acceptable here.
//
// Two structural choices follow directly from that:
//   1. assertLeadDeliveryConfigured() throws if delivery cannot possibly
//      succeed, and submitLead() calls it before anything else -- before
//      rate limiting, before the honeypot check, before validation -- so
//      there is no code path that reports success without being able to
//      deliver.
//   2. Delivery goes through a small `LeadTransport` interface. Tests exercise
//      real validation/escaping/rate-limit/honeypot logic with a fake
//      transport and assert on the payload that *would* have been sent --
//      not a mock call count, which Sacramento Bath's failure mode would
//      have passed just as easily.

/** Raw, untrusted shape of a POST body before validation. */
export interface LeadInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  propertyAddress?: unknown;
  message?: unknown;
  /** Hidden form field. Real visitors never populate it; bots often do. */
  honeypot?: unknown;
}

/** A lead after validation: every field is a trimmed, length-checked string. */
export interface ValidatedLead {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  message: string;
}

// FIELD_LIMITS, escapeHtml, isValidEmail, and isValidPhone live in
// lead-validation.ts -- the pure, dependency-free surface that
// ContactForm.tsx ("use client") imports from directly, so a future import
// added to this file (e.g. the `resend` package) can never ride along into
// the client bundle. Re-exported here for backward compatibility with
// existing callers/tests.
import { FIELD_LIMITS, escapeHtml, isValidEmail, isValidPhone } from "./lead-validation";
export { FIELD_LIMITS, escapeHtml, isValidEmail, isValidPhone };

/**
 * Strip CR/LF before a value is placed in an email header (subject, reply-to).
 * Without this, a newline in a user-controlled field is header injection.
 */
function stripCrlf(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim();
}

export type LeadValidationResult =
  | { ok: true; value: ValidatedLead }
  | { ok: false; issues: string[] };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Pure validation -- no I/O, no env, so it is trivial to exercise exhaustively. */
export function validateLead(input: LeadInput): LeadValidationResult {
  const issues: string[] = [];

  const name = asString(input.name);
  const email = asString(input.email);
  const phone = asString(input.phone);
  const propertyAddress = asString(input.propertyAddress);
  const message = asString(input.message);

  if (!name) issues.push("name is required");
  else if (name.length > FIELD_LIMITS.name) issues.push("name is too long");

  if (!email) issues.push("email is required");
  else if (!isValidEmail(email)) issues.push("email is invalid");

  if (!phone) issues.push("phone is required");
  else if (!isValidPhone(phone)) issues.push("phone is invalid");

  if (!propertyAddress) issues.push("propertyAddress is required");
  else if (propertyAddress.length > FIELD_LIMITS.propertyAddress) {
    issues.push("propertyAddress is too long");
  }

  if (message.length > FIELD_LIMITS.message) issues.push("message is too long");

  if (issues.length > 0) return { ok: false, issues };
  return { ok: true, value: { name, email, phone, propertyAddress, message } };
}

// ---------------------------------------------------------------------------
// Rate limiting -- in-memory, per IP. Resets on redeploy; that is an accepted
// tradeoff for a single-instance Vercel function, not a gap to silently widen.
// ---------------------------------------------------------------------------

export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/** Records one request for `ip` and reports whether it exceeds the window's cap. */
export function isRateLimited(ip: string, now: number = Date.now()): boolean {
  const entry = rateLimitStore.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/** Test-only: clears all rate-limit state between test cases. */
export function resetRateLimiter(): void {
  rateLimitStore.clear();
}

// ---------------------------------------------------------------------------
// Configuration -- the startup assertion.
// ---------------------------------------------------------------------------

export interface LeadEnv {
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  // Index signature so process.env (an index-signature type) structurally
  // matches this interface in both directions.
  [key: string]: string | undefined;
}

export class LeadConfigurationError extends Error {
  constructor(missing: string[]) {
    super(
      `Lead delivery is misconfigured -- missing env var(s): ${missing.join(", ")}. ` +
        "Refusing to report success: a seller enquiry must never be silently dropped."
    );
    this.name = "LeadConfigurationError";
  }
}

/**
 * Throws if lead delivery cannot possibly succeed. Called first, before rate
 * limiting, the honeypot check, or validation -- so a missing key can never
 * be masked by an earlier "success" return on some other code path.
 */
export function assertLeadDeliveryConfigured(env: LeadEnv = process.env): void {
  const missing: string[] = [];
  if (!env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!env.LEAD_TO_EMAIL) missing.push("LEAD_TO_EMAIL");
  if (!env.LEAD_FROM_EMAIL) missing.push("LEAD_FROM_EMAIL");
  if (missing.length > 0) {
    throw new LeadConfigurationError(missing);
  }
}

// ---------------------------------------------------------------------------
// Delivery -- isolated behind a small interface so it is testable without a
// network call. The route wires up the real Resend transport; tests use a
// fake and assert on the payload the fake received.
// ---------------------------------------------------------------------------

export interface LeadPayload {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}

export interface LeadTransport {
  send(payload: LeadPayload): Promise<void>;
}

export class LeadDeliveryError extends Error {
  constructor(cause: unknown) {
    super(
      `Lead delivery transport failed: ${cause instanceof Error ? cause.message : String(cause)}`
    );
    this.name = "LeadDeliveryError";
    this.cause = cause;
  }
}

export function buildLeadPayload(lead: ValidatedLead, env: LeadEnv): LeadPayload {
  // Asserted present by assertLeadDeliveryConfigured before this is called.
  const to = env.LEAD_TO_EMAIL as string;
  const from = env.LEAD_FROM_EMAIL as string;

  const safeName = escapeHtml(lead.name);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = escapeHtml(lead.phone);
  const safeAddress = escapeHtml(lead.propertyAddress);
  const safeMessage = lead.message ? escapeHtml(lead.message) : "";

  const subject = stripCrlf(`New seller enquiry -- ${lead.propertyAddress}`).slice(0, 200);
  const replyTo = stripCrlf(lead.email);

  const html = [
    "<div>",
    "<h1>New seller enquiry</h1>",
    `<p><strong>Name:</strong> ${safeName}</p>`,
    `<p><strong>Email:</strong> ${safeEmail}</p>`,
    `<p><strong>Phone:</strong> ${safePhone}</p>`,
    `<p><strong>Property address:</strong> ${safeAddress}</p>`,
    safeMessage ? `<p><strong>Message:</strong> ${safeMessage}</p>` : "",
    "</div>",
  ]
    .filter(Boolean)
    .join("");

  const text = [
    "New seller enquiry",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Property address: ${lead.propertyAddress}`,
    lead.message ? `Message: ${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return { to, from, replyTo, subject, html, text };
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

export type LeadOutcome =
  | { status: "sent"; payload: LeadPayload }
  | { status: "honeypot" }
  | { status: "rate_limited" }
  | { status: "invalid"; issues: string[] };

export interface SubmitLeadOptions {
  ip: string;
  transport: LeadTransport;
  env?: LeadEnv;
  now?: number;
}

/**
 * The full pipeline, decoupled from Next.js: configuration check, rate
 * limit, honeypot, validation, delivery. Throws LeadConfigurationError or
 * LeadDeliveryError on failure -- callers must not swallow those into a
 * success response.
 */
export async function submitLead(
  input: LeadInput,
  options: SubmitLeadOptions
): Promise<LeadOutcome> {
  const env = options.env ?? process.env;

  // Fails loudly first. No other branch below can produce a "sent" or
  // false-"honeypot success" outcome when delivery is not configured.
  assertLeadDeliveryConfigured(env);

  if (isRateLimited(options.ip, options.now)) {
    return { status: "rate_limited" };
  }

  const honeypot = asString(input.honeypot);
  if (honeypot !== "") {
    // Return success to the bot; nothing is validated or sent.
    return { status: "honeypot" };
  }

  const validation = validateLead(input);
  if (!validation.ok) {
    return { status: "invalid", issues: validation.issues };
  }

  const payload = buildLeadPayload(validation.value, env);

  try {
    await options.transport.send(payload);
  } catch (cause) {
    throw new LeadDeliveryError(cause);
  }

  return { status: "sent", payload };
}
