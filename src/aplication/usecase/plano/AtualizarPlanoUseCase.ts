import { PlanoUpdateDto } from '../../dto/plano/planoUpdateDto';
import { Plano } from '../../../dominio/entidades/plano';
import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarPlanoInput = { id: string; dados: PlanoUpdateDto };

// Define o comportamento e os dados desta classe.
export class AtualizarPlanoUseCase implements UseCase<
    AtualizarPlanoInput,
    Awaited<ReturnType<PlanoService['atualizar']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PlanoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async execute({ id, dados }: AtualizarPlanoInput): Promise<Awaited<ReturnType<PlanoService['atualizar']>>> {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id);
        const plano = Plano.reconstruir({
            id,
            nome: dados.nome ?? atual.nome,
            valor: dados.valor ?? atual.valor,
            periodicidade: dados.periodicidade ?? atual.periodicidade,
            funcionalidades: dados.funcionalidades === undefined ? atual.funcionalidades : dados.funcionalidades,
        });
        return this.service.atualizar(plano);
    }
}
