import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ClienteSearchNameDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nome!: string;
}
