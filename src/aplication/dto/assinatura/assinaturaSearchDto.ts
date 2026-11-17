// Define o comportamento e os dados desta classe.
export class AssinaturaSearchDto {
    usuario_id!: string;
    plano_id!: string;
    status!: string;
    data_inicio!: string;
    data_fim!: string | null;
}
