import { Status } from "@/app/lib/Status";
import { Evento } from "@/app/lib/Evento";

type EventoPayload = {
    nome : string,
    data : string,
    descricao: string,
    horarioInicio : string,
    horarioFim : string, 
    local : string,
    vagasDisponiveis : number,
    status : Status
};

function isValidPayload(payload: unknown): payload is EventoPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const body = payload as Record<string, unknown>;

  return (
    typeof body.nome === "string" && body.nome.trim().length > 0 &&
    typeof body.data === "string" && body.data.trim().length > 0 &&
    typeof body.descricao === "string" && body.descricao.trim().length > 0 &&
    typeof body.horarioInicio === "string" && body.horarioInicio.trim().length > 0 &&
    typeof body.horarioFim === "string" && body.horarioFim.trim().length > 0 &&
    typeof body.local === "string" && body.local.trim().length > 0 &&
    typeof body.vagasDisponiveis === "number" && body.vagasDisponiveis >= 0 &&
    typeof body.status === "number" && Object.values(Status).includes(body.status as Status)
  );
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
      { error: "Invalid request body for voluntario creation." },
      { status: 400 }
    );
  }

  const evento = Evento.create(
    payload.nome,
    payload.data,
    payload.descricao,
    payload.horarioInicio,
    payload.horarioFim,
    payload.local,
    payload.vagasDisponiveis,
    payload.status
  );

  const created = await evento.storeOnDb();

  return Response.json(created, { status: 201 });
}
