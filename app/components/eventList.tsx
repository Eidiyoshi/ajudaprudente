"use client";

import { useEffect, useState } from "react";
import { EventCard } from "./cards";

type Event = {
    idevento: number;
    nome: string | null;
    descricao: string | null;
    data: string | null;
    horarioInicio: string | null;
    horarioFim: string | null;
    status: string;
    vagas: number | null;
    endere_o: {
        rua: string | null;
        bairro: string | null;
        cidade: string | null;
    } | null;
}

export function EventList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/eventos")
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar eventos.");
                return res.json();
            })
            .then((data) => setEvents(data))
            .catch((e: unknown) => setError(e instanceof Error ? e.message : "Erro desconhecido."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-zinc-400 text-center py-10">Carregando eventos...</p>;
    if (error)   return <p className="text-red-400 text-center py-10">{error}</p>;

    if (events.length === 0) return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-zinc-100">Nenhum evento encontrado</h2>
            <p className="text-zinc-400 mt-2">Crie um novo evento para começar.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
                <EventCard key={event.idevento} event={event} from="eventos" />
            ))}
        </div>
    );
}