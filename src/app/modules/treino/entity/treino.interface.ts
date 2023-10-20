import { IExercicio } from "../../exercicio/entity/exercicio.interface";

// verificar necessidade de novos campos
export interface ITreino {
    id?: string;
    idUsuario: string;
    idFicha: string;
    dataTreino: Date;
    comentario?: string;
    exercicios: IExercicioTreino[];
}

export interface IExercicioTreino extends IExercicio {
    series: number;
    repeticoes: number[];
    carga: number[];
    tempoDescanso: number;
    observacoes: string;
}

export interface IComentarioTreino {
    idTreino: string;
    idUsuario: string;
    idInstrutor?: string;
    comentario: string;
    dataTreino: Date;
}
