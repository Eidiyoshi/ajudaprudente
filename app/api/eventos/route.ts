import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "@/generated/prisma/enums"

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany({
      include: {
        endere_o: true,
      },
    });

    return NextResponse.json(eventos);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const evento = await prisma.evento.create({
      data: {
        nome: body.nome,
        descricao: body.descricao,
        data: new Date(body.data),
        horarioInicio: body.horarioInicio,
        horarioFim: body.horarioFim,
        local: body.local,
        vagas: body.status ?? Status.Rascunho,
        organizador: body.organizador,
      },
    });
    return NextResponse.json(evento, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar evento"}, { status: 500 });
  }
}