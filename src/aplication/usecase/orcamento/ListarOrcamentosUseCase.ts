import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ListarOrcamentosUseCase implements UseCase<string, Awaited<ReturnType<OrcamentoService['listar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new OrcamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(usuarioId: string): Promise<Awaited<ReturnType<OrcamentoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
