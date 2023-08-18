import { Inject, Injectable } from "@nestjs/common";
import { AcessoRepository } from "./acesso.repository";
import { IAcesso } from "./entity/acesso.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AcessoService {
    constructor(
        @Inject(AcessoRepository)
        private readonly acessoRepository: AcessoRepository,
    ) {}

    async cadastrar(acesso: IAcesso): Promise<IAcesso> {
        const salt = process.env.HASH_SECRET;
        const hash = await bcrypt.hash(acesso.senha, salt);
        acesso.senha = hash;
        return await this.acessoRepository.criar(acesso);
    }

    async obterPorId(id: string): Promise<IAcesso> {
        return await this.acessoRepository.obterPorId(id);
    }

    async atualizar(acesso: IAcesso, id: string): Promise<IAcesso> {
        return await this.acessoRepository.atualizar(id, acesso);
    }
}
