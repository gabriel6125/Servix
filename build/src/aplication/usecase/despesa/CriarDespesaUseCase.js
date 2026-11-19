import { DespesaCreateDto } from '../../dto/despesa/despesaCreateDto';
import { Despesa } from '../../../dominio/entidades/despesa';
import { DespesaService } from '../../../service/despesa.servico';
// Define o comportamento e os dados desta classe.
export class CriarDespesaUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new DespesaService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute({ usuarioId, dados }) {
        const despesa = Despesa.construir(usuarioId, dados.descricao, dados.valor, dados.data_despesa);
        return this.service.salvar(despesa);
    }
}
//# sourceMappingURL=CriarDespesaUseCase.js.map