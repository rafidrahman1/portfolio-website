export type AppErrorCode = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT' | 'RATE_LIMITED' | 'INTERNAL';

export class AppError extends Error {
    public readonly code: AppErrorCode;
    public readonly cause?: unknown;

    constructor(code: AppErrorCode, message: string, cause?: unknown) {
        super(message);
        this.code = code;
        this.cause = cause;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export function toHttpError(err: unknown): { status: number; message: string } {
    if (err instanceof AppError) {
        const map: Record<AppErrorCode, number> = {
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            CONFLICT: 409,
            RATE_LIMITED: 429,
            INTERNAL: 500,
        };
        return { status: map[err.code], message: err.message };
    }
    return { status: 500, message: 'Internal Server Error' };
}


