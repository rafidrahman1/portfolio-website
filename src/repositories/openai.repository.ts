import OpenAI from 'openai';
import { AppError } from '../errors/AppError';

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export function makeOpenAIRepository(config: { baseURL?: string; apiKey?: string }) {
    const client = new OpenAI({ baseURL: config.baseURL, apiKey: config.apiKey });
    return {
        async createChatCompletion(messages: ChatMessage[], options?: { model?: string; max_tokens?: number; temperature?: number }) {
            if (!config.apiKey) {
                throw new AppError('INTERNAL', 'OpenAI API key is not configured');
            }
            if (!config.baseURL) {
                throw new AppError('INTERNAL', 'OpenAI URL is not configured');
            }
            try {
                const completion = await client.chat.completions.create({
                    model: options?.model ?? 'gpt-4o-mini',
                    messages,
                    max_tokens: options?.max_tokens ?? 500,
                    temperature: options?.temperature ?? 0.7,
                });
                return completion.choices[0]?.message?.content ?? '';
            } catch (err) {
                throw new AppError('INTERNAL', 'Failed to call OpenAI API', err);
            }
        },
    };
}


