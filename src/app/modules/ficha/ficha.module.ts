import { Module } from "@nestjs/common";
import { FichaSchema } from "./entity/ficha.schema";
import { DataBaseModule } from "src/utils/database/database.module";
import { FichaController } from "./ficha.controller";
import { FichaRepository } from "./ficha.repository";
import { FichaService } from "./ficha.service";

@Module({
    imports: [
        DataBaseModule.forFeature([
            {
                name: "Ficha",
                schema: FichaSchema,
            },
        ]),
    ],
    controllers: [FichaController],
    providers: [FichaRepository, FichaService],
})
export class FichaModule {}
