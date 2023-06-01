export type EquipamentoTipo = "Cross" | "Livre" | "Barra";

export interface IEquipamento {
    id?: string;
    nome: string;
    tipo: EquipamentoTipo;
}
