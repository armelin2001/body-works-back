export interface IUsuario {
    id?: string;
    nome: string;
    dataNascimento: Date;
    email: string;
    senha: string;
    perfil: string;
    peso?: string;
    altura?: string;
}
