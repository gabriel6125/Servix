import { IsString, Matches } from 'class-validator';
import { ClienteSearchDto } from './clienteSearchDto';

export class ClienteSearchByIdDto extends ClienteSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
