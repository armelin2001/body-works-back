import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUsuario } from "./usuario.interface";
import { StatusPagamento } from "src/utils/constants/status-pagamento";
@Schema({ collection: "usuario", timestamps: true })
export class UsuarioSchemaDB implements IUsuario {
    @Prop({ required: true })
    nome: string;

    @Prop({ required: false })
    email: string;

    @Prop({ required: false })
    senha?: string;

    @Prop({ required: true })
    perfil: string;

    @Prop({ required: true })
    genero: string;

    @Prop({ required: true })
    statusPagamento: StatusPagamento;

    @Prop({ required: true })
    cpf: string;

    @Prop({ required: true })
    dataNascimento: Date;

    @Prop({ required: false })
    altura: string;

    @Prop({ required: false })
    peso: string;

    @Prop({ required: true })
    idAcesso: string;

    @Prop({ required: false })
    idFicha: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(UsuarioSchemaDB);

UsuarioSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
        delete ret.senha;
    },
});
