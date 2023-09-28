import { IExercicio } from "../../exercicio/entity/exercicio.interface";

export interface IFicha {
    id?: string;
    idInstutor: string;
    nome: string;
    descricao: string;
    exercicios: IExercicio[];
}
