import { IsString, Matches } from 'class-validator';
import { DiagnosticoSearchDto } from './diagnosticoSearchDto';

// Define o comportamento e os dados desta classe.
export class DiagnosticoSearchByIdDto extends DiagnosticoSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
