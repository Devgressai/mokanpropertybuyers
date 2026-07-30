"use client";

// src/components/ContactForm.tsx
//
// Minimal seller-enquiry form for /api/contact. No data-module imports here
// on purpose -- this is a client component and pulls in nothing from
// src/data. NAP is not rendered: there is none yet (see src/lib/site.ts).
import { useState, type FormEvent } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const body = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      propertyAddress: String(data.get("propertyAddress") ?? ""),
      message: String(data.get("message") ?? ""),
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
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setState("error");
        setError(payload?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setState("sent");
      form.reset();
    } catch {
      setState("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (state === "sent") {
    return (
      <p className="text-ink" role="status">
        Thanks — we received your information and will be in touch.
      </p>
    );
  }

  return (
    <form id="offer-form" onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-clay-ink">
          Name
        </label>
        <input id="name" name="name" type="text" required maxLength={100} className="border border-stone bg-limestone px-3 py-2 text-ink" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm text-clay-ink">
          Email
        </label>
        <input id="email" name="email" type="email" required maxLength={254} className="border border-stone bg-limestone px-3 py-2 text-ink" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm text-clay-ink">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" required maxLength={20} className="border border-stone bg-limestone px-3 py-2 text-ink" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="propertyAddress" className="text-sm text-clay-ink">
          Property address
        </label>
        <input
          id="propertyAddress"
          name="propertyAddress"
          type="text"
          required
          maxLength={200}
          className="border border-stone bg-limestone px-3 py-2 text-ink"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm text-clay-ink">
          Anything else we should know? (optional)
        </label>
        <textarea id="message" name="message" maxLength={2000} rows={4} className="border border-stone bg-limestone px-3 py-2 text-ink" />
      </div>

      {/* Honeypot: hidden from real visitors via off-screen positioning, not
          display:none, so it survives some bots' visibility checks. */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p className="text-sm text-clay-ink" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="bg-clay px-4 py-2 text-limestone disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Request my cash offer"}
      </button>
    </form>
  );
}
