import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ClienteSearchByServiceDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[1-9]\d*$/)
    servicoId!: string;
}
