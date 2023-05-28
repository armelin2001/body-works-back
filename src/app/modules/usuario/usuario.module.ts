import { Module } from "@nestjs/common";
import { UsuarioSchema } from "src/app/modules/usuario/entity/usuario.schema";
import { DataBaseModule } from "src/utils/database/database.module";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioService } from "./usuario.service";
import { UsuarioAcademiaRepository } from "../usuario-academia/usuario-academia.repository";

@Module({
    imports: [
        DataBaseModule.forFeature([{ name: "Usuario", schema: UsuarioSchema }]),
        DataBaseModule.forFeature([
            { name: "UsuarioAcademia", schema: UsuarioSchema },
        ]),
    ],
    controllers: [UsuarioController],
    providers: [UsuarioRepository, UsuarioAcademiaRepository, UsuarioService],
})
export class UsuarioModule {}
