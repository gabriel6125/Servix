import { IsString, Matches } from 'class-validator';
import { PlanoSearchDto } from './planoSearchDto';

// Define o comportamento e os dados desta classe.
export class PlanoSearchByIdDto extends PlanoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
