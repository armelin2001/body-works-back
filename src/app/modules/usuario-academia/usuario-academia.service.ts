import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsuarioAcademiaRepository } from "./usuario-academia.repository";
import { IUsuarioAcademia } from "./entity/usuario-academia.interface";
import { UsuarioAcademiaDTO } from "./dto/usuario-academia.dto";

@Injectable()
export class UsuarioAcademiaService {
    constructor(
        @Inject(UsuarioAcademiaRepository)
        private readonly usuarioAcademiaRepository: UsuarioAcademiaRepository,
    ) {
        this.usuarioAcademiaRepository = usuarioAcademiaRepository;
    }

    async criar(usuarioAcademia: IUsuarioAcademia) {
        return await this.usuarioAcademiaRepository.criar(usuarioAcademia);
    }

    async obterPorId(id: string) {
        return await this.usuarioAcademiaRepository.obterPorId(id);
    }

    async atualizar(id: string, usuarioAcademia: UsuarioAcademiaDTO) {
        return await this.usuarioAcademiaRepository.atualizar(
            id,
            usuarioAcademia,
        );
    }

    async remover(id: string) {
        return await this.usuarioAcademiaRepository.remover(id);
    }

    async validarCpfEmail(email: string, cpf: string) {
        const usuarioAcademiaEmailJaCadastrado =
            await this.usuarioAcademiaRepository.procurarPorEmailJaCadastrado(
                email,
            );
        const usuarioAcademiaCpfJaCadastrado =
            await this.usuarioAcademiaRepository.procurarPorCpfJaCadastrado(
                cpf,
            );
        if (usuarioAcademiaEmailJaCadastrado) {
            throw new HttpException(
                "Email já cadastrado",
                HttpStatus.BAD_REQUEST,
            );
        }
        if (usuarioAcademiaCpfJaCadastrado) {
            throw new HttpException(
                "CPF já cadastrado",
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
