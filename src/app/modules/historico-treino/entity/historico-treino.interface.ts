import { TipoTreino } from "../../ficha/entity/ficha.interface";

export interface IHistoricoTreino {
    id?: string;
    qtdAtualTreino: number;
    tipoAtual: TipoTreino;
    idFichaTreino: string;
    idUsuario: string;
    dataTreino: Date;
    idTreino?: string;
}
