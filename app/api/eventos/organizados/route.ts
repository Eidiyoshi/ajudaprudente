import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET() {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
        return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    try {
        const eventos = await prisma.evento.findMany({
            where: { organizador: sessionUser.userId },
            include: { endere_o: true },
        });

        return NextResponse.json(eventos);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar eventos." }, { status: 500 });
    }
}