import { IsDateString, IsNumber, IsOptional } from 'class-validator';

// Define o comportamento e os dados desta classe.
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
