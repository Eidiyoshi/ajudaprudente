"use client";

import { EventCard, EventCardEdit } from "./layout";
import { mockEvents } from "./logic";

export default function VisualizarEventos() {
    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockEvents.filter((event) => event.status === "Ativo").map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}

                    {mockEvents.filter((event) => event.status === "Rascunho").map((event) => (
                        <EventCardEdit key={event.id} event={event} />
                    ))}

                    {mockEvents.filter((event) => event.status === "Encerrado").map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    )
}