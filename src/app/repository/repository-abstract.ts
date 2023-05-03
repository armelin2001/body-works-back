import { FilterQuery, Model } from "mongoose";
import { IRepository } from "./repository";

export class RepositoryAbstract<entity, entityDTO>
    implements IRepository<entity, entityDTO>
{
    constructor(private readonly entityModel: Model<entity>) {}

    async criar(entity: entity): Promise<entity> {
        return this.entityModel.create(entity);
    }

    async obterTodos(
        filter?: FilterQuery<entity>,
        sortColumn?: string,
    ): Promise<{ dados: entity[]; quantidade: number }> {
        if (filter && filter.id) {
            (filter as any)._id = filter.id;
            delete filter.id;
        }

        const dados = (
            (await this.entityModel.find(filter).sort(sortColumn)) as any[]
        ).map((e) => e.toJSON());
        const quantidade = await this.entityModel.countDocuments(filter);

        return { dados, quantidade };
    }

    async obterPorId(id: string): Promise<entity> {
        const dado = await this.entityModel.findById(id);
        if (dado) {
            return (dado as any).toJSON();
        }

        return dado;
    }

    async atualizar(id: string, entity: entityDTO): Promise<entity> {
        return this.entityModel.findByIdAndUpdate(id, entity, { new: true });
    }

    async remover(id: string): Promise<entity> {
        return this.entityModel.findByIdAndDelete(id);
    }

    async count(filter?: FilterQuery<entity>): Promise<number> {
        if (filter && filter.id) {
            (filter as any)._id = filter.id;
            delete filter.id;
        }

        return this.entityModel.countDocuments(filter);
    }
}
