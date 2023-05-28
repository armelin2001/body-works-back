import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UsuarioAcademiaService } from "./usuario-academia.service";
import { IUsuarioAcademia } from "./entity/usuario-academia.interface";
import { UsuarioAcademiaDTO } from "./dto/usuario-academia.dto";

@Controller("usuario-academia")
export class UsuarioAcademiaController {
    constructor(
        private readonly usuarioAcademiaService: UsuarioAcademiaService,
    ) {}

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<IUsuarioAcademia> {
        return await this.usuarioAcademiaService.obterPorId(id);
    }

    @Post()
    async cadastrar(
        @Body() usuarioAcademia: IUsuarioAcademia,
    ): Promise<IUsuarioAcademia> {
        return await this.usuarioAcademiaService.criar(usuarioAcademia);
    }

    @Patch(":id")
    async atualizar(
        @Param("id") id: string,
        @Body() usuarioAcademia: UsuarioAcademiaDTO,
    ) {
        return await this.usuarioAcademiaService.atualizar(id, usuarioAcademia);
    }
}
