"use client";

import { useState, useEffect } from "react";

export interface WordFreq {
    text: string;
    value: number;
}

export interface HistogramData {
    nota: number;
    quantidade: number;
}

export interface MetricHistograms {
    satisfacaoGeral: HistogramData[];
    organizacao: HistogramData[];
    comunicacao: HistogramData[];
}

export interface EventComment {
    id: number;
    voluntarioNome: string;
    pontosPositivos: string | null;
    pontosNegativos: string | null;
    criado: string;
}

export function useDashboardLogic(eventId: string) {
    const [wordCloudData, setWordCloudData] = useState<WordFreq[]>([]);
    const [histogramMetrics, setHistogramMetrics] =
        useState<MetricHistograms | null>(null);
    const [comments, setComments] = useState<EventComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) return;

        async function fetchDashboardData() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/eventos/${eventId}/review`);

                if (!response.ok) {
                    throw new Error("Falha ao carregar os dados do painel.");
                }

                const data = await response.json();

                setWordCloudData(data.wordCloud || []);
                setHistogramMetrics(data.histograms || null);
                setComments(data.comments || []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Erro inesperado.",
                );
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, [eventId]);

    return {
        wordCloudData,
        histogramMetrics,
        comments,
        loading,
        error,
    };
}
