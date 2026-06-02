"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
    const pathname = usePathname();
    const navLinks = [
        { href: "/eventos-disponiveis", label: "Eventos Disponíveis" },
        { href: "/eventos", label: "Meus Eventos" },
        { href: "/registrar_evento", label: "Criar Evento" },
        { href: "/perfil", label: "Perfil" },
    ]

    return (
        <nav className="w-full bg-zinc-900 border-b border-zinc-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <Link href="/" className="text-zinc-100 font-bold text-xl tracking-tight">
          ajudaprudente
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
    );
}