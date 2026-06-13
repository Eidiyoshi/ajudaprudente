"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Event } from "app/eventos"

export default function DetalhesEvento() {
    const params = useParams();
    const idevento = params?.id as string;
    const [event, setEvent] = useState<Event>(null);
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


    if (!event) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
                Evento não encontrado
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-3xl mx-auto bg-zinc-800 p-8 rounded-xl">

                <button>
                    <Link href="/eventos" className="text-3xl text-white mt-4">
                        Voltar
                    </Link>
                </button>

                <h1 className="text-3xl text-white mt-4">
                    Nome: {event.nome}
                </h1>
                <h1 className="text-3xl text-white mt-4">
                    {event.idevento}
                </h1>
                <h1 className="text-3xl text-white mt-4">
                    Horário de Inicio: {event.horarioInicio}
                </h1>
                <h1 className="text-3xl text-white mt-4">
                    Horário de término: {event.horarioFim}
                </h1>
                <h1 className="text-3xl text-white mt-4">
                    Status: {event.status}
                </h1>
                <h1 className="text-3xl text-white mt-4">
                    Vagas: {event.vagas}
                </h1>

                <p className="text-zinc-400 mt-4">
                    Descrição: {event.descricao}
                </p>
            </div>
        </div>
    );
}

/*
Event = {
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
*/