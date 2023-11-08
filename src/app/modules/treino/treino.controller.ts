import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { TreinoService } from "./treino.service";
import { IComentarioTreino, ITreino } from "./entity/treino.interface";
import {
    ListagemTreino,
    TreinoDto,
    TreinoNaoEncontradoDTO,
} from "./dto/treino.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";

@ApiTags("Treino")
@UseGuards(LocalAuthGuard)
@Controller("treino")
export class TreinoController {
    constructor(private readonly treinoService: TreinoService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de treinos",
        type: ListagemTreino,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTodos(): Promise<{ dados: ITreino[]; quantidade: number }> {
        return await this.treinoService.obterTodos();
    }

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um treino",
        type: TreinoDto,
    })
    @ApiResponse({
        status: 404,
        description: "Treino nao encontrado",
        type: TreinoNaoEncontradoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(
        @Param("id")
        id: string,
    ): Promise<ITreino> {
        return await this.treinoService.obterPorId(id);
    }

    @Get("usuario/:id")
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de treinos pelo id do usuario",
        type: ListagemTreino,
    })
    @ApiResponse({
        status: 404,
        description: "Treino nao encontrado",
        type: TreinoNaoEncontradoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTreinosPorUsuario(
        @Param("id") idUsuario: string,
    ): Promise<ITreino[]> {
        return await this.treinoService.obterTreinosUsuario(idUsuario);
    }

    @Get("usuario/comentarios/:id")
    @ApiResponse({
        status: 200,
        description:
            "Retorna uma lista de comentarios de treinos pelo id do usuario",
        type: ListagemTreino,
    })
    @ApiResponse({
        status: 404,
        description: "Treino nao encontrado",
        type: TreinoNaoEncontradoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTreinosComentarioPorUsuario(
        @Param("id")
        id: string,
    ): Promise<IComentarioTreino[]> {
        return await this.treinoService.obterComentariosPorUsuario(id);
    }

    @Get("instrutor/comentarios/:idInstrutor")
    @ApiResponse({
        status: 200,
        description:
            "Retorna uma lista de comentarios de treinos pelo id do instrutor",
        type: ListagemTreino,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterComentariosTreinosPorInstrutor(
        @Param("idInstrutor")
        idInstrutor: string,
    ) {
        return await this.treinoService.obterComentariosPorInstrutor(
            idInstrutor,
        );
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna um treino criado",
        type: TreinoDto,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async cadastrar(@Body() treino: TreinoDto) {
        return await this.treinoService.cadastrar(treino);
    }

    @Patch(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um treino atualizado",
        type: TreinoDto,
    })
    @ApiResponse({
        status: 404,
        description: "Treino nao encontrado",
        type: TreinoNaoEncontradoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async atualizar(@Param("id") id: string, @Body() treino: TreinoDto) {
        return await this.treinoService.atualizar(treino, id);
    }
}
