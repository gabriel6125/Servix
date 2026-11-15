import { OrcamentoCreateDto } from '../../dto/orcamento/orcamentoCreateDto';
import { Orcamento } from '../../../dominio/entidades/orcamento';
import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';

type CriarOrcamentoInput = { usuarioId: string; dados: OrcamentoCreateDto };

export class CriarOrcamentoUseCase implements UseCase<CriarOrcamentoInput, Awaited<ReturnType<OrcamentoService['salvar']>>> {
    private readonly service = new OrcamentoService();

    public execute({ usuarioId, dados }: CriarOrcamentoInput): Promise<Awaited<ReturnType<OrcamentoService['salvar']>>> {
        const orcamento = Orcamento.construir(
            dados.servico_id.toString(),
            dados.valor_pecas === undefined ? 0 : dados.valor_pecas,
            dados.valor_mao_de_obra === undefined ? 0 : dados.valor_mao_de_obra,
            dados.outros_custos === undefined ? 0 : dados.outros_custos,
            dados.valor_total,
            dados.status,
            dados.link_acesso ?? null,
        );
        return this.service.salvar(orcamento, usuarioId);
    }
}
