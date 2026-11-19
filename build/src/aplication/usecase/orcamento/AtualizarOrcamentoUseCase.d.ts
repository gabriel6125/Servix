import { OrcamentoUpdateDto } from '../../dto/orcamento/orcamentoUpdateDto';
import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';
type AtualizarOrcamentoInput = {
    id: string;
    usuarioId: string;
    dados: OrcamentoUpdateDto;
};
export declare class AtualizarOrcamentoUseCase implements UseCase<AtualizarOrcamentoInput, Awaited<ReturnType<OrcamentoService['atualizar']>>> {
    private readonly service;
    execute({ id, usuarioId, dados }: AtualizarOrcamentoInput): Promise<Awaited<ReturnType<OrcamentoService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarOrcamentoUseCase.d.ts.map