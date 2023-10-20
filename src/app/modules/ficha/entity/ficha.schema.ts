import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IExercicioFicha, IFicha, TipoTreino } from "./ficha.interface";

@Schema({ collection: "ficha" })
export class FichaSchemaDB implements IFicha {
    @Prop({ required: true })
    idInstrutor: string;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    qtdTreino: number;

    @Prop({ required: false })
    descricao?: string;

    @Prop({ required: true })
    tiposGrupamento: TipoTreino[];

    @Prop({ required: true })
    exercicios: IExercicioFicha[];
}

export const FichaSchema = SchemaFactory.createForClass(FichaSchemaDB);

FichaSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    },
});
