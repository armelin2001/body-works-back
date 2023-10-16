import { RolesAceso } from "src/utils/constants/roles-acesso";
import { StatusPagamento } from "src/utils/constants/status-pagamento";

export interface IUsuario {
    id?: string;
    nome: string;
    dataNascimento: Date;
    cpf: string;
    email: string;
    senha?: string;
    genero: string;
    peso?: string;
    altura?: string;
    statusPagamento?: StatusPagamento;
    idAcesso?: string;
    idFicha?: string;
}

export interface IUsuarioLogin extends IUsuario {
    role: RolesAceso;
}
