import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class PlanoCreateDto {
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
