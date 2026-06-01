export type Endereco = {
    cidade: string;
    bairro: string;
    rua: string;
    cep: string;
    apartamento: string;
    numero: string;
};

export type Event = {
    id: number;
    nome: string;
    descricao: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    endereco: Endereco | null;
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
        endereco: {
            rua: "Rua das Flores",
            numero: "123",
            apartamento: "12",
            bairro: "Centro",
            cidade: "Presidente Prudente",
            cep: "19010-000",
        },
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
        endereco: {
            rua: "Avenida Brasil",
            numero: "450",
            apartamento: "Sem apartamento",
            bairro: "Vila Nova",
            cidade: "Presidente Prudente",
            cep: "19015-040",
        },
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
        endereco: {
            rua: "Rua das Acacias",
            numero: "67",
            apartamento: "Sem apartamento",
            bairro: "Jardim Bela Vista",
            cidade: "Presidente Prudente",
            cep: "19020-150",
        },
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
