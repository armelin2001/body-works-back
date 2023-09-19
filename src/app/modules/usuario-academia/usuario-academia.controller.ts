import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UsuarioAcademiaService } from "./usuario-academia.service";
import { IUsuarioAcademia } from "./entity/usuario-academia.interface";
import { UsuarioAcademiaDTO } from "./dto/usuario-academia.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";

@Controller("usuario-academia")
export class UsuarioAcademiaController {
    constructor(
        private readonly usuarioAcademiaService: UsuarioAcademiaService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Get()
    async obterTodos(): Promise<{
        dados: IUsuarioAcademia[];
        quantidade: number;
    }> {
        return await this.usuarioAcademiaService.obterTodos();
    }

    @UseGuards(LocalAuthGuard)
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

    @UseGuards(LocalAuthGuard)
    @Patch(":id")
    async atualizar(
        @Param("id") id: string,
        @Body() usuarioAcademia: UsuarioAcademiaDTO,
    ) {
        return await this.usuarioAcademiaService.atualizar(id, usuarioAcademia);
    }

    @UseGuards(LocalAuthGuard)
    @Delete(":id")
    async remover(@Param("id") id: string) {
        return await this.usuarioAcademiaService.remover(id);
    }
}
