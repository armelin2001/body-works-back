import { Module } from "@nestjs/common";
import { UsuarioSchema } from "src/app/modules/usuario/entity/usuario.schema";
import { DataBaseModule } from "src/utils/database/database.module";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioService } from "./usuario.service";
import { UsuarioAcademiaRepository } from "../usuario-academia/usuario-academia.repository";
import { UsuarioAcademiaSchema } from "../usuario-academia/entity/usuario-academia.schema";
import { AcessoSchema } from "../acessos/entity/acesso.schema";
import { AcessoRepository } from "../acessos/acesso.repository";
import { AcessoService } from "../acessos/acesso.service";

@Module({
    imports: [
        DataBaseModule.forFeature([{ name: "Usuario", schema: UsuarioSchema }]),
        DataBaseModule.forFeature([
            { name: "UsuarioAcademia", schema: UsuarioAcademiaSchema },
        ]),
        DataBaseModule.forFeature([{ name: "Acesso", schema: AcessoSchema }]),
    ],
    controllers: [UsuarioController],
    providers: [
        UsuarioRepository,
        UsuarioAcademiaRepository,
        UsuarioService,
        AcessoService,
        AcessoRepository,
    ],
})
export class UsuarioModule {}
