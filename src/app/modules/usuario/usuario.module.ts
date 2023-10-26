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
import { FichaService } from "../ficha/ficha.service";
import { FichaRepository } from "../ficha/ficha.repository";
import { HistoricoTreinoService } from "../historico-treino/historico-treino.service";
import { HistoricoTreinoRepository } from "../historico-treino/historico-treino.repository";
import { HistoricoTreinoSchema } from "../historico-treino/entity/historico-treino.schema";
import { FichaSchema } from "../ficha/entity/ficha.schema";

@Module({
    imports: [
        DataBaseModule.forFeature([{ name: "Usuario", schema: UsuarioSchema }]),
        DataBaseModule.forFeature([
            { name: "UsuarioAcademia", schema: UsuarioAcademiaSchema },
        ]),
        DataBaseModule.forFeature([{ name: "Acesso", schema: AcessoSchema }]),
        DataBaseModule.forFeature([
            {
                name: "HistoricoTreino",
                schema: HistoricoTreinoSchema,
            },
        ]),
        DataBaseModule.forFeature([
            {
                name: "Ficha",
                schema: FichaSchema,
            },
        ]),
    ],
    controllers: [UsuarioController],
    providers: [
        UsuarioRepository,
        UsuarioAcademiaRepository,
        UsuarioService,
        AcessoService,
        AcessoRepository,
        FichaService,
        FichaRepository,
        HistoricoTreinoService,
        HistoricoTreinoRepository,
    ],
})
export class UsuarioModule {}
