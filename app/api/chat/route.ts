import { NextRequest } from 'next/server';
import { makeChatController } from '@/src/controllers/chat.controller';
import { makeChatService } from '@/src/services/chat.service';
import { makeOpenAIRepository } from '@/src/repositories/openai.repository';
import PROMPT_JSON from '../../lib/prompt';

export const runtime = 'edge';

const SESSION_COOKIE_NAME = 'chat_session';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day (in seconds)

const openaiRepo = makeOpenAIRepository({ baseURL: process.env.OPENAI_URL, apiKey: process.env.OPENAI_API_KEY });
const service = makeChatService({ openaiRepo, promptJson: PROMPT_JSON, maxQuestions: 10, windowSeconds: SESSION_COOKIE_MAX_AGE });
const controller = makeChatController(service, { sessionCookieName: SESSION_COOKIE_NAME, windowSeconds: SESSION_COOKIE_MAX_AGE });

export async function POST(request: NextRequest) {
    return controller.post(request);
}