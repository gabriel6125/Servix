import type { Request, Response } from 'express';
export declare class DespesaController {
    private readonly criarUseCase;
    private readonly listarUseCase;
    private readonly buscarPorIdUseCase;
    private readonly atualizarUseCase;
    private readonly excluirUseCase;
    salvar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const despesaController: DespesaController;
//# sourceMappingURL=despesa.controller.d.ts.map