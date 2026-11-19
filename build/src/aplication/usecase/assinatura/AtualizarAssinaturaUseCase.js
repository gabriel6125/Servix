import { AssinaturaUpdateDto } from '../../dto/assinatura/assinaturaUpdateDto';
import { Assinatura } from '../../../dominio/entidades/assinatura';
import { AssinaturaService } from '../../../service/assinatura.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarAssinaturaUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new AssinaturaService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, usuarioId, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id, usuarioId);
        const assinatura = Assinatura.reconstruir({
            id,
            usuarioId,
            planoId: dados.plano_id?.toString() ?? atual.planoId,
            status: dados.status ?? atual.status,
            dataInicio: dados.data_inicio ?? atual.dataInicio,
            dataFim: dados.data_fim === undefined ? atual.dataFim : dados.data_fim,
        });
        return this.service.atualizar(assinatura);
    }
}
//# sourceMappingURL=AtualizarAssinaturaUseCase.js.map