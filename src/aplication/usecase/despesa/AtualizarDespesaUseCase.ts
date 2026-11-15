import { DespesaUpdateDto } from '../../dto/despesa/despesaUpdateDto';
import { Despesa } from '../../../dominio/entidades/despesa';
import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarDespesaInput = { id: string; usuarioId: string; dados: DespesaUpdateDto };

export class AtualizarDespesaUseCase implements UseCase<
    AtualizarDespesaInput,
    Awaited<ReturnType<DespesaService['atualizar']>>
> {
    private readonly service = new DespesaService();

    public async execute({ id, usuarioId, dados }: AtualizarDespesaInput): Promise<Awaited<ReturnType<DespesaService['atualizar']>>> {
        validarAtualizacao(dados);
        const atual = await this.service.buscarPorId(id, usuarioId);
        const despesa = Despesa.reconstruir({
            id,
            usuarioId,
            descricao: dados.descricao ?? atual.descricao,
            valor: dados.valor ?? atual.valor,
            dataDespesa: dados.data_despesa ?? atual.dataDespesa,
        });
        return this.service.atualizar(despesa);
    }
}
