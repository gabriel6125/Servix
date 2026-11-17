import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class DespesaCreateDto {
    @IsString()
    @IsNotEmpty()
    descricao!: string;

    @IsNumber()
    valor!: number;

    @IsDateString()
    data_despesa!: string;
}
