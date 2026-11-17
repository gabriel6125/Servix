import { ServicoCreateDto } from '../../dto/servico/servicoCreateDto';
import { Servico } from '../../../dominio/entidades/servico';
import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

type CriarServicoInput = { usuarioId: string; dados: ServicoCreateDto };

// Define o comportamento e os dados desta classe.
export class CriarServicoUseCase implements UseCase<CriarServicoInput, Awaited<ReturnType<ServicoService['salvar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ServicoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
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
