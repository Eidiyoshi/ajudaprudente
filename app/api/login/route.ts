import { createSession, isSessionSecretConfigured } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { parseJsonBody } from "@/app/api/lib/request";

type TipoUsuario = "voluntario" | "organizador";

type LoginPayload = {
  email: string;
  senha: string;
  tipoUsuario: TipoUsuario;
};

function isValidPayload(payload: unknown): payload is LoginPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const body = payload as Record<string, unknown>;

  return (
    typeof body.email === "string" &&
    body.email.trim().length > 0 &&
    typeof body.senha === "string" &&
    body.senha.trim().length > 0 &&
    (body.tipoUsuario === "voluntario" || body.tipoUsuario === "organizador")
  );
}

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request);
  if ("error" in parsed) return parsed.error;
  const payload = parsed.payload;

  if (!isValidPayload(payload)) {
    return Response.json({ error: "Invalid login payload." }, { status: 400 });
  }

  if (!isSessionSecretConfigured()) {
    return Response.json(
      { error: "Session secret is not configured on the server." },
      { status: 500 }
    );
  }

  const email = payload.email.trim();
  const senha = payload.senha;

  if (payload.tipoUsuario === "voluntario") {
    const voluntario = await prisma.voluntario.findFirst({
      where: { email },
      select: { idusuarios: true, nome: true, email: true, senha: true },
    });

    if (!voluntario) {
      return Response.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    if (voluntario.senha !== senha) {
      return Response.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    await createSession({
      userId: voluntario.idusuarios,
      tipoUsuario: "voluntario",
    });

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

  const organizador = await prisma.organizador.findFirst({
    where: { email },
    select: { idorganizador: true, nome: true, email: true, senha: true },
  });

  console.log("Looking for:", email);
    console.log("Found:", organizador);

  if (!organizador) {
    return Response.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  if (organizador.senha !== senha) {
    return Response.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  await createSession({
    userId: organizador.idorganizador,
    tipoUsuario: "organizador",
  });

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
