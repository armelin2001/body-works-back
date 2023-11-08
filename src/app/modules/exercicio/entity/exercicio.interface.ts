export type ExercicioDificuldade = "Iniciante" | "Intermediario" | "Avancado";
export type ExercicioTipo = "Cardiovascular" | "Força" | "Flexibilidade";

export interface IExercicio {
    id?: string;
    nome: string;
    tipoExercicio: ExercicioTipo;
    equipamentoNecessario: string;
    nivelDificuldade: ExercicioDificuldade;
    videoDemonstrativo: string;
    musculosTrabalhados: string;
}
