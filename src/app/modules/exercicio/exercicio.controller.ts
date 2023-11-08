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
import { ExercicioDTO, TodosExerciciosDTO } from "./dto/exercicio.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Exercicio")
@UseGuards(LocalAuthGuard)
@Controller("exercicio")
export class ExercicioController {
    constructor(private readonly exercicioService: ExercicioService) {}

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um exercicio",
        type: ExercicioDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Exercicio nao encontrado",
        type: ExercicioDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: ExercicioDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<IExercicio> {
        return await this.exercicioService.obterPorId(id);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de exercicios",
        type: TodosExerciciosDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: ExercicioDTO,
    })
    async obterTodos(): Promise<{ dados: IExercicio[]; quantidade: number }> {
        return await this.exercicioService.obterTodos();
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna exercicio criado",
        type: ExercicioDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: ExercicioDTO,
    })
    async cadastrar(@Body() exercicio: IExercicio): Promise<IExercicio> {
        return await this.exercicioService.cadastrar(exercicio);
    }

    @Patch(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna exercicio atualizado",
        type: ExercicioDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Exercicio nao encontrado",
        type: ExercicioDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: ExercicioDTO,
    })
    async atualizar(@Param("id") id: string, @Body() exercicio: ExercicioDTO) {
        return await this.exercicioService.atualizar(exercicio, id);
    }

    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna exercicio atualizado",
        type: ExercicioDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Exercicio nao encontrado",
        type: ExercicioDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: ExercicioDTO,
    })
    async remover(@Param("id") id: string) {
        return await this.exercicioService.remover(id);
    }
}
