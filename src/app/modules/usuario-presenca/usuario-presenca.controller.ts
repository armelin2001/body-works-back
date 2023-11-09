import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsuarioPresencaService } from "./usuario-presenca.service";
import { IUsuarioPresenca } from "./entity/usuario-presenca.interface";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";
import { UsuarioPresencaDTO } from "./dto/usario-presenca.dto";

@ApiTags("UsuarioPresenca")
@Controller("usuario-presenca")
export class UsuarioPresencaController {
    constructor(
        private readonly usuarioPresencaService: UsuarioPresencaService,
    ) {}

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um usuario presenca",
        type: UsuarioPresencaDTO,
    })
    /*@ApiResponse({
        status: 404,
        description: "Usuario presenca nao encontrado",
        type: UsuarioPresencaNaoEncontrado,
    })*/
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<IUsuarioPresenca> {
        return await this.usuarioPresencaService.obterPorId(id);
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna usuario presenca criado",
        type: UsuarioPresencaDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async cadastrar(
        @Body() usuarioPresenca: IUsuarioPresenca,
    ): Promise<IUsuarioPresenca> {
        return await this.usuarioPresencaService.cadastrar(usuarioPresenca);
    }

    @Patch(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna usuario presenca atualizado",
        type: UsuarioPresencaDTO,
    })
    /*@ApiResponse({
        status: 404,
        description: "Usuario presenca nao encontrado",
        type: UsuarioPresencaNaoEncontrado,
    })*/
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async atualizar(
        @Param("id") id: string,
        @Body() usuarioPresenca: IUsuarioPresenca,
    ): Promise<IUsuarioPresenca> {
        return await this.usuarioPresencaService.atualizar(usuarioPresenca, id);
    }
}
