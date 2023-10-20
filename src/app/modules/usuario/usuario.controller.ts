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
import { LoginDTO, UsuarioDTO, UsuarioFichaDto } from "./dto/usario.dto";
import { IUsuario } from "src/app/modules/usuario/entity/usuario.interface";
import { IUsuarioAcademia } from "../usuario-academia/entity/usuario-academia.interface";
import { StatusPagamento } from "src/utils/constants/status-pagamento";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";

@Controller("usuario")
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @UseGuards(LocalAuthGuard)
    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<IUsuario> {
        return await this.usuarioService.obterPorId(id);
    }

    @Post()
    async cadastrar(@Body() usuario: IUsuario): Promise<IUsuario> {
        return await this.usuarioService.cadastrar(usuario);
    }

    @UseGuards(LocalAuthGuard)
    @Post("ficha")
    async cadastrarFicha(@Body() usuario: UsuarioFichaDto): Promise<IUsuario> {
        return await this.usuarioService.salvaFicha(usuario);
    }

    @UseGuards(LocalAuthGuard)
    @Patch(":id")
    async atualizar(@Param("id") id: string, @Body() usuario: UsuarioDTO) {
        return await this.usuarioService.atualizar(usuario, id);
    }

    @Post("login")
    async login(@Body() login: LoginDTO): Promise<IUsuario | IUsuarioAcademia> {
        return await this.usuarioService.login(login);
    }

    @UseGuards(LocalAuthGuard)
    @Get()
    async obterTodos(): Promise<{ dados: IUsuario[]; quantidade: number }> {
        return await this.usuarioService.obterTodos();
    }

    @UseGuards(LocalAuthGuard)
    @Patch(":id/status-pagamento")
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
    async remover(@Param("id") id: string) {
        return await this.usuarioService.removeUsuario(id);
    }
}
