import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { PlanoDto } from '../../../../aplication/dto/plano/plano.dto';
import { Plano } from '../../../../dominio/entidades/plano';
import { PlanoService } from '../../../../service/plano.servico';
import { idDaRota } from './controller.util';

export class PlanoController {
    private readonly service = new PlanoService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(PlanoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const plano = Plano.construir(
            dto.nome,
            dto.valor,
            dto.periodicidade,
            dto.funcionalidades ?? null,
        );
        const salvo = await this.service.salvar(plano);
        return res.status(201).json(salvo);
    }

    public async buscarPorId(req: Request, res: Response) {
        const plano = await this.service.buscarPorId(idDaRota(req));
        return res.json(plano);
    }

    public async listar(_req: Request, res: Response) {
        const planos = await this.service.listar();
        return res.json(planos);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(PlanoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const plano = Plano.reconstruir({
            id: idDaRota(req),
            nome: dto.nome,
            valor: dto.valor,
            periodicidade: dto.periodicidade,
            funcionalidades: dto.funcionalidades ?? null,
        });
        const atualizado = await this.service.atualizar(plano);
        return res.json(atualizado);
    }
}

export const planoController = new PlanoController();
