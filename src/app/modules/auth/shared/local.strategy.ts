import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";
import { UnauthorizedException } from "@nestjs/common";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: "email", passwordField: "senha" });
    }

    async validate(email: string, senha: string): Promise<any> {
        const user = await this.authService.validateUser(email, senha);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
