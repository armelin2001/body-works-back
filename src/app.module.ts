import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsuarioModule } from "./app/modules/usuario/usuario.module";
import { DataBaseModule } from "./utils/database/database.module";
import { UsuarioAcademiaModule } from "./app/modules/usuario-academia/usuario-academia.module";
import { EquipamentoModule } from "./app/modules/equipamento/equipamento.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsuarioModule,
        UsuarioAcademiaModule,
        EquipamentoModule,
        DataBaseModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
