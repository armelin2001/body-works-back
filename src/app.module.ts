import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsuarioModule } from "./app/modules/usuario/usuario.module";
import { DataBaseModule } from "./utils/database/database.module";
import { UsuarioAcademiaModule } from "./app/modules/usuario-academia/usuario-academia.module";
import { EquipamentoModule } from "./app/modules/equipamento/equipamento.module";
import { ExercicioModule } from "./app/modules/exercicio/exercicio.module";
import { AuthModule } from "./app/modules/auth/auth.moduele";
import { FichaModule } from "./app/modules/ficha/ficha.module";
import { HistoricoTreinoModule } from "./app/modules/historico-treino/historico-treino.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsuarioModule,
        UsuarioAcademiaModule,
        FichaModule,
        EquipamentoModule,
        ExercicioModule,
        HistoricoTreinoModule,
        AuthModule,
        DataBaseModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
