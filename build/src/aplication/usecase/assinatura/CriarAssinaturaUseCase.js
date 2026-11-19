import { AssinaturaCreateDto } from '../../dto/assinatura/assinaturaCreateDto';
import { Assinatura } from '../../../dominio/entidades/assinatura';
import { AssinaturaService } from '../../../service/assinatura.servico';
// Define o comportamento e os dados desta classe.
export class CriarAssinaturaUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new AssinaturaService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute({ usuarioId, dados }) {
        const assinatura = Assinatura.construir(usuarioId, dados.plano_id.toString(), dados.status, dados.data_inicio, dados.data_fim ?? null);
        return this.service.salvar(assinatura);
    }
}
//# sourceMappingURL=CriarAssinaturaUseCase.js.map