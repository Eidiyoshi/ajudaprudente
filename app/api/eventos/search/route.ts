import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const query = new URL(request.url).searchParams.get("q") ?? "";
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
        where: {
            OR: [
                { nome: { contains: query } },
                { descricao: { contains: query } },
            ],
        },
        include: {
            endere_o: true,
            _count: {
                select: {
                    inscricao_inscricao_eventoToevento: true,
                },
            },
        },
        orderBy: { data: "desc" },
    });

    const eventosFormatados = eventos.map(({ _count, ...evento }) => {
            const totalInscritos = _count?.inscricao_inscricao_eventoToevento ?? 0;
            return {
                ...evento,
                vagas: evento.vagas !== null ? Math.max(0, evento.vagas - totalInscritos) : null
            }
        });

    return NextResponse.json(eventosFormatados);
}