// Define o comportamento e os dados desta classe.
export class ServicoSearchDto {
    cliente_id!: string;
    usuario_id!: string;
    descricao!: string;
    status!: string;
    data_prevista!: string | null;
    data_conclusao!: string | null;
}
