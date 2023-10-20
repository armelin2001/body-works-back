import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/utils/database/database.module";
import { HistoricoTreinoSchema } from "./entity/historico-treino.schema";
import { HistoricoTreinoController } from "./historico-treino.controller";
import { HistoricoTreinoRepository } from "./historico-treino.repository";
import { HistoricoTreinoService } from "./historico-treino.service";

@Module({
    imports: [
        DataBaseModule.forFeature([
            {
                name: "HistoricoTreino",
                schema: HistoricoTreinoSchema,
            },
        ]),
    ],
    controllers: [HistoricoTreinoController],
    providers: [HistoricoTreinoRepository, HistoricoTreinoService],
})
export class HistoricoTreinoModule {}
