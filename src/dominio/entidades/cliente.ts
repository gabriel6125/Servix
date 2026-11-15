export type propsCliente = {
    id: string | null;
    usuarioId: string;
    nome: string;
    telefone: string | null;
    email: string | null;
};

export class Cliente {
    private constructor(private props: propsCliente) {}

    public static construir(
        usuarioId: string,
        nome: string,
        telefone: string | null,
        email: string | null,
    ): Cliente {
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

    public static reconstruir(props: propsCliente): Cliente {
        return new Cliente(props);
    }

    public get id() { return this.props.id; }
    public get usuarioId() { return this.props.usuarioId; }
    public get nome() { return this.props.nome; }
    public get telefone() { return this.props.telefone; }
    public get email() { return this.props.email; }

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