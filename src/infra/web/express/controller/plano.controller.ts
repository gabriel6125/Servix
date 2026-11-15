import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { PlanoCreateDto } from '../../../../aplication/dto/plano/planoCreateDto';
import { PlanoSearchByIdDto } from '../../../../aplication/dto/plano/planoSearchByIdDto';
import { PlanoSearchDto } from '../../../../aplication/dto/plano/planoSearchDto';
import { PlanoUpdateDto } from '../../../../aplication/dto/plano/planoUpdateDto';
import { AtualizarPlanoUseCase } from '../../../../aplication/usecase/plano/AtualizarPlanoUseCase';
import { BuscarPlanoPorIdUseCase } from '../../../../aplication/usecase/plano/BuscarPlanoPorIdUseCase';
import { CriarPlanoUseCase } from '../../../../aplication/usecase/plano/CriarPlanoUseCase';
import { ExcluirPlanoUseCase } from '../../../../aplication/usecase/plano/ExcluirPlanoUseCase';
import { ListarPlanosUseCase } from '../../../../aplication/usecase/plano/ListarPlanosUseCase';
import { idDaRota, tratarErroDoController } from './controller.util';

export class PlanoController {
    private readonly criarUseCase = new CriarPlanoUseCase();
    private readonly listarUseCase = new ListarPlanosUseCase();
    private readonly buscarPorIdUseCase = new BuscarPlanoPorIdUseCase();
    private readonly atualizarUseCase = new AtualizarPlanoUseCase();
    private readonly excluirUseCase = new ExcluirPlanoUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(PlanoCreateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            const salvo = await this.criarUseCase.execute(dto);
            return res.status(201).json(salvo);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async buscarPorId(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, PlanoSearchByIdDto);
            const plano = await this.buscarPorIdUseCase.execute(id);
            return res.json(plainToInstance(PlanoSearchByIdDto, plano.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(_req: Request, res: Response) {
        try {
            const planos = await this.listarUseCase.execute();
            return res.json(plainToInstance(
                PlanoSearchDto,
                planos.map((plano) => plano.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, PlanoSearchByIdDto);
            await this.excluirUseCase.execute(id);
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(PlanoUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const id = await idDaRota(req, PlanoSearchByIdDto);
            const atualizado = await this.atualizarUseCase.execute({
                id,
                dados: dto,
            });
            return res.json(atualizado);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}

export const planoController = new PlanoController();
