import { Module } from "@nestjs/common";
import { AcessoSchema } from "./entity/acesso.schema";
import { DataBaseModule } from "src/utils/database/database.module";
import { AcessoController } from "./acesso.controller";
import { AcessoService } from "./acesso.service";
import { AcessoRepository } from "./acesso.repository";

@Module({
    imports: [
        DataBaseModule.forFeature([{ name: "Acesso", schema: AcessoSchema }]),
    ],
    controllers: [AcessoController],
    providers: [AcessoService, AcessoRepository],
    exports: [AcessoService],
})
export class AcessoModule {}
