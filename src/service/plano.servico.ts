import { PlanoDao } from '../infra/bd/mysql/plano.dao';
import { Plano } from '../dominio/entidades/plano';
import { HttpError } from '../util/http-error';

export class PlanoService {
    private readonly dao = new PlanoDao();

    public salvar(plano: Plano): Promise<Plano> {
        return this.dao.salvar(plano);
    }

    public listar(): Promise<Plano[]> {
        return this.dao.listar();
    }

    public async buscarPorId(id: string): Promise<Plano> {
        const plano = await this.dao.buscarPorId(id);
        if (!plano) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        return plano;
    }

    public async atualizar(plano: Plano): Promise<Plano> {
        const atualizado = await this.dao.atualizar(plano);
        if (!atualizado) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        return atualizado;
    }

    public async excluir(id: string): Promise<void> {
        if (!(await this.dao.excluir(id))) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
    }
}
