import { Module } from "@nestjs/common";
import { UsuarioAcademiaRepository } from "./usuario-academia.repository";
import { UsuarioAcademiaService } from "./usuario-academia.service";
import { UsuarioAcademiaController } from "./usuario-academia.controller";
import { UsuarioAcademiaSchema } from "./entity/usuario-academia.schema";
import { DataBaseModule } from "src/utils/database/database.module";
import { AcessoSchema } from "../acessos/entity/acesso.schema";
import { AcessoRepository } from "../acessos/acesso.repository";
import { AcessoService } from "../acessos/acesso.service";

@Module({
    imports: [
        DataBaseModule.forFeature([
            { name: "UsuarioAcademia", schema: UsuarioAcademiaSchema },
        ]),
        DataBaseModule.forFeature([{ name: "Acesso", schema: AcessoSchema }]),
    ],
    controllers: [UsuarioAcademiaController],
    providers: [
        UsuarioAcademiaRepository,
        UsuarioAcademiaService,
        AcessoRepository,
        AcessoService,
    ],
})
export class UsuarioAcademiaModule {}
