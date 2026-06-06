export default function Newsletter() {
    return (
        <section className="section-newsletter">
            <div className="newsletter-left">
                <div className="mail-icon">
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                </div>
                <div>
                    <h2>Receba eventos incríveis no seu email</h2>
                    <p>
                        Cadastre-se e fique por dentro das melhores
                        oportunidades para se voluntariar
                    </p>
                </div>
            </div>

            <div className="newsletter-form">
                <input type="email" placeholder="Seu email" />
                <button className="btn-receber">Quero Receber</button>
            </div>
        </section>
    );
}
