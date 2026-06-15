"use client";

import Link from "next/link";

export function NotSubscribedScreen() {
    return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-zinc-100">
                Nenhuma inscrição encontrada
            </h2>
            <p className="text-zinc-400 mt-2">
                Você ainda não se inscreveu em nenhum evento.
            </p>
            <Link
                href="/eventos"
                className="inline-block mt-4 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
            >
                Explorar eventos
            </Link>
        </div>
    );
}