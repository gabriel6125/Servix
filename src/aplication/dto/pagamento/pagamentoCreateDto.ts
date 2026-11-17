import { IsDateString, IsNumber } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class PagamentoCreateDto {
    @IsNumber()
    servico_id!: number;

    @IsNumber()
    valor!: number;

    @IsDateString()
    data_pagamento!: string;
}
