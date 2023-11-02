import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TreinoRepository } from "./treino.repository";
import { TreinoDto } from "./dto/treino.dto";
import { IComentarioTreino, ITreino } from "./entity/treino.interface";
import { FichaService } from "../ficha/ficha.service";
import { ObterTreinosPorInstrutorUseCase } from "./use-cases/obter-treinos-instrutor.use-case";
import { UsuarioRepository } from "../usuario/usuario.repository";

@Injectable()
export class TreinoService {
    constructor(
        @Inject(TreinoRepository)
        private readonly treinoRepository: TreinoRepository,
        @Inject(FichaService)
        private readonly fichaService: FichaService,
        @Inject(UsuarioRepository)
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async cadastrar(terino: TreinoDto): Promise<ITreino> {
        return await this.treinoRepository.criar(terino);
    }

    async atualizar(treino: TreinoDto, id: string): Promise<ITreino> {
        const treinoAtualizado = await this.treinoRepository.atualizar(
            id,
            treino,
        );
        if (!treinoAtualizado) {
            throw new HttpException(
                "Treino não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        return treinoAtualizado;
    }

    async obterPorId(id: string): Promise<ITreino> {
        const treino = await this.treinoRepository.obterPorId(id);

        if (!treino) {
            throw new HttpException(
                "Sem treinos para o usuario informado",
                HttpStatus.NOT_FOUND,
            );
        }

        return treino;
    }

    async obterTodos(): Promise<{ dados: ITreino[]; quantidade: number }> {
        return await this.treinoRepository.obterTodos();
    }

    async remover(id: string): Promise<any> {
        return await this.treinoRepository.remover(id);
    }

    async obterComentariosPorUsuario(
        idUsuario: string,
    ): Promise<IComentarioTreino[]> {
        const usuarioTreinos =
            await this.treinoRepository.buscarComentariosTreino(idUsuario);
        if (!usuarioTreinos) {
            throw new HttpException(
                "Sem comentarios para o usuario informado",
                HttpStatus.NOT_FOUND,
            );
        }

        const comentarios: IComentarioTreino[] = [];

        usuarioTreinos.forEach((usuarioTreino) => {
            const comentario = {
                idTreino: usuarioTreino.id,
                idUsuario: usuarioTreino.idUsuario,
                comentario: usuarioTreino.comentario,
                dataTreino: usuarioTreino.dataTreino,
            };
            comentarios.push(comentario);
        });

        return comentarios;
    }

    async obterComentariosPorInstrutor(
        idInstrutor: string,
    ): Promise<IComentarioTreino[]> {
        const fichasInstrutor = await this.fichaService.obterFichasPorInstrutor(
            idInstrutor,
        );

        const idsFicha: string[] = [];

        fichasInstrutor.forEach((ficha) => {
            idsFicha.push(ficha.id);
        });

        const filtroInstrutorComentarios = {
            idFicha: { $in: idsFicha },
        };

        const comentariosUseCase = new ObterTreinosPorInstrutorUseCase(
            this.treinoRepository,
            filtroInstrutorComentarios,
        );

        const comentarios = await comentariosUseCase.executar();
        const comentariosInstrutor: IComentarioTreino[] = [];
        const usuario = await this.usuarioRepository.obterTodos();

        comentarios.dados.forEach((treinos) => {
            if (treinos.comentario || treinos.comentario !== "") {
                const nomeFicha = fichasInstrutor.find(
                    (ficha) => ficha.id === treinos.idFicha,
                ).nome;
                const usuarioNome = usuario.dados.find(
                    (user) => user.id === treinos.idUsuario,
                ).nome;

                comentariosInstrutor.push({
                    treinoNome: nomeFicha,
                    usuarioNome: usuarioNome,
                    comentario: treinos.comentario,
                    dataTreino: treinos.dataTreino,
                });
            }
        });

        return comentariosInstrutor;
    }
}
