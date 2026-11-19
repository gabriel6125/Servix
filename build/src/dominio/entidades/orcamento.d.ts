export type propsOrcamento = {
    id: string | null;
    servicoId: string;
    valorPecas: number | null;
    valorMaoDeObra: number | null;
    outrosCustos: number | null;
    valorTotal: number;
    status: string;
    linkAcesso: string | null;
};
export declare class Orcamento {
    private props;
    private constructor();
    static construir(servicoId: string, valorPecas: number | null, valorMaoDeObra: number | null, outrosCustos: number | null, valorTotal: number, status: string, linkAcesso: string | null): Orcamento;
    static reconstruir(props: propsOrcamento): Orcamento;
    get id(): string | null;
    get servicoId(): string;
    get valorPecas(): number | null;
    get valorMaoDeObra(): number | null;
    get outrosCustos(): number | null;
    get valorTotal(): number;
    get status(): string;
    get linkAcesso(): string | null;
    toJSON(): {
        id: string | null;
        servico_id: string;
        valor_pecas: number | null;
        valor_mao_de_obra: number | null;
        outros_custos: number | null;
        valor_total: number;
        status: string;
        link_acesso: string | null;
    };
}
//# sourceMappingURL=orcamento.d.ts.map