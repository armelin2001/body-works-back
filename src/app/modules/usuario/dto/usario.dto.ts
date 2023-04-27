import { IsMongoId, IsString, IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IUsuario } from "src/app/models/usuario.interface";

export class UsuarioDTO implements IUsuario {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser uma string" })
    @IsMongoId({ message: "O campo id deve ser um ObjectId válido" })
    id:string;

    @ApiProperty()
    @IsString({ message: "O campo nome deve ser uma string" })
    @IsNotEmpty({ message: "O campo nome é obrigatório" })
    nome: string;
    
    @ApiProperty()
    @IsString({ message: "O campo email deve ser uma string" })
    @IsNotEmpty({ message: "O campo email é obrigatório" })
    email: string;
    
    @ApiProperty()
    @IsString({ message: "O campo senha deve ser uma string" })
    @IsNotEmpty({ message: "O campo senha é obrigatório" })
    senha: string;
    
    @ApiProperty()
    @IsString({ message: "O campo perfil deve ser uma string" })
    @IsNotEmpty({ message: "O campo perfil é obrigatório" })
    perfil: string;
}

export class LoginDTO {
    @ApiProperty()
    @IsString({ message: "O campo email deve ser uma string" })
    @IsNotEmpty({ message: "O campo email é obrigatório" })
    email: string;
    
    @ApiProperty()
    @IsString({ message: "O campo senha deve ser uma string" })
    @IsNotEmpty({ message: "O campo senha é obrigatório" })
    senha: string;
}
