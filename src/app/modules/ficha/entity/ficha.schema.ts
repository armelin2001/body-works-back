import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IExercicio } from "../../exercicio/entity/exercicio.interface";
import { IFicha } from "./ficha.interface";

export class FichaSchemaDB implements IFicha {
    @Prop({ required: true })
    idInstutor: string;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    descricao: string;

    @Prop({ required: true })
    exercicios: IExercicio[];
}

export const FichaSchema = SchemaFactory.createForClass(FichaSchemaDB);

FichaSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    },
});
