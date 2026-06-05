import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <div className="footer-brand">
                <div className="footer-logo">
                    <Image
                        src={"/logo_2.png"}
                        alt="Ajuda Prudente"
                        width={52}
                        height={52}
                        style={{ height: "52px", width: "auto" }}
                    />
                </div>
                <p>
                    Conectando pessoas a causas que transformam e construindo
                    uma comunidade mais solidária
                </p>
            </div>

            <div className="footer-social">
                <h3>Siga-nos</h3>
                <div className="social-links">
                    <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Facebook"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </Link>
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Instagram"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="2"
                                y="2"
                                width="20"
                                height="20"
                                rx="5"
                                ry="5"
                            />
                            <circle cx="12" cy="12" r="4" />
                            <circle
                                cx="17.5"
                                cy="6.5"
                                r="0.5"
                                fill="currentColor"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
