import { IsIn, IsString } from 'class-validator';

export class OrcamentoDecisionDto {
    @IsString()
    @IsIn(['aprovado', 'aprovada', 'recusado', 'recusada'])
    decisao!: 'aprovado' | 'aprovada' | 'recusado' | 'recusada';
}
