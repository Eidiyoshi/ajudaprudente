"use client";

import { useEffect, useState } from "react";

const CRITERIOS = [
  { key: "organizacao",                     label: "Organização" },
  { key: "comunicacao",                     label: "Comunicação" },
  { key: "clarezaAtividadesDesempenhadas",  label: "Clareza das atividades" },
  { key: "apoioEquipe",                     label: "Apoio da equipe" },
  { key: "satisfacaoGeral",                 label: "Satisfação geral" },
  { key: "interesseVoluntariarNovamente",   label: "Voltaria a se voluntariar?" },
] as const;

type Ratings = Record<typeof CRITERIOS[number]["key"], number>;

const initialRatings: Ratings = {
  organizacao: 0,
  comunicacao: 0,
  clarezaAtividadesDesempenhadas: 0,
  apoioEquipe: 0,
  satisfacaoGeral: 0,
  interesseVoluntariarNovamente: 0,
};

export function EventReviewPopup({
        eventId,
        onClose,
        onSuccess
    } : {
        eventId: number;
        onClose: () => void;
        onSuccess: () => void;
    }) {
    const [ratings, setRatings] = useState<Ratings>(initialRatings);
    const [pontosPositivos, setPontosPositivos] = useState("");
    const [pontosNegativos, setPontosNegativos] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const allRated = Object.values(ratings).every((v) => v > 0);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/eventos/${eventId}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...ratings, pontosPositivos, pontosNegativos }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Erro ao realizar avaliação.");
            }

            onSuccess();
            onClose();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erro desconhecido.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Avaliar evento</h2>
                <p className="mt-1 text-sm text-zinc-500">Avalie os critérios abaixo de 1 a 5.</p>

                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    {CRITERIOS.map(({ key, label }) => (
                        <div key={key}>
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
                            <div className="mt-1 flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setRatings((prev) => ({ ...prev, [key]: star }))} className={`text-2xl trasition ${star <= ratings[key] ? "text-yellow-400" : "text-zinc-300"}`}>★</button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Pontos positivos</label>
                        <textarea
                            value={pontosPositivos}
                            onChange={(e) => setPontosPositivos(e.target.value)}
                            placeholder="O que foi bom no evento?"
                            rows={2}
                            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Pontos negativos</label>
                        <textarea
                            value={pontosNegativos}
                            onChange={(e) => setPontosNegativos(e.target.value)}
                            placeholder="O que poderia melhorar?"
                            rows={2}
                            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        />
                    </div>
                
                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}

                    <button type="submit" disabled={loading || !allRated} className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900">{loading ? "Enviando..." : "Enviar avaliação"}</button>
                </form>
            
                <button onClick={onClose} className="mt-3 w-full rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">Cancelar</button>
            </div>
        </div>
    );
}

export function EventVolunteerPopup({
    eventId,
    onClose,
}: {
    eventId: number;
    onClose: () => void;
}) {
    const [volunteers, setVolunteers] = useState<
        { idusuarios: number; nome: string; email: string; telefone: string | null; inscritoEm: string }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null> (null);

    useEffect(() => {
        fetch(`/api/eventos/${eventId}/voluntarios`)
        .then((res) => {
            if (!res.ok) throw new Error("Erro ao buscar voluntários.");
            return res.json();
        })
        .then(setVolunteers)
        .catch((e: unknown) => setError(e instanceof Error ? e.message : "Erro desconhecido"))
        .finally(() => setLoading(false));
    }, [eventId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-lg mx-4 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-zinc-100">Voluntários Inscritos</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-100 text-xl leading-none">✕</button>
                </div>

                {loading && <p className="text-zinc-400 text-center py-6">Carregando...</p>}
                {error && <p className="text-red-400 text-center py-6">{error}</p>}

                {!loading && !error && volunteers.length === 0 && (
                    <p className="text-zinc-400 text-center py-6">Nenhum voluntário inscrito ainda.</p>
                )}

                {!loading && !error && volunteers.length > 0 && (
                    <ul className="divide-y divide-zinc-700 max-h-80 overflow-y-auto">
                        {volunteers.map((v) => (
                            <li key={v.idusuarios ?? v.email} className="py-3 flex flex-col gap-0.5">
                                <span className="text-zinc-100 font-medium">{v.nome}</span>
                                <span className="text-zinc-400 text-sm">{v.email}</span>
                                {v.telefone && (
                                    <span className="text-zinc-400 text-sm">{v.telefone}</span>
                                )}
                                <span className="text-zinc-500 text-xs">
                                    Inscrito em {new Date(v.inscritoEm).toLocaleDateString("pt-BR")}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white text-sm"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}