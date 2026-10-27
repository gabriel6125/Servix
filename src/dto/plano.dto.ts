import { IsString, IsNumber, IsNotEmpty} from 'class-validator';

export class CreatePlanoDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsNumber()
    @IsNotEmpty()
    preco!: number;

    @IsString()
    @IsNotEmpty()
    periodicidade!: string;

    @IsNotEmpty()
    @IsString()
    funcionalidades!: string;
}
