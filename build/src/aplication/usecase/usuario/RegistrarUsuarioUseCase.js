import { UsuarioCreateDto } from '../../dto/usuario/usuarioCreateDto';
import { Usuario } from '../../../dominio/entidades/usuario';
import { UsuarioService } from '../../../service/usuario.servico';
// Define o comportamento e os dados desta classe.
export class RegistrarUsuarioUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new UsuarioService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(input) {
        return this.service.registrar(Usuario.construir(input.nome, input.email, input.senha));
    }
}
//# sourceMappingURL=RegistrarUsuarioUseCase.js.map