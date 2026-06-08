"use server";

import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const cidade = formData.get("cidade") as string;
    const estado = formData.get("estado") as string;
    const biografia = formData.get("biografia") as string;

    if (!nome || nome.trim().length < 2) {
        return { error: "O nome deve ter pelo menos dois caracteres." };
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { error: "O e-mail fornecido é inválido." };
    }

    if (biografia && biografia.length > 200) {
        return { error: "A bio deve ter no máximo 200 caracteres." };
    }

    if (telefone && !/^\d{10,11}$/.test(telefone)) {
        return { error: "Telefone inválido." };
    }

    if (cidade && cidade.trim().length < 2) {
        return { error: "A cidade deve ter pelo menos dois caracteres." };
    }
    if (estado && estado.trim().length !== 2) {
        return { error: "O estado deve ter exatamente 2 caracteres." };
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        revalidatePath("/perfil");
        return { success: true };
    } catch (err) {
        return {
            error: "Erro ao salvar os dados no banco de dados. Tente novamente.",
            err,
        };
    }
}
