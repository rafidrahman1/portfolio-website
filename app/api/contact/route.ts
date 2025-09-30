import { NextRequest } from 'next/server';
import { makeContactController } from '@/src/controllers/contact.controller';
import { makeContactService } from '@/src/services/contact.service';
import { makeEmailRepository } from '@/src/repositories/email.repository';

export const runtime = 'edge';

const emailRepo = makeEmailRepository(process.env.RESEND_API_KEY);
const service = makeContactService({ emailRepo, toEmail: process.env.TO_EMAIL });
const controller = makeContactController(service);

export async function POST(request: NextRequest) {
    return controller.create(request);
}