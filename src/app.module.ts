import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './app/modules/usuario/usuario.module';

@Module({
  imports: [ConfigModule.forRoot(), UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
