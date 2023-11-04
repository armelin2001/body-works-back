import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { PresencaService } from "./presenca.service";
import { PresencaDTO } from "./dto/presenca.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";

@UseGuards(LocalAuthGuard)
@Controller("presenca")
export class PresencaController {
    constructor(private readonly presencaService: PresencaService) {}

    @Get()
    async obterTodos(): Promise<{ dados: any[]; quantidade: number }> {
        return await this.presencaService.obterTodos();
    }

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<any> {
        return await this.presencaService.obterPorId(id);
    }

    @Patch(":id")
    async atualizar(
        @Param("id")
        id: string,
        @Body()
        presenca: PresencaDTO,
    ) {
        return await this.presencaService.atualizar(presenca, id);
    }

    @Post()
    async cadastrar(@Body() presenca: PresencaDTO) {
        return await this.presencaService.cadastrar(presenca);
    }
}
