
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";



type Voluntario = {
    id: number;
    nome: string;
};

type Event = {
    id: number;
    nome: string;
    descricao: string;
    voluntarios: Voluntario[];
};

const mockEvents: Event[] = [
    {
        id: 1,
        nome: "Caridade",
        descricao: "...",
        voluntarios: [
            {
                id: 1,
                nome: "João Silva"
            },
            {
                id: 2,
                nome: "Maria Souza"
            }
        ]
    },
    {
        id: 2,
        nome: "Piquete",
        descricao: "...",
        voluntarios: [
            {
                id: 3,
                nome: "Kaique Aguiar"
            },
            {
                id: 4,
                nome: "Jonas Miranda"
            }
        ]
    }
];
export default function DetalhesEvento() {

    const params = useParams();

    const event = mockEvents.find(
        (e) => e.id === Number(params.id)
    );

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

                <Link href="/Event">
                    Voltar
                </Link>

                <h1 className="text-3xl text-white mt-4">
                    {event.nome}
                </h1>

                <p className="text-zinc-400 mt-4">
                    {event.descricao}
                </p>
               <div className="mt-8">
    <h2 className="text-xl font-semibold text-white mb-4">
        Voluntários Inscritos
    </h2>

    {event.voluntarios.length > 0 ? (
        <div className="space-y-3">
            {event.voluntarios.map((voluntario) => (
                <div
                    key={voluntario.id}
                    className="bg-zinc-700 p-3 rounded-lg flex items-center justify-between"
                >
                    <span className="text-zinc-100">
                        {voluntario.nome}
                    </span>

                    <Link
                        href={`/voluntarios/${voluntario.id}`}
                        className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
                    >
                        Ver Detalhes
                    </Link>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-zinc-400">
            Nenhum voluntário inscrito.
        </p>
    )}
</div>
            </div>
        </div>
    );
}