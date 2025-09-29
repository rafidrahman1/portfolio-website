import { NextResponse } from 'next/server';
import { openai } from '../../lib/openaiClient';
import PROMPT_JSON from '../../lib/prompt';
import { cookies } from 'next/headers';

// Edge Runtime for better performance
export const runtime = 'edge';

const SESSION_COOKIE_NAME = 'chat_session';
const SESSION_MAX_QUESTIONS = 10;
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day (in seconds)

type ChatSession = {
    id: string;
    count: number;
    createdAt: number; // epoch ms when this session started counting
};

async function getSessionData() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
        return { count: 0, id: Math.random().toString(36).slice(2), createdAt: Date.now() } as ChatSession;
    }
    try {
        const parsed = JSON.parse(atob(sessionCookie)) as Partial<ChatSession>;
        const createdAt = typeof parsed.createdAt === 'number' ? parsed.createdAt : Date.now();
        const now = Date.now();
        const windowMs = SESSION_COOKIE_MAX_AGE * 1000;
        // If the session is older than our window, reset it
        if (now - createdAt >= windowMs) {
            return { count: 0, id: Math.random().toString(36).slice(2), createdAt: now } as ChatSession;
        }
        return {
            id: parsed.id ?? Math.random().toString(36).slice(2),
            count: typeof parsed.count === 'number' ? parsed.count : 0,
            createdAt,
        } as ChatSession;
    } catch {
        return { count: 0, id: Math.random().toString(36).slice(2), createdAt: Date.now() } as ChatSession;
    }
}

export async function POST(request: Request) {
    try {
        const { message, conversationHistory = [] } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required and must be a string' },
                { status: 400 }
            );
        }

        // Session logic
        let session = await getSessionData();
        if (session.count >= SESSION_MAX_QUESTIONS) {
            const windowMs = SESSION_COOKIE_MAX_AGE * 1000;
            const now = Date.now();
            const resetAtMs = session.createdAt + windowMs;
            const retryMs = Math.max(0, resetAtMs - now);
            const retrySeconds = Math.ceil(retryMs / 1000);
            const hours = Math.floor(retrySeconds / 3600);
            const minutes = Math.floor((retrySeconds % 3600) / 60);
            const seconds = retrySeconds % 60;
            const human = hours > 0
                ? `${hours}h ${minutes}m ${seconds}s`
                : minutes > 0
                ? `${minutes}m ${seconds}s`
                : `${seconds}s`;

            const errorResponse = NextResponse.json(
                {
                    error: `You have reached the maximum number of questions for this session (${SESSION_MAX_QUESTIONS}). Try again in ${human}.`,
                    retryAfterSeconds: retrySeconds,
                    retryAfterHuman: human,
                    resetAt: new Date(resetAtMs).toISOString(),
                },
                { status: 429, headers: { 'Retry-After': String(retrySeconds) } }
            );
            // Ensure session cookie persists while rate limited
            errorResponse.cookies.set(
                SESSION_COOKIE_NAME,
                btoa(JSON.stringify(session)),
                {
                    path: '/',
                    maxAge: SESSION_COOKIE_MAX_AGE,
                    httpOnly: false,
                    sameSite: 'lax',
                }
            );
            return errorResponse;
        }
        session.count += 1;

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY) {
            console.error('OpenAI API key is not configured');
            return NextResponse.json(
                { error: 'OpenAI API key is not configured' },
                { status: 500 }
            );
        }

        // Check if OpenAI URL is configured
        if (!process.env.OPENAI_URL) {
            console.error('OpenAI URL is not configured');
            return NextResponse.json(
                { error: 'OpenAI URL is not configured' },
                { status: 500 }
            );
        }

        console.log('Processing chat request:', { message, conversationHistoryLength: conversationHistory.length });

        // Prepare conversation messages
        const messages = [
            { role: 'system', content: JSON.stringify(PROMPT_JSON) },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        console.log('Calling OpenAI API with messages:', messages.length);

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            max_tokens: 500,
            temperature: 0.7,
        });

        const aiResponse = completion.choices[0]?.message?.content;

        if (!aiResponse) {
            console.error('No response from OpenAI API');
            return NextResponse.json(
                { error: 'No response from AI' },
                { status: 500 }
            );
        }

        console.log('Successfully received AI response');

        // Set updated session cookie
        const response = NextResponse.json({
            response: aiResponse,
            conversationHistory: [
                ...conversationHistory,
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            ],
            questionsLeft: SESSION_MAX_QUESTIONS - session.count
        });
        // Set the cookie on the response
        response.cookies.set(
            SESSION_COOKIE_NAME,
            btoa(JSON.stringify(session)),
            {
                path: '/',
                maxAge: SESSION_COOKIE_MAX_AGE,
                httpOnly: false,
                sameSite: 'lax',
            }
        );
        return response;

    } catch (error) {
        // Normalize error shape because some runtimes log objects as {}
        const err: any = error;
        const statusFromErr = typeof err?.status === 'number' ? err.status : undefined;
        const msgFromErr = (typeof err?.message === 'string' && err.message)
            || (typeof err?.error?.message === 'string' && err.error.message)
            || (typeof err === 'string' && err)
            || 'Unknown error';
        const details = {
            name: err?.name,
            status: statusFromErr,
            code: err?.code,
            type: err?.type,
            response: err?.response?.data ?? err?.response?.body ?? err?.data ?? null,
        };
        try {
            console.error('Chat API error:', { message: msgFromErr, ...details });
        } catch {
            console.error('Chat API error:', msgFromErr);
        }

        // More specific error handling
        if (error instanceof Error) {
            if (error.message.includes('401')) {
                return NextResponse.json(
                    { error: 'Invalid OpenAI API key' },
                    { status: 401 }
                );
            } else if (error.message.includes('429')) {
                return NextResponse.json(
                    { error: 'Rate limit exceeded. Please try again later.' },
                    { status: 429 }
                );
            } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
                return NextResponse.json(
                    { error: 'Unable to connect to OpenAI API. Please check your internet connection.' },
                    { status: 503 }
                );
            }
        }

        // Fallback returning normalized error and best-effort status
        return NextResponse.json(
            { error: 'Failed to process chat request: ' + msgFromErr },
            { status: statusFromErr ?? 500 }
        );
    }
} 