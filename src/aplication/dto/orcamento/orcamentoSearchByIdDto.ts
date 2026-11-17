import { IsString, Matches } from 'class-validator';
import { OrcamentoSearchDto } from './orcamentoSearchDto';

// Define o comportamento e os dados desta classe.
export class OrcamentoSearchByIdDto extends OrcamentoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
