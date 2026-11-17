import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ListarDiagnosticosUseCase implements UseCase<string, Awaited<ReturnType<DiagnosticoService['listar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DiagnosticoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(usuarioId: string): Promise<Awaited<ReturnType<DiagnosticoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
