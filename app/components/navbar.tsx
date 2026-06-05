"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: "Registrar Eventos", href: "/registrar-evento" },
        { name: "Eventos", href: "/Eventos" },
    ];

    return (
        <>
            <nav>
                <div className="logo">
                    <Link href={"/"}>
                        <Image
                            src={"/logo.png"}
                            alt="Ajuda Prudente"
                            width={150}
                            height={42}
                            style={{ height: "42px", width: "auto" }}
                            priority
                        />
                    </Link>
                </div>

                <ul className="nav-links">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={isActive ? "active" : ""}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="nav-actions">
                    <button className="btn-login">Login</button>
                    <button className="btn-cadastro">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Cadastro
                    </button>
                </div>

                <button
                    className={`hamburger ${isOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                            className={isActive ? "active" : ""}
                        >
                            {link.name}
                        </Link>
                    );
                })}
                <div className="mob-actions">
                    <button className="btn-login">Login</button>
                    <button className="btn-cadastro">Cadastro</button>
                </div>
            </div>
        </>
    );
}
