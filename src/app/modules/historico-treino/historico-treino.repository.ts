import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { IHistoricoTreino } from "./entity/historico-treino.interface";
import { HistoricoTreinoDTO } from "./dto/historico-treino.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class HistoricoTreinoRepository extends RepositoryAbstract<
    IHistoricoTreino,
    HistoricoTreinoDTO
> {
    constructor(
        @InjectModel("HistoricoTreino")
        private readonly historicoTreinoModel: Model<IHistoricoTreino>,
    ) {
        super(historicoTreinoModel);
    }

    async buscarHistoricoPorUsuario(idUsuario: string) {
        const historicos = await this.historicoTreinoModel
            .find({
                idUsuario: idUsuario,
            })
            .exec();
        return historicos;
    }

    async buscarHistoricoPorFichaEUsuario(idUsuario: string, idFicha: string) {
        const historicos = await this.historicoTreinoModel
            .find({
                idUsuario: idUsuario,
                idFichaTreino: idFicha,
            })
            .exec();
        return historicos;
    }
}
