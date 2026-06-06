"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const PersonIcon = () => (
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
);

const handleLogout = () => {
    console.log("Logging out...");
    // For my dear backend devs... fix this please
};

interface UserApiSession {
    user: {
        id: string;
        nome: string;
        email: string;
        userKind: string;
    };
    expires: string;
}

export default function NavBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const [session, setSession] = useState<UserApiSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function carregarSessao() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/usuario", { method: "GET" });
                const data = await res.json();

                if (!res.ok || !isMounted) {
                    setSession(null);
                    return;
                }
                setSession({
                    user: {
                        id: data.id ?? "",
                        nome: data.nome,
                        email: data.email,
                        userKind: data.userKind ?? "visitante",
                    },
                    expires: "",
                });
            } catch (err) {
                console.error("Erro ao carregar sessão no Navbar:", err);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        void carregarSessao();

        return () => {
            isMounted = false;
        };
    }, []);

    const user = session?.user;
    const isLoggedIn = !!user;
    const currentUserKind = user?.userKind || "visitante";

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        {
            name: isLoggedIn
                ? user?.userKind === "organizador"
                    ? "Meus Eventos"
                    : "Minhas Inscrições"
                : "Todos os Eventos",
            href: "/Eventos",
        },
        {
            name: "Registrar Eventos",
            href: "/registrar-evento",
            allowedRoles: ["organizador"],
        },
    ];

    const visibleLinks = navLinks.filter((link) => {
        if (!link.allowedRoles) return true;
        if (!isLoggedIn) return false;
        return link.allowedRoles.includes(currentUserKind);
    });

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
                    {visibleLinks.map((link) => {
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
                    {!isLoggedIn && (
                        <>
                            <Link href={"/login"}>
                                <button className="btn-login">Login</button>
                            </Link>
                            <Link href={"/registrar"}>
                                <button className="btn-cadastro">
                                    <PersonIcon />
                                    Cadastro
                                </button>
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <PersonIcon />
                            <button
                                onClick={handleLogout}
                                className="btn-logout"
                            >
                                Logout
                            </button>
                        </>
                    )}
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
                {visibleLinks.map((link) => {
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
                    {!isLoggedIn && (
                        <>
                            <Link href={"/login"}>
                                <button className="btn-login">Login</button>
                            </Link>
                            <Link href={"/registrar"}>
                                <button className="btn-cadastro">
                                    <PersonIcon />
                                    Cadastro
                                </button>
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <div className="mobile-profile-wrapper">
                                <PersonIcon />
                            </div>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="btn-logout"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
