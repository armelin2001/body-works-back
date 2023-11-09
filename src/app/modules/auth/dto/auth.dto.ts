import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UnauthorizedDTO {
    @ApiProperty({
        example: 401,
    })
    @IsNumber()
    statusCode: number;

    @ApiProperty({
        example: "Unauthorized",
    })
    @IsString()
    message: string;
}

export class TokenUsuario {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    })
    access_token: string;
}

export class LoginToken {
    @ApiProperty()
    @IsString({ message: "O campo email deve ser uma string" })
    @IsNotEmpty({ message: "O campo email é obrigatório" })
    email: string;

    @ApiProperty()
    @IsString({ message: "O campo senha deve ser uma string" })
    @IsNotEmpty({ message: "O campo senha é obrigatório" })
    senha: string;
}

export class UsuarioInvalido {
    @ApiProperty({
        example: 401,
    })
    statusCode: number;

    @ApiProperty({
        example: "Usuário ou senha inválidos",
    })
    message: string;
}
