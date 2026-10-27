import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(8)
  senha!: string;
}

export class LoginUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(8)
  senha!: string;
}

export class UpdateUsuarioDto {
  @ValidateIf((_obj, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @ValidateIf((_obj, value) => value !== undefined)
  @IsEmail()
  email?: string;

  @ValidateIf((_obj, value) => value !== undefined)
  @IsString()
  @MinLength(8)
  senha?: string;
}