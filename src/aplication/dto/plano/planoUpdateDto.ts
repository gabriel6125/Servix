import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class PlanoUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nome?: string;

    @IsOptional()
    @IsNumber()
    valor?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    periodicidade?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    funcionalidades?: string[] | null;
}
