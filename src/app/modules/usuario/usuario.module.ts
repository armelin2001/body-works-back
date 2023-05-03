import { Module } from "@nestjs/common";
import { UsuarioSchema } from "src/app/schemas/usuario.schema";
import { DataBaseModule } from "src/database/database.module";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioService } from "./usuario.service";

@Module({
    imports: [
        DataBaseModule.forFeature([{ name: "Usuario", schema: UsuarioSchema }]),
    ],
    controllers: [UsuarioController],
    providers: [UsuarioRepository, UsuarioService],
})
export class UsuarioModule {}
