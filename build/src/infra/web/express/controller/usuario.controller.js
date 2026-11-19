import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UsuarioCreateDto } from '../../../../aplication/dto/usuario/usuarioCreateDto';
import { UsuarioLoginDto } from '../../../../aplication/dto/usuario/usuarioLoginDto';
import { UsuarioRefreshTokenDto } from '../../../../aplication/dto/usuario/usuarioRefreshTokenDto';
import { UsuarioUpdateDto } from '../../../../aplication/dto/usuario/usuarioUpdateDto';
import { AtualizarPerfilUsuarioUseCase } from '../../../../aplication/usecase/usuario/AtualizarPerfilUsuarioUseCase';
import { AutenticarUsuarioUseCase } from '../../../../aplication/usecase/usuario/AutenticarUsuarioUseCase';
import { BuscarUsuarioPorIdUseCase } from '../../../../aplication/usecase/usuario/BuscarUsuarioPorIdUseCase';
import { ExcluirUsuarioUseCase } from '../../../../aplication/usecase/usuario/ExcluirUsuarioUseCase';
import { RenovarSessaoUsuarioUseCase } from '../../../../aplication/usecase/usuario/RenovarSessaoUsuarioUseCase';
import { RegistrarUsuarioUseCase } from '../../../../aplication/usecase/usuario/RegistrarUsuarioUseCase';
import { RevogarSessaoUsuarioUseCase } from '../../../../aplication/usecase/usuario/RevogarSessaoUsuarioUseCase';
import { UsuarioService } from '../../../../service/usuario.servico';
import { tratarErroDoController, usuarioAutenticado } from './controller.util';
// Define o comportamento e os dados desta classe.
export class UsuarioController {
    constructor() {
        this.usuarioService = new UsuarioService();
        // Mantem a dependencia registrarUseCase disponivel para as operacoes da classe.
        this.registrarUseCase = new RegistrarUsuarioUseCase();
        // Mantem a dependencia autenticarUseCase disponivel para as operacoes da classe.
        this.autenticarUseCase = new AutenticarUsuarioUseCase();
        // Mantem a dependencia renovarSessaoUseCase disponivel para as operacoes da classe.
        this.renovarSessaoUseCase = new RenovarSessaoUsuarioUseCase();
        // Mantem a dependencia revogarSessaoUseCase disponivel para as operacoes da classe.
        this.revogarSessaoUseCase = new RevogarSessaoUsuarioUseCase();
        // Mantem a dependencia buscarPorIdUseCase disponivel para as operacoes da classe.
        this.buscarPorIdUseCase = new BuscarUsuarioPorIdUseCase();
        // Mantem a dependencia atualizarPerfilUseCase disponivel para as operacoes da classe.
        this.atualizarPerfilUseCase = new AtualizarPerfilUsuarioUseCase();
        // Mantem a dependencia excluirUseCase disponivel para as operacoes da classe.
        this.excluirUseCase = new ExcluirUsuarioUseCase();
    }
    // Metodo registrar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async registrar(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(UsuarioCreateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const resultado = await this.registrarUseCase.execute(dto);
            // Envia a resposta com o status HTTP 201 e encerra a execucao deste handler.
            return res.status(201).json(resultado);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo login: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async login(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(UsuarioLoginDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const resultado = await this.autenticarUseCase.execute(dto);
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(resultado);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo renovarSessao: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async renovarSessao(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(UsuarioRefreshTokenDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const resultado = await this.renovarSessaoUseCase.execute(dto);
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(resultado);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo logout: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async logout(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(UsuarioRefreshTokenDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            await this.revogarSessaoUseCase.execute(dto);
            // Envia a resposta com o status HTTP 204 e encerra a execucao deste handler.
            return res.status(204).send();
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Solicita recuperação sem revelar se o e-mail existe no cadastro.
    async solicitarRecuperacaoSenha(req, res) {
        try {
            const email = typeof req.body?.email === 'string' ? req.body.email : '';
            if (!email) {
                return res.status(400).json({ error: { message: 'Informe o e-mail.' } });
            }
            const resultado = await this.usuarioService.solicitarRecuperacaoSenha(email);
            return res.status(202).json(resultado);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Valida o token temporário e troca a senha após a recuperação.
    async redefinirSenha(req, res) {
        try {
            const token = typeof req.body?.token === 'string' ? req.body.token : '';
            const senha = typeof req.body?.senha === 'string' ? req.body.senha : '';
            if (!token || !senha) {
                return res.status(400).json({
                    error: { message: 'Token e nova senha são obrigatórios.' },
                });
            }
            await this.usuarioService.redefinirSenha(token, senha);
            return res.json({ message: 'Senha redefinida com sucesso.' });
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo buscarMeuPerfil: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarMeuPerfil(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const usuario = await this.buscarPorIdUseCase.execute(usuarioAutenticado(req));
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(usuario);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo atualizarMeuPerfil: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizarMeuPerfil(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            const dto = plainToInstance(UsuarioUpdateDto, req.body ?? {});
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const errors = await validate(dto, {
                whitelist: true,
                forbidNonWhitelisted: true,
                skipMissingProperties: true,
            });
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (errors.length > 0) {
                // Envia a resposta com o status HTTP 400 e encerra a execucao deste handler.
                return res.status(400).json({ errors: errors.map((error) => error.toString()) });
            }
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const usuario = await this.atualizarPerfilUseCase.execute({
                id: usuarioAutenticado(req),
                dados: dto,
            });
            // Serializa o resultado da operacao como JSON e envia ao cliente.
            return res.json(usuario);
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
    // Metodo excluirMeuPerfil: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluirMeuPerfil(req, res) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            await this.excluirUseCase.execute(usuarioAutenticado(req));
            // Envia a resposta com o status HTTP 204 e encerra a execucao deste handler.
            return res.status(204).send();
        }
        catch (error) {
            return tratarErroDoController(error, res);
        }
    }
}
// Define um valor compartilhado usado pelas chamadas desta camada.
export const usuarioController = new UsuarioController();
//# sourceMappingURL=usuario.controller.js.map