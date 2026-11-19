// Define o comportamento e os dados desta classe.
export class Cliente {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(usuarioId, nome, telefone, email) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!usuarioId || !nome) {
            throw new Error('Usuário e nome são obrigatórios.');
        }
        return new Cliente({
            id: null,
            usuarioId,
            nome: nome.trim(),
            telefone,
            email: email?.trim().toLowerCase() ?? null,
        });
    }
    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    static reconstruir(props) {
        return new Cliente(props);
    }
    get id() { return this.props.id; }
    get usuarioId() { return this.props.usuarioId; }
    get nome() { return this.props.nome; }
    get telefone() { return this.props.telefone; }
    get email() { return this.props.email; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
        return {
            id: this.id,
            usuario_id: this.usuarioId,
            nome: this.nome,
            telefone: this.telefone,
            email: this.email,
        };
    }
}
//# sourceMappingURL=cliente.js.map