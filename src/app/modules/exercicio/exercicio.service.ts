import { Inject, Injectable } from "@nestjs/common";
import { ExercicioRepository } from "./exercicio.repository";
import { IExercicio } from "./entity/exercicio.interface";
import { ExercicioDTO } from "./dto/exercicio.dto";

@Injectable()
export class ExercicioService {
    constructor(
        @Inject(ExercicioRepository)
        private readonly exercicioRepository: ExercicioRepository,
    ) {}

    async cadastrar(exercicio: ExercicioDTO): Promise<IExercicio> {
        return await this.exercicioRepository.criar(exercicio);
    }

    async atualizar(
        exercicio: ExercicioDTO,
        id: string,
    ): Promise<IExercicio> {
        return await this.exercicioRepository.atualizar(id, exercicio);
    }

    async obterPorId(id: string): Promise<IExercicio> {
        return await this.exercicioRepository.obterPorId(id);
    }

    async obterTodos(): Promise<{ dados: IExercicio[]; quantidade: number }> {
        return await this.exercicioRepository.obterTodos();
    }

    async remover(id: string): Promise<IExercicio> {
        return await this.exercicioRepository.remover(id);
    }
}
