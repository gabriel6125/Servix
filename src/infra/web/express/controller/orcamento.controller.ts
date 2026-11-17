import { plainToInstance } from 'class-transformer';
import type { Request, Response } from 'express';
import { validate } from 'class-validator';
import { OrcamentoCreateDto } from '../../../../aplication/dto/orcamento/orcamentoCreateDto';
import { OrcamentoSearchByIdDto } from '../../../../aplication/dto/orcamento/orcamentoSearchByIdDto';
import { OrcamentoSearchDto } from '../../../../aplication/dto/orcamento/orcamentoSearchDto';
import { OrcamentoUpdateDto } from '../../../../aplication/dto/orcamento/orcamentoUpdateDto';
import { AtualizarOrcamentoUseCase } from '../../../../aplication/usecase/orcamento/AtualizarOrcamentoUseCase';
import { BuscarOrcamentoPorIdUseCase } from '../../../../aplication/usecase/orcamento/BuscarOrcamentoPorIdUseCase';
import { CriarOrcamentoUseCase } from '../../../../aplication/usecase/orcamento/CriarOrcamentoUseCase';
import { ExcluirOrcamentoUseCase } from '../../../../aplication/usecase/orcamento/ExcluirOrcamentoUseCase';
import { ListarOrcamentosUseCase } from '../../../../aplication/usecase/orcamento/ListarOrcamentosUseCase';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';

// Define o comportamento e os dados desta classe.
export class OrcamentoController {
    // Mantem a dependencia criarUseCase disponivel para as operacoes da classe.
    private readonly criarUseCase = new CriarOrcamentoUseCase();
    // Mantem a dependencia listarUseCase disponivel para as operacoes da classe.
    private readonly listarUseCase = new ListarOrcamentosUseCase();
    // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
    private readonly buscarPorIdUseCase = new BuscarOrcamentoPorIdUseCase();
    // Mantem a dependencia atualizarUseCase disponivel para as operacoes da classe.
    private readonly atualizarUseCase = new AtualizarOrcamentoUseCase();
    // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
    private readonly excluirUseCase = new ExcluirOrcamentoUseCase();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(OrcamentoCreateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }

            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const salvo = await this.criarUseCase.execute({
                usuarioId: usuarioAutenticado(req),
                dados: dto,
            });
            // Envia a resposta com o status HTTP 201 e encerra a execucao deste handler.
            return res.status(201).json(salvo);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, OrcamentoSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const orcamento = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(OrcamentoSearchByIdDto, orcamento.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async listar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const orcamentos = await this.listarUseCase.execute(usuarioAutenticado(req));
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(
                OrcamentoSearchDto,
                orcamentos.map((orcamento) => orcamento.toJSON()),
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
            const id = await idDaRota(req, OrcamentoSearchByIdDto);
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
            const dto = plainToInstance(OrcamentoUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, OrcamentoSearchByIdDto);
            const usuarioId = usuarioAutenticado(req);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const atualizado = await this.atualizarUseCase.execute({
                id,
                usuarioId,
                dados: dto,
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(atualizado);
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}

// Define um valor compartilhado usado pelas chamadas desta camada.
export const orcamentoController = new OrcamentoController();
