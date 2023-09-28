import {
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";
import { IExercicio } from "../../exercicio/entity/exercicio.interface";
import { IFicha } from "../entity/ficha.interface";
import { ApiProperty } from "@nestjs/swagger";

export class FichaDto implements IFicha {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser uma string" })
    @IsOptional()
    @IsMongoId({ message: "O campo id deve ser um ObjectId válido" })
    id?: string;

    @ApiProperty()
    @IsString({ message: "O campo nome deve ser uma string" })
    @IsNotEmpty({ message: "O campo nome é obrigatório" })
    idInstutor: string;

    @ApiProperty()
    @IsString({ message: "O campo nome deve ser uma string" })
    @IsNotEmpty({ message: "O campo nome é obrigatório" })
    nome: string;

    @ApiProperty()
    @IsString({ message: "O campo nome deve ser uma string" })
    @IsNotEmpty({ message: "O campo nome é obrigatório" })
    descricao: string;

    @ApiProperty()
    exercicios: IExercicio[];
}
