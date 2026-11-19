import { UsuarioService } from '../../../service/usuario.servico';
// Define o comportamento e os dados desta classe.
export class RenovarSessaoUsuarioUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new UsuarioService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(input) {
        return this.service.renovarSessao(input.refreshToken);
    }
}
//# sourceMappingURL=RenovarSessaoUsuarioUseCase.js.map