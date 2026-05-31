
import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

type Event = {
    id: number;
    nome: string;
    descricao: string;
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function DetalhesEvento({ params }: PageProps) {
    const { id } = await params;
    const eventId = Number(id);

    if (Number.isNaN(eventId)) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
                Evento inválido
            </div>
        );
    }

    await connection();
    const evento = await prisma.evento.findUnique({
        where: {
            idevento: eventId,
        },
    });

    if (!evento) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
                Evento não encontrado
            </div>
        );
    }

    const event: Event = {
        id: evento.idevento,
        nome: evento.nome ?? "Sem nome",
        descricao: evento.descricao ?? "Sem descricao",
    };

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-3xl mx-auto bg-zinc-800 p-8 rounded-xl">

                <Link href="/eventos">
                    Voltar
                </Link>

                <h1 className="text-3xl text-white mt-4">
                    {event.nome}
                </h1>

                <p className="text-zinc-400 mt-4">
                    {event.descricao}
                </p>
            </div>
        </div>
    );
}