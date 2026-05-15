import { prisma } from "@/lib/prisma";

export class Evento {
    public idevento?: number;
    private readonly data?: Date;
    private readonly endereco?: number;
    private readonly organizador: number;
    private readonly publicado: number;
    private readonly descricao?: string;
    private readonly status?: string;
    private readonly vagas?: number;

    constructor(
        organizador: number,
        publicado: number,
        data?: Date,
        endereco?: number,
        descricao?: string,
        status?: string,
        vagas?: number
    ) {
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
                status: this.status,
                vagas: this.vagas,
            },
        });

        this.idevento = created.idevento;
        return created;
    }
}
