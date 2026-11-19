import { UsuarioLoginDto } from '../../dto/usuario/usuarioLoginDto';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';
type AutenticarUsuarioOutput = Awaited<ReturnType<UsuarioService['autenticar']>>;
export declare class AutenticarUsuarioUseCase implements UseCase<UsuarioLoginDto, AutenticarUsuarioOutput> {
    private readonly service;
    execute(input: UsuarioLoginDto): Promise<AutenticarUsuarioOutput>;
}
export {};
//# sourceMappingURL=AutenticarUsuarioUseCase.d.ts.map