import { PlanoDao } from '../infra/bd/pg/plano.dao';
import { Plano } from '../dominio/entidades/plano';
import { HttpError } from '../util/http-error';

// Define o comportamento e os dados desta classe.
export class PlanoService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new PlanoDao();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public salvar(plano: Plano): Promise<Plano> {
        return this.dao.salvar(plano);
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public listar(): Promise<Plano[]> {
        return this.dao.listar();
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string): Promise<Plano> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const plano = await this.dao.buscarPorId(id);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!plano) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        return plano;
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(plano: Plano): Promise<Plano> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizado = await this.dao.atualizar(plano);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizado) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
        return atualizado;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id))) {
            throw new HttpError(404, 'Plano não encontrado.');
        }
    }
}
