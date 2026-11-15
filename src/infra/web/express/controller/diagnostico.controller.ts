import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { DiagnosticoCreateDto } from '../../../../aplication/dto/diagnostico/diagnosticoCreateDto';
import { DiagnosticoSearchByIdDto } from '../../../../aplication/dto/diagnostico/diagnosticoSearchByIdDto';
import { DiagnosticoSearchDto } from '../../../../aplication/dto/diagnostico/diagnosticoSearchDto';
import { DiagnosticoUpdateDto } from '../../../../aplication/dto/diagnostico/diagnosticoUpdateDto';
import { AtualizarDiagnosticoUseCase } from '../../../../aplication/usecase/diagnostico/AtualizarDiagnosticoUseCase';
import { BuscarDiagnosticoPorIdUseCase } from '../../../../aplication/usecase/diagnostico/BuscarDiagnosticoPorIdUseCase';
import { CriarDiagnosticoUseCase } from '../../../../aplication/usecase/diagnostico/CriarDiagnosticoUseCase';
import { ExcluirDiagnosticoUseCase } from '../../../../aplication/usecase/diagnostico/ExcluirDiagnosticoUseCase';
import { ListarDiagnosticosUseCase } from '../../../../aplication/usecase/diagnostico/ListarDiagnosticosUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

export class DiagnosticoController {
    private readonly criarUseCase = new CriarDiagnosticoUseCase();
    private readonly listarUseCase = new ListarDiagnosticosUseCase();
    private readonly buscarPorIdUseCase = new BuscarDiagnosticoPorIdUseCase();
    private readonly atualizarUseCase = new AtualizarDiagnosticoUseCase();
    private readonly excluirUseCase = new ExcluirDiagnosticoUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(DiagnosticoCreateDto, req.body ?? {});
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
            const id = await idDaRota(req, DiagnosticoSearchByIdDto);
            const diagnostico = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            return res.json(plainToInstance(DiagnosticoSearchByIdDto, diagnostico.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(req: Request, res: Response) {
        try {
            const diagnosticos = await this.listarUseCase.execute(usuarioAutenticado(req));
            return res.json(plainToInstance(
                DiagnosticoSearchDto,
                diagnosticos.map((diagnostico) => diagnostico.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, DiagnosticoSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(DiagnosticoUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const id = await idDaRota(req, DiagnosticoSearchByIdDto);
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

export const diagnosticoController = new DiagnosticoController();
