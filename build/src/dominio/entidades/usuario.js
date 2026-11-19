// Define o comportamento e os dados desta classe.
export class Usuario {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(nome, email, senha) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!nome || !email || !senha) {
            throw new Error('Nome, e-mail e senha são obrigatórios.');
        }
        return new Usuario({ id: null, nome, email, senha });
    }
    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    static reconstruir(props) {
        return new Usuario(props);
    }
    get id() { return this.props.id; }
    get nome() { return this.props.nome; }
    get email() { return this.props.email; }
    get senha() { return this.props.senha; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
        return { id: this.id, nome: this.nome, email: this.email };
    }
}
//# sourceMappingURL=usuario.js.map