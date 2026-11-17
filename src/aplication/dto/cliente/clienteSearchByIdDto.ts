import { IsString, Matches } from 'class-validator';
import { ClienteSearchDto } from './clienteSearchDto';

// Define o comportamento e os dados desta classe.
export class ClienteSearchByIdDto extends ClienteSearchDto {
    @IsString()
    @Matches(/^[1-9]\d*$/)
    id!: string;
}
