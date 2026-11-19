export type propsPlano = {
    id: string | null;
    nome: string;
    valor: number;
    periodicidade: string;
    funcionalidades: string[] | null;
};
export declare class Plano {
    private props;
    private constructor();
    static construir(nome: string, valor: number, periodicidade: string, funcionalidades: string[] | null): Plano;
    static reconstruir(props: propsPlano): Plano;
    get id(): string | null;
    get nome(): string;
    get valor(): number;
    get periodicidade(): string;
    get funcionalidades(): string[] | null;
    toJSON(): {
        id: string | null;
        nome: string;
        valor: number;
        periodicidade: string;
        funcionalidades: string[] | null;
    };
}
//# sourceMappingURL=plano.d.ts.map