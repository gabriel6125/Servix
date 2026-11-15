import { DespesaCreateDto } from '../../dto/despesa/despesaCreateDto';
import { Despesa } from '../../../dominio/entidades/despesa';
import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

type CriarDespesaInput = { usuarioId: string; dados: DespesaCreateDto };

export class CriarDespesaUseCase implements UseCase<CriarDespesaInput, Awaited<ReturnType<DespesaService['salvar']>>> {
    private readonly service = new DespesaService();

    public execute({ usuarioId, dados }: CriarDespesaInput): Promise<Awaited<ReturnType<DespesaService['salvar']>>> {
        const despesa = Despesa.construir(usuarioId, dados.descricao, dados.valor, dados.data_despesa);
        return this.service.salvar(despesa);
    }
}
