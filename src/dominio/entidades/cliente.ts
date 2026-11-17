// Define o formato dos dados usados nesta parte da aplicacao.
export type propsCliente = {
    id: string | null;
    usuarioId: string;
    nome: string;
    telefone: string | null;
    email: string | null;
};

// Define o comportamento e os dados desta classe.
export class Cliente {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private constructor(private props: propsCliente) {}

    public static construir(
        usuarioId: string,
        nome: string,
        telefone: string | null,
        email: string | null,
    ): Cliente {
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
    public static reconstruir(props: propsCliente): Cliente {
        return new Cliente(props);
    }

    public get id() { return this.props.id; }
    public get usuarioId() { return this.props.usuarioId; }
    public get nome() { return this.props.nome; }
    public get telefone() { return this.props.telefone; }
    public get email() { return this.props.email; }

    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public toJSON() {
        return {
            id: this.id,
            usuario_id: this.usuarioId,
            nome: this.nome,
            telefone: this.telefone,
            email: this.email,
        };
    }
}