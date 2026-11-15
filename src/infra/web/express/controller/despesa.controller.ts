import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { DespesaDto } from '../../../../aplication/dto/despesa/despesa.dto';
import { Despesa } from '../../../../dominio/entidades/despesa';
import { DespesaService } from '../../../../service/despesa.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class DespesaController {
    private readonly service = new DespesaService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(DespesaDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const despesa = Despesa.construir(
            usuarioAutenticado(req),
            dto.descricao,
            dto.valor,
            dto.data_despesa,
        );
        const salva = await this.service.salvar(despesa);
        return res.status(201).json(salva);
    }

    public async buscarPorId(req: Request, res: Response) {
        const despesa = await this.service.buscarPorId(idDaRota(req), usuarioAutenticado(req));
        return res.json(despesa);
    }

    public async listar(req: Request, res: Response) {
        const despesas = await this.service.listar(usuarioAutenticado(req));
        return res.json(despesas);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req), usuarioAutenticado(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(DespesaDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const despesa = Despesa.reconstruir({
            id: idDaRota(req),
            usuarioId: usuarioAutenticado(req),
            descricao: dto.descricao,
            valor: dto.valor,
            dataDespesa: dto.data_despesa,
        });
        const atualizada = await this.service.atualizar(despesa);
        return res.json(atualizada);
    }
}

export const despesaController = new DespesaController();
