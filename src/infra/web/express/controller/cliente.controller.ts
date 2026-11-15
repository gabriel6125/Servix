import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { ClienteDto } from '../../../../aplication/dto/cliente/cliente.dto';
import { Cliente } from '../../../../dominio/entidades/cliente';
import { ClienteService } from '../../../../service/cliente.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class ClienteController {
    private readonly service = new ClienteService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(ClienteDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const cliente = Cliente.construir(
            usuarioAutenticado(req),
            dto.nome,
            dto.telefone ?? null,
            dto.email ?? null,
        );
        const salvo = await this.service.salvar(cliente);
        return res.status(201).json(salvo);
    }

    public async buscarPorId(req: Request, res: Response) {
        const cliente = await this.service.buscarPorId(idDaRota(req), usuarioAutenticado(req));
        return res.json(cliente);
    }

    public async listar(req: Request, res: Response) {
        const clientes = await this.service.listar(usuarioAutenticado(req));
        return res.json(clientes);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req), usuarioAutenticado(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(ClienteDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const cliente = Cliente.reconstruir({
            id: idDaRota(req),
            usuarioId: usuarioAutenticado(req),
            nome: dto.nome,
            telefone: dto.telefone ?? null,
            email: dto.email ?? null,
        });
        const atualizado = await this.service.atualizar(cliente);
        return res.json(atualizado);
    }
}

export const clienteController = new ClienteController();
