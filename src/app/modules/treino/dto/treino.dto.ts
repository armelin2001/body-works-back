import {
    IsArray,
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";
import { IExercicioTreino, ITreino } from "../entity/treino.interface";
import { ApiProperty } from "@nestjs/swagger";

export class TreinoDto implements ITreino {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser uma string" })
    @IsOptional()
    @IsMongoId({ message: "O campo id deve ser um ObjectId válido" })
    id?: string;

    @ApiProperty()
    @IsString({ message: "O campo idUsuario deve ser uma string" })
    @IsNotEmpty({ message: "O campo idUsuario é obrigatório" })
    idUsuario: string;

    @ApiProperty()
    @IsString({ message: "O campo idFicha deve ser uma string" })
    @IsNotEmpty({ message: "O campo idFicha é obrigatório" })
    idFicha: string;

    @ApiProperty()
    @IsDateString({ message: "O campo dataTreino deve ser uma string" })
    @IsNotEmpty({ message: "O campo dataTreino é obrigatório" })
    dataTreino: Date;

    @ApiProperty()
    @IsString({ message: "O campo comentario deve ser uma string" })
    @IsOptional()
    comentario?: string;

    @ApiProperty()
    @IsArray()
    exercicios: IExercicioTreino[];
}
export class ListagemTreino {
    @ApiProperty({
        example: [TreinoDto],
    })
    dados: TreinoDto[];

    @ApiProperty({
        example: 1,
    })
    quantidade: number;
}

export class TreinoNaoEncontradoDTO {
    @ApiProperty({
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        example: "Sem treinos para o usuario informado",
    })
    message: string;
}

export class TreinoComentarioNaoEncontradoDTO {
    @ApiProperty({
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        example: "Sem treinos para o usuario informado",
    })
    message: string;
}

export class ComentarioTreino {
    @ApiProperty({
        example: "64dabedafe76498bd825fa3d",
    })
    idTreino?: string;

    @ApiProperty({
        example: "64dabedafe76498bd825fa3d",
    })
    idUsuario?: string;

    @ApiProperty({
        example: "Treino pesado",
    })
    treinoNome?: string;

    @ApiProperty({
        example: "João",
    })
    usuarioNome?: string;

    @ApiProperty({
        example: "64dabedafe76498bd825fa3d",
    })
    idInstrutor?: string;

    @ApiProperty({
        example: "Comentarios do treino",
    })
    comentario: string;

    @ApiProperty({
        example: "2021-05-20T03:00:00.000Z",
    })
    dataTreino: Date;
}
