import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class UsuarioCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nome!: string;

    @IsEmail()
    @MaxLength(255)
    email!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    senha!: string;
}

