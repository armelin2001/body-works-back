import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EquipamentoTipo, IEquipamento } from "./equipamento.interface";

@Schema({ collection: "equipamento" })
export class EquipamentoSchemaDB implements IEquipamento{
    @Prop({ required: true })
    nome: string;
    @Prop({ required: true })
    tipo: EquipamentoTipo;
}

export const EquipamentoSchema = SchemaFactory.createForClass(EquipamentoSchemaDB);

EquipamentoSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    },
});