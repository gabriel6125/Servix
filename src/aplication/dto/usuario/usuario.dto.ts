import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UsuarioDto {
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

export class UsuarioLoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    senha!: string;
}

export class UsuarioUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nome?: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(255)
    senha?: string;
}