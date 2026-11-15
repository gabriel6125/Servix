import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DiagnosticoUpdateDto {
    @IsOptional()
    @IsNumber()
    servico_id?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    problema_identificado?: string;

    @IsOptional()
    @IsString()
    observacoes?: string | null;
}
