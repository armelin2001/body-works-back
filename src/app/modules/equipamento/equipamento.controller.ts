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
import { EquipamentoService } from "./equipamento.service";
import { IEquipamento } from "./entity/equipamento.interface";
import { EquipamentoDTO } from "./dto/equipamento.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";

@UseGuards(LocalAuthGuard)
@Controller("equipamento")
export class EquipamentoController {
    constructor(private readonly equipamentoService: EquipamentoService) {}

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<IEquipamento> {
        return await this.equipamentoService.obterPorId(id);
    }

    @Get()
    async obterTodos(): Promise<{ dados: IEquipamento[]; quantidade: number }> {
        return await this.equipamentoService.obterTodos();
    }

    @Post()
    async cadastrar(@Body() equipamento: IEquipamento): Promise<IEquipamento> {
        return await this.equipamentoService.cadastrar(equipamento);
    }

    @Patch(":id")
    async atualizar(
        @Param("id") id: string,
        @Body() equipamento: EquipamentoDTO,
    ) {
        return await this.equipamentoService.atualizar(equipamento, id);
    }

    @Delete(":id")
    async remover(@Param("id") id: string) {
        return await this.equipamentoService.remover(id);
    }
}
