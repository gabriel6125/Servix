import { IsEmail, MaxLength } from 'class-validator';

export class UsuarioPasswordRecoveryDto {
    @IsEmail()
    @MaxLength(255)
    email!: string;
}
