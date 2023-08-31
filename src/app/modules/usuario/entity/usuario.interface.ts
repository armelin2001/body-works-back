export interface IUsuario {
    id?: string;
    nome: string;
    dataNascimento: Date;
    cpf: string;
    email?: string;
    senha?: string;
    genero: string;
    peso?: string;
    altura?: string;
    statusPagamento?: string;
    idAcesso?: string;
}
