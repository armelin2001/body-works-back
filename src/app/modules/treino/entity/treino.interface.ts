// verificar necessidade de novos campos
export interface ITreino {
    id?: string;
    idUsuario: string;
    idFicha: string;
    dataTreino: Date;
    comentario?: string;
    exercicios: IExercicioTreino[];
}

export interface IExercicioTreino {
    idExercicio: string;
    series: number;
    repeticoes: number[];
    carga: number[];
}

export interface IComentarioTreino {
    idTreino: string;
    idUsuario: string;
    idInstrutor?: string;
    comentario: string;
    dataTreino: Date;
}
