import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class DespesaUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    descricao?: string;

    @IsOptional()
    @IsNumber()
    valor?: number;

    @IsOptional()
    @IsDateString()
    data_despesa?: string;
}
