import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IPresenca } from "./presenca.interface";

@Schema({ collection: "presenca" })
export class PresencaDB implements IPresenca {
    @Prop({ required: true })
    idUsuario: string;

    @Prop({ required: true })
    dataInicio: Date;

    @Prop({ required: false })
    dataFim?: Date;
}

export const PresencaSchema = SchemaFactory.createForClass(PresencaDB);

PresencaSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    },
});
