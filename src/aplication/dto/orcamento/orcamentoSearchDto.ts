// Define o comportamento e os dados desta classe.
export class OrcamentoSearchDto {
    servico_id!: string;
    valor_pecas!: number | null;
    valor_mao_de_obra!: number | null;
    outros_custos!: number | null;
    valor_total!: number;
    status!: string;
    link_acesso!: string | null;
}
