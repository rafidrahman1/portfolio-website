import { Resend } from 'resend';
import { AppError } from '../errors/AppError';

export type SendEmailInput = {
    from: string;
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
};

export function makeEmailRepository(resendApiKey: string | undefined) {
    const resend = new Resend(resendApiKey);
    return {
        async sendEmail(input: SendEmailInput) {
            if (!resendApiKey) {
                throw new AppError('INTERNAL', 'Email provider is not configured');
            }
            try {
                const result = await resend.emails.send(input as any);
                return result;
            } catch (err) {
                throw new AppError('INTERNAL', 'Failed to send email', err);
            }
        },
    };
}


