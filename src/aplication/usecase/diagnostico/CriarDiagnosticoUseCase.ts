import { DiagnosticoCreateDto } from '../../dto/diagnostico/diagnosticoCreateDto';
import { Diagnostico } from '../../../dominio/entidades/diagnostico';
import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

type CriarDiagnosticoInput = { usuarioId: string; dados: DiagnosticoCreateDto };

// Define o comportamento e os dados desta classe.
export class CriarDiagnosticoUseCase implements UseCase<
    CriarDiagnosticoInput,
    Awaited<ReturnType<DiagnosticoService['salvar']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DiagnosticoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute({ usuarioId, dados }: CriarDiagnosticoInput): Promise<Awaited<ReturnType<DiagnosticoService['salvar']>>> {
        const diagnostico = Diagnostico.construir(
            dados.servico_id.toString(),
            dados.problema_identificado,
            dados.observacoes ?? null,
        );
        return this.service.salvar(diagnostico, usuarioId);
    }
}
