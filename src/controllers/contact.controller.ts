import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '../validators/contact.schema';
import { toHttpError } from '../errors/AppError';
import { makeContactService } from '../services/contact.service';

export function makeContactController(service: ReturnType<typeof makeContactService>) {
    return {
        async create(req: NextRequest) {
            try {
                const body = await req.json();
                const dto = ContactSchema.parse(body);
                const result = await service.createContact(dto);
                return NextResponse.json(result);
            } catch (err) {
                const http = toHttpError(err);
                return NextResponse.json({ error: http.message }, { status: http.status });
            }
        },
    };
}


