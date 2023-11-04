import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/utils/database/database.module";
import { PresencaSchema } from "./entity/presenca.schema";
import { PresencaController } from "./presenca.controller";
import { PresencaService } from "./presenca.service";
import { PresencaRepository } from "./presenca.repository";

@Module({
    imports: [
        DataBaseModule.forFeature([
            {
                name: "presenca",
                schema: PresencaSchema,
            },
        ]),
    ],
    controllers: [PresencaController],
    providers: [PresencaService, PresencaRepository],
})
export class PresencaModule {}
