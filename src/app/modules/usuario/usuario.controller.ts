import { Body, Controller, Post } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { LoginDTO } from "./dto/usario.dto";
import { IUsuario } from "src/app/models/usuario.interface";

@Controller("usuario")
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async cadastrar(@Body() usuario: IUsuario): Promise<IUsuario> {
        return await this.usuarioService.cadastrar(usuario);
    }

    @Post("login")
    async login(@Body() login: LoginDTO): Promise<IUsuario> {
        return await this.usuarioService.login(login);
    }
}
