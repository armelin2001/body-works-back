import { IsNumber, IsString } from "@nestjs/class-validator";
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
