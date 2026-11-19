import { DiagnosticoDao } from '../infra/bd/pg/diagnostico.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Diagnostico } from '../dominio/entidades/diagnostico';
import { HttpError } from '../util/http-error';
// Define o comportamento e os dados desta classe.
export class DiagnosticoService {
    constructor() {
        // Mantem a dependencia dao disponivel para as operacoes da classe.
        this.dao = new DiagnosticoDao();
        // Mantem a dependencia servicoDao disponivel para as operacoes da classe.
        this.servicoDao = new ServicoDao();
    }
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(diagnostico, usuarioId) {
        await this.validarServico(diagnostico.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const salvo = await this.dao.salvar(diagnostico, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!salvo) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return salvo;
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    listar(usuarioId) {
        return this.dao.listar(usuarioId);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const diagnostico = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!diagnostico) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
        return diagnostico;
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(diagnostico, usuarioId) {
        await this.validarServico(diagnostico.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizado = await this.dao.atualizar(diagnostico, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizado) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
        return atualizado;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
    }
    // Metodo validarServico: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async validarServico(servicoId, usuarioId) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.servicoDao.buscarPorId(servicoId, usuarioId))) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
    }
}
//# sourceMappingURL=diagnostico.servico.js.map