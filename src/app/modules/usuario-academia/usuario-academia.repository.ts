import { Injectable } from "@nestjs/common";
import { IUsuarioAcademia } from "src/app/modules/usuario-academia/entity/usuario-academia.interface";
import { UsuarioAcademiaDTO } from "./dto/usuario-academia.dto";
import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsuarioAcademiaRepository extends RepositoryAbstract<
    IUsuarioAcademia,
    UsuarioAcademiaDTO
> {
    constructor(
        @InjectModel("UsuarioAcademia")
        private readonly usuarioAcademiaModel: Model<IUsuarioAcademia>,
    ) {
        super(usuarioAcademiaModel);
    }

    async login(email: string, senha: string): Promise<IUsuarioAcademia> {
        const usuario = await this.usuarioAcademiaModel
            .findOne({
                email: email,
                senha: senha,
            })
            .exec();
        return usuario;
    }

    async procurarPorEmailJaCadastrado(
        email: string,
    ): Promise<IUsuarioAcademia> {
        const usuario = await this.usuarioAcademiaModel
            .findOne({
                email: email,
            })
            .exec();
        return usuario;
    }

    async procurarPorCpfJaCadastrado(cpf: string): Promise<IUsuarioAcademia> {
        const usuario = await this.usuarioAcademiaModel
            .findOne({
                cpf: cpf,
            })
            .exec();
        return usuario;
    }

    async procuraPorIdAcesso(idAcesso: string): Promise<IUsuarioAcademia> {
        return await this.usuarioAcademiaModel
            .findOne({
                idAcesso: idAcesso,
            })
            .exec();
    }
}
