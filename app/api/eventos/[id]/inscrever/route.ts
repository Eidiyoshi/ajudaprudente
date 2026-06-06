import { prisma } from "@/lib/prisma"

type InscricaoPayload = {
    voluntario: number;
};

function isValidPayload(payload: unknown): payload is InscricaoPayload {
    if (typeof payload !== "object" || payload == null) return false;

    const body = payload as Record<string, unknown>;
    return (
        typeof body.voluntario === "number" &&
        Number.isInteger(body.voluntario) &&
        body.voluntario > 0
    );
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const eventoId = Number(params.id);
    if (!Number.isInteger(eventoId) || eventoId <= 0) {
        return Response.json(
            { error: "Invalid evento ID." },
            { status: 400 });
    }
    const body = await request.json().catch(() => null);
    if (!isValidPayload(body)) {
        return Response.json(
            { error: "Invalid request body." },
            { status: 400 });
    }

    const evento = await prisma.evento.findUnique({ where: { idevento: eventoId },});

    if (!evento) {
        return Response.json(
            { error: "Evento não encontrado." },
            { status: 404 });
    }

    if (evento.status !== "Ativo") {
        return Response.json(
            { error: "Inscrições encerradas para este evento." },
            { status: 400 }
        )
    }

    const alreadyExists = await prisma.inscricao.findUnique({
        where: {
            voluntario_evento: {
                voluntario: body.voluntario,
                evento: eventoId,
            },
        },
    });

    if (alreadyExists) {
        return Response.json(
            { error: "Voluntário já inscrito neste evento." },
            { status: 409 }
        );
    }

    if (evento.vagas !== null) {
        const totalInscritos = await prisma.inscricao.count({
            where: { evento: eventoId },
        });

        if (totalInscritos >= evento.vagas) {
            return Response.json(
                { error: "Não há vagas disponíveis para este evento." },
                { status: 400 }
            );
        }
    }

    const inscricao = await prisma.inscricao.create({
        data: {
            voluntario: body.voluntario,
            evento: eventoId,
            data: new Date(),
        },
    });

    return Response.json(inscricao, { status: 201});
}