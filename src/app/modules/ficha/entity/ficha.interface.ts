export type GrupoMuscular =
    | "Peito"
    | "Costas"
    | "Ombro"
    | "Biceps"
    | "Triceps"
    | "Perna"
    | "Abdomen"
    | "Gluteo"
    | "Panturrilha"
    | "Antebraco"
    | "Lombar";
export type TipoTreino = "A" | "B" | "C" | "D" | "E";
export interface IFicha {
    id?: string;
    idInstrutor: string;
    nome: string;
    qtdTreino: number;
    descricao?: string;
    tiposGrupamento: TipoTreino[];
    exercicios: IExercicioFicha[];
}

export interface IExercicioFicha {
    idExercicio: string;
    series: number;
    repeticoes: number;
    tempoIntervaloMinutos: number;
    tempoIntervaloSegundos: number;
    tipoGrupamento: TipoTreino;
}
