import { Module } from "@nestjs/common";
import { AcessoModule } from "../acessos/acesso.module";
import { AuthService } from "./shared/auth.service";
import { LocalStrategy } from "./shared/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./shared/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/utils/constants/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        AcessoModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "60000000000000s" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
