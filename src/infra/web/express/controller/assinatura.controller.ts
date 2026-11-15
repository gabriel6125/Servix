import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { AssinaturaCreateDto } from '../../../../aplication/dto/assinatura/assinaturaCreateDto';
import { AssinaturaSearchByIdDto } from '../../../../aplication/dto/assinatura/assinaturaSearchByIdDto';
import { AssinaturaSearchDto } from '../../../../aplication/dto/assinatura/assinaturaSearchDto';
import { AssinaturaUpdateDto } from '../../../../aplication/dto/assinatura/assinaturaUpdateDto';
import { AtualizarAssinaturaUseCase } from '../../../../aplication/usecase/assinatura/AtualizarAssinaturaUseCase';
import { BuscarAssinaturaPorIdUseCase } from '../../../../aplication/usecase/assinatura/BuscarAssinaturaPorIdUseCase';
import { CriarAssinaturaUseCase } from '../../../../aplication/usecase/assinatura/CriarAssinaturaUseCase';
import { ExcluirAssinaturaUseCase } from '../../../../aplication/usecase/assinatura/ExcluirAssinaturaUseCase';
import { ListarAssinaturasUseCase } from '../../../../aplication/usecase/assinatura/ListarAssinaturasUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

export class AssinaturaController {
    private readonly criarUseCase = new CriarAssinaturaUseCase();
    private readonly listarUseCase = new ListarAssinaturasUseCase();
    private readonly buscarPorIdUseCase = new BuscarAssinaturaPorIdUseCase();
    private readonly atualizarUseCase = new AtualizarAssinaturaUseCase();
    private readonly excluirUseCase = new ExcluirAssinaturaUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(AssinaturaCreateDto, req.body ?? {});
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
            const id = await idDaRota(req, AssinaturaSearchByIdDto);
            const assinatura = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            return res.json(plainToInstance(AssinaturaSearchByIdDto, assinatura.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(req: Request, res: Response) {
        try {
            const assinaturas = await this.listarUseCase.execute(usuarioAutenticado(req));
            return res.json(plainToInstance(
                AssinaturaSearchDto,
                assinaturas.map((assinatura) => assinatura.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, AssinaturaSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(AssinaturaUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const usuarioId = usuarioAutenticado(req);
            const id = await idDaRota(req, AssinaturaSearchByIdDto);
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

export const assinaturaController = new AssinaturaController();
