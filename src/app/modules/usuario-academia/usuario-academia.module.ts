import { Module } from "@nestjs/common";
import { UsuarioAcademiaRepository } from "./usuario-academia.repository";
import { UsuarioAcademiaService } from "./usuario-academia.service";
import { UsuarioAcademiaController } from "./usuario-academia.controller";
import { UsuarioAcademiaSchema } from "./entity/usuario-academia.schema";
import { DataBaseModule } from "src/utils/database/database.module";

@Module({
    imports: [
        DataBaseModule.forFeature([
            { name: "UsuarioAcademia", schema: UsuarioAcademiaSchema },
        ]),
    ],
    controllers: [UsuarioAcademiaController],
    providers: [UsuarioAcademiaRepository, UsuarioAcademiaService],
})
export class UsuarioAcademiaModule {}
