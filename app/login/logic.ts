"use client";

import { useState, useTransition } from "react";

export type UserKind = "voluntario" | "organizador";

type LoginForm = {
    email: string;
    senha: string;
    tipoUsuario: UserKind;
};

type Errors = Partial<Record<keyof LoginForm, string>>;

const emptyForm: LoginForm = {
    email: "",
    senha: "",
    tipoUsuario: "voluntario",
};

function validateLogin(data: LoginForm): Errors {
    const errors: Errors = {};

    if (!data.email.trim()) errors.email = "E-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "E-mail inválido.";

    if (!data.senha.trim()) errors.senha = "Senha é obrigatória.";

    return errors;
}

export function useLoginForm() {
    const [form, setForm] = useState<LoginForm>(emptyForm);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Errors>({});
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function handleUserKind(value: string) {
        setForm((prev) => ({ ...prev, tipoUsuario: value as UserKind }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const errs = validateLogin(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        startTransition(async () => {
            setError(null);

            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                const contentType = response.headers.get("content-type") ?? "";
                const body = contentType.includes("application/json")
                    ? await response.json()
                    : await response.text();

                if (!response.ok) {
                    const message =
                        typeof body === "object" &&
                        body !== null &&
                        "error" in body &&
                        typeof body.error === "string"
                            ? body.error
                            : "Não foi possível fazer login.";
                    setError(message);
                    return;
                }
                const nome =
                    typeof body === "object" && body !== null && "nome" in body
                        ? String(body.nome)
                        : null;

                setSuccess(
                    nome
                        ? `Login realizado com sucesso. Bem-vindo(a), ${nome}.`
                        : "Login realizado com sucesso.",
                );

                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Erro inesperado.",
                );
            }
        });
    }

    return {
        form,
        error,
        errors,
        success,
        isSaving: isPending,
        handleChange,
        handleUserKind,
        handleSubmit,
    };
}
