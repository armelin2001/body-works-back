import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { HistoricoTreinoService } from "./historico-treino.service";
import { IHistoricoTreino } from "./entity/historico-treino.interface";
import { HistoricoTreinoDTO } from "./dto/historico-treino.dto";

//@UseGuards(LocalAuthGuard)
@Controller("historico-treino")
export class HistoricoTreinoController {
    constructor(
        private readonly historicoTreinoService: HistoricoTreinoService,
    ) {}

    @Get()
    async obterTodos(): Promise<{
        dados: any[];
        quantidade: number;
    }> {
        return await this.historicoTreinoService.obterTodos();
    }

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<any> {
        return await this.historicoTreinoService.obterPorId(id);
    }

    @Get("usuario/:id")
    async buscarHistoricoPorUsuario(
        @Param("id") id: string,
    ): Promise<IHistoricoTreino[]> {
        return await this.historicoTreinoService.buscarHistoricoPorUsuario(id);
    }

    @Get("usuario-ficha/:idUsuario/:idFicha")
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
    async cadastrar(@Body() historicoTreino: HistoricoTreinoDTO) {
        return await this.historicoTreinoService.cadastrar(historicoTreino);
    }
}
