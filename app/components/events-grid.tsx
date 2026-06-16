"use client";

import Link from "next/link";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import EventModal from "./event-modal";

interface Endereco {
    idendere_o: number;
    cidade: string;
    bairro: string;
    rua: string;
    cep: string;
    apartamento?: string | null;
    numero?: string | null;
}

interface Evento {
    idevento: number;
    nome?: string | null;
    data?: string | null;
    horarioInicio?: string | null;
    horarioFim?: string | null;
    descricao?: string | null;
    vagas?: number | null;
    publicado: number;
    status: string;
    endere_o?: Endereco | null;
}

function formatDate(data?: string | null, horarioInicio?: string | null): string {
    if (!data) return "Data a confirmar";
    const d = new Date(data);
    const formatted = d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    return horarioInicio ? `${formatted} · ${horarioInicio}` : formatted;
}

function formatLocal(endereco?: Endereco | null): string {
    if (!endereco) return "Local a confirmar";
    const parts = [endereco.rua, endereco.numero, endereco.bairro, endereco.cidade].filter(Boolean);
    return parts.join(", ");
}

const CalendarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const LocIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export default function EventsGrid() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const [events, setEvents] = React.useState<Evento[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [activeDescription, setActiveDescription] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetch("/api/eventos/carrossel")
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar eventos");
                return res.json();
            })
            .then((data: Evento[]) => setEvents(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="section-events">Carregando eventos...</p>;
    if (error) return <p className="section-events">Erro: {error}</p>;
    if (events.length === 0) return <p className="section-events">Nenhum evento disponível.</p>;

    return (
        <section className="section-events">
            <div className="section-header">
                <h2 className="section-title">
                    Eventos <span>em destaque</span>
                </h2>
                <Link href="#" className="ver-todos">
                    Ver todos os eventos <span>→</span>
                </Link>
            </div>
            <div className="cards-wrapper">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {events.map((event) => (
                            <div key={event.idevento} className="embla__slide card">
                                <div className="card-img">
                                    <div className="card-img-inner">🌱</div>
                                </div>
                                <div className="card-body">
                                    <span className="tag">{event.status}</span>
                                    <h3 className="card-title">{event.nome ?? "Sem título"}</h3>
                                    <div className="card-info">
                                        <div className="card-info-item">
                                            <CalendarIcon />
                                            {formatDate(event.data, event.horarioInicio)}
                                        </div>
                                        <div className="card-info-item">
                                            <LocIcon />
                                            <span>{formatLocal(event.endere_o)}</span>
                                        </div>
                                    </div>
                                    <p className="vagas">
                                        {event.vagas != null ? `${event.vagas} vagas disponíveis` : "Vagas ilimitadas"}
                                    </p>
                                    <button
                                        className="btn-detalhes"
                                        onClick={() => setActiveDescription(event.descricao ?? "")}
                                    >
                                        Ver detalhes
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="arrow-btn arrow-left" onClick={scrollPrev}>‹</div>
                <div className="arrow-btn arrow-right" onClick={scrollNext}>›</div>
            </div>
            {activeDescription !== null && (
                <EventModal
                    descricao={activeDescription}
                    onClose={() => setActiveDescription(null)}
                />
            )}
        </section>
    );
}