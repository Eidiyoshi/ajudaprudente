import { prisma } from "@/lib/prisma";
import {Usuario} from "@/app/lib/Usuario";
import {TipoUsuario} from "@/app/lib/TipoUsuario";

export class Organizador extends Usuario {
    public idorganizador?: number;
    private readonly nome: string;
    private readonly email: string;
    private readonly senha: string;
    private readonly telefone: number;
    private readonly cnpj?: string;
    private readonly empresa?: string;

    constructor(
        nome: string,
        email: string,
        senha: string,
        telefone: number,
        tipoUsuario: TipoUsuario,
        cnpj?: string,
        empresa?: string
    ) {     
        super(undefined, nome, email, senha, telefone, tipoUsuario);
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.cnpj = cnpj;
        this.empresa = empresa;
    }

    public async storeOnDb() {
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
                cnpj: this.cnpj,
                telefone: String(this.telefone),
                empresa: this.empresa,
            },
        });

        this.idorganizador = created.idorganizador;
        return created;
    }
}
