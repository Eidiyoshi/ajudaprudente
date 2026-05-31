import { parseJsonBody } from "@/app/api/lib/request";
import { prisma } from "@/lib/prisma";
import {
  getUsuarioLogado,
  organizadorSelect,
  voluntarioSelect,
} from "@/lib/usuario";

type TipoUsuario = "voluntario" | "organizador";

type ParsedLookup = {
  login: string;
  tipoUsuario?: TipoUsuario;
};

function isTipoUsuario(value: unknown): value is TipoUsuario {
  return value === "voluntario" || value === "organizador";
}

function parsePayload(payload: unknown): ParsedLookup | null {
  if (typeof payload !== "object" || payload === null) return null;

  const body = payload as Record<string, unknown>;
  const loginValue =
    typeof body.login === "string"
      ? body.login
      : typeof body.email === "string"
        ? body.email
        : null;

  if (!loginValue) return null;

  const login = loginValue.trim();
  if (!login) return null;

  const tipoUsuario = body.tipoUsuario;
  if (tipoUsuario !== undefined && !isTipoUsuario(tipoUsuario)) return null;

  return {
    login,
    tipoUsuario: tipoUsuario ?? undefined,
  };
}

async function findVoluntario(login: string) {
  return prisma.voluntario.findFirst({
    where: { email: login },
    select: voluntarioSelect,
  });
}

async function findOrganizador(login: string) {
  return prisma.organizador.findFirst({
    where: { email: login },
    select: organizadorSelect,
  });
}

export async function GET() {
  const result = await getUsuarioLogado();
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json(result.usuario, { status: 200 });
}

export async function POST(request: Request) {
  const bodyResult = await parseJsonBody(request);
  if ("error" in bodyResult) return bodyResult.error;
  const payload = bodyResult.payload;

  const lookup = parsePayload(payload);
  if (!lookup) {
    return Response.json({ error: "Invalid user lookup payload." }, { status: 400 });
  }

  if (lookup.tipoUsuario === "voluntario") {
    const voluntario = await findVoluntario(lookup.login);
    if (!voluntario) {
      return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    return Response.json(
      {
        tipoUsuario: "voluntario",
        ...voluntario,
      },
      { status: 200 }
    );
  }

  if (lookup.tipoUsuario === "organizador") {
    const organizador = await findOrganizador(lookup.login);
    if (!organizador) {
      return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    return Response.json(
      {
        tipoUsuario: "organizador",
        ...organizador,
      },
      { status: 200 }
    );
  }

  const [voluntario, organizador] = await Promise.all([
    findVoluntario(lookup.login),
    findOrganizador(lookup.login),
  ]);

  if (voluntario && organizador) {
    return Response.json(
      { error: "Login encontrado em mais de um tipo de usuário." },
      { status: 409 }
    );
  }

  if (!voluntario && !organizador) {
    return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  if (voluntario) {
    return Response.json(
      {
        tipoUsuario: "voluntario",
        ...voluntario,
      },
      { status: 200 }
    );
  }

  return Response.json(
    {
      tipoUsuario: "organizador",
      ...organizador,
    },
    { status: 200 }
  );
}
