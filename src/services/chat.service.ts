import { ChatRequestDTO } from '../validators/chat.schema';

export type ChatSession = { id: string; count: number; createdAt: number };

export function makeChatService(deps: {
    openaiRepo: { createChatCompletion: (messages: { role: 'system' | 'user' | 'assistant'; content: string }[], options?: { model?: string; max_tokens?: number; temperature?: number }) => Promise<string> };
    promptJson: unknown;
    maxQuestions: number;
    windowSeconds: number;
}) {
    return {
        enforceAndIncrementSession(session: ChatSession) {
            if (session.count >= deps.maxQuestions) {
                const windowMs = deps.windowSeconds * 1000;
                const now = Date.now();
                const resetAtMs = session.createdAt + windowMs;
                const retryMs = Math.max(0, resetAtMs - now);
                const retrySeconds = Math.ceil(retryMs / 1000);
                const hours = Math.floor(retrySeconds / 3600);
                const minutes = Math.floor((retrySeconds % 3600) / 60);
                const seconds = retrySeconds % 60;
                const human = hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
                return {
                    limited: true as const,
                    retrySeconds,
                    human,
                    resetAtMs,
                };
            }
            session.count += 1;
            return { limited: false as const };
        },
        async answer(dto: ChatRequestDTO) {
            const messages = [
                { role: 'system' as const, content: JSON.stringify(deps.promptJson) },
                ...(dto.conversationHistory ?? []),
                { role: 'user' as const, content: dto.message },
            ];
            const aiResponse = await deps.openaiRepo.createChatCompletion(messages);
            return aiResponse;
        },
    };
}


