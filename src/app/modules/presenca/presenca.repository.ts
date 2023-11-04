import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { IPresenca } from "./entity/presenca.interface";
import { PresencaDTO } from "./dto/presenca.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class PresencaRepository extends RepositoryAbstract<
    IPresenca,
    PresencaDTO
> {
    constructor(
        @InjectModel("presenca")
        private readonly presencaModel: Model<IPresenca>,
    ) {
        super(presencaModel);
    }
}
