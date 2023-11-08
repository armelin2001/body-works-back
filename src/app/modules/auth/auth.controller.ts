import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./shared/auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @ApiResponse({
        status: 200,
        description: "Retorna um token",
        type: String,
    })
    async login(@Body() req) {
        return this.authService.login(req);
    }
}
