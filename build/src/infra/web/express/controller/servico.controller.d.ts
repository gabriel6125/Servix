import type { Request, Response } from 'express';
export declare class ServicoController {
    private readonly servicoService;
    private readonly criarUseCase;
    private readonly listarUseCase;
    private readonly buscarPorIdUseCase;
    private readonly atualizarUseCase;
    private readonly excluirUseCase;
    salvar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    filtrarPorCliente(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    alertasPrazo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    alterarStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    finalizar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const servicoController: ServicoController;
//# sourceMappingURL=servico.controller.d.ts.map