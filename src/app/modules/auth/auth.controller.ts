import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./shared/local-auth.guard";
import { AuthService } from "./shared/auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() req) {
        return this.authService.login(req);
    }
}
