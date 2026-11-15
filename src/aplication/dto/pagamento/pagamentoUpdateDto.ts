import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class PagamentoUpdateDto {
    @IsOptional()
    @IsNumber()
    servico_id?: number;

    @IsOptional()
    @IsNumber()
    valor?: number;

    @IsOptional()
    @IsDateString()
    data_pagamento?: string;
}
