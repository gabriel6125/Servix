import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { PagamentoCreateDto } from '../../../../aplication/dto/pagamento/pagamentoCreateDto';
import { PagamentoSearchByIdDto } from '../../../../aplication/dto/pagamento/pagamentoSearchByIdDto';
import { PagamentoSearchDto } from '../../../../aplication/dto/pagamento/pagamentoSearchDto';
import { PagamentoUpdateDto } from '../../../../aplication/dto/pagamento/pagamentoUpdateDto';
import { AtualizarPagamentoUseCase } from '../../../../aplication/usecase/pagamento/AtualizarPagamentoUseCase';
import { BuscarPagamentoPorIdUseCase } from '../../../../aplication/usecase/pagamento/BuscarPagamentoPorIdUseCase';
import { CriarPagamentoUseCase } from '../../../../aplication/usecase/pagamento/CriarPagamentoUseCase';
import { ExcluirPagamentoUseCase } from '../../../../aplication/usecase/pagamento/ExcluirPagamentoUseCase';
import { ListarPagamentosUseCase } from '../../../../aplication/usecase/pagamento/ListarPagamentosUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

export class PagamentoController {
    private readonly criarUseCase = new CriarPagamentoUseCase();
    private readonly listarUseCase = new ListarPagamentosUseCase();
    private readonly buscarPorIdUseCase = new BuscarPagamentoPorIdUseCase();
    private readonly atualizarUseCase = new AtualizarPagamentoUseCase();
    private readonly excluirUseCase = new ExcluirPagamentoUseCase();

    public async salvar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(PagamentoCreateDto, req.body ?? {});
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
            const id = await idDaRota(req, PagamentoSearchByIdDto);
            const pagamento = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            return res.json(plainToInstance(PagamentoSearchByIdDto, pagamento.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async listar(req: Request, res: Response) {
        try {
            const pagamentos = await this.listarUseCase.execute(usuarioAutenticado(req));
            return res.json(plainToInstance(
                PagamentoSearchDto,
                pagamentos.map((pagamento) => pagamento.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async deletar(req: Request, res: Response) {
        try {
            const id = await idDaRota(req, PagamentoSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const dto = plainToInstance(PagamentoUpdateDto, req.body ?? {});
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const id = await idDaRota(req, PagamentoSearchByIdDto);
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

export const pagamentoController = new PagamentoController();
