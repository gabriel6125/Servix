import { UsuarioCreateDto } from '../../dto/usuario/usuarioCreateDto';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';
type RegistrarUsuarioInput = UsuarioCreateDto;
type RegistrarUsuarioOutput = Awaited<ReturnType<UsuarioService['registrar']>>;
export declare class RegistrarUsuarioUseCase implements UseCase<RegistrarUsuarioInput, RegistrarUsuarioOutput> {
    private readonly service;
    execute(input: RegistrarUsuarioInput): Promise<RegistrarUsuarioOutput>;
}
export {};
//# sourceMappingURL=RegistrarUsuarioUseCase.d.ts.map