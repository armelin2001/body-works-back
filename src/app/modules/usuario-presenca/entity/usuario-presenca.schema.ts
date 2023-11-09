import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUsuarioPresenca } from "./usuario-presenca.interface";

@Schema({ collection: "usuario-presenca" })
export class UsuarioPresencaDB implements IUsuarioPresenca {
    @Prop({ required: true })
    idUsuario: string;

    @Prop({ required: true })
    dataInicio: Date;

    @Prop({ required: true })
    dataFim: Date;
}
export const UsuarioPresencaSchema =
    SchemaFactory.createForClass(UsuarioPresencaDB);

UsuarioPresencaSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
