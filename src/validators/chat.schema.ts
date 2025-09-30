import { z } from 'zod';

export const ChatMessageSchema = z.string().min(1);
export const ConversationItemSchema = z.object({ role: z.enum(['system', 'user', 'assistant']), content: z.string() });

export const ChatRequestSchema = z.object({
    message: ChatMessageSchema,
    conversationHistory: z.array(ConversationItemSchema).optional().default([]),
});

export type ChatRequestDTO = z.infer<typeof ChatRequestSchema>;


