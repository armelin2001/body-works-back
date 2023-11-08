import { Controller, Get, Param, Post } from "@nestjs/common";
import { AcessoService } from "./acesso.service";
import { IAcesso } from "./entity/acesso.interface";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AcessoDTO } from "./dto/acesso.dto";

@Controller("acesso")
@ApiTags("Acesso")
export class AcessoController {
    constructor(private readonly acessoService: AcessoService) {}

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Retorna um acesso",
        type: AcessoDTO,
    })
    async obterPorId(@Param("id") id: string): Promise<IAcesso> {
        return await this.acessoService.obterPorId(id);
    }
}
