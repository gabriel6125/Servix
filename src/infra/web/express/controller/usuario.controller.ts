import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { UsuarioDto, UsuarioLoginDto, UsuarioUpdateDto } from '../../../../aplication/dto/usuario/usuario.dto';
import { Usuario } from '../../../../dominio/entidades/usuario';
import { UsuarioService } from '../../../../service/usuario.servico';
import { usuarioAutenticado } from './controller.util';

export class UsuarioController {
    private readonly service = new UsuarioService();

    public async registrar(req: Request, res: Response) {
        const dto = plainToInstance(UsuarioDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const usuario = Usuario.construir(dto.nome, dto.email, dto.senha);
        const resultado = await this.service.registrar(usuario);
        return res.status(201).json(resultado);
    }

    public async login(req: Request, res: Response) {
        const dto = plainToInstance(UsuarioLoginDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }
        const resultado = await this.service.autenticar(dto.email, dto.senha);
        return res.json(resultado);
    }

    public async buscarMeuPerfil(req: Request, res: Response) {
        const usuario = await this.service.buscarPorId(usuarioAutenticado(req));
        return res.json(usuario);
    }

    public async atualizarMeuPerfil(req: Request, res: Response) {
        const dto = plainToInstance(UsuarioUpdateDto, req.body ?? {});
        const errors = await validate(dto, {
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: true,
        });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }
        if (Object.keys(req.body ?? {}).length === 0) {
            return res.status(400).json({ error: 'Informe ao menos um campo para atualizar.' });
        }

        const usuario = await this.service.atualizarPerfil(usuarioAutenticado(req), dto);
        return res.json(usuario);
    }

    public async excluirMeuPerfil(req: Request, res: Response) {
        await this.service.excluir(usuarioAutenticado(req));
        return res.status(204).send();
    }
}

export const usuarioController = new UsuarioController();
