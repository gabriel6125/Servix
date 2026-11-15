import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { OrcamentoCreateDto } from '../../../../aplication/dto/orcamento/orcamentoCreateDto';
import { OrcamentoSearchByIdDto } from '../../../../aplication/dto/orcamento/orcamentoSearchByIdDto';
import { OrcamentoSearchDto } from '../../../../aplication/dto/orcamento/orcamentoSearchDto';
import { OrcamentoUpdateDto } from '../../../../aplication/dto/orcamento/orcamentoUpdateDto';
import { AtualizarOrcamentoUseCase } from '../../../../aplication/usecase/orcamento/AtualizarOrcamentoUseCase';
import { BuscarOrcamentoPorIdUseCase } from '../../../../aplication/usecase/orcamento/BuscarOrcamentoPorIdUseCase';
import { CriarOrcamentoUseCase } from '../../../../aplication/usecase/orcamento/CriarOrcamentoUseCase';
import { ExcluirOrcamentoUseCase } from '../../../../aplication/usecase/orcamento/ExcluirOrcamentoUseCase';
import { ListarOrcamentosUseCase } from '../../../../aplication/usecase/orcamento/ListarOrcamentosUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

export class OrcamentoController {
    private readonly criarUseCase = new CriarOrcamentoUseCase();
    private readonly listarUseCase = new ListarOrcamentosUseCase();
    private readonly buscarPorIdUseCase = new BuscarOrcamentoPorIdUseCase();
    private readonly atualizarUseCase = new AtualizarOrcamentoUseCase();
    private readonly excluirUseCase = new ExcluirOrcamentoUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(OrcamentoCreateDto, req.body ?? {});
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
            const id = await idDaRota(req, OrcamentoSearchByIdDto);
            const orcamento = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            return res.json(plainToInstance(OrcamentoSearchByIdDto, orcamento.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(req: Request, res: Response) {
        try {
            const orcamentos = await this.listarUseCase.execute(usuarioAutenticado(req));
            return res.json(plainToInstance(
                OrcamentoSearchDto,
                orcamentos.map((orcamento) => orcamento.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, OrcamentoSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(OrcamentoUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const id = await idDaRota(req, OrcamentoSearchByIdDto);
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

export const orcamentoController = new OrcamentoController();
