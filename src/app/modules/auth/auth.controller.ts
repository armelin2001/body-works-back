import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./shared/auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginToken, TokenUsuario, UsuarioInvalido } from "./dto/auth.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @ApiResponse({
        status: 200,
        description: "Retorna um token",
        type: TokenUsuario,
    })
    @ApiResponse({
        status: 404,
        description: "Usuario invalido",
        type: UsuarioInvalido,
    })
    async login(@Body() req: LoginToken) {
        return this.authService.login(req);
    }
}
