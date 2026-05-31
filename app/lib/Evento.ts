import { prisma } from "@/lib/prisma";
import type { Status } from "@/generated/prisma/enums";

export class Evento {
    public idevento?: number;
    private readonly nome: string;
    private readonly horarioInicio: string;
    private readonly horarioFim: string;
    private readonly data?: Date;
    private readonly endereco?: number;
    private readonly organizador: number;
    private readonly publicado: number;
    private readonly descricao?: string;
    private readonly status: Status;
    private readonly vagas?: number;

    constructor(
        organizador: number,
        publicado: number,
        status: Status,
        nome: string,
        horarioInicio: string,
        horarioFim: string,
        data?: Date,
        endereco?: number,
        descricao?: string,
        vagas?: number
    ) {
        this.nome = nome;
        this.horarioInicio = horarioInicio;
        this.horarioFim = horarioFim;
        this.data = data;
        this.endereco = endereco;
        this.organizador = organizador;
        this.publicado = publicado;
        this.descricao = descricao;
        this.status = status;
        this.vagas = vagas;
    }

    public async storeOnDb() {
        if (this.idevento === undefined) {
            const lastEvento = await prisma.evento.findFirst({
                select: { idevento: true },
                orderBy: { idevento: "desc" },
            });
            this.idevento = (lastEvento?.idevento ?? 0) + 1;
        }

        const created = await prisma.evento.create({
            data: {
                idevento: this.idevento,
                data: this.data,
                endereco: this.endereco,
                organizador: this.organizador,
                publicado: this.publicado,
                descricao: this.descricao,
                nome: this.nome,
                horarioInicio: this.horarioInicio,
                horarioFim: this.horarioFim,
                status: this.status,
                vagas: this.vagas,
            },
        });

        this.idevento = created.idevento;
        return created;
    }
}
