import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ServicoCreateDto } from '../../../../aplication/dto/servico/servicoCreateDto';
import { ServicoSearchByIdDto } from '../../../../aplication/dto/servico/servicoSearchByIdDto';
import { ServicoSearchDto } from '../../../../aplication/dto/servico/servicoSearchDto';
import { ServicoUpdateDto } from '../../../../aplication/dto/servico/servicoUpdateDto';
import { AtualizarServicoUseCase } from '../../../../aplication/usecase/servico/AtualizarServicoUseCase';
import { BuscarServicoPorIdUseCase } from '../../../../aplication/usecase/servico/BuscarServicoPorIdUseCase';
import { CriarServicoUseCase } from '../../../../aplication/usecase/servico/CriarServicoUseCase';
import { ExcluirServicoUseCase } from '../../../../aplication/usecase/servico/ExcluirServicoUseCase';
import { ListarServicosUseCase } from '../../../../aplication/usecase/servico/ListarServicosUseCase';
import { ServicoService } from '../../../../service/servico.servico';
import { idDaRota, tratarErroDoController, usuarioAutenticado } from './controller.util';
// Define o comportamento e os dados desta classe.
export class ServicoController {
    constructor() {
        this.servicoService = new ServicoService();
        // Mantem a dependencia criarUseCase disponivel para as operacoes da classe.
        this.criarUseCase = new CriarServicoUseCase();
        // Mantem a dependencia listarUseCase disponivel para as operacoes da classe.
        this.listarUseCase = new ListarServicosUseCase();
        // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
        this.buscarPorIdUseCase = new BuscarServicoPorIdUseCase();
        // Mantem a dependencia atualizarUseCase disponivel para as operacoes da classe.
        this.atualizarUseCase = new AtualizarServicoUseCase();
        // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
        this.excluirUseCase = new ExcluirServicoUseCase();
    }
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(ServicoCreateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const usuarioId = usuarioAutenticado(req);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const salvo = await this.criarUseCase.execute({ usuarioId, dados: dto });
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
            const id = await idDaRota(req, ServicoSearchByIdDto);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const servico = await this.buscarPorIdUseCase.execute({ id, usuarioId: usuarioAutenticado(req) });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(ServicoSearchByIdDto, servico.toJSON()));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const clienteId = typeof req.query.cliente_id === 'string'
                ? req.query.cliente_id
                : typeof req.query.clienteId === 'string' ? req.query.clienteId : '';
            if (clienteId) {
                const servicos = await this.servicoService.listarPorCliente(clienteId, usuarioAutenticado(req));
                return res.json(servicos.map((servico) => servico.toJSON()));
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const servicos = await this.listarUseCase.execute(usuarioAutenticado(req));
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(plainToInstance(ServicoSearchDto, servicos.map((servico) => servico.toJSON())));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    async filtrarPorCliente(req, res) {
        try {
            const servicos = await this.servicoService.listarPorCliente(String(req.params.clienteId), usuarioAutenticado(req));
            return res.json(servicos.map((servico) => servico.toJSON()));
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    async alertasPrazo(req, res) {
        try {
            const servicos = await this.servicoService.listarAlertasPrazo(usuarioAutenticado(req));
            return res.json({
                quantidade: servicos.length,
                alertas: servicos.map((servico) => ({
                    servico: servico.toJSON(),
                    mensagem: servico.dataPrevista
                        ? `Prazo previsto: ${servico.dataPrevista}`
                        : 'Prazo não informado.',
                })),
            });
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    async alterarStatus(req, res) {
        try {
            const status = typeof req.body?.status === 'string' ? req.body.status.trim() : '';
            if (!status) {
                return res.status(400).json({ error: { message: 'Informe o novo status.' } });
            }
            const id = await idDaRota(req, ServicoSearchByIdDto);
            const atualizado = await this.atualizarUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
                dados: plainToInstance(ServicoUpdateDto, { status }),
            });
            return res.json({
                servico: atualizado,
                notificacao: `O status do serviço ${id} foi alterado para ${status}.`,
            });
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    async finalizar(req, res) {
        try {
            const id = await idDaRota(req, ServicoSearchByIdDto);
            const atualizado = await this.atualizarUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
                dados: plainToInstance(ServicoUpdateDto, {
                    status: 'Concluido',
                    data_conclusao: new Date().toISOString().slice(0, 10),
                }),
            });
            return res.json({
                servico: atualizado,
                notificacao: `O serviço ${id} foi concluído.`,
            });
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    async cancelar(req, res) {
        try {
            const id = await idDaRota(req, ServicoSearchByIdDto);
            const atualizado = await this.atualizarUseCase.execute({
                id,
                usuarioId: usuarioAutenticado(req),
                dados: plainToInstance(ServicoUpdateDto, { status: 'Cancelado' }),
            });
            return res.json({
                servico: atualizado,
                notificacao: `O serviço ${id} foi cancelado.`,
            });
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
            const id = await idDaRota(req, ServicoSearchByIdDto);
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
            const dto = plainToInstance(ServicoUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            const usuarioId = usuarioAutenticado(req);
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const id = await idDaRota(req, ServicoSearchByIdDto);
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
export const servicoController = new ServicoController();
//# sourceMappingURL=servico.controller.js.map