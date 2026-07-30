"use client";

// src/components/ContactForm.tsx
//
// Seller-enquiry form for /api/contact. No src/data imports here on purpose
// -- this is a client component and pulls in nothing from src/data. NAP is
// not rendered: there is none yet (see src/lib/site.ts).
//
// src/lib/lead-validation.ts is imported for its pure, side-effect-free
// pieces (FIELD_LIMITS, isValidEmail, isValidPhone) so client-side
// validation mirrors the server's contract instead of retyping the same
// numbers and regexes and risking drift. That module has no env access and
// no transport imports, by construction -- unlike src/lib/leads.ts, which
// is merely safe today. Nothing here calls submitLead, touches
// process.env, or talks to Resend -- that all stays server-side in the
// route handler.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FIELD_LIMITS, isValidEmail, isValidPhone } from "@/lib/lead-validation";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "email" | "phone" | "propertyAddress" | "message";

type FieldErrors = Partial<Record<FieldName, string>>;

type FieldValues = Record<FieldName, string>;

/**
 * Client-side mirror of the server's validateLead() -- a courtesy that lets
 * a seller fix a mistake before a round trip, never the enforcement. The
 * server in src/lib/leads.ts re-validates everything regardless of what
 * this returns. Exported so tests can assert its limits are derived from
 * FIELD_LIMITS rather than retyped.
 */
export function validateClientSide(values: FieldValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  } else if (values.name.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`;
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (!isValidPhone(values.phone.trim())) {
    errors.phone = "Enter a valid phone number (at least 10 digits).";
  }

  if (!values.propertyAddress.trim()) {
    errors.propertyAddress = "Enter the property address.";
  } else if (values.propertyAddress.length > FIELD_LIMITS.propertyAddress) {
    errors.propertyAddress = `Address must be ${FIELD_LIMITS.propertyAddress} characters or fewer.`;
  }

  if (values.message.length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`;
  }

  return errors;
}

const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "propertyAddress", "message"];

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Focus management on submit result: a seller using a screen reader or
  // keyboard should land on the outcome, not have to go find it.
  useEffect(() => {
    if (state === "success") successRef.current?.focus();
    if (state === "error") errorRef.current?.focus();
  }, [state]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const values: FieldValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      propertyAddress: String(data.get("propertyAddress") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const clientErrors = validateClientSide(values);
    setFieldErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((f) => clientErrors[f]);
      if (firstInvalid) form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    setState("submitting");

    const body = {
      ...values,
      // Hidden field. Left blank by real visitors, often filled by bots.
      honeypot: String(data.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setState("error");
        setServerError(
          payload?.error ??
            "We couldn't send your request. Please try again, or call us directly."
        );
        return;
      }

      setState("success");
      form.reset();
    } catch {
      // A network failure, not a server response -- must read exactly as
      // clearly as a 500 does. A seller must never see success when
      // delivery failed.
      setState("error");
      setServerError(
        "We couldn't reach the server. Please check your connection and try again."
      );
    }
  }

  if (state === "success") {
    return (
      <p ref={successRef} tabIndex={-1} role="status" className="text-ink outline-none">
        Thanks — we received your information and will be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-clay-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={FIELD_LIMITS.name}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className="border border-stone bg-limestone px-3 py-2 text-ink"
        />
        {fieldErrors.name ? (
          <p id="name-error" role="alert" className="text-sm text-clay-ink">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm text-clay-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={FIELD_LIMITS.email}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className="border border-stone bg-limestone px-3 py-2 text-ink"
        />
        {fieldErrors.email ? (
          <p id="email-error" role="alert" className="text-sm text-clay-ink">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm text-clay-ink">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={FIELD_LIMITS.phone}
          aria-invalid={fieldErrors.phone ? true : undefined}
          aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          className="border border-stone bg-limestone px-3 py-2 text-ink"
        />
        {fieldErrors.phone ? (
          <p id="phone-error" role="alert" className="text-sm text-clay-ink">
            {fieldErrors.phone}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="propertyAddress" className="text-sm text-clay-ink">
          Property address
        </label>
        <input
          id="propertyAddress"
          name="propertyAddress"
          type="text"
          maxLength={FIELD_LIMITS.propertyAddress}
          aria-invalid={fieldErrors.propertyAddress ? true : undefined}
          aria-describedby={fieldErrors.propertyAddress ? "propertyAddress-error" : undefined}
          className="border border-stone bg-limestone px-3 py-2 text-ink"
        />
        {fieldErrors.propertyAddress ? (
          <p id="propertyAddress-error" role="alert" className="text-sm text-clay-ink">
            {fieldErrors.propertyAddress}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm text-clay-ink">
          Anything else we should know? (optional)
        </label>
        <textarea
          id="message"
          name="message"
          maxLength={FIELD_LIMITS.message}
          rows={4}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="border border-stone bg-limestone px-3 py-2 text-ink"
        />
        {fieldErrors.message ? (
          <p id="message-error" role="alert" className="text-sm text-clay-ink">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from real visitors via off-screen positioning, not
          display:none, and removed from the accessibility tree so a screen
          reader user is never presented with a field meant only for bots
          that don't render CSS. */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {serverError ? (
        <p ref={errorRef} tabIndex={-1} role="alert" className="text-sm text-clay-ink outline-none">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="bg-clay px-4 py-2 text-limestone disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Request my cash offer"}
      </button>
    </form>
  );
}
