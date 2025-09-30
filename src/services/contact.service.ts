import { ContactDTO } from '../validators/contact.schema';

export function makeContactService(deps: { emailRepo: { sendEmail: (input: { from: string; to: string; subject: string; html: string; replyTo?: string }) => Promise<unknown> }; toEmail?: string }) {
    return {
        async createContact(dto: ContactDTO) {
            const to = deps.toEmail;
            if (!to) {
                throw new Error('Recipient email is not configured.');
            }
            const html = `
                <p><strong>Name:</strong> ${dto.name}</p>
                <p><strong>Email:</strong> ${dto.email}</p>
                <p><strong>Message:</strong></p>
                <p>${dto.message}</p>
            `;
            const result = await deps.emailRepo.sendEmail({
                from: 'Portfolio Contact <onboarding@resend.dev>',
                to,
                subject: `rafid.me: ${dto.subject}`,
                replyTo: dto.email,
                html,
            });
            return result;
        },
    };
}


