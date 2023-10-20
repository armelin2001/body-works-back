import { IRepository } from "src/utils/repository/repository";
import { FilterQuery } from "mongoose";
import { ITreino } from "../entity/treino.interface";

export class ObterTreinosPorInstrutorUseCase {
    constructor(
        private repository: IRepository<ITreino, ITreino>,
        private filtros?: FilterQuery<ITreino>,
    ) {}

    async executar(): Promise<{
        dados: ITreino[];
        quantidade: number;
    }> {
        return await this.repository.obterTodos(this.filtros);
    }
}
