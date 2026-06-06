import Link from "next/link";

const mockEvents = [
    {
        id: 1,
        emoji: "🌳",
        tag: "Meio Ambiente",
        title: "Mutirão de Plantio de Árvores",
        date: "08 de Jun, 2026 · 08:00",
        local: "Parque do Povo, Presidente Prudente – SP",
        vagas: 8,
    },
    {
        id: 2,
        emoji: "🌱",
        tag: "Meio Ambiente",
        title: "Oficina de Hortas Comunitárias",
        date: "12 de Jun, 2026 · 09:00",
        local: "Centro Cultural, Prudente – SP",
        vagas: 5,
    },
    {
        id: 3,
        emoji: "♻️",
        tag: "Meio Ambiente",
        title: "Reciclagem no Bairro",
        date: "15 de Jun, 2026 · 14:00",
        local: "Praça Central, Prudente – SP",
        vagas: 12,
    },
    {
        id: 4,
        emoji: "🌿",
        tag: "Meio Ambiente",
        title: "Preservação de Nascentes",
        date: "20 de Jun, 2026 · 07:30",
        local: "Área Rural, Prudente – SP",
        vagas: 3,
    },
];

const CalendarIcon = () => (
    <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const LocIcon = () => (
    <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export default function EventsGrid() {
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
                <div className="cards-grid">
                    {mockEvents.map((event) => (
                        <div key={event.id} className="card">
                            <div className="card-img">
                                <div className="card-img-inner">
                                    {event.emoji}
                                </div>
                            </div>
                            <div className="card-body">
                                <span className="tag">{event.tag}</span>
                                <h3 className="card-title">{event.title}</h3>
                                <div className="card-info">
                                    <div className="card-info-item">
                                        <CalendarIcon />
                                        {event.date}
                                    </div>
                                    <div className="card-info-item">
                                        <LocIcon />
                                        <span>{event.local}</span>
                                    </div>
                                </div>
                                <p className="vagas">
                                    {event.vagas} vagas disponíveis
                                </p>
                                <button className="btn-detalhes">
                                    Ver detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="arrow-btn">›</div>
            </div>
        </section>
    );
}
