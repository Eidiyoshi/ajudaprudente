import {TipoUsuario} from "@/app/lib/TipoUsuario";

export abstract class Usuario {
    constructor(idUsuario: number | undefined, nome: string, email: string, senha: string, telefone: number, tipoUsuario: TipoUsuario) {}
}
