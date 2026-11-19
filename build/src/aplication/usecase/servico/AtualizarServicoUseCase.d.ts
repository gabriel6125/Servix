import { ServicoUpdateDto } from '../../dto/servico/servicoUpdateDto';
import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';
type AtualizarServicoInput = {
    id: string;
    usuarioId: string;
    dados: ServicoUpdateDto;
};
export declare class AtualizarServicoUseCase implements UseCase<AtualizarServicoInput, Awaited<ReturnType<ServicoService['atualizar']>>> {
    private readonly service;
    execute({ id, usuarioId, dados }: AtualizarServicoInput): Promise<Awaited<ReturnType<ServicoService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarServicoUseCase.d.ts.map