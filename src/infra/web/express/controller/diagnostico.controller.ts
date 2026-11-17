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

// Define o comportamento e os dados desta classe.
export class DiagnosticoController {
    // Mantem a dependencia criarUseCase disponivel para as operacoes da classe.
    private readonly criarUseCase = new CriarDiagnosticoUseCase();
    // Mantem a dependencia listarUseCase disponivel para as operacoes da classe.
    private readonly listarUseCase = new ListarDiagnosticosUseCase();
    // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
    private readonly buscarPorIdUseCase = new BuscarDiagnosticoPorIdUseCase();
    // Mantem a dependencia atualizarUseCase disponivel para as operacoes da classe.
    private readonly atualizarUseCase = new AtualizarDiagnosticoUseCase();
    // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
    private readonly excluirUseCase = new ExcluirDiagnosticoUseCase();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(DiagnosticoCreateDto, req.body ?? {});
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
            const id = await idDaRota(req, DiagnosticoSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const diagnostico = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(DiagnosticoSearchByIdDto, diagnostico.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async listar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const diagnosticos = await this.listarUseCase.execute(usuarioAutenticado(req));
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(
                DiagnosticoSearchDto,
                diagnosticos.map((diagnostico) => diagnostico.toJSON()),
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
            const id = await idDaRota(req, DiagnosticoSearchByIdDto);
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
            const dto = plainToInstance(DiagnosticoUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, DiagnosticoSearchByIdDto);
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
export const diagnosticoController = new DiagnosticoController();
