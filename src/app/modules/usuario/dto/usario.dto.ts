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
