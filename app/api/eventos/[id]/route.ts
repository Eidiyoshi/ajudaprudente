import { prisma } from "@/lib/prisma";

type RouteParams = {
  id: string;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<RouteParams> }
) {
  const { id } = await params;
  const idevento = Number(id);

  if (!Number.isInteger(idevento) || idevento <= 0) {
    return Response.json({ error: "ID do evento inválido." }, { status: 400 });
  }

  const evento = await prisma.evento.findUnique({
    where: { idevento },
    include: {
      endere_o: true,
    },
  });

  if (!evento) {
    return Response.json({ error: "Evento não encontrado." }, { status: 404 });
  }

  return Response.json(evento);
}
