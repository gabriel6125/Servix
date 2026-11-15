import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { ServicoDto } from '../../../../aplication/dto/servico/servico.dto';
import { Servico } from '../../../../dominio/entidades/servico';
import { ServicoService } from '../../../../service/servico.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class ServicoController {
    private readonly service = new ServicoService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(ServicoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const usuarioId = usuarioAutenticado(req);
        const servico = Servico.construir(
            dto.cliente_id.toString(),
            usuarioId,
            dto.descricao,
            dto.status,
            dto.data_prevista ?? null,
            dto.data_conclusao ?? null,
        );
        const salvo = await this.service.salvar(servico);
        return res.status(201).json(salvo);
    }

    public async buscarPorId(req: Request, res: Response) {
        const servico = await this.service.buscarPorId(idDaRota(req), usuarioAutenticado(req));
        return res.json(servico);
    }

    public async listar(req: Request, res: Response) {
        const servicos = await this.service.listar(usuarioAutenticado(req));
        return res.json(servicos);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req), usuarioAutenticado(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(ServicoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const servico = Servico.reconstruir({
            id: idDaRota(req),
            usuarioId: usuarioAutenticado(req),
            clienteId: dto.cliente_id.toString(),
            descricao: dto.descricao,
            status: dto.status,
            dataPrevista: dto.data_prevista ?? null,
            dataConclusao: dto.data_conclusao ?? null,
        });
        const atualizado = await this.service.atualizar(servico);
        return res.json(atualizado);
    }
}

export const servicoController = new ServicoController();
