import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DiagnosticoCreateDto {
    @IsNumber()
    servico_id!: number;

    @IsString()
    @IsNotEmpty()
    problema_identificado!: string;

    @IsOptional()
    @IsString()
    observacoes?: string | null;
}
