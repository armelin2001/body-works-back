import { Controller, Get, Param, Post } from "@nestjs/common";
import { AcessoService } from "./acesso.service";
import { IAcesso } from "./entity/acesso.interface";

@Controller("acesso")
export class AcessoController {
    constructor(private readonly acessoService: AcessoService) {}

    @Get(":id")
    async obterPorId(@Param("id") id: string): Promise<IAcesso> {
        return await this.acessoService.obterPorId(id);
    }
}
