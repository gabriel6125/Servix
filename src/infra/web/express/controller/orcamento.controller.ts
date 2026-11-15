import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { OrcamentoDto } from '../../../../aplication/dto/orcamento/orcamento';
import { Orcamento } from '../../../../dominio/entidades/orcamento';
import { OrcamentoService } from '../../../../service/orcamento.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class OrcamentoController {
    private readonly service = new OrcamentoService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(OrcamentoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const orcamento = Orcamento.construir(
            dto.servico_id.toString(),
            dto.valor_pecas === undefined ? 0 : dto.valor_pecas,
            dto.valor_mao_de_obra === undefined ? 0 : dto.valor_mao_de_obra,
            dto.outros_custos === undefined ? 0 : dto.outros_custos,
            dto.valor_total,
            dto.status,
            dto.link_acesso ?? null,
        );
        const salvo = await this.service.salvar(orcamento, usuarioAutenticado(req));
        return res.status(201).json(salvo);
    }

    public async buscarPorId(req: Request, res: Response) {
        const orcamento = await this.service.buscarPorId(idDaRota(req), usuarioAutenticado(req));
        return res.json(orcamento);
    }

    public async listar(req: Request, res: Response) {
        const orcamentos = await this.service.listar(usuarioAutenticado(req));
        return res.json(orcamentos);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req), usuarioAutenticado(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(OrcamentoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const orcamento = Orcamento.reconstruir({
            id: idDaRota(req),
            servicoId: dto.servico_id.toString(),
            valorPecas: dto.valor_pecas === undefined ? 0 : dto.valor_pecas,
            valorMaoDeObra: dto.valor_mao_de_obra === undefined ? 0 : dto.valor_mao_de_obra,
            outrosCustos: dto.outros_custos === undefined ? 0 : dto.outros_custos,
            valorTotal: dto.valor_total,
            status: dto.status,
            linkAcesso: dto.link_acesso ?? null,
        });
        const atualizado = await this.service.atualizar(orcamento, usuarioAutenticado(req));
        return res.json(atualizado);
    }
}

export const orcamentoController = new OrcamentoController();
