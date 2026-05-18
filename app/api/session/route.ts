import { getSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return Response.json({ error: "Não autenticado." }, { status: 401 });
  }

  if (sessionUser.tipoUsuario === "voluntario") {
    const voluntario = await prisma.voluntario.findUnique({
      where: { idusuarios: sessionUser.userId },
      select: { idusuarios: true, nome: true, email: true },
    });

    if (!voluntario) {
      return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    return Response.json(
      {
        id: voluntario.idusuarios,
        nome: voluntario.nome,
        email: voluntario.email,
        tipoUsuario: "voluntario",
      },
      { status: 200 }
    );
  }

  const organizador = await prisma.organizador.findUnique({
    where: { idorganizador: sessionUser.userId },
    select: { idorganizador: true, nome: true, email: true },
  });

  if (!organizador) {
    return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  return Response.json(
    {
      id: organizador.idorganizador,
      nome: organizador.nome,
      email: organizador.email,
      tipoUsuario: "organizador",
    },
    { status: 200 }
  );
}
