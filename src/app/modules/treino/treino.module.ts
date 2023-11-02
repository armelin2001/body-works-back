import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/utils/database/database.module";
import { TreinoSchema } from "./entity/treino.schema";
import { TreinoController } from "./treino.controller";
import { TreinoRepository } from "./treino.repository";
import { TreinoService } from "./treino.service";
import { FichaService } from "../ficha/ficha.service";
import { FichaRepository } from "../ficha/ficha.repository";

@Module({
    imports: [
        DataBaseModule.forFeature([
            {
                name: "Treino",
                schema: TreinoSchema,
            },
        ]),
        DataBaseModule.forFeature([{ name: "Ficha", schema: TreinoSchema }]),
    ],
    controllers: [TreinoController],
    providers: [TreinoRepository, FichaService, FichaRepository, TreinoService],
})
export class TreinoModule {}
