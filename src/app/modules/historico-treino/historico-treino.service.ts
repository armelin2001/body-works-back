import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { HistoricoTreinoRepository } from "./historico-treino.repository";
import { IHistoricoTreino } from "./entity/historico-treino.interface";
import { HistoricoTreinoDTO } from "./dto/historico-treino.dto";

@Injectable()
export class HistoricoTreinoService {
    constructor(
        @Inject(HistoricoTreinoRepository)
        private readonly historicoTreinoRepository: HistoricoTreinoRepository,
    ) {}

    async cadastrar(
        historicoTreino: HistoricoTreinoDTO,
    ): Promise<IHistoricoTreino> {
        return await this.historicoTreinoRepository.criar(historicoTreino);
    }

    async atualizar(
        historicoTreino: HistoricoTreinoDTO,
        id: string,
    ): Promise<IHistoricoTreino> {
        return await this.historicoTreinoRepository.atualizar(
            id,
            historicoTreino,
        );
    }

    async obterPorId(id: string): Promise<IHistoricoTreino> {
        return await this.historicoTreinoRepository.obterPorId(id);
    }

    async obterTodos(): Promise<{
        dados: IHistoricoTreino[];
        quantidade: number;
    }> {
        return await this.historicoTreinoRepository.obterTodos();
    }

    async remover(id: string): Promise<any> {
        return await this.historicoTreinoRepository.remover(id);
    }

    async buscarHistoricoPorUsuario(
        idUsuario: string,
    ): Promise<IHistoricoTreino[]> {
        const historicos =
            await this.historicoTreinoRepository.buscarHistoricoPorUsuario(
                idUsuario,
            );
        if (!historicos.length) {
            throw new HttpException(
                "Sem registros para o usuario informado",
                HttpStatus.NOT_FOUND,
            );
        }
        return historicos;
    }

    async buscarHistoricoPorFichaEUsuario(
        idUsuario: string,
        idFicha: string,
    ): Promise<IHistoricoTreino[]> {
        const historicosUsuario =
            await this.historicoTreinoRepository.buscarHistoricoPorFichaEUsuario(
                idUsuario,
                idFicha,
            );
        if (!historicosUsuario.length) {
            throw new HttpException(
                "Sem registros para o usuario informado",
                HttpStatus.NOT_FOUND,
            );
        }
        return historicosUsuario;
    }
}
