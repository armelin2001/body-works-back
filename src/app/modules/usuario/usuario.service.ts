import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { LoginDTO, UsuarioDTO } from "./dto/usario.dto";
import { IUsuario } from "src/app/models/usuario.interface";

export class UsuarioService {
    constructor(
        @Inject(UsuarioRepository)
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async login(login: LoginDTO): Promise<IUsuario> {
        const usuario = await this.usuarioRepository.login(
            login.email,
            login.senha,
        );

        if (!usuario) {
            throw new Error("Usuário ou senha inválidos");
        }

        return usuario;
    }

    async cadastrar(usuario: IUsuario): Promise<IUsuario> {
        const usuarioEmailJaCadastrado =
            await this.usuarioRepository.procurarPorEmailJaCadastrado(
                usuario.email,
            );
        const usuarioCpfJaCadastrado =
            await this.usuarioRepository.procurarPorCpfJaCadastrado(
                usuario.cpf,
            );
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
        return await this.usuarioRepository.criar(usuario);
    }

    async atualizar(usuario: UsuarioDTO, id: string): Promise<IUsuario> {
        return await this.usuarioRepository.atualizar(id, usuario);
    }

    async obterPorId(id: string): Promise<IUsuario> {
        return await this.usuarioRepository.obterPorId(id);
    }
}
