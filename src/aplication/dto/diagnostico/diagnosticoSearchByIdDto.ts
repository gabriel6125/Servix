import { IsString, Matches } from 'class-validator';
import { DiagnosticoSearchDto } from './diagnosticoSearchDto';

export class DiagnosticoSearchByIdDto extends DiagnosticoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
