import { AssinaturaDao } from '../infra/bd/pg/assinatura.dao';
import { Assinatura } from '../dominio/entidades/assinatura';
import { HttpError } from '../util/http-error';

export class AssinaturaService {
    private readonly dao = new AssinaturaDao();

    public async salvar(assinatura: Assinatura): Promise<Assinatura> {
        if (!(await this.dao.planoExiste(assinatura.planoId))) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        return this.dao.salvar(assinatura);
    }

    public listar(usuarioId: string): Promise<Assinatura[]> {
        return this.dao.listar(usuarioId);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Assinatura> {
        const assinatura = await this.dao.buscarPorId(id, usuarioId);
        if (!assinatura) {
            throw new HttpError(404, 'Assinatura não encontrada.');
        }
        return assinatura;
    }

    public async atualizar(assinatura: Assinatura): Promise<Assinatura> {
        if (!(await this.dao.planoExiste(assinatura.planoId))) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        const atualizada = await this.dao.atualizar(assinatura);
        if (!atualizada) {
            throw new HttpError(404, 'Assinatura não encontrada.');
        }
        return atualizada;
    }

    public async excluir(id: string, usuarioId: string): Promise<void> {
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Assinatura não encontrada.');
        }
    }
}
