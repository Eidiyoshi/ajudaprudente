import { getSessionUser } from "@/lib/session";
import type { UserApiSession } from "./session.client";

export async function getUserSession(): Promise<UserApiSession | null> {
    const session = await getSessionUser();
    console.log("session:", session);

    if (!session) return null;

    return {
        user: {
            id: String(session.userId),
            nome: "",
            email: "",
            userKind: session.tipoUsuario,
        },
    };
}
