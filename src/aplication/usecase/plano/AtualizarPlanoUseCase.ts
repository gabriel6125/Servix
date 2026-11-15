import { PlanoUpdateDto } from '../../dto/plano/planoUpdateDto';
import { Plano } from '../../../dominio/entidades/plano';
import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarPlanoInput = { id: string; dados: PlanoUpdateDto };

export class AtualizarPlanoUseCase implements UseCase<
    AtualizarPlanoInput,
    Awaited<ReturnType<PlanoService['atualizar']>>
> {
    private readonly service = new PlanoService();

    public async execute({ id, dados }: AtualizarPlanoInput): Promise<Awaited<ReturnType<PlanoService['atualizar']>>> {
        validarAtualizacao(dados);
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
