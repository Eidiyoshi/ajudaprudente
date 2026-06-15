import Link from "next/link";
import { Event } from "@/app/eventos/page";

const getStatusColor = (status: string) => {
    switch (status) {
        case "Ativo":
            return "bg-green-500/20 text-green-400 border-green-500/30";
        case "Cancelado":
            return "bg-red-500/20 text-red-400 border-red-500/30";
        case "Encerrado":
            return "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
        default:
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
};

const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("pt-BR");
};

const formatLocal = (endere_o: Event["endere_o"]) => {
    if (!endere_o) return "-";
    return [endere_o.rua, endere_o.bairro, endere_o.cidade]
        .filter(Boolean)
        .join(", ");
};

export function EventCard({ event }: { event: Event }) {
    return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow-lg hover:border-indigo-500/40 transition">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-zinc-100">
                        {event.nome ?? "Sem título"}
                    </h2>
                    <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                        {event.descricao ?? "Sem descrição"}
                    </p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs border font-medium ${getStatusColor(event.status)}`}
                >
                    {event.status}
                </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700">
                    <p className="text-zinc-400">Data</p>
                    <p className="text-zinc-100 font-medium mt-1">
                        {formatDate(event.data)}
                    </p>
                </div>

                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700">
                    <p className="text-zinc-400">Horário</p>
                    <p className="text-zinc-100 font-medium mt-1">
                        {event.horarioInicio ?? "-"} – {event.horarioFim ?? "-"}
                    </p>
                </div>

                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700 col-span-2">
                    <p className="text-zinc-400">Local</p>
                    <p className="text-zinc-100 font-medium mt-1">
                        {formatLocal(event.endere_o)}
                    </p>
                </div>

                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700 col-span-2">
                    <p className="text-zinc-400">Vagas Disponíveis</p>
                    <p className="text-zinc-100 font-medium mt-1">
                        {event.vagas ?? "-"}
                    </p>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <Link
                    href={`/eventos/${event.idevento}`}
                    className="flex-1 py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition text-center"
                >
                    Ver Detalhes
                </Link>
                <button className="flex-1 py-2 px-4 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-medium transition">
                    Inscreva-se
                </button>
            </div>
        </div>
    );
}
