"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const biografia = formData.get("biografia") as string;

    const cidade = formData.get("cidade") as string;
    const estado = formData.get("estado") as string;
    const bairro = formData.get("bairro") as string;
    const rua = formData.get("rua") as string;
    const cep = formData.get("cep") as string;
    const numero = formData.get("numero") as string;

    const tipoUsuario = formData.get("tipoUsuario") as
        | "voluntario"
        | "organizador";

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

    if (cidade && (!bairro || !rua || !cep)) {
        return {
            error: "Ao atualizar o endereço, preencha Cidade, Bairro, Rua e CEP.",
        };
    }

    if (estado && estado.trim().length !== 2) {
        return { error: "O estado deve ter exatamente 2 caracteres." };
    }

    try {
        if (tipoUsuario === "voluntario") {
            const currentVoluntario = await prisma.voluntario.findFirst({
                where: { email: email },
            });

            if (!currentVoluntario)
                return { error: "Voluntário não encontrado." };

            await prisma.$transaction(async (tx) => {
                let addressId = currentVoluntario.endereco;

                if (cidade) {
                    if (addressId) {
                        await tx.endere_o.update({
                            where: { idendere_o: addressId },
                            data: {
                                cidade: cidade.trim(),
                                bairro: bairro.trim(),
                                rua: rua.trim(),
                                cep: cep.trim(),
                                numero: numero ? numero.trim() : null,
                            },
                        });
                    } else {
                        const newAddressId = Math.floor(
                            Math.random() * 1000000,
                        );
                        await tx.endere_o.create({
                            data: {
                                idendere_o: newAddressId,
                                cidade: cidade.trim(),
                                bairro: bairro.trim(),
                                rua: rua.trim(),
                                cep: cep.trim(),
                                numero: numero ? numero.trim() : null,
                            },
                        });
                        addressId = newAddressId;
                    }
                }

                await tx.voluntario.update({
                    where: { idusuarios: currentVoluntario.idusuarios },
                    data: {
                        nome: nome.trim(),
                        email: email.trim(),
                        telefone: telefone ? telefone.trim() : null,
                        endereco: addressId,
                    },
                });
            });
        } else if (tipoUsuario === "organizador") {
            const currentOrganizador = await prisma.organizador.findFirst({
                where: { email: email },
            });

            if (!currentOrganizador)
                return { error: "Organizador não encontrado." };

            await prisma.$transaction(async (tx) => {
                let addressId = currentOrganizador.endereco;

                if (cidade) {
                    if (addressId) {
                        await tx.endere_o.update({
                            where: { idendere_o: addressId },
                            data: {
                                cidade: cidade.trim(),
                                bairro: bairro.trim(),
                                rua: rua.trim(),
                                cep: cep.trim(),
                                numero: numero ? numero.trim() : null,
                            },
                        });
                    } else {
                        const newAddressId = Math.floor(
                            Math.random() * 1000000,
                        );
                        await tx.endere_o.create({
                            data: {
                                idendere_o: newAddressId,
                                cidade: cidade.trim(),
                                bairro: bairro.trim(),
                                rua: rua.trim(),
                                cep: cep.trim(),
                                numero: numero ? numero.trim() : null,
                            },
                        });
                        addressId = newAddressId;
                    }
                }

                await tx.organizador.update({
                    where: { idorganizador: currentOrganizador.idorganizador },
                    data: {
                        nome: nome.trim(),
                        email: email.trim(),
                        telefone: telefone ? telefone.trim() : null,
                        endereco: addressId,
                    },
                });
            });
        }
        revalidatePath("/perfil");
        return { success: true };
    } catch (err) {
        console.error("Erro ao salvar perfil:", err);
        return { error: "Erro interno ao atualizar os dados." };
    }
}
