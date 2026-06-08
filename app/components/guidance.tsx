const mockSteps = [
    {
        title: "Encontre um Evento",
        description: "Busque por uma Causa ou evento que combine com você",
        icon: (
            <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        title: "Veja os detalhes",
        description:
            "Confira informações sobre o evento, local e vagas disponíveis",
        icon: (
            <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
        ),
    },
    {
        title: "Inscreva-se",
        description:
            "Garanta a sua vaga e receba todas as informações por e-mail",
        icon: (
            <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
        ),
    },
    {
        title: "Participe e transforme",
        description: "Participe do evento e faça a diferença na comunidade",
        icon: (
            <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
];

export default function Guidance() {
    return (
        <section className="section-how">
            <h2 className="how-title">
                Como <span>Funciona</span>
            </h2>

            <div className="how-steps">
                {mockSteps.map((step, index) => (
                    <div key={index} className="step">
                        <div className="step-icon-wrap">
                            <div className="step-num">{index + 1}</div>
                            <div className="step-icon">{step.icon}</div>
                        </div>
                        <div className="step-text">
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
