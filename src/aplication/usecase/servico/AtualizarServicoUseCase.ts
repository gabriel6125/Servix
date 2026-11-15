import { ServicoUpdateDto } from '../../dto/servico/servicoUpdateDto';
import { Servico } from '../../../dominio/entidades/servico';
import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarServicoInput = { id: string; usuarioId: string; dados: ServicoUpdateDto };

export class AtualizarServicoUseCase implements UseCase<
    AtualizarServicoInput,
    Awaited<ReturnType<ServicoService['atualizar']>>
> {
    private readonly service = new ServicoService();

    public async execute({ id, usuarioId, dados }: AtualizarServicoInput): Promise<Awaited<ReturnType<ServicoService['atualizar']>>> {
        validarAtualizacao(dados);
        const atual = await this.service.buscarPorId(id, usuarioId);
        const servico = Servico.reconstruir({
            id,
            usuarioId,
            clienteId: dados.cliente_id === undefined ? atual.clienteId : dados.cliente_id.toString(),
            descricao: dados.descricao ?? atual.descricao,
            status: dados.status ?? atual.status,
            dataPrevista: dados.data_prevista === undefined ? atual.dataPrevista : dados.data_prevista,
            dataConclusao: dados.data_conclusao === undefined ? atual.dataConclusao : dados.data_conclusao,
        });
        return this.service.atualizar(servico);
    }
}
