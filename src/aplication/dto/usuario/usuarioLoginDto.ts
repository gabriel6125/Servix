import { IsEmail, IsString, MinLength } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class UsuarioLoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    senha!: string;
}