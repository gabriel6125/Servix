import { DiagnosticoCreateDto } from '../../dto/diagnostico/diagnosticoCreateDto';
import { Diagnostico } from '../../../dominio/entidades/diagnostico';
import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

type CriarDiagnosticoInput = { usuarioId: string; dados: DiagnosticoCreateDto };

export class CriarDiagnosticoUseCase implements UseCase<
    CriarDiagnosticoInput,
    Awaited<ReturnType<DiagnosticoService['salvar']>>
> {
    private readonly service = new DiagnosticoService();

    public execute({ usuarioId, dados }: CriarDiagnosticoInput): Promise<Awaited<ReturnType<DiagnosticoService['salvar']>>> {
        const diagnostico = Diagnostico.construir(
            dados.servico_id.toString(),
            dados.problema_identificado,
            dados.observacoes ?? null,
        );
        return this.service.salvar(diagnostico, usuarioId);
    }
}
