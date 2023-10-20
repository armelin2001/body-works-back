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
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { FichaService } from "./ficha.service";
import { FichaDto } from "./dto/ficha.dto";
import { IFicha } from "./entity/ficha.interface";

@UseGuards(LocalAuthGuard)
@Controller("ficha")
export class FichaController {
    constructor(private readonly fichaService: FichaService) {}

    @Get()
    async obterTodos(): Promise<{ dados: IFicha[]; quantidade: number }> {
        return await this.fichaService.obterTodos();
    }

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<IFicha> {
        return await this.fichaService.obterPorId(id);
    }

    @Post()
    async cadastrar(@Body() ficha: FichaDto): Promise<IFicha> {
        return await this.fichaService.cadastrar(ficha);
    }

    @Patch(":id")
    async atualizar(
        @Body() ficha: FichaDto,
        @Param("id") id: string,
    ): Promise<IFicha> {
        return await this.fichaService.atualizar(ficha, id);
    }

    @Delete(":id")
    async remover(@Param("id") id: string): Promise<any> {
        return await this.fichaService.remover(id);
    }
}
