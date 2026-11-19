import { OrcamentoUpdateDto } from '../../dto/orcamento/orcamentoUpdateDto';
import { Orcamento } from '../../../dominio/entidades/orcamento';
import { OrcamentoService } from '../../../service/orcamento.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarOrcamentoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new OrcamentoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, usuarioId, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
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
//# sourceMappingURL=AtualizarOrcamentoUseCase.js.map