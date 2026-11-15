import { ClienteDao } from '../infra/bd/mysql/cliente.dao';
import { Cliente } from '../dominio/entidades/cliente';
import { HttpError } from '../util/http-error';

export class ClienteService {
    private readonly dao = new ClienteDao();

    public salvar(cliente: Cliente): Promise<Cliente> {
        return this.dao.salvar(cliente);
    }

    public listar(usuarioId: string): Promise<Cliente[]> {
        return this.dao.listar(usuarioId);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Cliente> {
        const cliente = await this.dao.buscarPorId(id, usuarioId);
        if (!cliente) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
        return cliente;
    }

    public async atualizar(cliente: Cliente): Promise<Cliente> {
        const atualizado = await this.dao.atualizar(cliente);
        if (!atualizado) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
        return atualizado;
    }

    public async excluir(id: string, usuarioId: string): Promise<void> {
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
    }
}
