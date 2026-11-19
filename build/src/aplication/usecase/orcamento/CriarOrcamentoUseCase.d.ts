import { OrcamentoCreateDto } from '../../dto/orcamento/orcamentoCreateDto';
import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';
type CriarOrcamentoInput = {
    usuarioId: string;
    dados: OrcamentoCreateDto;
};
export declare class CriarOrcamentoUseCase implements UseCase<CriarOrcamentoInput, Awaited<ReturnType<OrcamentoService['salvar']>>> {
    private readonly service;
    execute({ usuarioId, dados }: CriarOrcamentoInput): Promise<Awaited<ReturnType<OrcamentoService['salvar']>>>;
}
export {};
//# sourceMappingURL=CriarOrcamentoUseCase.d.ts.map