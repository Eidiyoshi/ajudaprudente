import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { getSessionUser } from "@/lib/session";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const eventId = Number(params.id);

    if (isNaN(eventId)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const sessionUser = await getSessionUser();
    const voluntarioId = sessionUser?.userId

    if (!voluntarioId) {
        return NextResponse.json({ error: "Não autenticado."}, { status: 401 });
    }

    const body = await req.json();
    const {
        organizacao,
        comunicacao,
        clarezaAtividadesDesempenhadas,
        apoioEquipe,
        satisfacaoGeral,
        interesseVoluntariarNovamente,
        pontosPositivos,
        pontosNegativos,
    } = body;

    const campos = { organizacao, comunicacao, clarezaAtividadesDesempenhadas, apoioEquipe, satisfacaoGeral, interesseVoluntariarNovamente };
    for (const [key, value] of Object.entries(campos)) {
        if (!value || value < 1 || value > 5) {
            return NextResponse.json(
                { error: `Campo "${key}" deve ser entre 1 e 5.` },
                { status: 400 }
            );
        }
    }

    try {
        const avaliacao = await prisma.avaliacao_evento.create({
            data: {
                evento: eventId,
                voluntario: Number(voluntarioId),
                organizacao,
                comunicacao,
                clarezaAtividadesDesempenhadas,
                apoioEquipe,
                satisfacaoGeral,
                interesseVoluntariarNovamente,
                pontosPositivos: pontosPositivos?.trim() || null,
                pontosNegativos: pontosNegativos?.trim() || null,
            },
        });

        return NextResponse.json(avaliacao, { status: 201 });
    } catch (e: unknown) {
        if (e instanceof Error && 'code' in e && e.code === "P2002") {
            return NextResponse.json(
                { error: "Você já avaliou este evento." },
                { status: 409 }
            );
        }
        return NextResponse.json({ error: "Erro interno." }, { status: 500 });
    }
}