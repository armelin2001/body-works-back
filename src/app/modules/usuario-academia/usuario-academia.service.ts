import "src/utils/load-env";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsuarioAcademiaRepository } from "./usuario-academia.repository";
import { IUsuarioAcademia } from "./entity/usuario-academia.interface";
import { UsuarioAcademiaDTO } from "./dto/usuario-academia.dto";
import { RolesAceso } from "src/utils/constants/roles-acesso";
import { AcessoService } from "../acessos/acesso.service";

@Injectable()
export class UsuarioAcademiaService {
    constructor(
        @Inject(UsuarioAcademiaRepository)
        private readonly usuarioAcademiaRepository: UsuarioAcademiaRepository,
        @Inject(AcessoService)
        private readonly acessoService: AcessoService,
    ) {
        this.usuarioAcademiaRepository = usuarioAcademiaRepository;
    }

    async obterTodos() {
        return await this.usuarioAcademiaRepository.obterTodos();
    }

    async criar(usuarioAcademia: IUsuarioAcademia) {
        if (
            Number(usuarioAcademia.codigo) ===
                Number(process.env.CODIGO_ACADEMIA) &&
            usuarioAcademia.adm === true
        ) {
            await this.validarCpfEmail(
                usuarioAcademia.email,
                usuarioAcademia.cpf,
            );
            const acesso = await this.acessoService.cadastrar({
                email: usuarioAcademia.email,
                senha: usuarioAcademia.senha,
                role: RolesAceso.adm,
            });
            usuarioAcademia.idAcesso = acesso.id;
            delete usuarioAcademia.senha;
            delete usuarioAcademia.email;
            return await this.usuarioAcademiaRepository.criar(usuarioAcademia);
        }
        if (usuarioAcademia.adm === false) {
            await this.validarCpfEmail(
                usuarioAcademia.email,
                usuarioAcademia.cpf,
            );
            const acesso = await this.acessoService.cadastrar({
                email: usuarioAcademia.email,
                senha: usuarioAcademia.senha,
                role: RolesAceso.instrutor,
            });
            usuarioAcademia.idAcesso = acesso.id;
            delete usuarioAcademia.senha;
            delete usuarioAcademia.email;
            delete usuarioAcademia.id;
            return await this.usuarioAcademiaRepository.criar(usuarioAcademia);
        } else {
            throw new HttpException(
                "Código da academia inválido",
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async obterPorId(id: string) {
        const usuarioAcademiaAtualizado =
            await this.usuarioAcademiaRepository.obterPorId(id);
        if (!usuarioAcademiaAtualizado) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        return usuarioAcademiaAtualizado;
    }

    async atualizar(id: string, usuarioAcademia: UsuarioAcademiaDTO) {
        const usuarioAcademiaAtualizado =
            await this.usuarioAcademiaRepository.atualizar(id, usuarioAcademia);
        if (!usuarioAcademiaAtualizado) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }
        return usuarioAcademiaAtualizado;
    }

    async remover(id: string) {
        const usuarioRemovido = await this.usuarioAcademiaRepository.remover(
            id,
        );
        if (!usuarioRemovido) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }

        return usuarioRemovido;
    }

    async validarCpfEmail(email: string, cpf: string) {
        const usuarioAcademiaEmailJaCadastrado =
            await this.acessoService.validaEmail(email);
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
