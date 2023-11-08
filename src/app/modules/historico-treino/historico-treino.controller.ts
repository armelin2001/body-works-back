import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { HistoricoTreinoService } from "./historico-treino.service";
import { IHistoricoTreino } from "./entity/historico-treino.interface";
import {
    HistoricoNaoEncontradoUsuario,
    HistoricoTreinoDTO,
} from "./dto/historico-treino.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";

@ApiTags("HistoricoTreino")
@UseGuards(LocalAuthGuard)
@Controller("historico-treino")
export class HistoricoTreinoController {
    constructor(
        private readonly historicoTreinoService: HistoricoTreinoService,
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de historicos de treino",
        type: HistoricoTreinoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTodos(): Promise<{
        dados: any[];
        quantidade: number;
    }> {
        return await this.historicoTreinoService.obterTodos();
    }

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um historico de treino",
        type: HistoricoTreinoDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Historico de treino nao encontrado",
        type: HistoricoTreinoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<any> {
        return await this.historicoTreinoService.obterPorId(id);
    }

    @Get("usuario/:id")
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de historicos de por usuario",
        type: HistoricoTreinoDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Historico de treino nao encontrado para o usuario",
        type: HistoricoNaoEncontradoUsuario,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async buscarHistoricoPorUsuario(
        @Param("id") id: string,
    ): Promise<IHistoricoTreino[]> {
        return await this.historicoTreinoService.buscarHistoricoPorUsuario(id);
    }

    @Get("usuario-ficha/:idUsuario/:idFicha")
    @ApiResponse({
        status: 200,
        description:
            "Retorna uma lista de historicos de por usuario filtrado por ficha",
        type: HistoricoTreinoDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Historico de treino nao encontrado para o usuario",
        type: HistoricoNaoEncontradoUsuario,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async buscarHistoricoPorFichaEUsuario(
        @Param("idUsuario")
        idUsuario: string,
        @Param("idFicha")
        idFicha: string,
    ): Promise<IHistoricoTreino[]> {
        return await this.historicoTreinoService.buscarHistoricoPorFichaEUsuario(
            idUsuario,
            idFicha,
        );
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna historico de treino criado",
        type: HistoricoTreinoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async cadastrar(@Body() historicoTreino: HistoricoTreinoDTO) {
        return await this.historicoTreinoService.cadastrar(historicoTreino);
    }
}
