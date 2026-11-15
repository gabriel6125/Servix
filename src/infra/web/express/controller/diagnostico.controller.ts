import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { DiagnosticoDto } from '../../../../aplication/dto/diagnostico/diagnostico.dto';
import { Diagnostico } from '../../../../dominio/entidades/diagnostico';
import { DiagnosticoService } from '../../../../service/diagnostico.servico';
import { idDaRota, usuarioAutenticado } from './controller.util';

export class DiagnosticoController {
    private readonly service = new DiagnosticoService();

    public async salvar(req: Request, res: Response) {
        const dto = plainToInstance(DiagnosticoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const salvo = await this.service.salvar(
            Diagnostico.construir(dto.servico_id.toString(), dto.problema_identificado, dto.observacoes ?? null),
            usuarioAutenticado(req),
        );
        return res.status(201).json(salvo);
    }

    public async buscarPorId(req: Request, res: Response) {
        const diagnostico = await this.service.buscarPorId(idDaRota(req), usuarioAutenticado(req));
        return res.json(diagnostico);
    }

    public async listar(req: Request, res: Response) {
        const diagnosticos = await this.service.listar(usuarioAutenticado(req));
        return res.json(diagnosticos);
    }

    public async deletar(req: Request, res: Response) {
        await this.service.excluir(idDaRota(req), usuarioAutenticado(req));
        return res.status(204).send();
    }

    public async atualizar(req: Request, res: Response) {
        const dto = plainToInstance(DiagnosticoDto, req.body ?? {});
        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => error.toString()) });
        }

        const diagnostico = Diagnostico.reconstruir({
            id: idDaRota(req),
            servicoId: dto.servico_id.toString(),
            problemaIdentificado: dto.problema_identificado,
            observacoes: dto.observacoes ?? null,
        });
        const atualizado = await this.service.atualizar(diagnostico, usuarioAutenticado(req));
        return res.json(atualizado);
    }
}

export const diagnosticoController = new DiagnosticoController();
