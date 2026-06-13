import { Endereco } from "@/app/lib/Endereco";
import { Organizador } from "@/app/lib/Organizador";
import { TipoUsuario } from "@/app/lib/TipoUsuario";
import { parseJsonBody } from "@/app/api/lib/request";
import { EnderecoPayload, isEnderecoPayload } from "@/app/api/lib/validation";

type OrganizadorPayload = {
  nome: string;
  email: string;
  senha: string;
  telefone: number;
  isEmpresa: boolean;
  cnpj?: string;
  empresa?: string;
};

function isValidPayload(payload: unknown): payload is OrganizadorPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const body = payload as Record<string, unknown>;
  const isEmpresa = body.isEmpresa;
  const empresaValida =
    typeof body.empresa === "string" && body.empresa.trim().length > 0;
  const cnpjValido = typeof body.cnpj === "string" && body.cnpj.trim().length > 0;
  const dadosEmpresaValidos =
    isEmpresa === true ? empresaValida && cnpjValido : true;

  return (
    typeof body.nome === "string" &&
    body.nome.trim().length > 0 &&
    typeof body.email === "string" &&
    body.email.trim().length > 0 &&
    typeof body.senha === "string" &&
    body.senha.trim().length > 0 &&
    typeof body.telefone === "number" &&
    Number.isFinite(body.telefone) &&
    typeof isEmpresa === "boolean" &&
    dadosEmpresaValidos
  );
}

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request);
  if ("error" in parsed) return parsed.error;
  const payload = parsed.payload;

  if (!isValidPayload(payload)) {
    return Response.json(
      { error: "Invalid request body for organizador creation." },
      { status: 400 }
    );
  }

  const organizador = new Organizador(
    payload.nome,
    payload.email,
    payload.senha,
    payload.telefone,
    TipoUsuario.Organizador,
    payload.isEmpresa ? payload.cnpj : undefined,
    payload.isEmpresa ? payload.empresa : undefined
  );

  const created = await organizador.storeOnDb();

  return Response.json(created, { status: 201 });
}
