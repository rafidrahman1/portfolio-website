export type ChatRole = "user" | "assistant";
export interface ChatTurn {
  role: ChatRole;
  content: string;
}

export const CHAT_LIMITS = {
  message: 1000,
  turnContent: 4000,
  turns: 20,
} as const;

/** Validates a user message; returns the trimmed text or an error. */
export function validateMessage(message: unknown): { ok: true; value: string } | { ok: false; error: string } {
  if (typeof message !== "string" || message.trim().length === 0) {
    return { ok: false, error: "Message is required and must be a non-empty string" };
  }
  const trimmed = message.trim();
  if (trimmed.length > CHAT_LIMITS.message) {
    return { ok: false, error: `Message is too long (max ${CHAT_LIMITS.message} characters)` };
  }
  return { ok: true, value: trimmed };
}

/**
 * Sanitizes client-supplied history: only user/assistant turns with bounded
 * string content are kept (so callers cannot inject `system` messages), and
 * only the most recent turns are used.
 */
export function sanitizeHistory(history: unknown): ChatTurn[] {
  if (!Array.isArray(history)) return [];
  const turns: ChatTurn[] = [];
  for (const item of history) {
    if (item === null || typeof item !== "object") continue;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    turns.push({ role, content: content.slice(0, CHAT_LIMITS.turnContent) });
  }
  return turns.slice(-CHAT_LIMITS.turns);
}
