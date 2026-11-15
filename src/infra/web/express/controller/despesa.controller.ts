import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { DespesaCreateDto } from '../../../../aplication/dto/despesa/despesaCreateDto';
import { DespesaSearchByIdDto } from '../../../../aplication/dto/despesa/despesaSearchByIdDto';
import { DespesaSearchDto } from '../../../../aplication/dto/despesa/despesaSearchDto';
import { DespesaUpdateDto } from '../../../../aplication/dto/despesa/despesaUpdateDto';
import { AtualizarDespesaUseCase } from '../../../../aplication/usecase/despesa/AtualizarDespesaUseCase';
import { BuscarDespesaPorIdUseCase } from '../../../../aplication/usecase/despesa/BuscarDespesaPorIdUseCase';
import { CriarDespesaUseCase } from '../../../../aplication/usecase/despesa/CriarDespesaUseCase';
import { ExcluirDespesaUseCase } from '../../../../aplication/usecase/despesa/ExcluirDespesaUseCase';
import { ListarDespesasUseCase } from '../../../../aplication/usecase/despesa/ListarDespesasUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

export class DespesaController {
    private readonly criarUseCase = new CriarDespesaUseCase();
    private readonly listarUseCase = new ListarDespesasUseCase();
    private readonly buscarPorIdUseCase = new BuscarDespesaPorIdUseCase();
    private readonly atualizarUseCase = new AtualizarDespesaUseCase();
    private readonly excluirUseCase = new ExcluirDespesaUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(DespesaCreateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            const salva = await this.criarUseCase.execute({
                usuarioId: usuarioAutenticado(req),
                dados: dto,
            });
            return res.status(201).json(salva);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async buscarPorId(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, DespesaSearchByIdDto);
            const despesa = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            return res.json(plainToInstance(DespesaSearchByIdDto, despesa.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(req: Request, res: Response) {
        try {
            const despesas = await this.listarUseCase.execute(usuarioAutenticado(req));
            return res.json(plainToInstance(
                DespesaSearchDto,
                despesas.map((despesa) => despesa.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, DespesaSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(DespesaUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const id = await idDaRota(req, DespesaSearchByIdDto);
            const usuarioId = usuarioAutenticado(req);
            const atualizada = await this.atualizarUseCase.execute({
                id,
                usuarioId,
                dados: dto,
            });
            return res.json(atualizada);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}

export const despesaController = new DespesaController();
