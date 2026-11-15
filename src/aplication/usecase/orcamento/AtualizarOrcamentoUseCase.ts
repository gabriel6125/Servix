import { OrcamentoUpdateDto } from '../../dto/orcamento/orcamentoUpdateDto';
import { Orcamento } from '../../../dominio/entidades/orcamento';
import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarOrcamentoInput = { id: string; usuarioId: string; dados: OrcamentoUpdateDto };

export class AtualizarOrcamentoUseCase implements UseCase<
    AtualizarOrcamentoInput,
    Awaited<ReturnType<OrcamentoService['atualizar']>>
> {
    private readonly service = new OrcamentoService();

    public async execute({ id, usuarioId, dados }: AtualizarOrcamentoInput): Promise<Awaited<ReturnType<OrcamentoService['atualizar']>>> {
        validarAtualizacao(dados);
        const atual = await this.service.buscarPorId(id, usuarioId);
        const orcamento = Orcamento.reconstruir({
            id,
            servicoId: dados.servico_id?.toString() ?? atual.servicoId,
            valorPecas: dados.valor_pecas === undefined ? atual.valorPecas : dados.valor_pecas,
            valorMaoDeObra: dados.valor_mao_de_obra === undefined ? atual.valorMaoDeObra : dados.valor_mao_de_obra,
            outrosCustos: dados.outros_custos === undefined ? atual.outrosCustos : dados.outros_custos,
            valorTotal: dados.valor_total ?? atual.valorTotal,
            status: dados.status ?? atual.status,
            linkAcesso: dados.link_acesso === undefined ? atual.linkAcesso : dados.link_acesso,
        });
        return this.service.atualizar(orcamento, usuarioId);
    }
}
