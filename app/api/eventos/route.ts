import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


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