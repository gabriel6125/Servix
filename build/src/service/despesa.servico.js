import { DespesaDao } from '../infra/bd/pg/despesa.dao';
import { Despesa } from '../dominio/entidades/despesa';
import { HttpError } from '../util/http-error';
// Define o comportamento e os dados desta classe.
export class DespesaService {
    constructor() {
        // Mantem a dependencia dao disponivel para as operacoes da classe.
        this.dao = new DespesaDao();
    }
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    salvar(despesa) {
        return this.dao.salvar(despesa);
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    listar(usuarioId) {
        return this.dao.listar(usuarioId);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const despesa = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!despesa) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        return despesa;
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(despesa) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizada = await this.dao.atualizar(despesa);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizada) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        return atualizada;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
    }
}
//# sourceMappingURL=despesa.servico.js.map