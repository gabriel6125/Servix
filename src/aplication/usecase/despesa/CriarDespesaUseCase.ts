import { DespesaCreateDto } from '../../dto/despesa/despesaCreateDto';
import { Despesa } from '../../../dominio/entidades/despesa';
import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

type CriarDespesaInput = { usuarioId: string; dados: DespesaCreateDto };

// Define o comportamento e os dados desta classe.
export class CriarDespesaUseCase implements UseCase<CriarDespesaInput, Awaited<ReturnType<DespesaService['salvar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DespesaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute({ usuarioId, dados }: CriarDespesaInput): Promise<Awaited<ReturnType<DespesaService['salvar']>>> {
        const despesa = Despesa.construir(usuarioId, dados.descricao, dados.valor, dados.data_despesa);
        return this.service.salvar(despesa);
    }
}
