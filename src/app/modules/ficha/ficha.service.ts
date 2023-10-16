import { Inject, Injectable } from "@nestjs/common";
import { FichaRepository } from "./ficha.repository";
import { IFicha } from "./entity/ficha.interface";
import { FichaDto } from "./dto/ficha.dto";

@Injectable()
export class FichaService {
    constructor(
        @Inject(FichaRepository)
        private readonly fichaRepository: FichaRepository,
    ) {}

    async cadastrar(ficha: FichaDto): Promise<IFicha> {
        return await this.fichaRepository.criar(ficha);
    }

    async atualizar(ficha: FichaDto, id: string): Promise<IFicha> {
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
