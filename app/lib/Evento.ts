import { prisma } from '@/lib/prisma'
import { Status } from '@/app/lib/Status'

export class Evento {
    public idEvento?: number;
    private readonly nome : string;
    private readonly descricao: string;
    private readonly data : string;
    private readonly horarioInicio : string;
    private readonly horarioFim : string;
    private readonly local : string;
    private vagasDisponiveis : number;
    private status : Status;

    constructor(
        nome : string,
        data : string,
        descricao: string,
        horarioInicio : string,
        horarioFim : string, 
        local : string,
        vagasDisponiveis : number,
        status : Status
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.horarioInicio = horarioInicio;
        this.horarioFim = horarioFim;
        this.local = local;
        this.vagasDisponiveis = vagasDisponiveis;
        this.status = status;
    }
    
    public async storeOnDb() {
        if (this.idEvento === undefined) {
            const lastEvento = await prisma.evento.findFirst({
                select: { evento: true },
                orderBy: { evento: "desc" },
            });
            this.idEvento = (lastEvento?.evento ?? 0) + 1;
        }
        const created = await prisma.evento.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
                data: this.data,
                horarioInicio: this.horarioInicio,
                horarioFim: this.horarioFim,
                local: this.local,
                vagasDisponiveis: this.vagasDisponiveis,
                status: this.status
            },
        });

        this.idEvento = created.evento;
        return created;
    }
}