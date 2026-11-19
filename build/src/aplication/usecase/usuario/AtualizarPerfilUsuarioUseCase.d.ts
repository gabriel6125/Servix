import { UsuarioUpdateDto } from '../../dto/usuario/usuarioUpdateDto';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';
type AtualizarPerfilUsuarioInput = {
    id: string;
    dados: UsuarioUpdateDto;
};
export declare class AtualizarPerfilUsuarioUseCase implements UseCase<AtualizarPerfilUsuarioInput, Awaited<ReturnType<UsuarioService['atualizarPerfil']>>> {
    private readonly service;
    execute(input: AtualizarPerfilUsuarioInput): Promise<Awaited<ReturnType<UsuarioService['atualizarPerfil']>>>;
}
export {};
//# sourceMappingURL=AtualizarPerfilUsuarioUseCase.d.ts.map