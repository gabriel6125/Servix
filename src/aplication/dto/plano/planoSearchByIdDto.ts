import { IsString, Matches } from 'class-validator';
import { PlanoSearchDto } from './planoSearchDto';

export class PlanoSearchByIdDto extends PlanoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
