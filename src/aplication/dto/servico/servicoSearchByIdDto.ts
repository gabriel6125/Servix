import { IsString, Matches } from 'class-validator';
import { ServicoSearchDto } from './servicoSearchDto';

export class ServicoSearchByIdDto extends ServicoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
