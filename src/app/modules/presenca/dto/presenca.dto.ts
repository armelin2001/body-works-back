import {
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";
import { IPresenca } from "../entity/presenca.interface";
import { ApiProperty } from "@nestjs/swagger";

export class PresencaDTO implements IPresenca {
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
    @IsDateString({ message: "O campo dataInicio deve ser uma string" })
    @IsNotEmpty({ message: "O campo dataInicio é obrigatório" })
    dataInicio: Date;

    @ApiProperty()
    @IsDateString({ message: "O campo dataFim deve ser uma string" })
    dataFim?: Date;
}
