import { UsuarioUpdateDto } from '../../dto/usuario/usuarioUpdateDto';
import { UsuarioService } from '../../../service/usuario.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarPerfilUsuarioUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new UsuarioService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(input) {
        validarAtualizacao(input.dados);
        return this.service.atualizarPerfil(input.id, input.dados);
    }
}
//# sourceMappingURL=AtualizarPerfilUsuarioUseCase.js.map