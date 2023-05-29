import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";
import { EquipamentoTipo, IEquipamento } from "../entity/equipamento.interface";
import { ApiProperty } from "@nestjs/swagger";
import { TipoEquipamento } from "src/utils/constants/tipo-equipamento";

export class EquipamentoDTO implements IEquipamento{
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
    @IsString({ message: "O campo tipo deve ser uma string" })
    @IsEnum(TipoEquipamento, { message: "O tipo do equipamento deve ser válido" })
    tipo: EquipamentoTipo;

}