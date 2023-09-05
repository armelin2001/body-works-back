import { RepositoryAbstract } from "src/utils/repository/repository-abstract";
import { IExercicio } from "./entity/exercicio.interface";
import { ExercicioDTO } from "./dto/exercicio.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class ExercicioRepository extends RepositoryAbstract<
    IExercicio,
    ExercicioDTO
>{
    constructor(
        @InjectModel("Exercicio")
        private readonly exercicioModel: Model<IExercicio>,
    ){
        super(exercicioModel);
    }
}