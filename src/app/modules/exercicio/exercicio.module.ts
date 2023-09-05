import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/utils/database/database.module";
import { ExercicioSchema } from "./entity/exercicio.schema";
import { ExercicioController } from "./exercicio.controller";
//import { UsuarioRepository } from "../usuario/usuario.repository";
import { ExercicioRepository } from "./exercicio.repository";
import { ExercicioService } from "./exercicio.service";

@Module({
    imports: [
        DataBaseModule.forFeature([
            { name: "Exercicio", schema: ExercicioSchema },
        ]),
    ],
    controllers: [ExercicioController],
    providers: [ExercicioRepository, ExercicioService],
})
export class ExercicioModule {}
