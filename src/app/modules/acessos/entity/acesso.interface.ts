import { RolesAceso } from "src/utils/constants/roles-acesso";

export interface IAcesso {
    id?: string;
    email: string;
    role: RolesAceso;
    senha: string;
}
