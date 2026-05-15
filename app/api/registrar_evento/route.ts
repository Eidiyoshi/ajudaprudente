import { Evento } from "@/app/lib/Evento";

type RegistrarEventoPayload = {
  nome: string;
  descricao: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  local: string;
  vagasDisponiveis: number;
  status: string;
  organizador: number;
};

function isValidPayload(payload: unknown): payload is RegistrarEventoPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const body = payload as Record<string, unknown>;

  return (
    typeof body.nome === "string" &&
    body.nome.trim().length > 0 &&
    typeof body.descricao === "string" &&
    body.descricao.trim().length > 0 &&
    typeof body.data === "string" &&
    body.data.trim().length > 0 &&
    typeof body.horarioInicio === "string" &&
    body.horarioInicio.trim().length > 0 &&
    typeof body.horarioFim === "string" &&
    body.horarioFim.trim().length > 0 &&
    typeof body.local === "string" &&
    body.local.trim().length > 0 &&
    typeof body.vagasDisponiveis === "number" &&
    Number.isFinite(body.vagasDisponiveis) &&
    body.vagasDisponiveis >= 0 &&
    typeof body.status === "string" &&
    body.status.trim().length > 0 &&
    typeof body.organizador === "number" &&
    Number.isInteger(body.organizador) &&
    body.organizador > 0
  );
}

function toDateTime(data: string, horarioInicio: string): Date | null {
  const dateTime = new Date(`${data}T${horarioInicio}:00`);
  if (Number.isNaN(dateTime.getTime())) return null;
  return dateTime;
}

function statusToPublicado(status: string): number {
  return status === "Ativo" || status === "Publicado" ? 1 : 0;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "Malformed JSON body.", details: error.message },
        { status: 400 }
      );
    }
    throw error;
  }

  if (!isValidPayload(payload)) {
    return Response.json(
      { error: "Invalid request body for evento creation." },
      { status: 400 }
    );
  }

  const dataHoraInicio = toDateTime(payload.data, payload.horarioInicio);
  if (!dataHoraInicio) {
    return Response.json(
      { error: "Invalid date and start time combination." },
      { status: 400 }
    );
  }

  const evento = new Evento(
    payload.organizador,
    statusToPublicado(payload.status),
    dataHoraInicio,
    undefined,
    payload.descricao,
    payload.status,
    payload.vagasDisponiveis
  );

  const created = await evento.storeOnDb();
  return Response.json(created, { status: 201 });
}
