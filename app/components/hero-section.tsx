"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const SearchIcon = () => (
    <svg
        width="18"
        height="18"
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
);

export default function HeroSection() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        const query = inputRef.current?.value.trim();
        if (!query) return;
        router.push(`/eventos?q=${encodeURIComponent(query)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <section className="hero">
            {/* Hero Left */}
            <div className="hero-left">
                <h1>
                    Conectando pessoas <span>a causas que transformam</span>
                </h1>
                <p>
                    Encontre eventos voluntários incríveis perto de você e faça
                    a diferença na vida de muitas pessoas
                </p>

                {/* Barra de Pesquisa */}
                <div className="search-bar">
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Buscar eventos, causas ou instituições"
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn-buscar" onClick={handleSearch}>
                        Buscar
                    </button>
                </div>
            </div>

            {/* Hero Right */}
            <div className="hero-right">
                <Image
                    src={"/voluntarios.png"}
                    alt="Voluntários organizando doações"
                    width={1920}
                    height={1080}
                    className="h-full w-full object-cover object-top"
                    loading="eager"
                />
            </div>
        </section>
    );
}
