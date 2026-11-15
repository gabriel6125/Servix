import { PlanoCreateDto } from '../../dto/plano/planoCreateDto';
import { Plano } from '../../../dominio/entidades/plano';
import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';

export class CriarPlanoUseCase implements UseCase<PlanoCreateDto, Awaited<ReturnType<PlanoService['salvar']>>> {
    private readonly service = new PlanoService();

    public execute(dados: PlanoCreateDto): Promise<Awaited<ReturnType<PlanoService['salvar']>>> {
        const plano = Plano.construir(
            dados.nome,
            dados.valor,
            dados.periodicidade,
            dados.funcionalidades ?? null,
        );
        return this.service.salvar(plano);
    }
}
