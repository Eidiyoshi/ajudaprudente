import { Endereco } from "@/app/lib/Endereco";
import { Evento } from "@/app/lib/Evento";
import { Status } from "@/generated/prisma/enums";
import { parseJsonBody } from "@/app/api/lib/request";

type EnderecoPayload = {
  cidade: string;
  bairro: string;
  rua: string;
  cep: string;
  apartamento?: string;
  numero?: string;
};

type RegistrarEventoPayload = {
  nome: string;
  descricao: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  endereco: EnderecoPayload;
  vagasDisponiveis: number;
  status: Status;
  organizador: number;
};

function isStatus(value: unknown): value is Status {
  return (
    typeof value === "string" &&
    Object.values(Status).includes(value as Status)
  );
}

function isValidPayload(payload: unknown): payload is RegistrarEventoPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const body = payload as Record<string, unknown>;
  const endereco = body.endereco as Record<string, unknown> | undefined;

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
    typeof endereco === "object" &&
    endereco !== null &&
    typeof endereco.cidade === "string" &&
    endereco.cidade.trim().length > 0 &&
    typeof endereco.bairro === "string" &&
    endereco.bairro.trim().length > 0 &&
    typeof endereco.rua === "string" &&
    endereco.rua.trim().length > 0 &&
    typeof endereco.cep === "string" &&
    endereco.cep.trim().length > 0 &&
    (endereco.apartamento === undefined ||
      typeof endereco.apartamento === "string") &&
    (endereco.numero === undefined || typeof endereco.numero === "string") &&
    typeof body.vagasDisponiveis === "number" &&
    Number.isFinite(body.vagasDisponiveis) &&
    body.vagasDisponiveis >= 0 &&
    isStatus(body.status) &&
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

function statusToPublicado(status: Status): number {
  return status === Status.Rascunho ? 0 : 1;
}

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request);
  if ("error" in parsed) return parsed.error;
  const payload = parsed.payload;

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

  const endereco = new Endereco(
    payload.endereco.cidade,
    payload.endereco.bairro,
    payload.endereco.rua,
    payload.endereco.cep,
    payload.endereco.apartamento,
    payload.endereco.numero
  );
  const createdEndereco = await endereco.storeOnDb();

  const evento = new Evento(
    payload.organizador,
    statusToPublicado(payload.status),
    payload.status,
    payload.nome,
    payload.horarioInicio,
    payload.horarioFim,
    dataHoraInicio,
    createdEndereco.idendere_o,
    payload.descricao,
    payload.vagasDisponiveis
  );

  const created = await evento.storeOnDb();
  return Response.json(created, { status: 201 });
}
