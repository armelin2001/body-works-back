import { IFicha, TipoTreino } from "../../ficha/entity/ficha.interface";

export interface IHistoricoTreino {
    id?: string;
    qtdAtualTreino: number;
    tipoAtual?: TipoTreino;
    idFichaTreino: string;
    ficha?: IFicha;
    idUsuario: string;
    dataTreino: Date;
    idTreino?: string;
}
