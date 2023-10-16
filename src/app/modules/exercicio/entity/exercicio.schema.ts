import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
    ExercicioDificuldade,
    ExercicioTipo,
    IExercicio,
} from "./exercicio.interface";

@Schema({ collection: "exercicio" })
export class ExercicioSchemaDB implements IExercicio {
    @Prop({ required: true })
    nome: string;
    @Prop({ required: true })
    descricao: string;
    @Prop({ required: true })
    tipoExercicio: ExercicioTipo;
    @Prop({ required: true })
    equipamentoNecessario: string;
    @Prop({ required: true })
    nivelDificuldade: ExercicioDificuldade;
    @Prop({ required: true })
    tempoRecomendado: number;
    @Prop({ required: true })
    videoDemonstrativo: string;
    @Prop({ required: true })
    instrucoesPassoAPasso: string;
    @Prop({ required: true })
    musculosTrabalhados: string;
    @Prop({ required: true })
    observacoes: string;
}

export const ExercicioSchema = SchemaFactory.createForClass(ExercicioSchemaDB);

ExercicioSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    },
});
