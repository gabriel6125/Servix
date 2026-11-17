import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class AssinaturaUpdateDto {
    @IsOptional()
    @IsNumber()
    plano_id?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    status?: string;

    @IsOptional()
    @IsDateString()
    data_inicio?: string;

    @IsOptional()
    @IsDateString()
    data_fim?: string | null;
}
