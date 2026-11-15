import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class OrcamentoCreateDto {
    @IsNumber()
    servico_id!: number;

    @IsOptional()
    @IsNumber()
    valor_pecas?: number | null;

    @IsOptional()
    @IsNumber()
    valor_mao_de_obra?: number | null;

    @IsOptional()
    @IsNumber()
    outros_custos?: number | null;

    @IsNumber()
    valor_total!: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    status!: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    link_acesso?: string | null;
}
