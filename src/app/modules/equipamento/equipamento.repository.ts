import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { IEquipamento } from "./entity/equipamento.interface";
import { EquipamentoDTO } from "./dto/equipamento.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class EquipamentoRepository extends RepositoryAbstract<
    IEquipamento,
    EquipamentoDTO
>{
    constructor(
        @InjectModel("Equipamento")
        private readonly equipamentoModel: Model<IEquipamento>,
    ){
        super(equipamentoModel);
    }
}