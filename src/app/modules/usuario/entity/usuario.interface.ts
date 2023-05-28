export interface IUsuario {
    id?: string;
    nome: string;
    dataNascimento: Date;
    cpf: string;
    email: string;
    senha: string;
    perfil: string;
    peso?: string;
    altura?: string;
}
