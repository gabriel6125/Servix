import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PlanoCreateDto } from '../../../../aplication/dto/plano/planoCreateDto';
import { PlanoSearchByIdDto } from '../../../../aplication/dto/plano/planoSearchByIdDto';
import { PlanoSearchDto } from '../../../../aplication/dto/plano/planoSearchDto';
import { PlanoUpdateDto } from '../../../../aplication/dto/plano/planoUpdateDto';
import { AtualizarPlanoUseCase } from '../../../../aplication/usecase/plano/AtualizarPlanoUseCase';
import { BuscarPlanoPorIdUseCase } from '../../../../aplication/usecase/plano/BuscarPlanoPorIdUseCase';
import { CriarPlanoUseCase } from '../../../../aplication/usecase/plano/CriarPlanoUseCase';
import { ExcluirPlanoUseCase } from '../../../../aplication/usecase/plano/ExcluirPlanoUseCase';
import { ListarPlanosUseCase } from '../../../../aplication/usecase/plano/ListarPlanosUseCase';
import { idDaRota, tratarErroDoController } from './controller.util';
// Define o comportamento e os dados desta classe.
export class PlanoController {
    constructor() {
        // Mantem a dependencia criarUseCase disponivel para as operacoes da classe.
        this.criarUseCase = new CriarPlanoUseCase();
        // Mantem a dependencia listarUseCase disponivel para as operacoes da classe.
        this.listarUseCase = new ListarPlanosUseCase();
        // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
        this.buscarPorIdUseCase = new BuscarPlanoPorIdUseCase();
        // Mantem a dependencia atualizarUseCase disponivel para as operacoes da classe.
        this.atualizarUseCase = new AtualizarPlanoUseCase();
        // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
        this.excluirUseCase = new ExcluirPlanoUseCase();
    }
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(PlanoCreateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const salvo = await this.criarUseCase.execute(dto);
            // Envia a resposta com o status HTTP 201 e encerra a execucao deste handler.
            return res.status(201).json(salvo);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, PlanoSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const plano = await this.buscarPorIdUseCase.execute(id);
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(PlanoSearchByIdDto, plano.toJSON()));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(_req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const planos = await this.listarUseCase.execute();
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(PlanoSearchDto, planos.map((plano) => plano.toJSON())));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo deletar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async deletar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, PlanoSearchByIdDto);
            await this.excluirUseCase.execute(id);
            // Envia a resposta com o status HTTP 204 e encerra a execucao deste handler.
            return res.status(204).send();
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(PlanoUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, PlanoSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const atualizado = await this.atualizarUseCase.execute({
                id,
                dados: dto,
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(atualizado);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}
// Define um valor compartilhado usado pelas chamadas desta camada.
export const planoController = new PlanoController();
//# sourceMappingURL=plano.controller.js.map