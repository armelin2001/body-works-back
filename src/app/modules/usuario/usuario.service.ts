import { Inject } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { LoginDTO } from "./dto/usario.dto";
import { IUsuario } from "src/app/models/usuario.interface";

export class UsuarioService {
    constructor(
        @Inject(UsuarioRepository)
        private readonly usuarioRepository: UsuarioRepository
        ) 
    {}

    async login(login: LoginDTO): Promise<IUsuario> {
        const usuario = await this.usuarioRepository.login(login.email, login.senha);
        
        if(!usuario){
            throw new Error("Usuário ou senha inválidos");
        }
        
        return usuario;
    }

    async cadastrar(usuario: IUsuario): Promise<IUsuario> {
        // criptografar a senha
        return await this.usuarioRepository.criar(usuario);
    }
}