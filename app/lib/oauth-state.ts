import { createHmac, randomBytes, timingSafeEqual } from "crypto";

export function createSignedOAuthState(secret: string): string {
  const nonce = randomBytes(16).toString("hex");
  const sig = createHmac("sha256", secret).update(nonce).digest("hex");
  return `${sig}.${nonce}`;
}

export function verifySignedOAuthState(state: string | null, secret: string): boolean {
  if (!state || !secret) return false;
  const parts = state.split(".");
  if (parts.length !== 2) return false;
  const [sig, nonce] = parts;
  if (!sig || !nonce) return false;
  const expected = createHmac("sha256", secret).update(nonce).digest("hex");
  try {
    return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}
