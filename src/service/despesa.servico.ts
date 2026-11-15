import { DespesaDao } from '../infra/bd/pg/despesa.dao';
import { Despesa } from '../dominio/entidades/despesa';
import { HttpError } from '../util/http-error';

export class DespesaService {
    private readonly dao = new DespesaDao();

    public salvar(despesa: Despesa): Promise<Despesa> {
        return this.dao.salvar(despesa);
    }

    public listar(usuarioId: string): Promise<Despesa[]> {
        return this.dao.listar(usuarioId);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Despesa> {
        const despesa = await this.dao.buscarPorId(id, usuarioId);
        if (!despesa) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        return despesa;
    }

    public async atualizar(despesa: Despesa): Promise<Despesa> {
        const atualizada = await this.dao.atualizar(despesa);
        if (!atualizada) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        return atualizada;
    }

    public async excluir(id: string, usuarioId: string): Promise<void> {
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
    }
}
