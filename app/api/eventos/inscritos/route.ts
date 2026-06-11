import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET() {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
        return NextResponse.json({ error: "Não autenticado." }, { status: 401});
    }

    try {
        const inscricoes = await prisma.inscricao.findMany({
            where: { voluntario: sessionUser.userId },
            include: {
                evento_inscricao_eventoToevento: {
                    include: { endere_o: true },
                },
            },
        });

        const eventos = inscricoes.map((i) => i.evento_inscricao_eventoToevento);

        return NextResponse.json(eventos);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar inscrições." }, { status: 500 });
    }
}