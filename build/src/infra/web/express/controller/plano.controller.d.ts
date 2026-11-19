import type { Request, Response } from 'express';
export declare class PlanoController {
    private readonly criarUseCase;
    private readonly listarUseCase;
    private readonly buscarPorIdUseCase;
    private readonly atualizarUseCase;
    private readonly excluirUseCase;
    salvar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listar(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const planoController: PlanoController;
//# sourceMappingURL=plano.controller.d.ts.map