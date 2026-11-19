import { DiagnosticoUpdateDto } from '../../dto/diagnostico/diagnosticoUpdateDto';
import { Diagnostico } from '../../../dominio/entidades/diagnostico';
import { DiagnosticoService } from '../../../service/diagnostico.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarDiagnosticoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new DiagnosticoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, usuarioId, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id, usuarioId);
        const diagnostico = Diagnostico.reconstruir({
            id,
            servicoId: dados.servico_id?.toString() ?? atual.servicoId,
            problemaIdentificado: dados.problema_identificado ?? atual.problemaIdentificado,
            observacoes: dados.observacoes === undefined ? atual.observacoes : dados.observacoes,
        });
        return this.service.atualizar(diagnostico, usuarioId);
    }
}
//# sourceMappingURL=AtualizarDiagnosticoUseCase.js.map