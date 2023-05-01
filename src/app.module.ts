import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsuarioModule } from "./app/modules/usuario/usuario.module";
import { DataBaseModule } from "./database/database.module";

@Module({
    imports: [ConfigModule.forRoot(), UsuarioModule, DataBaseModule.forRoot()],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
