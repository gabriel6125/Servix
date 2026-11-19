import { ClienteCreateDto } from '../../dto/cliente/clienteCreateDto';
import { Cliente } from '../../../dominio/entidades/cliente';
import { ClienteService } from '../../../service/cliente.servico';
// Define o comportamento e os dados desta classe.
export class CriarClienteUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ClienteService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute({ usuarioId, dados }) {
        const cliente = Cliente.construir(usuarioId, dados.nome, dados.telefone ?? null, dados.email ?? null);
        return this.service.salvar(cliente);
    }
}
//# sourceMappingURL=CriarClienteUseCase.js.map