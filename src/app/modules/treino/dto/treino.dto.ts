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
