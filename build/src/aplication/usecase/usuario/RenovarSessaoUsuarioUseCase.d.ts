import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';
export type RenovarSessaoUsuarioInput = {
    refreshToken: string;
};
type RenovarSessaoUsuarioOutput = Awaited<ReturnType<UsuarioService['renovarSessao']>>;
export declare class RenovarSessaoUsuarioUseCase implements UseCase<RenovarSessaoUsuarioInput, RenovarSessaoUsuarioOutput> {
    private readonly service;
    execute(input: RenovarSessaoUsuarioInput): Promise<RenovarSessaoUsuarioOutput>;
}
export {};
//# sourceMappingURL=RenovarSessaoUsuarioUseCase.d.ts.map