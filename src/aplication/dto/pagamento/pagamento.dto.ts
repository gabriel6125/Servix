import { IsDateString, IsNumber } from 'class-validator';

export class PagamentoDto {
    @IsNumber()
    servico_id!: number;

    @IsNumber()
    valor!: number;

    @IsDateString()
    data_pagamento!: string;
}