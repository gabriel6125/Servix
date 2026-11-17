import { PlanoCreateDto } from '../../dto/plano/planoCreateDto';
import { Plano } from '../../../dominio/entidades/plano';
import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class CriarPlanoUseCase implements UseCase<PlanoCreateDto, Awaited<ReturnType<PlanoService['salvar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PlanoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
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
