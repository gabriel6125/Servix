import type { Request, Response } from 'express';
export declare class ClienteController {
    private readonly clienteService;
    private readonly criarUseCase;
    private readonly listarUseCase;
    private readonly buscarPorIdUseCase;
    private readonly atualizarUseCase;
    private readonly excluirUseCase;
    salvar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    filtrarPorServico(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const clienteController: ClienteController;
//# sourceMappingURL=cliente.controller.d.ts.map