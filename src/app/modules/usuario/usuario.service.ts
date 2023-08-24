import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { LoginDTO, UsuarioDTO } from "./dto/usario.dto";
import { IUsuario } from "src/app/modules/usuario/entity/usuario.interface";
import { UsuarioAcademiaRepository } from "../usuario-academia/usuario-academia.repository";
import { IUsuarioAcademia } from "../usuario-academia/entity/usuario-academia.interface";

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(UsuarioRepository)
        private readonly usuarioRepository: UsuarioRepository,
        @Inject(UsuarioAcademiaRepository)
        private readonly usuarioAcademiaRepository: UsuarioAcademiaRepository,
    ) {}

    async login(login: LoginDTO): Promise<IUsuario | IUsuarioAcademia> {
        const usuario = await this.usuarioRepository.login(
            login.email,
            login.senha,
        );
        const usuarioAcademia = await this.usuarioAcademiaRepository.login(
            login.email,
            login.senha,
        );

        if (!usuario && !usuarioAcademia) {
            throw new HttpException(
                "Usuário ou senha inválidos",
                HttpStatus.NOT_FOUND,
            );
        }
        if (usuario) {
            if (usuario.statusPagamento === "cancelado") {
                throw new HttpException(
                    "Usuário cancelado. Entre em contato com um supervisor da academia",
                    HttpStatus.FORBIDDEN
                );
            }
            return usuario;
        } else {
            return usuarioAcademia;
        }
    }

    // Coletar todos os usuários e alterar status de pagamento 
    async obterTodos(): Promise<{ dados: IUsuario[]; quantidade: number }> {
        return await this.usuarioRepository.obterTodos();
    }

    async atualizarStatusPagamento(id: string, statusPagamento: string): Promise<IUsuario> {
        return await this.usuarioRepository.atualizarStatusPagamento(id, statusPagamento);
    }

    async cadastrar(usuario: IUsuario): Promise<IUsuario> {
        await this.validarCpfEmail(usuario.email, usuario.cpf);
        return await this.usuarioRepository.criar(usuario);
    }

    async atualizar(usuario: UsuarioDTO, id: string): Promise<IUsuario> {
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
