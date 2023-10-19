import { Inject, Injectable } from "@nestjs/common";
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
        return await this.equipamentoRepository.atualizar(id, equipamento);
    }

    async obterPorId(id: string): Promise<IEquipamento> {
        return await this.equipamentoRepository.obterPorId(id);
    }

    async obterTodos(): Promise<{ dados: IEquipamento[]; quantidade: number }> {
        return await this.equipamentoRepository.obterTodos();
    }

    async remover(id: string): Promise<IEquipamento> {
        return await this.equipamentoRepository.remover(id);
    }
}
