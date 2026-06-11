"use client";

import { useState, useTransition } from "react";
import { type UserKind } from "../login/logic";

type SignupForm = {
    tipoUsuario: UserKind;
    isEmpresa: boolean;
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    telefone: string;
    empresa: string;
    cnpj: string;
};

type Errors = Partial<Record<keyof SignupForm, string>>;

const emptyForm: SignupForm = {
    tipoUsuario: "voluntario",
    isEmpresa: false,
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    empresa: "",
    cnpj: "",
};

function normalizeDigits(value: string): string {
    return value.replace(/\D/g, "");
}

function parseNumber(value: string): number | null {
    const onlyDigits = normalizeDigits(value);
    if (onlyDigits.length === 0) return null;
    const parsed = Number(onlyDigits);
    return Number.isFinite(parsed) ? parsed : null;
}

function validateSignup(data: SignupForm): Errors {
    const errors: Errors = {};

    if (!data.nome.trim()) errors.nome = "Nome é obrigatório";

    if (!data.email.trim()) errors.email = "E-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "E-mail inválido.";

    if (!data.senha.trim()) errors.senha = "Senha é obrigatória.";
    else if (data.senha.trim().length < 6)
        errors.senha = "Senha deve conter no mínimo 6 caracteres.";

    if (!data.confirmarSenha.trim())
        errors.confirmarSenha = "Confirmação de senha é obrigatória.";
    else if (data.senha != data.confirmarSenha)
        errors.confirmarSenha = "As senhas não coincidem.";

    if (!data.telefone.trim()) errors.telefone = "Telefone é obrigatório.";
    else if (parseNumber(data.telefone) == null)
        errors.telefone = "Telefone precisa ser numérico.";

    if (data.tipoUsuario === "organizador" && data.isEmpresa) {
        if (!data.empresa.trim())
            errors.empresa = "Nome da empresa é e obrigatório.";
        if (!data.cnpj.trim()) errors.cnpj = "CNPJ é obrigatório.";
        else if (parseNumber(data.cnpj) == null) errors.cnpj = "CNPJ inválido";
    }

    return errors;
}

export function useSignupForm() {
    const [form, setForm] = useState<SignupForm>(emptyForm);
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
        setForm((prev) => ({
            ...prev,
            tipoUsuario: value as UserKind,
            isEmpresa: false,
            empresa: "",
            cnpj: "",
        }));
    }

    function handleIsEmpresa(checked: boolean) {
        setForm((prev) => ({
            ...prev,
            isEmpresa: checked,
            empresa: checked ? prev.empresa : "",
            cnpj: checked ? prev.cnpj : "",
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const errs = validateSignup(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        startTransition(async () => {
            setError(null);

            const telefone = parseNumber(form.telefone)!;
            const cnpjNormalizado =
                form.tipoUsuario === "organizador" && form.isEmpresa
                    ? normalizeDigits(form.cnpj)
                    : undefined;

            const payload =
                form.tipoUsuario === "voluntario"
                    ? {
                          nome: form.nome,
                          email: form.email,
                          senha: form.senha,
                          telefone,
                      }
                    : {
                          nome: form.nome,
                          email: form.email,
                          senha: form.senha,
                          telefone,
                          isEmpresa: form.isEmpresa,
                          empresa: form.isEmpresa
                              ? form.empresa.trim()
                              : undefined,
                          cnpj: cnpjNormalizado,
                      };

            const endpoint =
                form.tipoUsuario === "voluntario"
                    ? "/api/voluntario"
                    : "/api/organizador";

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
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
                            : "Não foi possível concluir o registro.";
                    setError(message);
                    return;
                }

                setSuccess("Registro realizado com sucesso.");
                setTimeout(() => {
                    window.location.href = "/login";
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
        handleIsEmpresa,
        handleSubmit,
    };
}
