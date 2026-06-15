import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(  
	request: Request,
  { params }: { params: Promise<{ id: string }> })
{
  const { id } = await params; 
  const eventoID = parseInt(id, 10);
  parseInt(id);
  try {
    const evento = await prisma.evento.findFirst({
      where: { idevento : eventoID  },
    });
    return NextResponse.json(evento);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar evento" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { nome, descricao, data, horarioInicio, horarioFim, status, vagas } = body;

    const evento = await prisma.evento.update({
      where: { idevento: Number(id) },
      data: {
        nome,
        descricao,
        data: data ? new Date(data) : null,
        horarioInicio,
        horarioFim,
        status,
        vagas: vagas ? Number(vagas) : null,
      },
    });

    return NextResponse.json(evento);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar evento" }, { status: 500 });
  }
}