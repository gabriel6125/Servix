import { IsString, Matches } from 'class-validator';
import { DespesaSearchDto } from './despesaSearchDto';

// Define o comportamento e os dados desta classe.
export class DespesaSearchByIdDto extends DespesaSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
