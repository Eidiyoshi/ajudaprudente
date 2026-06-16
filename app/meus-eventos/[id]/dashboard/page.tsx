"use client";

import React, { use } from "react";
import Link from "next/link";
import { useDashboardLogic } from "./logic";
import { EventWordCloud } from "@/app/components/word-cloud";

interface DashboardProps {
    params: Promise<{
        id: string;
    }>;
}

export default function DashboardPage({ params }: DashboardProps) {
    const resolvedParams = use(params);
    const eventId = resolvedParams.id;
    const { wordCloudData, histogramMetrics, comments, loading, error } =
        useDashboardLogic(eventId);

    return (
        <div className="min-h-screen bg-zinc-900 p-6 md:p-10 font-sans text-zinc-100">
            <div className="max-w-6xl mx-auto">
                {/* Header com botão de voltar integrado */}
                <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 text-sm text-zinc-400 mb-2">
                            <Link
                                href="/meus-eventos"
                                className="hover:text-zinc-200 transition-colors"
                            >
                                Meus Eventos
                            </Link>
                            <span>/</span>
                            <span className="text-zinc-500">
                                Dashboard #{eventId}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">
                            Painel de Avaliação do Evento
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            Métricas detalhadas e feedbacks coletados dos
                            voluntários.
                        </p>
                    </div>

                    <div>
                        <Link
                            href="/meus-eventos"
                            className="px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors border border-zinc-700"
                        >
                            Voltar para lista
                        </Link>
                    </div>
                </header>

                {error && (
                    <div className="bg-red-950 border border-red-800 text-red-200 p-4 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
                        <span className="text-zinc-400 text-sm font-medium">
                            Processando dados e revisões...
                        </span>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Grid superior: Word Cloud + Histogramas */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* PAINEL 1: Nuvem de Palavras */}
                            <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 flex flex-col">
                                <h2 className="text-lg font-bold text-zinc-100 mb-1">
                                    Nuvem de Palavras
                                </h2>
                                <p className="text-xs text-zinc-400 mb-6">
                                    Termos mais citados em pontos positivos e
                                    negativos.
                                </p>

                                <div className="flex-1 bg-zinc-900 rounded-lg border border-dashed border-zinc-700 p-4 min-h-[300px] flex items-center justify-center">
                                    <EventWordCloud words={wordCloudData} />
                                </div>
                            </div>

                            {/* PAINEL 2: Histogramas */}
                            <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                                <h2 className="text-lg font-bold text-zinc-100 mb-1">
                                    Distribuição de Notas
                                </h2>
                                <p className="text-xs text-zinc-400 mb-6">
                                    Frequência acumulada das notas de satisfação
                                    geral (1 a 5).
                                </p>

                                {histogramMetrics ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                                                Satisfação Geral
                                            </h3>
                                            <div className="space-y-2.5">
                                                {histogramMetrics.satisfacaoGeral.map(
                                                    (item) => (
                                                        <div
                                                            key={item.nota}
                                                            className="flex items-center text-xs"
                                                        >
                                                            <span className="w-12 text-zinc-400 font-medium">
                                                                Nota {item.nota}
                                                            </span>
                                                            <div className="flex-1 h-4 bg-zinc-900 rounded mx-3 overflow-hidden">
                                                                <div
                                                                    className="h-full bg-emerald-600 rounded transition-all duration-500"
                                                                    style={{
                                                                        width: `${Math.min(item.quantidade * 10, 100)}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="w-6 text-right font-bold text-zinc-300">
                                                                {
                                                                    item.quantidade
                                                                }
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-zinc-500 text-xs text-center py-12">
                                        Nenhum dado numérico registrado.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* PAINEL 3: Comentários na Íntegra */}
                        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                            <h2 className="text-lg font-bold text-zinc-100 mb-1">
                                Feedbacks dos Voluntários
                            </h2>
                            <p className="text-xs text-zinc-400 mb-6 font-normal">
                                Relatos dissertativos divididos por experiência.
                            </p>

                            <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
                                {comments.length === 0 ? (
                                    <p className="text-zinc-500 text-xs text-center py-12">
                                        Nenhum comentário enviado para este
                                        evento.
                                    </p>
                                ) : (
                                    comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 flex flex-col gap-3 hover:border-zinc-700 transition-colors"
                                        >
                                            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                                <span className="font-semibold text-zinc-300 text-sm">
                                                    {comment.voluntarioNome}
                                                </span>
                                                <span className="text-xs text-zinc-500">
                                                    {new Date(
                                                        comment.criado,
                                                    ).toLocaleDateString(
                                                        "pt-BR",
                                                    )}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                                {comment.pontosPositivos && (
                                                    <div className="bg-emerald-950/30 p-3 rounded border border-emerald-900/50">
                                                        <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
                                                            Pontos Positivos
                                                        </span>
                                                        <p className="text-zinc-300 leading-relaxed">
                                                            {
                                                                comment.pontosPositivos
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                {comment.pontosNegativos && (
                                                    <div className="bg-rose-950/30 p-3 rounded border border-rose-900/50">
                                                        <span className="block text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">
                                                            Pontos Negativos
                                                        </span>
                                                        <p className="text-zinc-300 leading-relaxed">
                                                            {
                                                                comment.pontosNegativos
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
