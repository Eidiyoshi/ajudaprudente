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
            <nav className="sticky top-0 z-100 flex h-15 items-center justify-between bg-black px-[5%] font-['Nunito',sans-serif]">
                {/* LOGO */}
                <div className="flex shrink-0 items-center gap-2 text-lg font-black leading-[1.1] text-white">
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

                {/* NAV LINKS (DESKTOP) */}
                <ul className="hidden list-none gap-8 md:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`relative text-[0.9rem] font-normal transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#F59E0B] after:transition-transform after:duration-200 ${
                                        isActive
                                            ? "text-white after:scale-x-100"
                                            : "text-white/85 hover:text-white after:scale-x-0 hover:after:scale-x-100"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* NAV ACTIONS (DESKTOP) */}
                <div className="hidden items-center gap-2 md:flex">
                    <button className="cursor-pointer rounded-md border-[1.5px] border-[#7C3AED] bg-transparent px-5 py-1.75 text-[0.88rem] font-bold text-white transition-colors duration-200 hover:bg-[#7C3AED]">
                        Login
                    </button>
                    <button className="flex cursor-pointer items-center gap-1.5 rounded-md border-none bg-[#F59E0B] px-4.5 py-1.75 text-[0.88rem] font-bold text-[#000000] transition-colors duration-200 hover:bg-[#D97706]">
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

                {/* HAMBURGER BUTTON (MOBILE) */}
                <button
                    className="flex cursor-pointer flex-col gap-1.25 border-none bg-transparent p-1 md:hidden"
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span
                        className={`block h-0.5 w-6 rounded-xs bg-white transition-all duration-300 ${
                            isOpen ? "translate-y-1.75 rotate-45" : ""
                        }`}
                    ></span>
                    <span
                        className={`block h-0.5 w-6 rounded-xs bg-white transition-all duration-300 ${
                            isOpen ? "opacity-0" : ""
                        }`}
                    ></span>
                    <span
                        className={`block h-0.5 w-6 rounded-xs bg-white transition-all duration-300 ${
                            isOpen ? "-translate-y-1.75 -rotate-45" : ""
                        }`}
                    ></span>
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div
                className={`${
                    isOpen ? "flex" : "hidden"
                } flex-col gap-3 bg-[#111111] px-[5%] py-4 font-['Nunito',sans-serif] md:hidden`}
            >
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                            className={`border-b border-white/5 py-1.5 text-[0.95rem] font-semibold ${
                                isActive ? "text-[#F59E0B]" : "text-white/85"
                            }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
                <div className="flex gap-2 pt-2">
                    <button className="w-full cursor-pointer rounded-6px border-[1.5px] border-[#7C3AED] bg-transparent py-1.75 text-[0.88rem] font-bold text-white transition-colors duration-200 hover:bg-[#7C3AED]">
                        Login
                    </button>
                    <button className="w-full cursor-pointer rounded-6px border-none bg-[#F59E0B] py-1.75 text-[0.88rem] font-bold text-[#000000] transition-colors duration-200 hover:bg-[#D97706]">
                        Cadastro
                    </button>
                </div>
            </div>
        </>
    );
}
