import {
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";
import { TipoTreino } from "../../ficha/entity/ficha.interface";
import { IHistoricoTreino } from "../entity/historico-treino.interface";
import { ApiProperty } from "@nestjs/swagger";

export class HistoricoTreinoDTO implements IHistoricoTreino {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser uma string" })
    @IsOptional()
    @IsMongoId({ message: "O campo id deve ser um ObjectId válido" })
    id?: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: "O campo qtdAtualTreino é obrigatório" })
    qtdAtualTreino: number;

    @ApiProperty()
    @IsString({ message: "O campo tipoAtual deve ser uma string" })
    @IsNotEmpty({ message: "O campo tipoAtual é obrigatório" })
    tipoAtual: TipoTreino;

    @ApiProperty()
    @IsString({ message: "O campo idFichaTreino deve ser uma string" })
    @IsNotEmpty({ message: "O campo idFichaTreino é obrigatório" })
    idFichaTreino: string;

    @ApiProperty()
    @IsString({ message: "O campo idUsuario deve ser uma string" })
    @IsNotEmpty({ message: "O campo idUsuario é obrigatório" })
    idUsuario: string;

    @ApiProperty()
    @IsDateString({ message: "O campo dataTreino deve ser uma string" })
    @IsNotEmpty({ message: "O campo dataTreino é obrigatório" })
    dataTreino: Date;

    @ApiProperty()
    @IsString({ message: "O campo idTreino deve ser uma string" })
    @IsOptional()
    @IsNotEmpty({ message: "O campo idTreino é obrigatório" })
    idTreino?: string;
}
