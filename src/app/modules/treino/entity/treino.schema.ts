import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IExercicioTreino, ITreino } from "./treino.interface";

@Schema({ collection: "treino" })
export class TreinoSchemaDB implements ITreino {
    @Prop({ required: true })
    idUsuario: string;

    @Prop({ required: true })
    idFicha: string;

    @Prop({ required: true })
    dataTreino: Date;

    @Prop({ required: false })
    comentario?: string;

    @Prop({ required: true })
    exercicios: IExercicioTreino[];
}

export const TreinoSchema = SchemaFactory.createForClass(TreinoSchemaDB);

TreinoSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    },
});
