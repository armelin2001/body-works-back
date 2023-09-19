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
import { ExercicioService } from "./exercicio.service";
import { IExercicio } from "./entity/exercicio.interface";
import { ExercicioDTO } from "./dto/exercicio.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";

@UseGuards(LocalAuthGuard)
@Controller("exercicio")
export class ExercicioController {
    constructor(private readonly exercicioService: ExercicioService) {}

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<IExercicio> {
        return await this.exercicioService.obterPorId(id);
    }

    @Get()
    async obterTodos(): Promise<{ dados: IExercicio[]; quantidade: number }> {
        return await this.exercicioService.obterTodos();
    }

    @Post()
    async cadastrar(@Body() exercicio: IExercicio): Promise<IExercicio> {
        return await this.exercicioService.cadastrar(exercicio);
    }

    @Patch(":id")
    async atualizar(@Param("id") id: string, @Body() exercicio: ExercicioDTO) {
        return await this.exercicioService.atualizar(exercicio, id);
    }

    @Delete(":id")
    async remover(@Param("id") id: string) {
        return await this.exercicioService.remover(id);
    }
}
