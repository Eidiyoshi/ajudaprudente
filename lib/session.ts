import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

type TipoUsuario = "voluntario" | "organizador";

type SessionTokenPayload = {
  userId: number;
  tipoUsuario: TipoUsuario;
  expiresAt: string;
};

export type SessionUser = {
  userId: number;
  tipoUsuario: TipoUsuario;
};

export const SESSION_COOKIE_NAME = "session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET ?? process.env.JWT_SECRET;
  return secret?.trim() ? secret : null;
}

function getEncodedSecret() {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("Missing SESSION_SECRET (or JWT_SECRET) environment variable.");
  }
  return new TextEncoder().encode(secret);
}

export function isSessionSecretConfigured() {
  return getSessionSecret() !== null;
}

async function encrypt(payload: SessionTokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(getEncodedSecret());
}

async function decrypt(sessionToken?: string) {
  if (!sessionToken) return null;

  try {
    const { payload } = await jwtVerify(sessionToken, getEncodedSecret(), {
      algorithms: ["HS256"],
    });
    return payload as SessionTokenPayload;
  } catch {
    return null;
  }
}

export async function createSession(user: SessionUser) {
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  const sessionToken = await encrypt({
    userId: user.userId,
    tipoUsuario: user.tipoUsuario,
    expiresAt: expiresAt.toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSessionUser() {
  const sessionToken = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const payload = await decrypt(sessionToken);

  if (!payload || typeof payload.userId !== "number") return null;
  if (payload.tipoUsuario !== "voluntario" && payload.tipoUsuario !== "organizador") {
    return null;
  }

  return {
    userId: payload.userId,
    tipoUsuario: payload.tipoUsuario,
  } satisfies SessionUser;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
