import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ServicoDto {
    @IsNumber()
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