import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { ServicoCreateDto } from '../../../../aplication/dto/servico/servicoCreateDto';
import { ServicoSearchByIdDto } from '../../../../aplication/dto/servico/servicoSearchByIdDto';
import { ServicoSearchDto } from '../../../../aplication/dto/servico/servicoSearchDto';
import { ServicoUpdateDto } from '../../../../aplication/dto/servico/servicoUpdateDto';
import { AtualizarServicoUseCase } from '../../../../aplication/usecase/servico/AtualizarServicoUseCase';
import { BuscarServicoPorIdUseCase } from '../../../../aplication/usecase/servico/BuscarServicoPorIdUseCase';
import { CriarServicoUseCase } from '../../../../aplication/usecase/servico/CriarServicoUseCase';
import { ExcluirServicoUseCase } from '../../../../aplication/usecase/servico/ExcluirServicoUseCase';
import { ListarServicosUseCase } from '../../../../aplication/usecase/servico/ListarServicosUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

export class ServicoController {
    private readonly criarUseCase = new CriarServicoUseCase();
    private readonly listarUseCase = new ListarServicosUseCase();
    private readonly buscarPorIdUseCase = new BuscarServicoPorIdUseCase();
    private readonly atualizarUseCase = new AtualizarServicoUseCase();
    private readonly excluirUseCase = new ExcluirServicoUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(ServicoCreateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            const usuarioId = usuarioAutenticado(req);
            const salvo = await this.criarUseCase.execute({ usuarioId, dados: dto });
            return res.status(201).json(salvo);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async buscarPorId(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, ServicoSearchByIdDto);
            const servico = await this.buscarPorIdUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.json(plainToInstance(ServicoSearchByIdDto, servico.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(req: Request, res: Response) {
        try {
            const servicos = await this.listarUseCase.execute(usuarioAutenticado(req));
            return res.json(plainToInstance(
                ServicoSearchDto,
                servicos.map((servico) => servico.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, ServicoSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(ServicoUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            const usuarioId = usuarioAutenticado(req);
            const id = await idDaRota(req, ServicoSearchByIdDto);
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

export const servicoController = new ServicoController();
