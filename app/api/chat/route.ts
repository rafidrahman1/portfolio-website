import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getClient } from "@/lib/openaiClient";
import PROMPT_JSON from "@/lib/prompt";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeHistory, validateMessage } from "@/lib/chat-validation";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_QUESTIONS,
  SESSION_COOKIE_MAX_AGE,
  decodeSession,
  encodeSession,
  sessionCookieOptions,
  type ChatSession,
} from "@/lib/chat-session";

export const runtime = "edge";

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// Per-IP guard on top of the per-session limit (sessions are easy to reset).
const IP_LIMIT = 30;
const IP_WINDOW_MS = 60 * 60 * 1000;

function errorJson(error: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ error }, { status, headers });
}

function validateEnvironment() {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_URL) {
    console.error("OPENAI_API_KEY or OPENAI_URL is not configured");
    return errorJson("The chat service is not configured.", 500);
  }
  return null;
}

function formatTimeDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

async function withSessionCookie(response: NextResponse, session: ChatSession) {
  response.cookies.set(SESSION_COOKIE_NAME, await encodeSession(session), sessionCookieOptions);
  return response;
}

async function sessionLimitResponse(session: ChatSession) {
  const resetAtMs = session.createdAt + SESSION_COOKIE_MAX_AGE * 1000;
  const retrySeconds = Math.ceil(Math.max(0, resetAtMs - Date.now()) / 1000);
  const human = formatTimeDuration(retrySeconds);

  const response = NextResponse.json(
    {
      error: `You have reached the maximum number of questions for this session (${SESSION_MAX_QUESTIONS}). Try again in ${human}.`,
      retryAfterSeconds: retrySeconds,
      retryAfterHuman: human,
      resetAt: new Date(resetAtMs).toISOString(),
    },
    { status: 429, headers: { "Retry-After": String(retrySeconds) } },
  );
  return withSessionCookie(response, session);
}

function handleError(error: unknown) {
  console.error("Chat API error:", error instanceof Error ? error.message : error);

  if (error instanceof OpenAI.APIError) {
    if (error.status === 429) return errorJson("The AI service is busy. Please try again later.", 429);
    if (error.status === 401 || error.status === 403) return errorJson("The chat service is misconfigured.", 500);
    return errorJson("The AI service returned an error. Please try again.", 502);
  }
  if (error instanceof OpenAI.APIConnectionError) {
    return errorJson("Unable to reach the AI service. Please try again later.", 503);
  }
  return errorJson("Failed to process chat request.", 500);
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorJson("Invalid JSON body", 400);
    }
    const { message, conversationHistory, healthCheck } = (body ?? {}) as Record<string, unknown>;

    // Lightweight health check: validates env without consuming quota or calling OpenAI.
    if (healthCheck === true) {
      return validateEnvironment() ?? NextResponse.json({ ok: true });
    }

    const parsedMessage = validateMessage(message);
    if (!parsedMessage.ok) return errorJson(parsedMessage.error, 400);

    const envError = validateEnvironment();
    if (envError) return envError;

    const ipLimit = rateLimit(`chat:${getClientIp(request)}`, IP_LIMIT, IP_WINDOW_MS);
    if (!ipLimit.ok) {
      return errorJson("Too many requests. Please try again later.", 429, {
        "Retry-After": String(ipLimit.retryAfterSeconds),
      });
    }

    const cookieStore = await cookies();
    const session = await decodeSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
    if (session.count >= SESSION_MAX_QUESTIONS) return sessionLimitResponse(session);

    const history = sanitizeHistory(conversationHistory);
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: JSON.stringify(PROMPT_JSON) },
      ...history,
      { role: "user", content: parsedMessage.value },
    ];

    const completion = await getClient().chat.completions.create({
      model: OPENAI_MODEL,
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    if (!aiResponse) return errorJson("No response from AI", 502);

    session.count += 1;
    const response = NextResponse.json({
      response: aiResponse,
      conversationHistory: [
        ...history,
        { role: "user", content: parsedMessage.value },
        { role: "assistant", content: aiResponse },
      ],
      questionsLeft: SESSION_MAX_QUESTIONS - session.count,
    });
    return withSessionCookie(response, session);
  } catch (error) {
    return handleError(error);
  }
}
