import { EventCard } from "./layout";
import type { Endereco, Event } from "./logic";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

function formatDate(date: Date | null) {
    if (!date) {
        return "Sem data";
    }

    return date.toISOString().split("T")[0];
}

function formatEndereco(endereco: {
    cidade: string;
    bairro: string;
    rua: string;
    cep: string;
    apartamento?: string | null;
    numero?: string | null;
} | null): Endereco | null {
    if (!endereco) {
        return null;
    }

    const numero = endereco.numero?.trim();
    const apartamento = endereco.apartamento?.trim();

    return {
        rua: endereco.rua.trim() || "Sem rua",
        numero: numero && numero.length > 0 ? numero : "Sem numero",
        apartamento: apartamento && apartamento.length > 0 ? apartamento : "Sem apartamento",
        bairro: endereco.bairro.trim() || "Sem bairro",
        cidade: endereco.cidade.trim() || "Sem cidade",
        cep: endereco.cep.trim() || "Sem cep",
    };
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
        endereco: formatEndereco(evento.endere_o),
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
                </div>
            </div>
        </div>
    )
}