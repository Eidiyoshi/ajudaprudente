import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/usuario";
import { error } from "console";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const result = await getUsuarioLogado();
    if (!result.ok) {
        return Response.json(
            { error: result.error},
            { status: result.status }
        );
    }

    if (result.usuario.tipoUsuario !== "voluntario") {
        return Response.json(
            { error: "Apenas voluntários podem se inscrever em eventos." },
            { status: 403 }
        );
    }

    const voluntarioId = result.usuario.idusuarios;

    const eventoId = Number(id);
    if (!Number.isInteger(eventoId) || eventoId <= 0) {
        return Response.json(
            { error: "Invalid evento ID." },
            { status: 404 }
        );
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
                voluntario: voluntarioId,
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
            voluntario: voluntarioId,
            evento: eventoId,
            data: new Date(),
        },
    });

    return Response.json(inscricao, { status: 201});
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getUsuarioLogado();

    if (!result.ok) {
        return Response.json({ error: result.error }, { status: result.status });
    }

    if (result.usuario.tipoUsuario !== "voluntario") {
        return Response.json({ error: "Apenas voluntários podem cancelar inscrições."}, { status: 403 });
    }

    const voluntarioId = result.usuario.idusuarios
    const eventoId = Number(id);

    try {
        await prisma.inscricao.delete({
            where: {
                voluntario_evento: {
                    voluntario: voluntarioId,
                    evento: eventoId,
                },
            },
        });
        return Response.json({ sucess: true });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Erro ao cancelar inscrição." }, { status: 500 });
    }
}