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
import {
    EquipamentoDTO,
    EquipamentoNaoEncontrado,
    ListagemEquipamentodDTO,
} from "./dto/equipamento.dto";
import { LocalAuthGuard } from "../auth/shared/local-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UnauthorizedDTO } from "../auth/dto/auth.dto";

@UseGuards(LocalAuthGuard)
@Controller("equipamento")
@ApiTags("Equipamento")
export class EquipamentoController {
    constructor(private readonly equipamentoService: EquipamentoService) {}

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um equipamento",
        type: EquipamentoDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Equipamento nao encontrado",
        type: EquipamentoNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<IEquipamento> {
        return await this.equipamentoService.obterPorId(id);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de equipamentos",
        type: ListagemEquipamentodDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async obterTodos(): Promise<{ dados: IEquipamento[]; quantidade: number }> {
        return await this.equipamentoService.obterTodos();
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna um equipamento criado",
        type: EquipamentoDTO,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async cadastrar(
        @Body() equipamento: EquipamentoDTO,
    ): Promise<IEquipamento> {
        return await this.equipamentoService.cadastrar(equipamento);
    }

    @Patch(":id")
    @Post()
    @ApiResponse({
        status: 200,
        description: "Retorna um equipamento atualizado",
        type: EquipamentoDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Equipamento nao encontrado",
        type: EquipamentoNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async atualizar(
        @Param("id") id: string,
        @Body() equipamento: EquipamentoDTO,
    ) {
        return await this.equipamentoService.atualizar(equipamento, id);
    }

    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um equipamento removido",
        type: EquipamentoDTO,
    })
    @ApiResponse({
        status: 404,
        description: "Equipamento nao encontrado",
        type: EquipamentoNaoEncontrado,
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
        type: UnauthorizedDTO,
    })
    async remover(@Param("id") id: string) {
        return await this.equipamentoService.remover(id);
    }
}
