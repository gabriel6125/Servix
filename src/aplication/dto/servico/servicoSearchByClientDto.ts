import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ServicoSearchByClientDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[1-9]\d*$/)
    clienteId!: string;
}
