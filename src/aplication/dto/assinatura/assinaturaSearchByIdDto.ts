import { IsString, Matches } from 'class-validator';
import { AssinaturaSearchDto } from './assinaturaSearchDto';

export class AssinaturaSearchByIdDto extends AssinaturaSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
