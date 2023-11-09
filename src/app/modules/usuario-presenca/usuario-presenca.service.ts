import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsuarioPresencaRepository } from "./usuario-presenca.repository";
import { UsuarioPresencaDTO } from "./dto/usario-presenca.dto";
import { IUsuarioPresenca } from "./entity/usuario-presenca.interface";

@Injectable()
export class UsuarioPresencaService {
    constructor(
        @Inject(UsuarioPresencaRepository)
        private readonly usuarioPresencaRepository: UsuarioPresencaRepository,
    ) {}

    async cadastrar(
        usuarioPresenca: UsuarioPresencaDTO,
    ): Promise<IUsuarioPresenca> {
        return await this.usuarioPresencaRepository.criar(usuarioPresenca);
    }

    async atualizar(usuarioPresenca: UsuarioPresencaDTO, id: string) {
        const usuarioPresencaAtualizado =
            await this.usuarioPresencaRepository.atualizar(id, usuarioPresenca);
        if (!usuarioPresencaAtualizado) {
            throw new HttpException(
                "Preseça não encontrada",
                HttpStatus.NOT_FOUND,
            );
        }
        return usuarioPresencaAtualizado;
    }

    async obterPorId(id: string): Promise<IUsuarioPresenca> {
        const usuarioPresenca = await this.usuarioPresencaRepository.obterPorId(
            id,
        );
        if (!usuarioPresenca) {
            throw new HttpException(
                "Preseça não encontrada",
                HttpStatus.NOT_FOUND,
            );
        }
        return usuarioPresenca;
    }
}
