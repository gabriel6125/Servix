// Define o comportamento e os dados desta classe.
export class Servico {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(clienteId, usuarioId, descricao, status, dataPrevista, dataConclusao) {
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
    static reconstruir(props) {
        return new Servico(props);
    }
    get id() { return this.props.id; }
    get clienteId() { return this.props.clienteId; }
    get usuarioId() { return this.props.usuarioId; }
    get descricao() { return this.props.descricao; }
    get status() { return this.props.status; }
    get dataPrevista() { return this.props.dataPrevista; }
    get dataConclusao() { return this.props.dataConclusao; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
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
//# sourceMappingURL=servico.js.map