import {
    IsBoolean,
    IsDateString,
    IsMongoId,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IUsuarioAcademia } from "src/app/modules/usuario-academia/entity/usuario-academia.interface";

export class UsuarioAcademiaDTO implements IUsuarioAcademia {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser uma string" })
    @IsOptional()
    @IsMongoId({ message: "O campo id deve ser um ObjectId válido" })
    id?: string;

    @ApiProperty()
    @IsString({ message: "O campo nome deve ser uma string" })
    nome: string;

    @ApiProperty()
    @IsString({ message: "O campo cpf deve ser uma string" })
    cpf: string;

    @ApiProperty()
    @IsString({ message: "O campo nome email ser uma string" })
    email: string;

    @ApiProperty()
    @IsString({ message: "O campo senha deve ser uma string" })
    senha: string;

    @ApiProperty()
    @IsString({ message: "O campo senha deve ser uma string" })
    @IsOptional()
    codigo?: string;

    @ApiProperty()
    @IsBoolean({ message: "O campo adm deve ser um booleano" })
    adm: boolean;

    @ApiProperty()
    @IsDateString({ message: "O campo dataNascimento deve ser uma data" })
    dataNascimento: Date;

    @ApiProperty()
    @IsString({ message: "O campo genero deve ser uma string" })
    genero: string;
}
export class ListagemUsuarioAcademia {
    @ApiProperty({
        example: [UsuarioAcademiaDTO],
    })
    dados: UsuarioAcademiaDTO[];

    @ApiProperty({
        example: 1,
    })
    quantidade: number;
}

export class UsuarioAcademiaNaoEncontrado {
    @ApiProperty({
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        example: "Usuário não encontrado",
    })
    message: string;
}

export class UsuarioAcademiaEmailJaCadastrado {
    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example: "Email já cadastrado",
    })
    message: string;
}

export class UsuarioAcademiaCpfJaCadastrado {
    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example: "CPF já cadastrado",
    })
    message: string;
}
export class UsuarioAcademiaCodigoInvalidoCadastrado {
    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example: "Código da academia inválido",
    })
    message: string;
}
