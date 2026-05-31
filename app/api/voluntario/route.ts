import { Endereco } from "@/app/lib/Endereco";
import { TipoUsuario } from "@/app/lib/TipoUsuario";
import { Voluntario } from "@/app/lib/Voluntario";
import { parseJsonBody } from "@/app/api/lib/request";
import { EnderecoPayload, isEnderecoPayload } from "@/app/api/lib/validation";

type VoluntarioPayload = {
  nome: string;
  email: string;
  senha: string;
  telefone: number;
  rg: string;
  cpf: string;
  endereco: EnderecoPayload;
};

function isValidPayload(payload: unknown): payload is VoluntarioPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const body = payload as Record<string, unknown>;

  return (
    typeof body.nome === "string" &&
    body.nome.trim().length > 0 &&
    typeof body.email === "string" &&
    body.email.trim().length > 0 &&
    typeof body.senha === "string" &&
    body.senha.trim().length > 0 &&
    typeof body.telefone === "number" &&
    Number.isFinite(body.telefone) &&
    typeof body.rg === "string" &&
    body.rg.trim().length > 0 &&
    typeof body.cpf === "string" &&
    body.cpf.trim().length > 0 &&
    isEnderecoPayload(body.endereco)
  );
}

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request);
  if ("error" in parsed) return parsed.error;
  const payload = parsed.payload;

  if (!isValidPayload(payload)) {
    return Response.json(
      { error: "Invalid request body for voluntario creation." },
      { status: 400 }
    );
  }

  const voluntario = new Voluntario(
    payload.nome,
    payload.email,
    payload.senha,
    payload.telefone,
    TipoUsuario.Voluntario,
    payload.rg,
    payload.cpf
  );

  const endereco = new Endereco(
    payload.endereco.cidade,
    payload.endereco.bairro,
    payload.endereco.rua,
    payload.endereco.cep,
    payload.endereco.apartamento,
    payload.endereco.numero
  );
  const createdEndereco = await endereco.storeOnDb();
  const created = await voluntario.storeOnDb(createdEndereco.idendere_o);

  return Response.json(created, { status: 201 });
}
