import { NextResponse } from 'next/server';
import { client } from '../../lib/openaiClient';
import PROMPT_JSON from '../../lib/prompt';
import { cookies } from 'next/headers';

// Edge Runtime for better performance
export const runtime = 'edge';

// Model selection from environment with a sane default
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

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

// Input validation function
function validateRequest(message: any, conversationHistory: any) {
    if (!message || typeof message !== 'string') {
        return NextResponse.json(
            { error: 'Message is required and must be a string' },
            { status: 400 }
        );
    }
    return null;
}

// Environment validation function
function validateEnvironment() {
    if (!process.env.OPENAI_API_KEY) {
        console.error('OpenAI API key is not configured');
        return NextResponse.json(
            { error: 'OpenAI API key is not configured' },
            { status: 500 }
        );
    }

    if (!process.env.OPENAI_URL) {
        console.error('OpenAI URL is not configured');
        return NextResponse.json(
            { error: 'OpenAI URL is not configured' },
            { status: 500 }
        );
    }
    return null;
}

// Format time duration into human-readable string
function formatTimeDuration(retrySeconds: number): string {
    const hours = Math.floor(retrySeconds / 3600);
    const minutes = Math.floor((retrySeconds % 3600) / 60);
    const seconds = retrySeconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}

// Session rate limiting function
async function checkSessionRateLimit(session: ChatSession) {
    if (session.count >= SESSION_MAX_QUESTIONS) {
        const windowMs = SESSION_COOKIE_MAX_AGE * 1000;
        const now = Date.now();
        const resetAtMs = session.createdAt + windowMs;
        const retryMs = Math.max(0, resetAtMs - now);
        const retrySeconds = Math.ceil(retryMs / 1000);
        const human = formatTimeDuration(retrySeconds);

        const errorResponse = NextResponse.json(
            {
                error: `You have reached the maximum number of questions for this session (${SESSION_MAX_QUESTIONS}). Try again in ${human}.`,
                retryAfterSeconds: retrySeconds,
                retryAfterHuman: human,
                resetAt: new Date(resetAtMs).toISOString(),
            },
            { status: 429, headers: { 'Retry-After': String(retrySeconds) } }
        );
        
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
    return null;
}

// OpenAI API call function
async function callOpenAI(message: string, conversationHistory: any[]) {
    const messages = [
        { role: 'system', content: JSON.stringify(PROMPT_JSON) },
        ...conversationHistory,
        { role: 'user', content: message }
    ];

    console.log('Calling OpenAI API with messages:', messages.length);

    const completion = await client.chat.completions.create({
        model: OPENAI_MODEL,
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

    return aiResponse;
}

// Error handling function
function handleError(error: any) {
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

    return NextResponse.json(
        { error: 'Failed to process chat request: ' + msgFromErr },
        { status: statusFromErr ?? 500 }
    );
}

// Create success response function
function createSuccessResponse(aiResponse: string, message: string, conversationHistory: any[], session: ChatSession) {
    const response = NextResponse.json({
        response: aiResponse,
        conversationHistory: [
            ...conversationHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse }
        ],
        questionsLeft: SESSION_MAX_QUESTIONS - session.count
    });
    
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
}

export async function POST(request: Request) {
    try {
        const { message, conversationHistory = [] } = await request.json();

        // Validate input
        const validationError = validateRequest(message, conversationHistory);
        if (validationError) return validationError;

        // Validate environment
        const envError = validateEnvironment();
        if (envError) return envError;

        // Handle session and rate limiting
        let session = await getSessionData();
        const rateLimitError = await checkSessionRateLimit(session);
        if (rateLimitError) return rateLimitError;
        
        session.count += 1;

        console.log('Processing chat request:', { message, conversationHistoryLength: conversationHistory.length });

        // Call OpenAI API
        const aiResponse = await callOpenAI(message, conversationHistory);
        if (aiResponse instanceof NextResponse) return aiResponse;

        console.log('Successfully received AI response');

        // Return success response
        return createSuccessResponse(aiResponse, message, conversationHistory, session);

    } catch (error) {
        return handleError(error);
    }
} 