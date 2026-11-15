import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DespesaDto {
    @IsString()
    @IsNotEmpty()
    descricao!: string;

    @IsNumber()
    valor!: number;

    @IsDateString()
    data_despesa!: string;
}