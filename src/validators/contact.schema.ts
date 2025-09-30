import { z } from 'zod';

export const ContactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1),
});

export type ContactDTO = z.infer<typeof ContactSchema>;


