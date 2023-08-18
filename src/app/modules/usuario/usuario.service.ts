import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { LoginDTO, UsuarioDTO } from "./dto/usario.dto";
import { IUsuario } from "src/app/modules/usuario/entity/usuario.interface";
import { UsuarioAcademiaRepository } from "../usuario-academia/usuario-academia.repository";
import { IUsuarioAcademia } from "../usuario-academia/entity/usuario-academia.interface";
import { AcessoRepository } from "../acessos/acesso.repository";
import { RolesAceso } from "src/utils/constants/roles-acesso";
import { AcessoService } from "../acessos/acesso.service";

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
    ) {}

    async login(login: LoginDTO): Promise<IUsuario | IUsuarioAcademia> {
        // refatorar para fazer a busca pela tabela de acesso
        const acesso = await this.acessoRepository.procuraAcesso(
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
            return usuario;
        } else {
            return usuarioAcademia;
        }
    }

    async cadastrar(usuario: IUsuario): Promise<IUsuario> {
        await this.validarCpfEmail(usuario.email, usuario.cpf);
        const acesso = await this.acessoService.cadastrar({
            email: usuario.email,
            senha: usuario.senha,
            role: RolesAceso.USUARIO,
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
        if ((usuario.email || usuario.senha) && usuarioPorId) {
            const acesso = await this.acessoRepository.obterPorId(
                usuarioPorId.idAcesso,
            );

            if (usuario.email && usuario.senha) {
                await this.acessoRepository.atualizar(acesso.id, {
                    email: usuario.email,
                    senha: usuario.senha,
                    role: RolesAceso.USUARIO,
                });
            }

            if (usuario.email) {
                await this.acessoRepository.atualizar(acesso.id, {
                    email: usuario.email,
                    senha: usuarioPorId.senha,
                    role: RolesAceso.USUARIO,
                });
            }

            if (usuario.senha) {
                await this.acessoRepository.atualizar(acesso.id, {
                    email: usuarioPorId.email,
                    senha: usuario.senha,
                    role: RolesAceso.USUARIO,
                });
            }
        }

        return await this.usuarioRepository.atualizar(id, usuario);
    }

    async obterPorId(id: string): Promise<IUsuario> {
        return await this.usuarioRepository.obterPorId(id);
    }

    async validarCpfEmail(email: string, cpf: string) {
        const usuarioEmailJaCadastrado =
            await this.usuarioRepository.procurarPorEmailJaCadastrado(email);
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
}
