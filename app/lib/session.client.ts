export interface UserApiSession {
    user: {
        id: string;
        nome: string;
        email: string;
        userKind: string;
    };
} 

export async function getUserSession(): Promise<UserApiSession | null> {
    try {
        const res = await fetch("/api/session", { method: "GET" });
        if (!res.ok) return null;
        const data = await res.json();

        return {
            user: {
                id: data.id ?? "",
                nome: data.nome,
                email: data.email,
                userKind: data.tipoUsuario ?? "visitante",
            },
        };
    } catch (err) {
        console.error("Erro ao carregar sessão: ", err);
        return null;
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await fetch("/api/logout", { method: "POST" });
    } catch (err) {
        console.error("Erro ao fazer logout:", err);
    }
}
