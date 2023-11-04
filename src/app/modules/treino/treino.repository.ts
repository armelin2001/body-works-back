import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { ITreino } from "./entity/treino.interface";
import { TreinoDto } from "./dto/treino.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class TreinoRepository extends RepositoryAbstract<ITreino, TreinoDto> {
    constructor(
        @InjectModel("Treino")
        private readonly treinoModel: Model<ITreino>,
    ) {
        super(treinoModel);
    }

    async buscarComentariosTreino(idUsuario: string): Promise<ITreino[]> {
        const comentarios = await this.treinoModel
            .find({
                idUsuario: idUsuario,
            })
            .exec();
        return comentarios;
    }

    async buscaTreinosPorUsuario(idUsuario: string): Promise<ITreino[]> {
        const treinos = await this.treinoModel
            .find({
                idUsuario: idUsuario,
            })
            .exec();
        return treinos;
    }
}
