import { randomUUID } from 'node:crypto';

export type propsCliente = {
    id: string | null;
    nome: string;
    email: string | null;
    senha: string | null;
};

export class Cliente {
    private constructor(private props: propsCliente) {}

    public static construir(
        nome: string,
        email: string | null,
        senha: string | null,
    ): Cliente {
        if (!nome || !email || !senha) {
            throw new Error('Nome, e-mail e senha são obrigatórios.');
        }
        return new Cliente({ id: randomUUID(), nome: nome.trim(), email: email.trim().toLowerCase(), senha});
    }

    public static reconstruir(props: propsCliente): Cliente {
        return new Cliente(props);
    }

    public get id() { return this.props.id; }
    public get nome() { return this.props.nome; }
    public get email() { return this.props.email; }
    public get senha() { return this.props.senha; }
}