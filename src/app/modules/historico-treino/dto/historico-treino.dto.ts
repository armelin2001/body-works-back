import {
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";
import { IFicha, TipoTreino } from "../../ficha/entity/ficha.interface";
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
    @IsOptional()
    tipoAtual?: TipoTreino;

    @ApiProperty()
    @IsOptional()
    @IsObject()
    ficha?: IFicha;

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

export class ListagemHistoricoTreinoDTO {
    @ApiProperty({
        example: [HistoricoTreinoDTO],
    })
    dados: HistoricoTreinoDTO[];

    @ApiProperty({
        example: 1,
    })
    quantidade: number;
}

export class HistoricoTreinoNaoEncontrado {
    @ApiProperty({
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        example: "HistoricoTreino não encontrado",
    })
    message: string;
}

export class HistoricoNaoEncontradoUsuario {
    @ApiProperty({
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        example: "Sem historico para o usuario informado",
    })
    message: string;
}
