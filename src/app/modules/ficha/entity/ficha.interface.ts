import { IExercicioFicha } from "../../exercicio/entity/exercicio.interface";

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
    idInstutor: string;
    nome: string;
    descricao?: string;
    tiposGrupamento: TipoTreino[];
    exercicios: IExercicioFicha[];
}
