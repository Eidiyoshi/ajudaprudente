"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Event = {
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
}

export default function EditarEvento() {
    const params = useParams();
    const router = useRouter();
    const idevento = params?.id as string;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFim, setHorarioFim] = useState("");
    const [status, setStatus] = useState("");
    const [vagas, setVagas] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/eventos/${idevento}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Evento não encontrado');
                    } else {
                        throw new Error('Erro ao buscar Evento');
                    }
                }
                
                const data = await response.json();
                setEvent(data);
                setNome(data.nome ?? "");
                setDescricao(data.descricao ?? "");
                setData(data.data ?? "");
                setHorarioInicio(data.horarioInicio ?? "");
                setHorarioFim(data.horarioFim ?? "");
                setStatus(data.status ?? "");
                setVagas(data.vagas?.toString() ?? "");

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

    fetchEvent();
  }, [idevento]);

    const handleSave = async () => {
        setSaving(true);
        setError(null);

        try {
            const response = await fetch(`/api/eventos/${idevento}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, descricao, data, horarioInicio, horarioFim, status, vagas: Number(vagas) }),
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || "Erro ao salvar evento");
            }
            
            router.push(`/eventos/${idevento}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-zinc-400">
            Carregando...
        </div>
    );

    if (!event) return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
            Evento não encontrado
        </div>
    );

    const inputClass = "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500";
    const labelClass = "block text-sm text-zinc-400 mb-1";

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-3xl mx-auto bg-zinc-800 p-8 rounded-xl border border-zinc-700">
                <Link href="/meus-eventos" className="text-zinc-400 hover:text-white text-sm transition">
                    Voltar
                </Link>
                
                <h1 className="text-2xl font-bold text-zinc-100 mt-4 mb-6">Editar Evento</h1>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                <div className="flex flex-col gap-5">
                    <div>
                        <label className={labelClass}>Nome</label>
                        <input className={inputClass} value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Descrição</label>
                        <textarea className={inputClass} rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Data</label>
                        <input type="date" className={inputClass} value={data} onChange={(e) => setData(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Horário de Início</label>
                            <input type="time" className={inputClass} value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>Horário de Término</label>
                            <input type="time" className={inputClass} value={horarioFim} onChange={(e) => setHorarioFim(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Status</label>
                        <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Ativo">Ativo</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Encerrado">Encerrado</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Vagas</label>
                        <input type="number" className={inputClass} value={vagas} onChange={(e) => setVagas(e.target.value)} />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition disabled:opacity-50"
                    >
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </button>
                    <Link
                        href="/meus-eventos"
                        className="py-2 px-4 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white font-medium transition text-center"
                    >
                        Cancelar
                    </Link>
                </div>
            </div>
        </div>
    );
}
