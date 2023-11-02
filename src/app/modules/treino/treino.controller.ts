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
import { TreinoDto } from "./dto/treino.dto";

@UseGuards(LocalAuthGuard)
@Controller("treino")
export class TreinoController {
    constructor(private readonly treinoService: TreinoService) {}

    @Get()
    async obterTodos(): Promise<{ dados: ITreino[]; quantidade: number }> {
        return await this.treinoService.obterTodos();
    }

    @Get(":id")
    async obterPorId(
        @Param("id")
        id: string,
    ): Promise<ITreino> {
        return await this.treinoService.obterPorId(id);
    }

    @Get("usuario/comentarios/:id")
    async obterTreinosPorUsuario(
        @Param("id")
        id: string,
    ): Promise<IComentarioTreino[]> {
        return await this.treinoService.obterComentariosPorUsuario(id);
    }

    @Get("instrutor/comentarios/:idInstrutor")
    async obterComentariosTreinosPorInstrutor(
        @Param("idInstrutor")
        idInstrutor: string,
    ) {
        return await this.treinoService.obterComentariosPorInstrutor(
            idInstrutor,
        );
    }

    @Post()
    async cadastrar(@Body() treino: TreinoDto) {
        return await this.treinoService.cadastrar(treino);
    }

    @Patch(":id")
    async atualizar(@Param("id") id: string, @Body() treino: TreinoDto) {
        return await this.treinoService.atualizar(treino, id);
    }
}
