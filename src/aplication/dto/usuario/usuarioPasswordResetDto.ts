import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UsuarioPasswordResetDto {
    @IsString()
    @Matches(/^[a-f\d]{64}$/i)
    token!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    senha!: string;
}
