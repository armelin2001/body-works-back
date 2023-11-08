import { RolesAceso } from "src/utils/constants/roles-acesso";
import { IAcesso } from "../entity/acesso.interface";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsEnum,
    IsMongoId,
    IsOptional,
    IsString,
} from "@nestjs/class-validator";

export class AcessoDTO implements IAcesso {
    @ApiProperty()
    @IsString({ message: "O campo id deve ser do tipo string" })
    @IsMongoId({ message: "O campo id deve ser um id válido" })
    @IsOptional()
    id?: string;

    @ApiProperty()
    @IsString({ message: "O campo email deve ser do tipo string" })
    email: string;

    @ApiProperty()
    @IsString({ message: "O campo id role ser do tipo string" })
    @IsEnum(RolesAceso, { message: "O campo role deve ser um enum válido" })
    role: RolesAceso;

    @ApiProperty()
    @IsString({ message: "O campo senha deve ser do tipo string" })
    senha: string;
}
