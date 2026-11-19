// Define o comportamento e os dados desta classe.
export class Despesa {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(usuarioId, descricao, valor, dataDespesa) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!usuarioId || !descricao || !dataDespesa || !Number.isFinite(valor)) {
            throw new Error('Todos os campos obrigatórios da despesa devem ser válidos.');
        }
        return new Despesa({ id: null, usuarioId, descricao, valor, dataDespesa });
    }
    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    static reconstruir(props) {
        return new Despesa(props);
    }
    get id() { return this.props.id; }
    get usuarioId() { return this.props.usuarioId; }
    get descricao() { return this.props.descricao; }
    get valor() { return this.props.valor; }
    get dataDespesa() { return this.props.dataDespesa; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
        return {
            id: this.id,
            usuario_id: this.usuarioId,
            descricao: this.descricao,
            valor: this.valor,
            data_despesa: this.dataDespesa,
        };
    }
}
//# sourceMappingURL=despesa.js.map