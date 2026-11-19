import type { Request, Response } from 'express';
export declare function tratarErroDoController(error: unknown, response: Response): Response;
export declare function usuarioAutenticado(request: Request): string;
export declare function idDaRota(request: Request, Dto: new () => {
    id: string;
}): Promise<string>;
//# sourceMappingURL=controller.util.d.ts.map