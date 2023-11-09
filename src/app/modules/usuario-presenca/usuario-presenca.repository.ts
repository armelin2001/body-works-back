import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { IUsuarioPresenca } from "./entity/usuario-presenca.interface";
import { UsuarioPresencaDTO } from "./dto/usario-presenca.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class UsuarioPresencaRepository extends RepositoryAbstract<
    IUsuarioPresenca,
    UsuarioPresencaDTO
> {
    constructor(
        @InjectModel("UsuarioPresenca")
        private readonly usuarioPresencaModel: Model<IUsuarioPresenca>,
    ) {
        super(usuarioPresencaModel);
    }
}
