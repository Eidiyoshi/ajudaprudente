export type EnderecoPayload = {
  cidade: string;
  bairro: string;
  rua: string;
  cep: string;
  apartamento?: string;
  numero?: string;
};

export function isEnderecoPayload(value: unknown): value is EnderecoPayload {
  if (typeof value !== "object" || value === null) return false;

  const endereco = value as Record<string, unknown>;

  return (
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
