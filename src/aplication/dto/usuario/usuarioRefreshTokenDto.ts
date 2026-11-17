import { IsString, Matches } from 'class-validator';

// Define o comportamento e os dados desta classe.
export class UsuarioRefreshTokenDto {
    @IsString()
    @Matches(/^[a-f\d]{64}$/i)
    refreshToken!: string;
}
