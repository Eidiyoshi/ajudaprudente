"use client";

import Link from "next/link";
import { EventCard } from "@/app/components/cards";
import { useMeusEventos } from "@/app/meus-eventos/logic";

import { Event } from "@/app/eventos/page";

export default function EventsList() {
    const { events, isLoading, error } = useMeusEventos();

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                <PageHeader />

                {isLoading && (
                    <p className="text-zinc-400 text-center py-10">
                        Carregando...
                    </p>
                )}

                {error && (
                    <p className="text-red-400 text-center py-10">{error}</p>
                )}

                {!isLoading && !error && events.length === 0 && <EmptyState />}

                {!isLoading && !error && events.length > 0 && (
                    <EventsGrid events={events} />
                )}
            </div>
        </div>
    );
}

function PageHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-100">
                    Meus Eventos
                </h1>
                <p className="text-zinc-400 mt-1">
                    Eventos que você está organizando.
                </p>
                <div className="flex gap-3 mt-4">
                    <Link
                        href="/eventos"
                        className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white"
                    >
                        Ver todos os eventos
                    </Link>
                    <Link
                        href="/registrar-evento"
                        className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                        Criar evento
                    </Link>
                </div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-zinc-100">
                Nenhum evento encontrado
            </h2>
            <p className="text-zinc-400 mt-2">
                Você ainda não criou nenhum evento.
            </p>
            <Link
                href="/registrar-evento"
                className="inline-block mt-4 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
            >
                Criar primeiro evento
            </Link>
        </div>
    );
}

function EventsGrid({ events }: { events: Event[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
                <EventCard key={event.idevento} event={event} />
            ))}
        </div>
    );
}
