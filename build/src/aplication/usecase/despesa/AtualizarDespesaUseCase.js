import { DespesaUpdateDto } from '../../dto/despesa/despesaUpdateDto';
import { Despesa } from '../../../dominio/entidades/despesa';
import { DespesaService } from '../../../service/despesa.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarDespesaUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new DespesaService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, usuarioId, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id, usuarioId);
        const despesa = Despesa.reconstruir({
            id,
            usuarioId,
            descricao: dados.descricao ?? atual.descricao,
            valor: dados.valor ?? atual.valor,
            dataDespesa: dados.data_despesa ?? atual.dataDespesa,
        });
        return this.service.atualizar(despesa);
    }
}
//# sourceMappingURL=AtualizarDespesaUseCase.js.map