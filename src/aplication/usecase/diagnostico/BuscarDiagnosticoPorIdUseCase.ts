import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

type BuscarDiagnosticoPorIdInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class BuscarDiagnosticoPorIdUseCase implements UseCase<
    BuscarDiagnosticoPorIdInput,
    Awaited<ReturnType<DiagnosticoService['buscarPorId']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DiagnosticoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: BuscarDiagnosticoPorIdInput): Promise<Awaited<ReturnType<DiagnosticoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
