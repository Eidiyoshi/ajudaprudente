"use client";

import Link from "next/link";

type Event = {
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

const mockEvents: Event[] = [
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

export default function VisualizarEventos() {
    const getStatusColor = (status: string) => {
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

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-100">
                            Eventos
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            Visualize e gerencie os eventos cadastrados.
                        </p>
                        
                   </div>

                   
                </div>
                

                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow-lg hover:border-indigo-500/40 transition"
                        >
                            
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-zinc-100">
                                        {event.nome}
                                    </h2>

                                    <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                                        {event.descricao}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs border font-medium ${getStatusColor(
                                        event.status
                                    )}`}
                                >
                                    {event.status}
                                </span>
                            </div>

                            
                            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700">
                                    <p className="text-zinc-400">Data</p>
                                    <p className="text-zinc-100 font-medium mt-1">
                                        {event.data}
                                    </p>
                                </div>

                                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700">
                                    <p className="text-zinc-400">Horário</p>
                                    <p className="text-zinc-100 font-medium mt-1">
                                        {event.horarioInicio} -{" "}
                                        {event.horarioFim}
                                    </p>
                                </div>

                                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700 col-span-2">
                                    <p className="text-zinc-400">Local</p>
                                    <p className="text-zinc-100 font-medium mt-1">
                                        {event.local}
                                    </p>
                                </div>

                                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700 col-span-2">
                                    <p className="text-zinc-400">
                                        Vagas Disponíveis
                                    </p>
                                    <p className="text-zinc-100 font-medium mt-1">
                                        {event.vagasDisponiveis}
                                    </p>
                                </div>
                            </div>

                            
                            <div className="flex gap-3 mt-6">
                               <Link
    href={`/Eventos/${event.id}`}
    className="flex-1 py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition text-center"
>
    Ver Detalhes
</Link>

                                <button className="flex-1 py-2 px-4 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-medium transition">
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

              
                {mockEvents.length === 0 && (
                    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-10 text-center">
                        <h2 className="text-xl font-semibold text-zinc-100">
                            Nenhum evento encontrado
                        </h2>

                        <p className="text-zinc-400 mt-2">
                            Crie um novo evento para começar.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}