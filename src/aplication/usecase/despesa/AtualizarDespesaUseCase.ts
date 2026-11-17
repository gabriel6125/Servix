import { DespesaUpdateDto } from '../../dto/despesa/despesaUpdateDto';
import { Despesa } from '../../../dominio/entidades/despesa';
import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarDespesaInput = { id: string; usuarioId: string; dados: DespesaUpdateDto };

// Define o comportamento e os dados desta classe.
export class AtualizarDespesaUseCase implements UseCase<
    AtualizarDespesaInput,
    Awaited<ReturnType<DespesaService['atualizar']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DespesaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async execute({ id, usuarioId, dados }: AtualizarDespesaInput): Promise<Awaited<ReturnType<DespesaService['atualizar']>>> {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
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
