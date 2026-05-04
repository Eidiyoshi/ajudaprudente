import { Endereco } from "@/app/lib/Endereco";
import { Organizador } from "@/app/lib/Organizador";
import { TipoUsuario } from "@/app/lib/TipoUsuario";

type EnderecoPayload = {
  cidade: string;
  bairro: string;
  rua: string;
  cep: string;
  apartamento?: string;
  numero?: string;
};

type OrganizadorPayload = {
  nome: string;
  email: string;
  senha: string;
  telefone: number;
  isEmpresa: boolean;
  cnpj?: string;
  empresa?: string;
  endereco: EnderecoPayload;
};

function isValidPayload(payload: unknown): payload is OrganizadorPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const body = payload as Record<string, unknown>;
  const endereco = body.endereco as Record<string, unknown> | undefined;
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
    dadosEmpresaValidos &&
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
    (endereco.numero === undefined || typeof endereco.numero === "string")
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

  const endereco = new Endereco(
    payload.endereco.cidade,
    payload.endereco.bairro,
    payload.endereco.rua,
    payload.endereco.cep,
    payload.endereco.apartamento,
    payload.endereco.numero
  );
  const createdEndereco = await endereco.storeOnDb();
  const created = await organizador.storeOnDb(createdEndereco.idendere_o);

  return Response.json(created, { status: 201 });
}
