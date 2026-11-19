import { PlanoUpdateDto } from '../../dto/plano/planoUpdateDto';
import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';
type AtualizarPlanoInput = {
    id: string;
    dados: PlanoUpdateDto;
};
export declare class AtualizarPlanoUseCase implements UseCase<AtualizarPlanoInput, Awaited<ReturnType<PlanoService['atualizar']>>> {
    private readonly service;
    execute({ id, dados }: AtualizarPlanoInput): Promise<Awaited<ReturnType<PlanoService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarPlanoUseCase.d.ts.map