import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';
export declare class BuscarUsuarioPorIdUseCase implements UseCase<string, Awaited<ReturnType<UsuarioService['buscarPorId']>>> {
    private readonly service;
    execute(id: string): Promise<Awaited<ReturnType<UsuarioService['buscarPorId']>>>;
}
//# sourceMappingURL=BuscarUsuarioPorIdUseCase.d.ts.map