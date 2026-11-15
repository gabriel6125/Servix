import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { ServicoCreateDto } from '../../../../aplication/dto/servico/servicoCreateDto';
import { ServicoUpdateDto } from '../../../../aplication/dto/servico/servicoUpdateDto';
import { Servico } from '../../../../dominio/entidades/servico';
import { ServicoService } from '../../../../service/servico.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class ServicoController {
    private readonly service = new ServicoService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(ServicoCreateDto, req.body ?? {});
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
        const dto = plainToInstance(ServicoUpdateDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        if (Object.keys(req.body ?? {}).length === 0) {
            return res.status(400).json({ error: 'Informe ao menos um campo para atualizar.' });
        }

        const usuarioId = usuarioAutenticado(req);
        const id = idDaRota(req);
        const atual = await this.service.buscarPorId(id, usuarioId);
        const servico = Servico.reconstruir({
            id,
            usuarioId,
            clienteId: dto.cliente_id === undefined ? atual.clienteId : dto.cliente_id.toString(),
            descricao: dto.descricao ?? atual.descricao,
            status: dto.status ?? atual.status,
            dataPrevista: Object.prototype.hasOwnProperty.call(req.body ?? {}, 'data_prevista')
                ? dto.data_prevista ?? null
                : atual.dataPrevista,
            dataConclusao: Object.prototype.hasOwnProperty.call(req.body ?? {}, 'data_conclusao')
                ? dto.data_conclusao ?? null
                : atual.dataConclusao,
        });
        const atualizado = await this.service.atualizar(servico);
        return res.json(atualizado);
    }
}

export const servicoController = new ServicoController();
