import { IExercicioTreino, ITreino } from "../entity/treino.interface";

export class TreinoDto implements ITreino {
    id?: string;
    idUsuario: string;
    idFicha: string;
    dataTreino: Date;
    comentario?: string;
    exercicios: IExercicioTreino[];
}
