import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { PagamentoDto } from '../../../../aplication/dto/pagamento/pagamento.dto';
import { Pagamento } from '../../../../dominio/entidades/pagamento';
import { PagamentoService } from '../../../../service/pagamento.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class PagamentoController {
    private readonly service = new PagamentoService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(PagamentoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const pagamento = Pagamento.construir(dto.servico_id.toString(), dto.valor, dto.data_pagamento);
        const salvo = await this.service.salvar(pagamento, usuarioAutenticado(req));
        return res.status(201).json(salvo);
    }

    public async buscarPorId(req: Request, res: Response) {
        const pagamento = await this.service.buscarPorId(idDaRota(req), usuarioAutenticado(req));
        return res.json(pagamento);
    }

    public async listar(req: Request, res: Response) {
        const pagamentos = await this.service.listar(usuarioAutenticado(req));
        return res.json(pagamentos);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req), usuarioAutenticado(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(PagamentoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const pagamento = Pagamento.reconstruir({
            id: idDaRota(req),
            servicoId: dto.servico_id.toString(),
            valor: dto.valor,
            dataPagamento: dto.data_pagamento,
        });
        const atualizado = await this.service.atualizar(pagamento, usuarioAutenticado(req));
        return res.json(atualizado);
    }
}

export const pagamentoController = new PagamentoController();
