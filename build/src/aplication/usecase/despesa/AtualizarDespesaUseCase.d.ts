import { DespesaUpdateDto } from '../../dto/despesa/despesaUpdateDto';
import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';
type AtualizarDespesaInput = {
    id: string;
    usuarioId: string;
    dados: DespesaUpdateDto;
};
export declare class AtualizarDespesaUseCase implements UseCase<AtualizarDespesaInput, Awaited<ReturnType<DespesaService['atualizar']>>> {
    private readonly service;
    execute({ id, usuarioId, dados }: AtualizarDespesaInput): Promise<Awaited<ReturnType<DespesaService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarDespesaUseCase.d.ts.map