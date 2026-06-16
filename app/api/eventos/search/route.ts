import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const query = new URL(request.url).searchParams.get("q") ?? "";

    const eventos = await prisma.evento.findMany({
        where: {
            OR: [
                { nome: { contains: query } },
                { descricao: { contains: query } },
            ],
        },
        include: { endere_o: true },
        orderBy: { data: "desc" },
    });

    return NextResponse.json(eventos);
}