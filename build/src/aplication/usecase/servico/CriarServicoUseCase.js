import { ServicoCreateDto } from '../../dto/servico/servicoCreateDto';
import { Servico } from '../../../dominio/entidades/servico';
import { ServicoService } from '../../../service/servico.servico';
// Define o comportamento e os dados desta classe.
export class CriarServicoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ServicoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute({ usuarioId, dados }) {
        const servico = Servico.construir(dados.cliente_id.toString(), usuarioId, dados.descricao, dados.status, dados.data_prevista ?? null, dados.data_conclusao ?? null);
        return this.service.salvar(servico);
    }
}
//# sourceMappingURL=CriarServicoUseCase.js.map