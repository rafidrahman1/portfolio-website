export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const CONTACT_LIMITS = { name: 100, email: 254, subject: 200, message: 5000 } as const;

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

/** Returns a validated, trimmed payload or an error message. */
export function validateContact(body: unknown): { ok: true; value: ContactInput } | { ok: false; error: string } {
  if (body === null || typeof body !== "object") return { ok: false, error: "Invalid request body." };
  const raw = body as Record<string, unknown>;

  const out = {} as ContactInput;
  for (const field of ["name", "email", "subject", "message"] as const) {
    const v = raw[field];
    if (typeof v !== "string" || v.trim().length === 0) {
      return { ok: false, error: `Field "${field}" is required.` };
    }
    const trimmed = v.trim();
    if (trimmed.length > CONTACT_LIMITS[field]) {
      return { ok: false, error: `Field "${field}" is too long (max ${CONTACT_LIMITS[field]} characters).` };
    }
    out[field] = trimmed;
  }

  if (!EMAIL_RE.test(out.email)) return { ok: false, error: "Please provide a valid email address." };
  // Header-injection guard: single-line fields must not contain line breaks.
  if (/[\r\n]/.test(out.name + out.email + out.subject)) {
    return { ok: false, error: "Invalid characters in form fields." };
  }
  return { ok: true, value: out };
}
