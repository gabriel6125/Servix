// Define o comportamento e os dados desta classe.
export class Assinatura {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(usuarioId, planoId, status, dataInicio, dataFim) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!usuarioId || !planoId || !status || !dataInicio) {
            throw new Error('Todos os campos obrigatórios da assinatura devem ser informados.');
        }
        return new Assinatura({ id: null, usuarioId, planoId, status, dataInicio, dataFim });
    }
    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    static reconstruir(props) {
        return new Assinatura(props);
    }
    get id() { return this.props.id; }
    get usuarioId() { return this.props.usuarioId; }
    get planoId() { return this.props.planoId; }
    get status() { return this.props.status; }
    get dataInicio() { return this.props.dataInicio; }
    get dataFim() { return this.props.dataFim; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
        return {
            id: this.id,
            usuario_id: this.usuarioId,
            plano_id: this.planoId,
            status: this.status,
            data_inicio: this.dataInicio,
            data_fim: this.dataFim,
        };
    }
}
//# sourceMappingURL=assinatura.js.map