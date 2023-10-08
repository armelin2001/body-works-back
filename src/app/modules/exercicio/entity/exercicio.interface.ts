import { GrupoMuscular, TipoTreino } from "../../ficha/entity/ficha.interface";

export type ExercicioDificuldade = "Iniciante" | "Intermediario" | "Avancado";
export type ExercicioTipo = "Cardiovascular" | "Força" | "Flexibilidade";

export interface IExercicio {
    id?: string;
    nome: string;
    descricao: string;
    tipoExercicio: ExercicioTipo;
    equipamentoNecessario: string;
    nivelDificuldade: ExercicioDificuldade;
    tempoRecomendado: number;
    videoDemonstrativo: string;
    instrucoesPassoAPasso: string;
    musculosTrabalhados: string;
    observacoes: string;
}

export interface IExercicioFicha extends IExercicio {
    series: number;
    repeticoes: number;
    tempoIntervaloMinutos: number;
    tempoIntervaloSegundos: number;
    tipoGrupamento: TipoTreino;
    grupoMuscular?: GrupoMuscular;
}
