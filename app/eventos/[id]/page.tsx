"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

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

const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function DetalhesEvento() {
    const params = useParams();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") ?? "eventos"
    const idevento = params?.id as string;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/eventos/${idevento}`);
                
                if (!response.ok) {
                  if (response.status === 404) {
                    throw new Error('Evento não encontrado');
                  }
                  throw new Error('Erro ao buscar Evento');
                }
                
                const data = await response.json();
                setEvent(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

    fetchEvent();
  }, [idevento]);


     if (loading) return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-zinc-400">
            Carregando...
        </div>
    );

    if (!event) return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
            Evento não encontrado
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-3xl mx-auto bg-zinc-800 p-8 rounded-xl">

                <Link href={`/${from}`} className="text-zinc-400 hover:text-white text-sm transition">
                    Voltar
                </Link>
                <h1 className="text-3xl font-bold text-zinc-100 mt-4">{event.nome}</h1>
                <div className="mt-6 flex flex-col gap-3 text-zinc-100">
                    <p><span className="text-zinc-400">Data:</span> {formatDate(event.data)}</p>
                    <p><span className="text-zinc-400">Horário de Início:</span> {event.horarioInicio ?? "-"}</p>
                    <p><span className="text-zinc-400">Horário de Término:</span> {event.horarioFim ?? "-"}</p>
                    <p><span className="text-zinc-400">Status:</span> {event.status}</p>
                    <p><span className="text-zinc-400">Vagas:</span> {event.vagas ?? "-"}</p>
                    <p><span className="text-zinc-400">Descrição:</span> {event.descricao ?? "-"}</p>
                </div>
            </div>
        </div>
    );
}
