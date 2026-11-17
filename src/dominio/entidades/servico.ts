// Define o formato dos dados usados nesta parte da aplicacao.
export type propsServico = {
    id: string | null;
    clienteId: string;
    usuarioId: string;
    descricao: string;
    status: string;
    dataPrevista: string | null;
    dataConclusao: string | null;
};

// Define o comportamento e os dados desta classe.
export class Servico {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private constructor(private props: propsServico) {}

    public static construir(
        clienteId: string,
        usuarioId: string,
        descricao: string,
        status: string,
        dataPrevista: string | null,
        dataConclusao: string | null,
    ): Servico {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!clienteId || !usuarioId || !descricao || !status) {
            throw new Error('Cliente, usuário, descrição e status são obrigatórios.');
        }
        return new Servico({
            id: null,
            clienteId,
            usuarioId,
            descricao,
            status,
            dataPrevista,
            dataConclusao,
        });
    }

    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public static reconstruir(props: propsServico): Servico {
        return new Servico(props);
    }

    public get id() { return this.props.id; }
    public get clienteId() { return this.props.clienteId; }
    public get usuarioId() { return this.props.usuarioId; }
    public get descricao() { return this.props.descricao; }
    public get status() { return this.props.status; }
    public get dataPrevista() { return this.props.dataPrevista; }
    public get dataConclusao() { return this.props.dataConclusao; }

    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public toJSON() {
        return {
            id: this.id,
            cliente_id: this.clienteId,
            usuario_id: this.usuarioId,
            descricao: this.descricao,
            status: this.status,
            data_prevista: this.dataPrevista,
            data_conclusao: this.dataConclusao,
        };
    }
}
