import { ServicoCreateDto } from '../../dto/servico/servicoCreateDto';
import { Servico } from '../../../dominio/entidades/servico';
import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

type CriarServicoInput = { usuarioId: string; dados: ServicoCreateDto };

export class CriarServicoUseCase implements UseCase<CriarServicoInput, Awaited<ReturnType<ServicoService['salvar']>>> {
    private readonly service = new ServicoService();

    public execute({ usuarioId, dados }: CriarServicoInput): Promise<Awaited<ReturnType<ServicoService['salvar']>>> {
        const servico = Servico.construir(
            dados.cliente_id.toString(),
            usuarioId,
            dados.descricao,
            dados.status,
            dados.data_prevista ?? null,
            dados.data_conclusao ?? null,
        );
        return this.service.salvar(servico);
    }
}
