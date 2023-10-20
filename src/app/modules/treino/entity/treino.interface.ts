import { IExercicio } from "../../exercicio/entity/exercicio.interface";

// verificar necessidade de novos campos
export interface ITreino {
    id?: string;
    idUsuario: string;
    idFicha: string;
    dataTreino: Date;
    exercicios: IExercicioTreino[];
}

export interface IExercicioTreino extends IExercicio {
    series: number;
    repeticoes: number[];
    carga: number[];
    tempoDescanso: number;
    observacoes: string;
}
