import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { IFicha } from "./entity/ficha.interface";
import { FichaDto } from "./dto/ficha.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class FichaRepository extends RepositoryAbstract<IFicha, FichaDto> {
    constructor(
        @InjectModel("Ficha")
        private readonly fichaModel: Model<IFicha>,
    ) {
        super(fichaModel);
    }
}
