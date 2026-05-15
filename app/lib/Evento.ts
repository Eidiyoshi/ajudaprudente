
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

    private constructor(
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

    static create(
        nome : string,
        data : string,
        descricao: string,
        horarioInicio : string,
        horarioFim : string, 
        local : string,
        vagasDisponiveis : number,
        status : Status
    ): Evento {
        return new Evento(nome, data, descricao, horarioInicio, horarioFim, local, vagasDisponiveis, status);
    }

    static empty(): Evento {
        return new Evento('', '', '', '', '', '', 0, Status.Rascunho);
    }

    public getNome() {
        return this.nome;
    }

    public getDescricao() {
        return this.descricao;
    }

    public getData() {
        return this.data;
    }   
    public getHorarioInicio() {
        return this.horarioInicio;
    }

    public getHorarioFim() {
        return this.horarioFim;
    }

    public getLocal() {
        return this.local;
    }

    public getVagasDisponiveis() {
        return this.vagasDisponiveis;
    }

    public getStatus() {
        return this.status;
    }
}