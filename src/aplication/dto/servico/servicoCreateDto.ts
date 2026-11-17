import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class ServicoCreateDto {
    @IsNumber()
    @IsInt()
    @Min(1)
    cliente_id!: number;

    @IsString()
    @IsNotEmpty()
    descricao!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    status!: string;

    @IsOptional()
    @IsDateString()
    data_prevista?: string | null;

    @IsOptional()
    @IsDateString()
    data_conclusao?: string | null;
}
