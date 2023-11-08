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
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { FichaService } from "./ficha.service";
import {
    FichaDto,
    FichaNaoEncontrada,
    ListagemFichaDto,
} from "./dto/ficha.dto";
import { IFicha } from "./entity/ficha.interface";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";

@ApiTags("Ficha")
@UseGuards(LocalAuthGuard)
@Controller("ficha")
export class FichaController {
    constructor(private readonly fichaService: FichaService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de fichas",
        type: ListagemFichaDto,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTodos(): Promise<{ dados: IFicha[]; quantidade: number }> {
        return await this.fichaService.obterTodos();
    }

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna uma ficha",
        type: FichaDto,
    })
    @ApiResponse({
        status: 404,
        description: "Ficha nao encontrada",
        type: FichaNaoEncontrada,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<IFicha> {
        return await this.fichaService.obterPorId(id);
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna ficha criada",
        type: FichaDto,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async cadastrar(@Body() ficha: FichaDto): Promise<IFicha> {
        return await this.fichaService.cadastrar(ficha);
    }

    @Patch(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna ficha atualizada",
        type: FichaDto,
    })
    @ApiResponse({
        status: 404,
        description: "Ficha nao encontrada",
        type: FichaNaoEncontrada,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async atualizar(
        @Body() ficha: FichaDto,
        @Param("id") id: string,
    ): Promise<IFicha> {
        return await this.fichaService.atualizar(ficha, id);
    }

    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna ficha removida",
        type: FichaDto,
    })
    @ApiResponse({
        status: 404,
        description: "Ficha nao encontrada",
        type: FichaNaoEncontrada,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async remover(@Param("id") id: string): Promise<IFicha> {
        return await this.fichaService.remover(id);
    }
}
