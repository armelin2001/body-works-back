import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IAcesso } from "./acesso.interface";
import { RolesAceso } from "src/utils/constants/roles-acesso";
import { UsuarioSchema } from "../../usuario/entity/usuario.schema";

@Schema({ collection: "acesso", timestamps: true })
export class AcessoSchemaDB implements IAcesso {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    senha: string;

    @Prop({ required: true })
    role: RolesAceso;
}

export const AcessoSchema = SchemaFactory.createForClass(AcessoSchemaDB);

UsuarioSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
        delete ret.senha;
    },
});
