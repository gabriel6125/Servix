import type { RequestHandler } from 'express';
declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}
export declare const authMiddleware: RequestHandler;
//# sourceMappingURL=auth.middleware.d.ts.map