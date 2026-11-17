import { IsString, Matches } from 'class-validator';
import { PagamentoSearchDto } from './pagamentoSearchDto';

// Define o comportamento e os dados desta classe.
export class PagamentoSearchByIdDto extends PagamentoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
