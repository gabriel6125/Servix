import type { Request, Response } from 'express';
export declare class UsuarioController {
    private readonly usuarioService;
    private readonly registrarUseCase;
    private readonly autenticarUseCase;
    private readonly renovarSessaoUseCase;
    private readonly revogarSessaoUseCase;
    private readonly buscarPorIdUseCase;
    private readonly atualizarPerfilUseCase;
    private readonly excluirUseCase;
    registrar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    renovarSessao(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    solicitarRecuperacaoSenha(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    redefinirSenha(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarMeuPerfil(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizarMeuPerfil(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    excluirMeuPerfil(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const usuarioController: UsuarioController;
//# sourceMappingURL=usuario.controller.d.ts.map