import { Inject, Injectable } from "@nestjs/common";
import { FichaRepository } from "./ficha.repository";
import { IFicha } from "./entity/ficha.interface";

@Injectable()
export class FichaService {
    constructor(
        @Inject(FichaRepository)
        private readonly fichaRepository: FichaRepository,
    ) {}

    async cadastrar(ficha: IFicha): Promise<IFicha> {
        return await this.fichaRepository.criar(ficha);
    }

    async atualizar(ficha: IFicha, id: string): Promise<IFicha> {
        return await this.fichaRepository.atualizar(id, ficha);
    }

    async obterPorId(id: string): Promise<IFicha> {
        return await this.fichaRepository.obterPorId(id);
    }

    async obterTodos(): Promise<{ dados: IFicha[]; quantidade: number }> {
        return await this.fichaRepository.obterTodos();
    }

    async remover(id: string): Promise<any> {
        return await this.fichaRepository.remover(id);
    }
}
