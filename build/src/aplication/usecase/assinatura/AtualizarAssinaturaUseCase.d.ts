import { AssinaturaUpdateDto } from '../../dto/assinatura/assinaturaUpdateDto';
import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';
type AtualizarAssinaturaInput = {
    id: string;
    usuarioId: string;
    dados: AssinaturaUpdateDto;
};
export declare class AtualizarAssinaturaUseCase implements UseCase<AtualizarAssinaturaInput, Awaited<ReturnType<AssinaturaService['atualizar']>>> {
    private readonly service;
    execute({ id, usuarioId, dados }: AtualizarAssinaturaInput): Promise<Awaited<ReturnType<AssinaturaService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarAssinaturaUseCase.d.ts.map