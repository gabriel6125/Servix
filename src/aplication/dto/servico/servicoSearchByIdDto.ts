import { IsString, Matches } from 'class-validator';
import { ServicoSearchDto } from './servicoSearchDto';

// Define o comportamento e os dados desta classe.
export class ServicoSearchByIdDto extends ServicoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
