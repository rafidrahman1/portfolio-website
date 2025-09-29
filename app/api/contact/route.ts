import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Edge Runtime for better performance
export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;

export async function POST(request: Request) {
    const { name, email, subject, message } = await request.json();

    if (!toEmail) {
        return NextResponse.json({ error: 'Recipient email is not configured.' }, { status: 500 });
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Must be a verified domain on Resend
            to: toEmail,
            subject: `rafid.me: ${subject}`,
            replyTo: email,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}