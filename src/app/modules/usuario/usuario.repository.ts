import { Injectable } from "@nestjs/common";
import { IUsuario } from "src/app/modules/usuario/entity/usuario.interface";
import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { UsuarioDTO } from "./dto/usario.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsuarioRepository extends RepositoryAbstract<
    IUsuario,
    UsuarioDTO
> {
    constructor(
        @InjectModel("Usuario")
        private readonly usuarioModel: Model<IUsuario>,
    ) {
        super(usuarioModel);
    }

    // Recuperar todos os usuários para listagem e update em statusPagamento
    async obterTodos(): Promise<{ dados: IUsuario[]; quantidade: number }> {
        const usuarios = await this.usuarioModel.find().exec();
        return {
            dados: usuarios,
            quantidade: usuarios.length,
        };
    }

    async atualizarStatusPagamento(
        id: string,
        statusPagamento: string,
    ): Promise<IUsuario> {
        return await this.usuarioModel
            .findByIdAndUpdate(id, { statusPagamento }, { new: true })
            .exec();
    }

    async login(email: string, senha: string): Promise<IUsuario> {
        const usuario = await this.usuarioModel
            .findOne({
                email: email,
                senha: senha,
            })
            .exec();
        return usuario;
    }

    async procurarPorEmailJaCadastrado(email: string): Promise<IUsuario> {
        const usuario = await this.usuarioModel
            .findOne({
                email: email,
            })
            .exec();
        return usuario;
    }

    async procurarPorCpfJaCadastrado(cpf: string): Promise<IUsuario> {
        const usuario = await this.usuarioModel
            .findOne({
                cpf: cpf,
            })
            .exec();
        return usuario;
    }

    async procuraPorIdAcesso(idAcesso: string): Promise<IUsuario> {
        return await this.usuarioModel
            .findOne({
                idAcesso: idAcesso,
            })
            .exec();
    }
}
