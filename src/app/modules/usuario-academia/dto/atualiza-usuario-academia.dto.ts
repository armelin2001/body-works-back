import { PartialType } from "@nestjs/swagger";
import { UsuarioAcademiaDTO } from "./usuario-academia.dto";

export class AtualizaUsuarioAcademiaDTO extends PartialType(
    UsuarioAcademiaDTO,
) {}
