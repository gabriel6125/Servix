import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { ClienteCreateDto } from '../../../../aplication/dto/cliente/clienteCreateDto';
import { ClienteSearchByIdDto } from '../../../../aplication/dto/cliente/clienteSearchByIdDto';
import { ClienteSearchDto } from '../../../../aplication/dto/cliente/clienteSearchDto';
import { ClienteUpdateDto } from '../../../../aplication/dto/cliente/clienteUpdateDto';
import { AtualizarClienteUseCase } from '../../../../aplication/usecase/cliente/AtualizarClienteUseCase';
import { BuscarClientePorIdUseCase } from '../../../../aplication/usecase/cliente/BuscarClientePorIdUseCase';
import { CriarClienteUseCase } from '../../../../aplication/usecase/cliente/CriarClienteUseCase';
import { ExcluirClienteUseCase } from '../../../../aplication/usecase/cliente/ExcluirClienteUseCase';
import { ListarClientesUseCase } from '../../../../aplication/usecase/cliente/ListarClientesUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

export class ClienteController {
    private readonly criarUseCase = new CriarClienteUseCase();
    private readonly listarUseCase = new ListarClientesUseCase();
    private readonly buscarPorIdUseCase = new BuscarClientePorIdUseCase();
    private readonly atualizarUseCase = new AtualizarClienteUseCase();
    private readonly excluirUseCase = new ExcluirClienteUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(ClienteCreateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            const salvo = await this.criarUseCase.execute({
                usuarioId: usuarioAutenticado(req),
                dados: dto,
            });
            return res.status(201).json(salvo);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async buscarPorId(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, ClienteSearchByIdDto);
            const cliente = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            return res.json(plainToInstance(ClienteSearchByIdDto, cliente.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(req: Request, res: Response) {
        try {
            const clientes = await this.listarUseCase.execute(usuarioAutenticado(req));
            return res.json(plainToInstance(
                ClienteSearchDto,
                clientes.map((cliente) => cliente.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, ClienteSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(ClienteUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const id = await idDaRota(req, ClienteSearchByIdDto);
            const usuarioId = usuarioAutenticado(req);
            const atualizado = await this.atualizarUseCase.execute({
                id,
                usuarioId,
                dados: dto,
            });
            return res.json(atualizado);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}

export const clienteController = new ClienteController();
