import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';
export declare class ListarAssinaturasUseCase implements UseCase<string, Awaited<ReturnType<AssinaturaService['listar']>>> {
    private readonly service;
    execute(usuarioId: string): Promise<Awaited<ReturnType<AssinaturaService['listar']>>>;
}
//# sourceMappingURL=ListarAssinaturasUseCase.d.ts.map