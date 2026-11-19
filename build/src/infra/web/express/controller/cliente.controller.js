import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ClienteCreateDto } from '../../../../aplication/dto/cliente/clienteCreateDto';
import { ClienteSearchByIdDto } from '../../../../aplication/dto/cliente/clienteSearchByIdDto';
import { ClienteSearchDto } from '../../../../aplication/dto/cliente/clienteSearchDto';
import { ClienteUpdateDto } from '../../../../aplication/dto/cliente/clienteUpdateDto';
import { AtualizarClienteUseCase } from '../../../../aplication/usecase/cliente/AtualizarClienteUseCase';
import { BuscarClientePorIdUseCase } from '../../../../aplication/usecase/cliente/BuscarClientePorIdUseCase';
import { CriarClienteUseCase } from '../../../../aplication/usecase/cliente/CriarClienteUseCase';
import { ExcluirClienteUseCase } from '../../../../aplication/usecase/cliente/ExcluirClienteUseCase';
import { ListarClientesUseCase } from '../../../../aplication/usecase/cliente/ListarClientesUseCase';
import { ClienteService } from '../../../../service/cliente.servico';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';
// Define o comportamento e os dados desta classe.
export class ClienteController {
    constructor() {
        this.clienteService = new ClienteService();
        // Mantem a dependencia criarUseCase disponivel para as operacoes da classe.
        this.criarUseCase = new CriarClienteUseCase();
        // Mantem a dependencia listarUseCase disponivel para as operacoes da classe.
        this.listarUseCase = new ListarClientesUseCase();
        // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
        this.buscarPorIdUseCase = new BuscarClientePorIdUseCase();
        // Mantem a dependencia atualizarUseCase disponivel para as operacoes da classe.
        this.atualizarUseCase = new AtualizarClienteUseCase();
        // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
        this.excluirUseCase = new ExcluirClienteUseCase();
    }
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(ClienteCreateDto, req.body ?? {});
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
            const id = await idDaRota(req, ClienteSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const cliente = await this.buscarPorIdUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(ClienteSearchByIdDto, cliente.toJSON()));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const nome = typeof req.query.nome === 'string'
                ? req.query.nome
                : typeof req.query.q === 'string' ? req.query.q : '';
            const servicoId = typeof req.query.servico_id === 'string'
                ? req.query.servico_id
                : typeof req.query.servicoId === 'string' ? req.query.servicoId : '';
            if (nome) {
                const clientes = await this.clienteService.buscarPorNome(nome, usuarioAutenticado(req));
                return res.json(clientes.map((cliente) => cliente.toJSON()));
            }
            if (servicoId) {
                const clientes = await this.clienteService.listarPorServico(servicoId, usuarioAutenticado(req));
                return res.json(clientes.map((cliente) => cliente.toJSON()));
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const clientes = await this.listarUseCase.execute(usuarioAutenticado(req));
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(ClienteSearchDto, clientes.map((cliente) => cliente.toJSON())));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    async buscar(req, res) {
        try {
            const nome = typeof req.query.nome === 'string'
                ? req.query.nome
                : typeof req.query.q === 'string' ? req.query.q : '';
            if (!nome) {
                return res.status(400).json({ error: { message: 'Informe o parâmetro nome ou q.' } });
            }
            const clientes = await this.clienteService.buscarPorNome(nome, usuarioAutenticado(req));
            return res.json(clientes.map((cliente) => cliente.toJSON()));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    async filtrarPorServico(req, res) {
        try {
            const clientes = await this.clienteService.listarPorServico(String(req.params.servicoId), usuarioAutenticado(req));
            return res.json(clientes.map((cliente) => cliente.toJSON()));
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
            const id = await idDaRota(req, ClienteSearchByIdDto);
            await this.excluirUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
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
            const dto = plainToInstance(ClienteUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, ClienteSearchByIdDto);
            const usuarioId = usuarioAutenticado(req);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const atualizado = await this.atualizarUseCase.execute({
                id,
                usuarioId,
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
export const clienteController = new ClienteController();
//# sourceMappingURL=cliente.controller.js.map