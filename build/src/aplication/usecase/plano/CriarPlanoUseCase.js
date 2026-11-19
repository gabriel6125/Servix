import { PlanoCreateDto } from '../../dto/plano/planoCreateDto';
import { Plano } from '../../../dominio/entidades/plano';
import { PlanoService } from '../../../service/plano.servico';
// Define o comportamento e os dados desta classe.
export class CriarPlanoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new PlanoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(dados) {
        const plano = Plano.construir(dados.nome, dados.valor, dados.periodicidade, dados.funcionalidades ?? null);
        return this.service.salvar(plano);
    }
}
//# sourceMappingURL=CriarPlanoUseCase.js.map