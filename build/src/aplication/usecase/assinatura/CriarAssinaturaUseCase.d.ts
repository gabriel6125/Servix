import { AssinaturaCreateDto } from '../../dto/assinatura/assinaturaCreateDto';
import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';
type CriarAssinaturaInput = {
    usuarioId: string;
    dados: AssinaturaCreateDto;
};
export declare class CriarAssinaturaUseCase implements UseCase<CriarAssinaturaInput, Awaited<ReturnType<AssinaturaService['salvar']>>> {
    private readonly service;
    execute({ usuarioId, dados }: CriarAssinaturaInput): Promise<Awaited<ReturnType<AssinaturaService['salvar']>>>;
}
export {};
//# sourceMappingURL=CriarAssinaturaUseCase.d.ts.map