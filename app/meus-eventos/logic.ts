"use client";

import { useState, useEffect } from "react";
import { Event } from "@/app/eventos/page";

export function useMeusEventos() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/eventos/organizados")
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar seus eventos.");
                return res.json();
            })
            .then((data: Event[]) => setEvents(data))
            .catch((e: unknown) =>
                setError(e instanceof Error ? e.message : "Erro desconhecido."),
            )
            .finally(() => setIsLoading(false));
    }, []);

    return { events, isLoading, error };
}
