import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TipoTreino } from "../../ficha/entity/ficha.interface";
import { IHistoricoTreino } from "./historico-treino.interface";

@Schema({ collection: "HistoricoTreino" })
export class IHistoricoTreinoDB implements IHistoricoTreino {
    @Prop({ required: true })
    qtdAtualTreino: number;

    @Prop({ required: true })
    tipoAtual: TipoTreino;

    @Prop({ required: true })
    idFichaTreino: string;

    @Prop({ required: true })
    idUsuario: string;

    @Prop({ required: true })
    dataTreino: Date;

    @Prop({ required: false })
    idTreino?: string;
}

export const HistoricoTreinoSchema =
    SchemaFactory.createForClass(IHistoricoTreinoDB);

HistoricoTreinoSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    },
});
