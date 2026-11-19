import { AssinaturaDao } from '../infra/bd/pg/assinatura.dao';
import { Assinatura } from '../dominio/entidades/assinatura';
import { HttpError } from '../util/http-error';
// Define o comportamento e os dados desta classe.
export class AssinaturaService {
    constructor() {
        // Mantem a dependencia dao disponivel para as operacoes da classe.
        this.dao = new AssinaturaDao();
    }
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(assinatura) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.planoExiste(assinatura.planoId))) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        return this.dao.salvar(assinatura);
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    listar(usuarioId) {
        return this.dao.listar(usuarioId);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const assinatura = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!assinatura) {
            throw new HttpError(404, 'Assinatura não encontrada.');
        }
        return assinatura;
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(assinatura) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.planoExiste(assinatura.planoId))) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizada = await this.dao.atualizar(assinatura);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizada) {
            throw new HttpError(404, 'Assinatura não encontrada.');
        }
        return atualizada;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Assinatura não encontrada.');
        }
    }
}
//# sourceMappingURL=assinatura.servico.js.map