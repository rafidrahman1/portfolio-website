import { NextResponse } from 'next/server';
import { openai } from '../../lib/openaiClient';
import SYSTEM_PROMPT from '../../lib/prompt';

export async function POST(request: Request) {
    try {
        const { message, conversationHistory = [] } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required and must be a string' },
                { status: 400 }
            );
        }

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

        return NextResponse.json({
            response: aiResponse,
            conversationHistory: [
                ...conversationHistory,
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            ]
        });

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