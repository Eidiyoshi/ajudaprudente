import { Status } from '@/app/lib/Status'

export class Evento {
    nome : string;
    descricao : string;
    data : string;
    horarioInicio : string;
    horarioFim : string;
    local : string;
    vagasDisponiveis : number;
    status : Status;

    constructor(
        nome : string,
        descricao : string,
        data : string,
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
}