import "server-only";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export type TipoUsuario = "voluntario" | "organizador";

export const voluntarioSelect = {
  idusuarios: true,
  nome: true,
  email: true,
  criado: true,
  endereco: true,
  rg: true,
  cpf: true,
  telefone: true,
  notificacao: true,
  darkmode: true,
  endere_o: {
    select: {
      idendere_o: true,
      cidade: true,
      bairro: true,
      rua: true,
      cep: true,
      apartamento: true,
      numero: true,
    },
  },
} as const;

export const organizadorSelect = {
  idorganizador: true,
  nome: true,
  email: true,
  criado: true,
  endereco: true,
  cnpj: true,
  telefone: true,
  empresa: true,
  endere_o: {
    select: {
      idendere_o: true,
      cidade: true,
      bairro: true,
      rua: true,
      cep: true,
      apartamento: true,
      numero: true,
    },
  },
} as const;

type UsuarioLogadoResult =
  | {
      ok: true;
      usuario: { tipoUsuario: "voluntario" } & Omit<
        NonNullable<Awaited<ReturnType<typeof prisma.voluntario.findUnique>>>,
        "senha"
      >;
    }
  | {
      ok: true;
      usuario: { tipoUsuario: "organizador" } & Omit<
        NonNullable<Awaited<ReturnType<typeof prisma.organizador.findUnique>>>,
        "senha"
      >;
    }
  | { ok: false; status: 401 | 404; error: string };

export async function getUsuarioLogado(): Promise<UsuarioLogadoResult> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return { ok: false, status: 401, error: "Não autenticado." };
  }

  if (sessionUser.tipoUsuario === "voluntario") {
    const voluntario = await prisma.voluntario.findUnique({
      where: { idusuarios: sessionUser.userId },
      select: voluntarioSelect,
    });

    if (!voluntario) {
      return { ok: false, status: 404, error: "Usuário não encontrado." };
    }

    return {
      ok: true,
      usuario: {
        tipoUsuario: "voluntario",
        ...voluntario,
      },
    };
  }

  const organizador = await prisma.organizador.findUnique({
    where: { idorganizador: sessionUser.userId },
    select: organizadorSelect,
  });

  if (!organizador) {
    return { ok: false, status: 404, error: "Usuário não encontrado." };
  }

  return {
    ok: true,
    usuario: {
      tipoUsuario: "organizador",
      ...organizador,
    },
  };
}
