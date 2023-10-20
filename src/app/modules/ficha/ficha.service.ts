import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
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
        const fichaAtualizada = await this.fichaRepository.atualizar(id, ficha);
        if (!fichaAtualizada) {
            throw new HttpException(
                "Ficha não encontrada",
                HttpStatus.NOT_FOUND,
            );
        }
        return fichaAtualizada;
    }

    async obterPorId(id: string): Promise<IFicha> {
        const ficha = await this.fichaRepository.obterPorId(id);
        if (!ficha) {
            throw new HttpException(
                "Ficha não encontrada",
                HttpStatus.NOT_FOUND,
            );
        }
        return ficha;
    }

    async obterTodos(): Promise<{ dados: IFicha[]; quantidade: number }> {
        return await this.fichaRepository.obterTodos();
    }

    async remover(id: string): Promise<any> {
        return await this.fichaRepository.remover(id);
    }

    async obterFichasPorInstrutor(idInstrutor: string): Promise<IFicha[]> {
        const fichasInstrutor =
            await this.fichaRepository.buscaFichasPorIdInstrutor(idInstrutor);

        if (!fichasInstrutor.length) {
            throw new HttpException(
                "Fichas não encontradas para o instrutor informado",
                HttpStatus.NOT_FOUND,
            );
        }

        return fichasInstrutor;
    }
}
