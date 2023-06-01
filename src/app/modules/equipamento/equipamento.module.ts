import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/utils/database/database.module";
import { EquipamentoSchema } from "./entity/equipamento.schema";
import { EquipamentoController } from "./equipamento.controller";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { EquipamentoRepository } from "./equipamento.repository";
import { EquipamentoService } from "./equipamento.service";

@Module({
    imports: [
        DataBaseModule.forFeature([
            { name: "Equipamento", schema: EquipamentoSchema },
        ]),
    ],
    controllers: [EquipamentoController],
    providers: [EquipamentoRepository, EquipamentoService],
})
export class EquipamentoModule {}
