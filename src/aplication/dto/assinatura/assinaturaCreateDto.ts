import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class AssinaturaCreateDto {
    @IsNumber()
    plano_id!: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    status!: string;

    @IsDateString()
    data_inicio!: string;

    @IsOptional()
    @IsDateString()
    data_fim?: string | null;
}
