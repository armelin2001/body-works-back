import {
    IsMongoId,
    IsString,
    IsNotEmpty,
    IsDate,
    IsOptional,
    IsEnum,
} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IUsuario } from "src/app/modules/usuario/entity/usuario.interface";
import { StatusPagamento } from "src/utils/constants/status-pagamento";

export class UsuarioDTO implements IUsuario {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser uma string" })
    @IsOptional()
    @IsMongoId({ message: "O campo id deve ser um ObjectId válido" })
    id?: string;

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

    @ApiProperty()
    @IsEnum(StatusPagamento, {
        message: "O campo 'statusPagamento' é obrigatório",
    })
    @IsNotEmpty({ message: "O campo 'statusPagamento' é obrigatório" })
    statusPagamento: StatusPagamento;

    @ApiProperty()
    @IsString({ message: "O campo genero deve ser uma string" })
    @IsNotEmpty({ message: "O campo genero é obrigatório" })
    genero: string;

    @ApiProperty()
    @IsString({ message: "O campo cpf deve ser uma string" })
    @IsNotEmpty({ message: "O campo cpf é obrigatório" })
    cpf: string;

    @ApiProperty()
    @IsDate({ message: "O campo dataNascimento deve ser uma data" })
    @IsNotEmpty({ message: "O campo dataNascimento é obrigatório" })
    dataNascimento: Date;

    @ApiProperty()
    peso: string;

    @ApiProperty()
    altura: string;

    @ApiProperty()
    idFicha: string;
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

    @ApiProperty()
    @IsString({ message: "O campo 'statusPagamento' deve ser uma string" })
    @IsNotEmpty({ message: "O campo 'statusPagamento' é obrigatório" })
    statusPagamento: string;
}

export class UsuarioFichaDto {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser uma string" })
    @IsNotEmpty({ message: "O campo id é obrigatório" })
    id: string;

    @ApiProperty()
    @IsString({ message: "O campo idFicha deve ser uma string" })
    @IsNotEmpty({ message: "O campo idFicha é obrigatório" })
    idFicha: string;
}

export class ListaUsuarioDto {
    @ApiProperty({
        example: [UsuarioDTO],
    })
    dados: UsuarioDTO[];

    @ApiProperty({
        example: 1,
    })
    quantidade: number;
}
export class UsuarioComEmailCadastrado {
    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example: "Email já cadastrado",
    })
    message: string;
}
export class UsuarioComCpfCadastrado {
    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example: "CPF já cadastrado",
    })
    message: string;
}
export class UsuarioNaoEncontrado {
    @ApiProperty({
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        example: "Usuário não encontrado",
    })
    message: string;
}
export class FichaUsuarioNaoEncontrada {
    @ApiProperty({
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        example: "Ficha não encontrada",
    })
    message: string;
}

export class LoginInvalido {
    @ApiProperty({
        example: 401,
    })
    statusCode: number;

    @ApiProperty({
        example: "Email ou senha inválidos",
    })
    message: string;
}

export class UsuarioInvalido {
    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example:
            "Usuário cancelado. Entre em contato com um supervisor da academia",
    })
    message: string;
}
