import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="flex flex-col justify-between gap-8 bg-black px-[7%] py-9 font-['Nunito',sans-serif] md:flex-row md:items-start">
            <div className="max-w-65">
                <div className="mb-3 flex items-center gap-2.5">
                    <Image
                        src={"/logo_2.png"}
                        alt="Ajuda Prudente"
                        width={52}
                        height={52}
                        style={{ height: "52px", width: "auto" }}
                    />
                </div>
                <p className="text-[0.8rem] leading-1.6 text-white/60">
                    Conectando pessoas a causas que transformam e construindo
                    uma comunidade mais solidária
                </p>
            </div>

            <div className="flex flex-col items-start md:items-end">
                <h3 className="mb-3.5 text-base font-bold text-white">
                    Siga-nos
                </h3>
                <div className="flex gap-3">
                    <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-[#7C3AED]"
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
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-[#7C3AED]"
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
