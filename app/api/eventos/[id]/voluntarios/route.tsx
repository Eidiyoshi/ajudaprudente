import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const eventoID = parseInt(id, 10);

  if (isNaN(eventoID)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const inscricoes = await prisma.inscricao.findMany({
      where: { evento: eventoID },
      include: {
        voluntario_inscricao_voluntario_voluntario_voluntarioTovoluntario: {
          select: {
            nome: true,
            email: true,
            telefone: true,
          },
        },
      },
    });

    const voluntarios = inscricoes.map((i) => ({
      ...i.voluntario_inscricao_voluntario_voluntario_voluntarioTovoluntario,
      inscritoEm: i.data,
    }));

    return NextResponse.json(voluntarios);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar voluntários" },
      { status: 500 }
    );
  }
}