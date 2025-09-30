import { NextRequest, NextResponse, cookies } from 'next/server';
import { ChatRequestSchema } from '../validators/chat.schema';
import { toHttpError } from '../errors/AppError';
import { makeChatService, ChatSession } from '../services/chat.service';

export function makeChatController(service: ReturnType<typeof makeChatService>, config: { sessionCookieName: string; windowSeconds: number }) {
    return {
        async post(req: NextRequest) {
            try {
                const { message, conversationHistory } = ChatRequestSchema.parse(await req.json());

                const cookieStore = await cookies();
                const raw = cookieStore.get(config.sessionCookieName)?.value;
                let session: ChatSession;
                if (!raw) {
                    session = { id: Math.random().toString(36).slice(2), count: 0, createdAt: Date.now() };
                } else {
                    try {
                        const parsed = JSON.parse(atob(raw)) as Partial<ChatSession>;
                        const createdAt = typeof parsed.createdAt === 'number' ? parsed.createdAt : Date.now();
                        const now = Date.now();
                        const windowMs = config.windowSeconds * 1000;
                        if (now - createdAt >= windowMs) {
                            session = { id: Math.random().toString(36).slice(2), count: 0, createdAt: now };
                        } else {
                            session = { id: parsed.id ?? Math.random().toString(36).slice(2), count: typeof parsed.count === 'number' ? parsed.count : 0, createdAt };
                        }
                    } catch {
                        session = { id: Math.random().toString(36).slice(2), count: 0, createdAt: Date.now() };
                    }
                }

                const limitCheck = service.enforceAndIncrementSession(session);
                if (limitCheck.limited) {
                    const errorResponse = NextResponse.json(
                        {
                            error: `You have reached the maximum number of questions for this session. Try again in ${limitCheck.human}.`,
                            retryAfterSeconds: limitCheck.retrySeconds,
                            retryAfterHuman: limitCheck.human,
                            resetAt: new Date(limitCheck.resetAtMs).toISOString(),
                        },
                        { status: 429, headers: { 'Retry-After': String(limitCheck.retrySeconds) } }
                    );
                    errorResponse.cookies.set(config.sessionCookieName, btoa(JSON.stringify(session)), { path: '/', maxAge: config.windowSeconds, httpOnly: false, sameSite: 'lax' });
                    return errorResponse;
                }

                const aiResponse = await service.answer({ message, conversationHistory });
                const response = NextResponse.json({
                    response: aiResponse,
                    conversationHistory: [
                        ...(conversationHistory ?? []),
                        { role: 'user', content: message },
                        { role: 'assistant', content: aiResponse },
                    ],
                });
                response.cookies.set(config.sessionCookieName, btoa(JSON.stringify(session)), { path: '/', maxAge: config.windowSeconds, httpOnly: false, sameSite: 'lax' });
                return response;
            } catch (err) {
                const http = toHttpError(err);
                return NextResponse.json({ error: http.message }, { status: http.status });
            }
        },
    };
}


