export type propsCliente = {
    id: string | null;
    usuarioId: string;
    nome: string;
    telefone: string | null;
    email: string | null;
};
export declare class Cliente {
    private props;
    private constructor();
    static construir(usuarioId: string, nome: string, telefone: string | null, email: string | null): Cliente;
    static reconstruir(props: propsCliente): Cliente;
    get id(): string | null;
    get usuarioId(): string;
    get nome(): string;
    get telefone(): string | null;
    get email(): string | null;
    toJSON(): {
        id: string | null;
        usuario_id: string;
        nome: string;
        telefone: string | null;
        email: string | null;
    };
}
//# sourceMappingURL=cliente.d.ts.map