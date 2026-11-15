import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { UsuarioCreateDto } from '../../../../aplication/dto/usuario/usuarioCreateDto';
import { UsuarioLoginDto } from '../../../../aplication/dto/usuario/usuarioLoginDto';
import { UsuarioUpdateDto } from '../../../../aplication/dto/usuario/usuarioUpdateDto';
import { AtualizarPerfilUsuarioUseCase } from '../../../../aplication/usecase/usuario/AtualizarPerfilUsuarioUseCase';
import { AutenticarUsuarioUseCase } from '../../../../aplication/usecase/usuario/AutenticarUsuarioUseCase';
import { BuscarUsuarioPorIdUseCase } from '../../../../aplication/usecase/usuario/BuscarUsuarioPorIdUseCase';
import { ExcluirUsuarioUseCase } from '../../../../aplication/usecase/usuario/ExcluirUsuarioUseCase';
import { RegistrarUsuarioUseCase } from '../../../../aplication/usecase/usuario/RegistrarUsuarioUseCase';
import { tratarErroDoController, usuarioAutenticado } from './controller.util';

export class UsuarioController {
    private readonly registrarUseCase = new RegistrarUsuarioUseCase();
    private readonly autenticarUseCase = new AutenticarUsuarioUseCase();
    private readonly buscarPorIdUseCase = new BuscarUsuarioPorIdUseCase();
    private readonly atualizarPerfilUseCase = new AtualizarPerfilUsuarioUseCase();
    private readonly excluirUseCase = new ExcluirUsuarioUseCase();

    public async registrar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(UsuarioCreateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            const resultado = await this.registrarUseCase.execute(dto);
            return res.status(201).json(resultado);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const dto = plainToInstance(UsuarioLoginDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const resultado = await this.autenticarUseCase.execute(dto);
            return res.json(resultado);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async buscarMeuPerfil(req: Request, res: Response) {
        try {
            const usuario = await this.buscarPorIdUseCase.execute(usuarioAutenticado(req));
            return res.json(usuario);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizarMeuPerfil(req: Request, res: Response) {
        try {
            const dto = plainToInstance(UsuarioUpdateDto, req.body ?? {});
            const errors = await validate(dto, {
                whitelist: true,
                forbidNonWhitelisted: true,
                skipMissingProperties: true,
            });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const usuario = await this.atualizarPerfilUseCase.execute({
                id: usuarioAutenticado(req),
                dados: dto,
            });
            return res.json(usuario);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async excluirMeuPerfil(req: Request, res: Response) {
        try {
            await this.excluirUseCase.execute(usuarioAutenticado(req));
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}

export const usuarioController = new UsuarioController();
