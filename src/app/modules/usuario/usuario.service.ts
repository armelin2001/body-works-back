import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { LoginDTO, UsuarioDTO, UsuarioFichaDto } from "./dto/usario.dto";
import {
    IUsuario,
    IUsuarioLogin,
} from "src/app/modules/usuario/entity/usuario.interface";
import { UsuarioAcademiaRepository } from "../usuario-academia/usuario-academia.repository";
import { IUsuarioAcademiaLogin } from "../usuario-academia/entity/usuario-academia.interface";
import { AcessoRepository } from "../acessos/acesso.repository";
import { RolesAceso } from "src/utils/constants/roles-acesso";
import { AcessoService } from "../acessos/acesso.service";
import { StatusPagamento } from "src/utils/constants/status-pagamento";
import { FichaService } from "../ficha/ficha.service";
import { HistoricoTreinoService } from "../historico-treino/historico-treino.service";
import * as moment from "moment";
import { HistoricoTreinoDTO } from "../historico-treino/dto/historico-treino.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(UsuarioRepository)
        private readonly usuarioRepository: UsuarioRepository,
        @Inject(UsuarioAcademiaRepository)
        private readonly usuarioAcademiaRepository: UsuarioAcademiaRepository,
        @Inject(AcessoRepository)
        private readonly acessoRepository: AcessoRepository,
        @Inject(AcessoService)
        private readonly acessoService: AcessoService,
        @Inject(FichaService)
        private readonly fichaService: FichaService,
        @Inject(HistoricoTreinoService)
        private readonly historicoTreinoService: HistoricoTreinoService,
    ) {}

    async login(
        login: LoginDTO,
    ): Promise<IUsuarioLogin | IUsuarioAcademiaLogin> {
        const acesso = await this.acessoService.procuraUsuario(
            login.email,
            login.senha,
        );

        if (!acesso) {
            throw new HttpException(
                "Usuário ou senha inválidos",
                HttpStatus.NOT_FOUND,
            );
        }
        const usuario = await this.usuarioRepository.procuraPorIdAcesso(
            acesso.id,
        );

        const usuarioAcademia =
            await this.usuarioAcademiaRepository.procuraPorIdAcesso(acesso.id);

        if (usuario) {
            if (usuario.statusPagamento === "cancelado") {
                throw new HttpException(
                    "Usuário cancelado. Entre em contato com um supervisor da academia",
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (usuario.statusPagamento === "atrasado") {
                throw new HttpException(
                    "Usuário com mensalidade atrasada. Entre em contato com um supervisor da academia",
                    HttpStatus.BAD_REQUEST,
                );
            }

            const usuarioLogin: IUsuarioLogin = {
                id: usuario.id,
                nome: usuario.nome,
                cpf: usuario.cpf,
                email: acesso.email,
                dataNascimento: usuario.dataNascimento,
                genero: usuario.genero,
                statusPagamento: usuario.statusPagamento,
                idAcesso: usuario.idAcesso,
                role: acesso.role,
                idFicha: usuario.idFicha,
            };
            return usuarioLogin;
        } else {
            usuarioAcademia.email = acesso.email;
            const usuarioAcademiaLogin: IUsuarioAcademiaLogin = {
                id: usuarioAcademia.id,
                nome: usuarioAcademia.nome,
                cpf: usuarioAcademia.cpf,
                email: usuarioAcademia.email,
                adm: usuarioAcademia.adm,
                dataNascimento: usuarioAcademia.dataNascimento,
                genero: usuarioAcademia.genero,
                idAcesso: usuarioAcademia.idAcesso,
                role: acesso.role,
            };
            return usuarioAcademiaLogin;
        }
    }

    async obterTodos(): Promise<{ dados: IUsuario[]; quantidade: number }> {
        return await this.usuarioRepository.obterTodos();
    }

    async atualizarStatusPagamento(
        id: string,
        statusPagamento: StatusPagamento,
    ): Promise<IUsuario> {
        const usuarioPagamento =
            await this.usuarioRepository.atualizarStatusPagamento(
                id,
                statusPagamento,
            );
        if (!usuarioPagamento) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        return usuarioPagamento;
    }

    async cadastrar(usuario: IUsuario): Promise<IUsuario> {
        await this.validarCpfEmail(usuario.email, usuario.cpf);
        const acesso = await this.acessoService.cadastrar({
            email: usuario.email,
            senha: usuario.senha,
            role: RolesAceso.usuario,
        });

        delete usuario.senha;
        delete usuario.email;
        return await this.usuarioRepository.criar({
            ...usuario,
            idAcesso: acesso.id,
        });
    }

    async atualizar(usuario: UsuarioDTO, id: string): Promise<IUsuario> {
        const usuarioPorId = await this.usuarioRepository.obterPorId(id);
        if (!usuarioPorId) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        if ((usuario.email || usuario.senha) && usuarioPorId) {
            const acesso = await this.acessoRepository.obterPorId(
                usuarioPorId.idAcesso,
            );

            if (usuario.senha) {
                await this.acessoService.atualizar(acesso.id, {
                    email: usuarioPorId.email,
                    senha: usuario.senha,
                    role: RolesAceso.usuario,
                });
            }

            if (usuario.email && usuario.senha) {
                await this.acessoService.atualizar(acesso.id, {
                    email: usuario.email,
                    senha: usuario.senha,
                    role: RolesAceso.usuario,
                });
            }

            if (usuario.email) {
                await this.acessoRepository.atualizar(acesso.id, {
                    email: usuario.email,
                    senha: usuarioPorId.senha,
                    role: RolesAceso.usuario,
                });
            }
        }

        return await this.usuarioRepository.atualizar(id, usuario);
    }

    async obterPorId(id: string): Promise<IUsuario> {
        return await this.usuarioRepository.obterPorId(id);
    }

    async validarCpfEmail(email: string, cpf: string) {
        const usuarioEmailJaCadastrado = await this.acessoService.validaEmail(
            email,
        );
        const usuarioCpfJaCadastrado =
            await this.usuarioRepository.procurarPorCpfJaCadastrado(cpf);
        if (usuarioEmailJaCadastrado) {
            throw new HttpException(
                "Email já cadastrado",
                HttpStatus.BAD_REQUEST,
            );
        }
        if (usuarioCpfJaCadastrado) {
            throw new HttpException(
                "CPF já cadastrado",
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async salvaFicha(usuarioFicha: UsuarioFichaDto): Promise<IUsuario> {
        const usuario = await this.usuarioRepository.obterPorId(
            usuarioFicha.id,
        );
        if (!usuario) {
            throw new HttpException(
                "Usuario não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        const ficha = await this.fichaService.obterPorId(usuarioFicha.idFicha);
        if (!ficha) {
            throw new HttpException(
                "Ficha não encontrada",
                HttpStatus.NOT_FOUND,
            );
        }
        const usuarioDto: UsuarioDTO = {
            id: usuario.id,
            nome: usuario.nome,
            dataNascimento: usuario.dataNascimento,
            cpf: usuario.cpf,
            email: usuario.email,
            senha: usuario.senha,
            genero: usuario.genero,
            peso: usuario.peso,
            altura: usuario.altura,
            statusPagamento: usuario.statusPagamento,
            perfil: "USUARIO",
            idFicha: usuarioFicha.idFicha,
        };
        const historicoTreino: HistoricoTreinoDTO = {
            qtdAtualTreino: 0,
            idFichaTreino: ficha.id,
            ficha: ficha,
            idUsuario: usuario.id,
            dataTreino: moment().toDate(),
        };
        await this.historicoTreinoService.cadastrar(historicoTreino);
        return await this.atualizar(usuarioDto, usuarioFicha.id);
    }

    async removeUsuario(id: string) {
        const usuario = await this.usuarioRepository.obterPorId(id);
        if (!usuario) {
            throw new HttpException(
                "Usuario não encontrado!",
                HttpStatus.NOT_FOUND,
            );
        }

        await this.usuarioRepository.remover(id);
        await this.acessoRepository.remover(usuario.idAcesso);

        return {
            message: "Usuário removido com sucesso!",
            status: HttpStatus.OK,
        };
    }
}
