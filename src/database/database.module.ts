import { Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { Env } from "src/utils/env";

@Module({})
export class DataBaseModule {
    static async forRoot() {
        return MongooseModule.forRoot(Env.database.stringConnection, {
            dbName: Env.database.dbName,
        });
    }

    static async forFeature(models?: ModelDefinition[]) {
        return MongooseModule.forFeature(models);
    }
}
