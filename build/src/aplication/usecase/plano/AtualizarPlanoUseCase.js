import { PlanoUpdateDto } from '../../dto/plano/planoUpdateDto';
import { Plano } from '../../../dominio/entidades/plano';
import { PlanoService } from '../../../service/plano.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarPlanoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new PlanoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id);
        const plano = Plano.reconstruir({
            id,
            nome: dados.nome ?? atual.nome,
            valor: dados.valor ?? atual.valor,
            periodicidade: dados.periodicidade ?? atual.periodicidade,
            funcionalidades: dados.funcionalidades === undefined ? atual.funcionalidades : dados.funcionalidades,
        });
        return this.service.atualizar(plano);
    }
}
//# sourceMappingURL=AtualizarPlanoUseCase.js.map