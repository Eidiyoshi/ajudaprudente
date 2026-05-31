import { EventCard, EventCardEdit } from "./layout";
import type { Event } from "./logic";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

function formatDate(date: Date | null) {
    if (!date) {
        return "Sem data";
    }

    return date.toISOString().split("T")[0];
}

function formatLocal(endereco: { cidade: string; bairro: string } | null) {
    if (!endereco) {
        return "Sem local";
    }

    return `${endereco.cidade} - ${endereco.bairro}`;
}

export default async function VisualizarEventos() {
    await connection();
    const eventos = await prisma.evento.findMany({
        include: {
            endere_o: true,
        },
    });

    const events: Event[] = eventos.map((evento) => ({
        id: evento.idevento,
        nome: evento.nome ?? "Sem nome",
        descricao: evento.descricao ?? "Sem descricao",
        data: formatDate(evento.data),
        horarioInicio: evento.horarioInicio ?? "Sem horario",
        horarioFim: evento.horarioFim ?? "Sem horario",
        local: formatLocal(evento.endere_o),
        vagasDisponiveis: evento.vagas ?? 0,
        status: evento.status,
    }));

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {events.filter((event) => event.status === "Ativo").map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}

                    {events.filter((event) => event.status === "Rascunho").map((event) => (
                        <EventCardEdit key={event.id} event={event} />
                    ))}

                    {events.filter((event) => event.status === "Encerrado").map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}

                    {events.filter((event) => event.status === "Cancelado").map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    )
}