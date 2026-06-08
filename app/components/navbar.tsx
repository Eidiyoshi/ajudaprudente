"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    getUserSession,
    logoutUser,
    UserApiSession,
} from "../lib/session.client";

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

export default function NavBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState<UserApiSession | null>(null);
    const [, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getUserSession()
            .then((data) => {
                if (isMounted) setSession(data);
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        setSession(null);
        window.location.href = "/login";
    };

    const user = session?.user;
    const isLoggedIn = !!user;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        {
            name: "Todos os Eventos",
            href: "/eventos",
        },
        ...(isLoggedIn && user?.userKind === "organizador"
            ? [
                  {
                      name: "Dashboard",
                      href: "/dashboard",
                  },
                  {
                      name: "Meus Eventos",
                      href: "/meus-eventos",
                  },
              ]
            : isLoggedIn
              ? [
                    {
                        name: "Minhas Inscrições",
                        href: "/minhas-inscricoes",
                    },
                ]
              : []),
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
                    {!isLoggedIn && (
                        <Link href={"/login"}>
                            <button className="btn-login">Login</button>
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <Link href={"/registrar"}>
                            <button className="btn-cadastro">
                                <PersonIcon />
                                Cadastro
                            </button>
                        </Link>
                    )}
                    {isLoggedIn && (
                        <>
                            <button
                                onClick={handleLogout}
                                className="btn-logout"
                            >
                                Logout
                            </button>
                            <Link href="/perfil" aria-label="Meu Perfil">
                                <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                                    <PersonIcon />
                                </button>
                            </Link>
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
                    {!isLoggedIn && (
                        <Link href={"/login"}>
                            <button className="btn-login">Login</button>
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <Link href={"/registrar"}>
                            <button className="btn-cadastro">
                                <PersonIcon />
                                Cadastro
                            </button>
                        </Link>
                    )}
                    {isLoggedIn && (
                        <>
                            <div className="mobile-profile-wrapper"></div>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="btn-logout"
                            >
                                Logout
                            </button>
                            <Link href="/perfil" aria-label="Meu Perfil">
                                <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black">
                                    <PersonIcon />
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
