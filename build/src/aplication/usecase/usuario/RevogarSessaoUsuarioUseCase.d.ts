import type { UseCase } from '../UseCase';
export type RevogarSessaoUsuarioInput = {
    refreshToken: string;
};
export declare class RevogarSessaoUsuarioUseCase implements UseCase<RevogarSessaoUsuarioInput, void> {
    private readonly service;
    execute(input: RevogarSessaoUsuarioInput): Promise<void>;
}
//# sourceMappingURL=RevogarSessaoUsuarioUseCase.d.ts.map