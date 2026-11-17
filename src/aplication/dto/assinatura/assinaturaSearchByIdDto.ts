import { IsString, Matches } from 'class-validator';
import { AssinaturaSearchDto } from './assinaturaSearchDto';

// Define o comportamento e os dados desta classe.
export class AssinaturaSearchByIdDto extends AssinaturaSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
