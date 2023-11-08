import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UsuarioAcademiaService } from "./usuario-academia.service";
import { IUsuarioAcademia } from "./entity/usuario-academia.interface";
import {
    UsuarioAcademiaCodigoInvalidoCadastrado,
    UsuarioAcademiaCpfJaCadastrado,
    UsuarioAcademiaDTO,
    UsuarioAcademiaEmailJaCadastrado,
    UsuarioAcademiaNaoEncontrado,
} from "./dto/usuario-academia.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";

@ApiTags("Usuario-academia")
@Controller("usuario-academia")
export class UsuarioAcademiaController {
    constructor(
        private readonly usuarioAcademiaService: UsuarioAcademiaService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de usuarios academia",
        type: UsuarioAcademiaDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTodos(): Promise<{
        dados: IUsuarioAcademia[];
        quantidade: number;
    }> {
        return await this.usuarioAcademiaService.obterTodos();
    }

    @UseGuards(LocalAuthGuard)
    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um usuario academia",
        type: UsuarioAcademiaDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario academia nao encontrado",
        type: UsuarioAcademiaNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<IUsuarioAcademia> {
        return await this.usuarioAcademiaService.obterPorId(id);
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna um usuario cadastrado",
        type: UsuarioAcademiaDTO,
    })
    @ApiResponse({
        status: 400,
        description: "Usuario academia com email ja cadastrado",
        type: UsuarioAcademiaEmailJaCadastrado,
    })
    @ApiResponse({
        status: 400,
        description: "Usuario academia com cpf ja cadastrado",
        type: UsuarioAcademiaCpfJaCadastrado,
    })
    @ApiResponse({
        status: 400,
        description: "Usuario academia codigo academia invalido",
        type: UsuarioAcademiaCodigoInvalidoCadastrado,
    })
    async cadastrar(
        @Body() usuarioAcademia: IUsuarioAcademia,
    ): Promise<IUsuarioAcademia> {
        return await this.usuarioAcademiaService.criar(usuarioAcademia);
    }

    @UseGuards(LocalAuthGuard)
    @Patch(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um usuario academia atualizado",
        type: UsuarioAcademiaDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario nao encontrado",
        type: UsuarioAcademiaNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async atualizar(
        @Param("id") id: string,
        @Body() usuarioAcademia: UsuarioAcademiaDTO,
    ) {
        return await this.usuarioAcademiaService.atualizar(id, usuarioAcademia);
    }

    @UseGuards(LocalAuthGuard)
    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um usuario academia atualizado",
        type: UsuarioAcademiaDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario nao encontrado",
        type: UsuarioAcademiaNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async remover(@Param("id") id: string) {
        return await this.usuarioAcademiaService.remover(id);
    }
}
