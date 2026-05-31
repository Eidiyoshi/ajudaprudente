export type Event = {
    id: number;
    nome: string;
    descricao: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    local: string;
    vagasDisponiveis: number;
    status: string;
};

export const mockEvents: Event[] = [
    {
        id: 1,
        nome: "Caridade muito boa",
        descricao: "Faça as pessoas felizes, tipo muito",
        data: "2026-05-20",
        horarioInicio: "18:00",
        horarioFim: "21:00",
        local: "Meu coração",
        vagasDisponiveis: 30,
        status: "Ativo",
    },
    {
        id: 2,
        nome: "Piquete",
        descricao: "Evento que promete dar trabalho",
        data: "2026-05-25",
        horarioInicio: "07:00",
        horarioFim: "17:00",
        local: "ante ao mal",
        vagasDisponiveis: 120,
        status: "Rascunho",
    },
    {
        id: 3,
        nome: "Sopa? sopa",
        descricao: "hahahahahahahahahahahahahahahaahahahah",
        data: "2026-06-01",
        horarioInicio: "19:30",
        horarioFim: "22:00",
        local: "Sala 67 20+20+20+7",
        vagasDisponiveis: 0,
        status: "Encerrado",
    },
];

export function getStatusColor(status: string) {
    switch (status) {
        case "Ativo":
            return "bg-green-500/20 text-green-400 border-green-500/30";
        case "Cancelado":
            return "bg-red-500/20 text-red-400 border-red-500/30";
            case "Encerrado":
                return "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
            default:
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
};
