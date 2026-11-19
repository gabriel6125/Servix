import { ServicoCreateDto } from '../../dto/servico/servicoCreateDto';
import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';
type CriarServicoInput = {
    usuarioId: string;
    dados: ServicoCreateDto;
};
export declare class CriarServicoUseCase implements UseCase<CriarServicoInput, Awaited<ReturnType<ServicoService['salvar']>>> {
    private readonly service;
    execute({ usuarioId, dados }: CriarServicoInput): Promise<Awaited<ReturnType<ServicoService['salvar']>>>;
}
export {};
//# sourceMappingURL=CriarServicoUseCase.d.ts.map