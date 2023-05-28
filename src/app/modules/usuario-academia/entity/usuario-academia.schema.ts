import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUsuarioAcademia } from "./usuario-academia.interface";

@Schema({ collection: "usuario-academia", timestamps: true })
export class UsuarioAcademiaSchemaDB implements IUsuarioAcademia {
    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    cpf: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    senha: string;

    @Prop({ required: false })
    codigo?: string;

    @Prop({ required: true })
    adm: boolean;
}

export const UsuarioAcademiaSchema = SchemaFactory.createForClass(
    UsuarioAcademiaSchemaDB,
);

UsuarioAcademiaSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
        delete ret.senha;
    },
});
