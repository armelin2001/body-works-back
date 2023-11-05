import {
    IsEnum,
    IsInt,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";
import {
    ExercicioDificuldade,
    ExercicioTipo,
    IExercicio,
} from "../entity/exercicio.interface";
import { ApiProperty } from "@nestjs/swagger";
import {
    DificuldadeExercicio,
    TipoExercicio,
} from "src/utils/constants/exercicio";

export class ExercicioDTO implements IExercicio {
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
    @IsString({ message: "O campo nivelDificuldade deve ser uma string" })
    @IsEnum(TipoExercicio, {
        message: "O nivelDificuldade do equipamento deve ser válido",
    })
    tipoExercicio: ExercicioTipo;

    @ApiProperty()
    @IsString({ message: "O campo equipamentoNecessario deve ser uma string" })
    @IsNotEmpty({ message: "O campo equipamentoNecessario é obrigatório" })
    equipamentoNecessario: string;

    @ApiProperty()
    @IsString({ message: "O campo nivelDificuldade deve ser uma string" })
    @IsEnum(DificuldadeExercicio, {
        message: "O nivelDificuldade do equipamento deve ser válido",
    })
    nivelDificuldade: ExercicioDificuldade;

    @ApiProperty()
    @IsString({ message: "O campo videoDemonstrativo deve ser uma string" })
    @IsNotEmpty({ message: "O campo videoDemonstrativo é obrigatório" })
    videoDemonstrativo: string;

    @ApiProperty()
    @IsString({ message: "O campo musculosTrabalhados deve ser uma string" })
    @IsNotEmpty({ message: "O campo musculosTrabalhados é obrigatório" })
    musculosTrabalhados: string;

}
