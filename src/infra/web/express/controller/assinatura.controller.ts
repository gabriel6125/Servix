import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { AssinaturaDto } from '../../../../aplication/dto/assinatura/assinatura.dto';
import { Assinatura } from '../../../../dominio/entidades/assinatura';
import { AssinaturaService } from '../../../../service/assinatura.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class AssinaturaController {
    private readonly service = new AssinaturaService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(AssinaturaDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const assinatura = Assinatura.construir(
            usuarioAutenticado(req),
            dto.plano_id.toString(),
            dto.status,
            dto.data_inicio,
            dto.data_fim ?? null,
        );
        const salva = await this.service.salvar(assinatura);
        return res.status(201).json(salva);
    }

    public async buscarPorId(req: Request, res: Response) {
        const assinatura = await this.service.buscarPorId(idDaRota(req), usuarioAutenticado(req));
        return res.json(assinatura);
    }

    public async listar(req: Request, res: Response) {
        const assinaturas = await this.service.listar(usuarioAutenticado(req));
        return res.json(assinaturas);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req), usuarioAutenticado(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(AssinaturaDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const assinatura = Assinatura.reconstruir({
            id: idDaRota(req),
            usuarioId: usuarioAutenticado(req),
            planoId: dto.plano_id.toString(),
            status: dto.status,
            dataInicio: dto.data_inicio,
            dataFim: dto.data_fim ?? null,
        });
        const atualizada = await this.service.atualizar(assinatura);
        return res.json(atualizada);
    }
}

export const assinaturaController = new AssinaturaController();
