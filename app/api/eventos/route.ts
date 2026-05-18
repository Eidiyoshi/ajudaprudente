import { PrismaClient } from "@/generated/prisma";
import { PrismaClient } from "@/generated/prisma/client";
//import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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