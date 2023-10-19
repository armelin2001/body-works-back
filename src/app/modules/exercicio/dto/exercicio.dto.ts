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
    @IsString({ message: "O campo descricao deve ser uma string" })
    @IsNotEmpty({ message: "O campo descricao é obrigatório" })
    descricao: string;

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
    @IsInt({ message: "O campo tempoRecomendado deve ser um number" })
    @IsNotEmpty({ message: "O campo tempoRecomendado é obrigatório" })
    tempoRecomendado: number;

    @ApiProperty()
    @IsString({ message: "O campo videoDemonstrativo deve ser uma string" })
    @IsNotEmpty({ message: "O campo videoDemonstrativo é obrigatório" })
    videoDemonstrativo: string;

    @ApiProperty()
    @IsString({ message: "O campo instrucoesPassoAPasso deve ser uma string" })
    @IsNotEmpty({ message: "O campo instrucoesPassoAPasso é obrigatório" })
    instrucoesPassoAPasso: string;

    @ApiProperty()
    @IsString({ message: "O campo musculosTrabalhados deve ser uma string" })
    @IsNotEmpty({ message: "O campo musculosTrabalhados é obrigatório" })
    musculosTrabalhados: string;

    @ApiProperty()
    @IsString({ message: "O campo observacoes deve ser uma string" })
    @IsNotEmpty({ message: "O campo observacoes é obrigatório" })
    observacoes: string;
}
