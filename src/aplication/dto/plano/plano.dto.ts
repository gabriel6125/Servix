import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class PlanoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nome!: string;

    @IsNumber()
    @IsNotEmpty()
    valor!: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    periodicidade!: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    funcionalidades?: string[] | null;
}
