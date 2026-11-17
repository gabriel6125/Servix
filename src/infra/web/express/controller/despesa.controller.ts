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

// Define o comportamento e os dados desta classe.
export class DespesaController {
    // Mantem a dependencia criarUseCase disponivel para as operacoes da classe.
    private readonly criarUseCase = new CriarDespesaUseCase();
    // Mantem a dependencia listarUseCase disponivel para as operacoes da classe.
    private readonly listarUseCase = new ListarDespesasUseCase();
    // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
    private readonly buscarPorIdUseCase = new BuscarDespesaPorIdUseCase();
    // Mantem a dependencia atualizarUseCase disponivel para as operacoes da classe.
    private readonly atualizarUseCase = new AtualizarDespesaUseCase();
    // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
    private readonly excluirUseCase = new ExcluirDespesaUseCase();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(DespesaCreateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const salva = await this.criarUseCase.execute({
                usuarioId: usuarioAutenticado(req),
                dados: dto,
            });
            // Envia a resposta com o status HTTP 201 e encerra a execucao deste handler.
            return res.status(201).json(salva);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, DespesaSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const despesa = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(DespesaSearchByIdDto, despesa.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async listar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const despesas = await this.listarUseCase.execute(usuarioAutenticado(req));
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(
                DespesaSearchDto,
                despesas.map((despesa) => despesa.toJSON()),
            ));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo deletar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async deletar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, DespesaSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            // Envia a resposta com o status HTTP 204 e encerra a execucao deste handler.
            return res.status(204).send();
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(DespesaUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, DespesaSearchByIdDto);
            const usuarioId = usuarioAutenticado(req);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const atualizada = await this.atualizarUseCase.execute({
                id,
                usuarioId,
                dados: dto,
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(atualizada);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}

// Define um valor compartilhado usado pelas chamadas desta camada.
export const despesaController = new DespesaController();
