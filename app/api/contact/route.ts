import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/html";
import { validateContact } from "@/lib/contact-validation";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour, per IP

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error("Contact API is missing RESEND_API_KEY or TO_EMAIL");
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const limit = rateLimit(`contact:${getClientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = validateContact(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { name, email, subject, message } = parsed.value;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Must be a verified domain on Resend
      to: toEmail,
      subject: `rafid.me: ${subject}`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact send failed:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
  }
}
