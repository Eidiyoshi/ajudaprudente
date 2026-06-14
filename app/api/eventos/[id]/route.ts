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