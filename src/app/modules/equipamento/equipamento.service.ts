import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EquipamentoRepository } from "./equipamento.repository";
import { IEquipamento } from "./entity/equipamento.interface";
import { EquipamentoDTO } from "./dto/equipamento.dto";

@Injectable()
export class EquipamentoService {
    constructor(
        @Inject(EquipamentoRepository)
        private readonly equipamentoRepository: EquipamentoRepository,
    ) {}

    async cadastrar(equipamento: EquipamentoDTO): Promise<IEquipamento> {
        return await this.equipamentoRepository.criar(equipamento);
    }

    async atualizar(
        equipamento: EquipamentoDTO,
        id: string,
    ): Promise<IEquipamento> {
        const equipamentoAtualizado =
            await this.equipamentoRepository.atualizar(id, equipamento);
        if (!equipamentoAtualizado) {
            throw new HttpException(
                "Equipamento não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        return equipamentoAtualizado;
    }

    async obterPorId(id: string): Promise<IEquipamento> {
        return await this.equipamentoRepository.obterPorId(id);
    }

    async obterTodos(): Promise<{ dados: IEquipamento[]; quantidade: number }> {
        return await this.equipamentoRepository.obterTodos();
    }

    async remover(id: string): Promise<IEquipamento> {
        const equipamentoRemovido = await this.equipamentoRepository.remover(
            id,
        );
        if (!equipamentoRemovido) {
            throw new HttpException(
                "Equipamento não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        return equipamentoRemovido;
    }
}
