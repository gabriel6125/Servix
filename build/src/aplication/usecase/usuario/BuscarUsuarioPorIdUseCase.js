import { UsuarioService } from '../../../service/usuario.servico';
// Define o comportamento e os dados desta classe.
export class BuscarUsuarioPorIdUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new UsuarioService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(id) {
        return this.service.buscarPorId(id);
    }
}
//# sourceMappingURL=BuscarUsuarioPorIdUseCase.js.map