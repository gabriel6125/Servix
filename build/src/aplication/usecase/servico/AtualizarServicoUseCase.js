import { ServicoUpdateDto } from '../../dto/servico/servicoUpdateDto';
import { Servico } from '../../../dominio/entidades/servico';
import { ServicoService } from '../../../service/servico.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarServicoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ServicoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, usuarioId, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id, usuarioId);
        const servico = Servico.reconstruir({
            id,
            usuarioId,
            clienteId: dados.cliente_id === undefined ? atual.clienteId : dados.cliente_id.toString(),
            descricao: dados.descricao ?? atual.descricao,
            status: dados.status ?? atual.status,
            dataPrevista: dados.data_prevista === undefined ? atual.dataPrevista : dados.data_prevista,
            dataConclusao: dados.data_conclusao === undefined ? atual.dataConclusao : dados.data_conclusao,
        });
        return this.service.atualizar(servico);
    }
}
//# sourceMappingURL=AtualizarServicoUseCase.js.map