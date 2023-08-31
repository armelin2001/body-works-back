import { RolesAceso } from "src/utils/constants/roles-acesso";
import { IAcesso } from "../entity/acesso.interface";

export class AcessoDTO implements IAcesso {
    id?: string;
    email: string;
    role: RolesAceso;
    senha: string;
}
