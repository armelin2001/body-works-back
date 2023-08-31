import { Model } from "mongoose";
import { IAcesso } from "./entity/acesso.interface";
import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { AcessoDTO } from "./dto/acesso.dto";
import { InjectModel } from "@nestjs/mongoose";

export class AcessoRepository extends RepositoryAbstract<IAcesso, AcessoDTO> {
    constructor(
        @InjectModel("Acesso")
        private readonly acessoModel: Model<IAcesso>,
    ) {
        super(acessoModel);
    }

    async procuraAcesso(email: string, senha: string) {
        const acesso = await this.acessoModel
            .findOne({
                email: email,
                senha: senha,
            })
            .exec();
        return acesso;
    }

    async procuraEmailCadastrado(email: string) {
        const acesso = await this.acessoModel
            .findOne({
                email: email,
            })
            .exec();
        return acesso;
    }
}
