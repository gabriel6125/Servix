export type propsUsuario = {
    id: string | null;
    nome: string;
    email: string;
    senha: string;
};
export declare class Usuario {
    private props;
    private constructor();
    static construir(nome: string, email: string, senha: string): Usuario;
    static reconstruir(props: propsUsuario): Usuario;
    get id(): string | null;
    get nome(): string;
    get email(): string;
    get senha(): string;
    toJSON(): {
        id: string | null;
        nome: string;
        email: string;
    };
}
//# sourceMappingURL=usuario.d.ts.map