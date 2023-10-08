import { RolesAceso } from "src/utils/constants/roles-acesso";

export interface IUsuarioAcademia {
    id?: string;
    nome: string;
    cpf: string;
    email?: string;
    senha?: string;
    codigo?: string;
    adm: boolean;
    dataNascimento: Date;
    genero: string;
    idAcesso?: string;
}

export interface IUsuarioAcademiaLogin extends IUsuarioAcademia {
    role: RolesAceso;
}
