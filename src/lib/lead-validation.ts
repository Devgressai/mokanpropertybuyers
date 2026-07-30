// src/lib/lead-validation.ts
//
// The pure, dependency-free slice of lead validation: field limits and the
// email/phone/HTML-escaping checks. No env access, no transport imports --
// nothing here can ever pull a server SDK into a client bundle.
//
// It exists as its own module because src/lib/leads.ts is safe to import
// from a "use client" component (ContactForm.tsx) only by accident today:
// leads.ts never imports `resend` at module scope and only touches
// process.env inside function bodies, but nothing enforces that stays true.
// The moment someone adds `import { Resend } from "resend"` at the top of
// leads.ts, that import lands in the client bundle. Splitting the
// client-safe surface out removes that risk by construction instead of by
// convention. leads.ts re-exports these for backward compatibility.

/** Character limits shared by client-side and server-side validation. */
export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  propertyAddress: 200,
  message: 2000,
} as const;

/** Escape HTML special characters before any user string reaches an email body. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function isValidEmail(email: string): boolean {
  return email.length <= FIELD_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  if (phone.length > FIELD_LIMITS.phone) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
