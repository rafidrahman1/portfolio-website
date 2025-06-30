import { NextResponse } from 'next/server';
import { openai } from '../../lib/openaiClient';
import SYSTEM_PROMPT from '../../lib/prompt';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'chat_session';
const SESSION_MAX_QUESTIONS = 10;
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day

async function getSessionData() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
        return { count: 0, id: Math.random().toString(36).slice(2) };
    }
    try {
        const parsed = JSON.parse(atob(sessionCookie));
        return parsed;
    } catch {
        return { count: 0, id: Math.random().toString(36).slice(2) };
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
            return NextResponse.json(
                { error: 'You have reached the maximum number of questions for this session (10).' },
                { status: 429 }
            );
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
            { role: 'system', content: SYSTEM_PROMPT },
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
        console.error('Chat API error:', error);
        
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
        
        return NextResponse.json(
            { error: 'Failed to process chat request: ' + (error instanceof Error ? error.message : 'Unknown error') },
            { status: 500 }
        );
    }
} 