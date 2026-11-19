import { PlanoCreateDto } from '../../dto/plano/planoCreateDto';
import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';
export declare class CriarPlanoUseCase implements UseCase<PlanoCreateDto, Awaited<ReturnType<PlanoService['salvar']>>> {
    private readonly service;
    execute(dados: PlanoCreateDto): Promise<Awaited<ReturnType<PlanoService['salvar']>>>;
}
//# sourceMappingURL=CriarPlanoUseCase.d.ts.map