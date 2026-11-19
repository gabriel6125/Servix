// Define o comportamento e os dados desta classe.
export class Plano {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(nome, valor, periodicidade, funcionalidades) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!nome || !periodicidade || !Number.isFinite(valor)) {
            throw new Error('Nome, valor e periodicidade são obrigatórios.');
        }
        return new Plano({ id: null, nome, valor, periodicidade, funcionalidades });
    }
    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    static reconstruir(props) {
        return new Plano(props);
    }
    get id() { return this.props.id; }
    get nome() { return this.props.nome; }
    get valor() { return this.props.valor; }
    get periodicidade() { return this.props.periodicidade; }
    get funcionalidades() { return this.props.funcionalidades; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            valor: this.valor,
            periodicidade: this.periodicidade,
            funcionalidades: this.funcionalidades,
        };
    }
}
//# sourceMappingURL=plano.js.map