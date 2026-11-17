import { DiagnosticoUpdateDto } from '../../dto/diagnostico/diagnosticoUpdateDto';
import { Diagnostico } from '../../../dominio/entidades/diagnostico';
import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarDiagnosticoInput = { id: string; usuarioId: string; dados: DiagnosticoUpdateDto };

// Define o comportamento e os dados desta classe.
export class AtualizarDiagnosticoUseCase implements UseCase<
    AtualizarDiagnosticoInput,
    Awaited<ReturnType<DiagnosticoService['atualizar']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DiagnosticoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async execute({ id, usuarioId, dados }: AtualizarDiagnosticoInput): Promise<Awaited<ReturnType<DiagnosticoService['atualizar']>>> {
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
