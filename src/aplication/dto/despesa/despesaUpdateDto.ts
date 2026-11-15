import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
