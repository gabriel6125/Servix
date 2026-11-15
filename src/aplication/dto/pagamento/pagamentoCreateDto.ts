import { IsDateString, IsNumber } from 'class-validator';

export class PagamentoCreateDto {
    @IsNumber()
    servico_id!: number;

    @IsNumber()
    valor!: number;

    @IsDateString()
    data_pagamento!: string;
}
