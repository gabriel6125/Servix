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

// Define o comportamento e os dados desta classe.
export class AssinaturaController {
    // Mantem a dependencia criarUseCase disponivel para as operacoes da classe.
    private readonly criarUseCase = new CriarAssinaturaUseCase();
    // Mantem a dependencia listarUseCase disponivel para as operacoes da classe.
    private readonly listarUseCase = new ListarAssinaturasUseCase();
    // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
    private readonly buscarPorIdUseCase = new BuscarAssinaturaPorIdUseCase();
    // Mantem a dependencia atualizarUseCase disponivel para as operacoes da classe.
    private readonly atualizarUseCase = new AtualizarAssinaturaUseCase();
    // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
    private readonly excluirUseCase = new ExcluirAssinaturaUseCase();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(AssinaturaCreateDto, req.body ?? {});
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
            const id = await idDaRota(req, AssinaturaSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const assinatura = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(AssinaturaSearchByIdDto, assinatura.toJSON()));
        } catch (error) {
            return tratarErroDoController(error, res);
        }
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async listar(req: Request, res: Response) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const assinaturas = await this.listarUseCase.execute(usuarioAutenticado(req));
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(
                AssinaturaSearchDto,
                assinaturas.map((assinatura) => assinatura.toJSON()),
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
            const id = await idDaRota(req, AssinaturaSearchByIdDto);
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
            const dto = plainToInstance(AssinaturaUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const usuarioId = usuarioAutenticado(req);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, AssinaturaSearchByIdDto);
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
export const assinaturaController = new AssinaturaController();
