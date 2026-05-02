import { prisma } from "@/lib/prisma";
import {Usuario} from "@/app/lib/Usuario";
import {TipoUsuario} from "@/app/lib/TipoUsuario";

export class Organizador extends Usuario {
    public idorganizador?: number;
    private readonly nome: string;
    private readonly email: string;
    private readonly senha: string;
    private readonly telefone: number;
    private readonly CNPJ: number;

    constructor(nome: string, email: string, senha: string, telefone: number, tipoUsuario: TipoUsuario, CNPJ: number) {     
        super(undefined, nome, email, senha, telefone, tipoUsuario);
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.CNPJ = CNPJ;
    }

    public async storeOnDb(endereco: number) {
        if (this.idorganizador === undefined) {
            const lastOrganizador = await prisma.organizador.findFirst({
                select: { idorganizador: true },
                orderBy: { idorganizador: "desc" },
            });
            this.idorganizador = (lastOrganizador?.idorganizador ?? 0) + 1;
        }

        const created = await prisma.organizador.create({
            data: {
                idorganizador: this.idorganizador,
                nome: this.nome,
                senha: this.senha,
                email: this.email,
                criado: new Date(),
                endereco,
                cnpj: String(this.CNPJ),
                telefone: String(this.telefone),
            },
        });

        this.idorganizador = created.idorganizador;
        return created;
    }
}
