/**
 * Signed chat-session cookie (HMAC-SHA256 via Web Crypto, edge-compatible).
 * The cookie is httpOnly and tamper-evident, so clients cannot reset or edit
 * their question counter.
 */
export type ChatSession = {
  id: string;
  count: number;
  createdAt: number; // epoch ms when this session started counting
};

export const SESSION_COOKIE_NAME = "chat_session";
export const SESSION_MAX_QUESTIONS = 10;
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day (seconds)

const encoder = new TextEncoder();

function getSecret(): string | undefined {
  return process.env.CHAT_SESSION_SECRET || process.env.OPENAI_API_KEY;
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const bin = atob(padded);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function hmacKey(secret: string, usage: "sign" | "verify"): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [usage]);
}

export function newSession(now = Date.now()): ChatSession {
  return { id: crypto.randomUUID(), count: 0, createdAt: now };
}

export async function encodeSession(session: ChatSession): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("No secret available to sign chat session");
  const payload = toBase64Url(encoder.encode(JSON.stringify(session)));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret, "sign"), encoder.encode(payload));
  return `${payload}.${toBase64Url(new Uint8Array(sig))}`;
}

/** Returns the session if the cookie is valid and unexpired, otherwise a fresh one. */
export async function decodeSession(cookie: string | undefined, now = Date.now()): Promise<ChatSession> {
  const secret = getSecret();
  if (!cookie || !secret) return newSession(now);

  const [payload, sig] = cookie.split(".");
  if (!payload || !sig) return newSession(now);

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret, "verify"),
      fromBase64Url(sig),
      encoder.encode(payload),
    );
    if (!valid) return newSession(now);

    const parsed = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as Partial<ChatSession>;
    if (
      typeof parsed.id !== "string" ||
      typeof parsed.count !== "number" ||
      typeof parsed.createdAt !== "number" ||
      !Number.isFinite(parsed.count) ||
      parsed.count < 0
    ) {
      return newSession(now);
    }
    if (now - parsed.createdAt >= SESSION_COOKIE_MAX_AGE * 1000) return newSession(now);
    return { id: parsed.id, count: parsed.count, createdAt: parsed.createdAt };
  } catch {
    return newSession(now);
  }
}

export const sessionCookieOptions = {
  path: "/",
  maxAge: SESSION_COOKIE_MAX_AGE,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
