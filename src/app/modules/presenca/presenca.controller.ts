import {
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { PresencaService } from "./presenca.service";
import {
    ListagemPresenca,
    PresencaDTO,
    PresencaNaoEncontrada,
} from "./dto/presenca.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";

@UseGuards(LocalAuthGuard)
@Controller("presenca")
@ApiTags("Equipamento")
export class PresencaController {
    constructor(private readonly presencaService: PresencaService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de presencas",
        type: ListagemPresenca,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTodos(): Promise<{ dados: any[]; quantidade: number }> {
        return await this.presencaService.obterTodos();
    }

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna uma presenca",
        type: PresencaDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Presenca nao encontrada",
        type: PresencaNaoEncontrada,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<any> {
        return await this.presencaService.obterPorId(id);
    }

    @ApiResponse({
        status: 200,
        description: "Retorna presenca atualizada",
        type: PresencaDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Presenca nao encontrada",
        type: PresencaNaoEncontrada,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    @Patch(":id")
    async atualizar(
        @Param("id")
        id: string,
        @Body()
        presenca: PresencaDTO,
    ) {
        return await this.presencaService.atualizar(presenca, id);
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna presenca criada",
        type: PresencaDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async cadastrar(@Body() presenca: PresencaDTO) {
        return await this.presencaService.cadastrar(presenca);
    }
}
