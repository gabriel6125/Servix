import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ServicoStatusDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    status!: string;
}
