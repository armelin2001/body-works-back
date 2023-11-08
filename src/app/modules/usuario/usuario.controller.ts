import {
    Body,
    Controller,
    Post,
    Patch,
    Param,
    Get,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import {
    FichaUsuarioNaoEncontrada,
    ListaUsuarioDto,
    LoginDTO,
    LoginInvalido,
    UsuarioAtrasado,
    UsuarioComCpfCadastrado,
    UsuarioComEmailCadastrado,
    UsuarioDTO,
    UsuarioFichaDto,
    UsuarioInvalido,
    UsuarioNaoEncontrado,
} from "./dto/usario.dto";
import { IUsuario } from "src/app/modules/usuario/entity/usuario.interface";
import { IUsuarioAcademia } from "../usuario-academia/entity/usuario-academia.interface";
import { StatusPagamento } from "src/utils/constants/status-pagamento";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";
import { UsuarioAcademiaDTO } from "../usuario-academia/dto/usuario-academia.dto";

@ApiTags("Usuario")
@Controller("usuario")
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @UseGuards(LocalAuthGuard)
    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um usuario",
        type: UsuarioDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario nao encontrado",
        type: UsuarioNaoEncontrado,
    })
    @ApiResponse({
        status: 400,
        description: "Usuario com email ja cadastrado",
        type: UsuarioComEmailCadastrado,
    })
    @ApiResponse({
        status: 400,
        description: "Usuario com cpf ja cadastrado",
        type: UsuarioComCpfCadastrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<IUsuario> {
        return await this.usuarioService.obterPorId(id);
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna usuario criado",
        type: UsuarioDTO,
    })
    async cadastrar(@Body() usuario: IUsuario): Promise<IUsuario> {
        return await this.usuarioService.cadastrar(usuario);
    }

    @UseGuards(LocalAuthGuard)
    @Post("ficha")
    @ApiResponse({
        status: 404,
        description: "Usuario nao encontrado",
        type: UsuarioNaoEncontrado,
    })
    @ApiResponse({
        status: 404,
        description: "Ficha nao encontrada",
        type: FichaUsuarioNaoEncontrada,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    @ApiResponse({
        status: 200,
        description: "Retorna usuario apos criar ficha",
        type: UsuarioDTO,
    })
    async cadastrarFicha(@Body() usuario: UsuarioFichaDto): Promise<IUsuario> {
        return await this.usuarioService.salvaFicha(usuario);
    }

    @UseGuards(LocalAuthGuard)
    @Patch(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna usuario atualizado",
        type: UsuarioDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario nao encontrado",
        type: UsuarioNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async atualizar(@Param("id") id: string, @Body() usuario: UsuarioDTO) {
        return await this.usuarioService.atualizar(usuario, id);
    }

    @Post("login")
    @ApiResponse({
        status: 200,
        description: "Retorna usuario logado",
        type: UsuarioDTO,
    })
    @ApiResponse({
        status: 200,
        description: "Retorna usuario logado",
        type: UsuarioAcademiaDTO,
    })
    @ApiResponse({
        status: 400,
        description: "Usuario com status invalido",
        type: UsuarioInvalido,
    })
    @ApiResponse({
        status: 400,
        description: "Usuario com status invalido",
        type: UsuarioAtrasado,
    })
    @ApiResponse({
        status: 401,
        description: "Usuario nao encontrado",
        type: LoginInvalido,
    })
    async login(@Body() login: LoginDTO): Promise<IUsuario | IUsuarioAcademia> {
        return await this.usuarioService.login(login);
    }

    @UseGuards(LocalAuthGuard)
    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de usuarios",
        type: ListaUsuarioDto,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTodos(): Promise<{ dados: IUsuario[]; quantidade: number }> {
        return await this.usuarioService.obterTodos();
    }

    @UseGuards(LocalAuthGuard)
    @Patch(":id/status-pagamento")
    @ApiResponse({
        status: 200,
        description: "Retorna usuario logado",
        type: UsuarioDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario nao encontrado",
        type: UsuarioNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async atualizarStatusPagamento(
        @Param("id") id: string,
        @Body("statusPagamento") statusPagamento: StatusPagamento,
    ): Promise<IUsuario> {
        return await this.usuarioService.atualizarStatusPagamento(
            id,
            statusPagamento,
        );
    }

    @UseGuards(LocalAuthGuard)
    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna usuario logado",
        type: UsuarioDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario nao encontrado",
        type: UsuarioNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async remover(@Param("id") id: string) {
        return await this.usuarioService.removeUsuario(id);
    }
}
