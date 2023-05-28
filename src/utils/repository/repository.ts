import { FilterQuery } from "mongoose";

export interface IRepository<entity, entityDTO> {
    criar(entity: entity): Promise<entity>;
    obterTodos(
        filter?: FilterQuery<entity>,
    ): Promise<{ dados: entity[]; quantidade: number }>;
    obterPorId(id: string): Promise<entity>;
    atualizar(id: string, entity: entityDTO): Promise<entity>;
    remover(id: string): Promise<entity>;
    count(filter?: FilterQuery<entity>): Promise<number>;
}
