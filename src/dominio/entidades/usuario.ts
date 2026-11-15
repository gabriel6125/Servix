export type propsUsuario = {
    id: string | null;
    nome: string;
    email: string;
    senha: string;
};

export class Usuario {
    private constructor(private props: propsUsuario) {}

    public static construir(nome: string, email: string, senha: string): Usuario {
        if (!nome || !email || !senha) {
            throw new Error('Nome, e-mail e senha são obrigatórios.');
        }
        return new Usuario({ id: null, nome, email, senha });
    }

    public static reconstruir(props: propsUsuario): Usuario {
        return new Usuario(props);
    }

    public get id() { return this.props.id; }
    public get nome() { return this.props.nome; }
    public get email() { return this.props.email; }
    public get senha() { return this.props.senha; }

    public toJSON() {
        return { id: this.id, nome: this.nome, email: this.email };
    }
}
