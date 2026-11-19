import { ClienteUpdateDto } from '../../dto/cliente/clienteUpdateDto';
import { Cliente } from '../../../dominio/entidades/cliente';
import { ClienteService } from '../../../service/cliente.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarClienteUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ClienteService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, usuarioId, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id, usuarioId);
        const cliente = Cliente.reconstruir({
            id,
            usuarioId,
            nome: dados.nome ?? atual.nome,
            telefone: dados.telefone === undefined ? atual.telefone : dados.telefone,
            email: dados.email === undefined ? atual.email : dados.email,
        });
        return this.service.atualizar(cliente);
    }
}
//# sourceMappingURL=AtualizarClienteUseCase.js.map