import Link from "next/link";

export function EventosHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-100">Eventos</h1>
                <p className="text-zinc-400 mt-1">Visualize e gerencie os eventos cadastrados.</p>
                <div className="flex gap-3 mt-4">
                    <Link
                        href="/eventos/organizados"
                        className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                        Meus Eventos
                    </Link>
                </div>
            </div>
        </div>
    );
}