import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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

    return NextResponse.json(
      { error: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}