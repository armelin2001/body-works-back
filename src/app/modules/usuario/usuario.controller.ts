import { Body, Controller, Post, Patch, Param, Get } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { LoginDTO, UsuarioDTO } from "./dto/usario.dto";
import { IUsuario } from "src/app/modules/usuario/entity/usuario.interface";
import { IUsuarioAcademia } from "../usuario-academia/entity/usuario-academia.interface";

@Controller("usuario")
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<IUsuario> {
        return await this.usuarioService.obterPorId(id);
    }

    @Post()
    async cadastrar(@Body() usuario: IUsuario): Promise<IUsuario> {
        return await this.usuarioService.cadastrar(usuario);
    }

    @Patch(":id")
    async atualizar(@Param("id") id: string, @Body() usuario: UsuarioDTO) {
        return await this.usuarioService.atualizar(usuario, id);
    }

    @Post("login")
    async login(@Body() login: LoginDTO): Promise<IUsuario | IUsuarioAcademia> {
        return await this.usuarioService.login(login);
    }
}
