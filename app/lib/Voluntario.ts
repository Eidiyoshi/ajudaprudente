import { prisma } from "@/lib/prisma";
import { TipoUsuario } from "@/app/lib/TipoUsuario";
import { Usuario } from "@/app/lib/Usuario";

export class Voluntario extends Usuario {
    public idusuarios?: number;
    private readonly nome: string;
    private readonly email: string;
    private readonly senha: string;
    private readonly telefone: number;
    private readonly rg: string;
    private readonly cpf: string;

    constructor(
        nome: string,
        email: string,
        senha: string,
        telefone: number,
        tipoUsuario: TipoUsuario,
        rg: string,
        cpf: string
    ) {
        super(undefined, nome, email, senha, telefone, tipoUsuario);
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.rg = rg;
        this.cpf = cpf;
    }

    public async storeOnDb(endereco: number) {
        if (this.idusuarios === undefined) {
            const lastVoluntario = await prisma.voluntario.findFirst({
                select: { idusuarios: true },
                orderBy: { idusuarios: "desc" },
            });
            this.idusuarios = (lastVoluntario?.idusuarios ?? 0) + 1;
        }

        const created = await prisma.voluntario.create({
            data: {
                idusuarios: this.idusuarios,
                nome: this.nome,
                senha: this.senha,
                email: this.email,
                criado: new Date(),
                endereco,
                rg: this.rg,
                cpf: this.cpf,
                telefone: String(this.telefone),
            },
        });

        this.idusuarios = created.idusuarios;
        return created;
    }
}
