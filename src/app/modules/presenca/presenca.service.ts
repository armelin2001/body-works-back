import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PresencaRepository } from "./presenca.repository";
import { PresencaDTO } from "./dto/presenca.dto";
import { IPresenca } from "./entity/presenca.interface";

@Injectable()
export class PresencaService {
    constructor(
        @Inject(PresencaRepository)
        private readonly presencaRepository: PresencaRepository,
    ) {}

    async cadastrar(presenca: PresencaDTO): Promise<IPresenca> {
        return await this.presencaRepository.criar(presenca);
    }

    async atualizar(presenca: PresencaDTO, id: string): Promise<IPresenca> {
        const presencaAtualizada = await this.presencaRepository.atualizar(
            id,
            presenca,
        );
        if (!presencaAtualizada) {
            throw new HttpException(
                "Presença não encontrada",
                HttpStatus.NOT_FOUND,
            );
        }
        return presencaAtualizada;
    }

    async obterPorId(id: string): Promise<IPresenca> {
        const presenca = await this.presencaRepository.obterPorId(id);
        if (!presenca) {
            throw new HttpException(
                "Presença não encontrada",
                HttpStatus.NOT_FOUND,
            );
        }
        return presenca;
    }

    async obterTodos(): Promise<{ dados: IPresenca[]; quantidade: number }> {
        return await this.presencaRepository.obterTodos();
    }
}
