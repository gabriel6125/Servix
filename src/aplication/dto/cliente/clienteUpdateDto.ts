import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class ClienteUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nome?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    telefone?: string | null;

    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    email?: string | null;
}
