import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/utils/database/database.module";
import { UsuarioPresencaSchema } from "./entity/usuario-presenca.schema";
import { UsuarioPresencaController } from "./usuario-presenca.controller";
import { UsuarioPresencaRepository } from "./usuario-presenca.repository";
import { UsuarioPresencaService } from "./usuario-presenca.service";

@Module({
    imports: [
        DataBaseModule.forFeature([
            { name: "UsuarioPresenca", schema: UsuarioPresencaSchema },
        ]),
    ],
    controllers: [UsuarioPresencaController],
    providers: [UsuarioPresencaRepository, UsuarioPresencaService],
})
export class UsuarioPresencaModule {}
