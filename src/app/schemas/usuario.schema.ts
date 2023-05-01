import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUsuario } from "../models/usuario.interface";
@Schema({ collection: "usuario" })
export class UsuarioSchemaDB implements IUsuario {
    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    senha: string;

    @Prop({ required: true })
    perfil: string;
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
