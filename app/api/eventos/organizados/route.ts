import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET() {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
        return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    try {
        await prisma.evento.updateMany({
                where: {
                    status: "Ativo",
                    data: {
                        lt: new Date()
                    }
                },
                data: {
                    status: "Encerrado"
                }
            });
        const eventos = await prisma.evento.findMany({
            where: { organizador: sessionUser.userId },
            include: {
                endere_o: true,
                _count: {
                    select: {
                        inscricao_inscricao_eventoToevento: true,
                    },
                },
             },
        });

        const eventosFormatados = eventos.map(({ _count, ...evento }) => {
            const totalInscritos = _count?.inscricao_inscricao_eventoToevento ?? 0;
            return {
                ...evento,
                vagas: evento.vagas !== null ? Math.max(0, evento.vagas - totalInscritos) : null
            }
        });

        return NextResponse.json(eventosFormatados);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar eventos." }, { status: 500 });
    }
}