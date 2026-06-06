import { prisma } from "@/lib/prisma";
import type { Status } from "@/generated/prisma/enums";

export class Evento {
    public idevento?: number;
    private readonly nome?: string;
    private readonly data?: Date;
    private readonly horarioInicio?: string;
    private readonly horarioFim?: string;
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
        data?: Date,
        endereco?: number,
        descricao?: string,
        vagas?: number,
        nome?: string,
        horarioInicio?: string,
        horarioFim?: string
    ) {
        this.nome = nome;
        this.data = data;
        this.horarioInicio = horarioInicio;
        this.horarioFim = horarioFim;
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
                nome: this.nome,
                data: this.data,
                horarioInicio: this.horarioInicio,
                horarioFim: this.horarioFim,
                endereco: this.endereco,
                organizador: this.organizador,
                publicado: this.publicado,
                descricao: this.descricao,
                status: this.status,
                vagas: this.vagas,
            },
        });

        this.idevento = created.idevento;
        return created;
    }
}
