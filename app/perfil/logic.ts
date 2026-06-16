"use client";

import { useState, useEffect, useTransition } from "react";
import { updateProfile } from "../lib/data-processing";

export type UserProfile = {
    nome: string;
    email: string;
    biografia: string;
    telefone: string;
    cidade: string;
    estado: string;
    bairro: string;
    rua: string;
    cep: string;
    numero: string;
    apartamento: string;
    imagem?: string;
    tipoUsuario: "voluntario" | "organizador";
};

const emptyProfile: UserProfile = {
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    bairro: "",
    rua: "",
    cep: "",
    numero: "",
    apartamento: "",
    biografia: "",
    tipoUsuario: "voluntario",
};

type Errors = Partial<Record<keyof UserProfile, string>>;

function validateProfile(data: UserProfile): Errors {
    const errors: Errors = {};
    if (!data.nome.trim()) errors.nome = "O campo Nome é obrigatório.";
    else if (data.nome.trim().length < 2)
        errors.nome = "O nome deve ter pelo menos dois caracteres.";

    if (!data.email.trim()) errors.email = "E-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "E-mail inválido.";

    if (data.biografia && data.biografia.length > 200)
        errors.biografia = "A biografia deve ter no máximo 200 caracteres.";

    return errors;
}

function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export function useUserProfileForm() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    const [isPending, startTransition] = useTransition();

    // Estado persistido e Estado de rascunho (para permitir cancelamento)
    const [profile, setProfile] = useState<UserProfile>(emptyProfile);
    const [draft, setDraft] = useState<UserProfile>(emptyProfile);

    useEffect(() => {
        async function carregarPerfil() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/usuario");
                const data = await res.json();
                if (!res.ok) {
                    setError(data?.error ?? "Erro ao carregar o perfil.");
                    return;
                }
                const userType = data.tipoUsuario as
                    | "voluntario"
                    | "organizador";
                const parsedProfile: UserProfile = {
                    nome: data.nome,
                    email: data.email,
                    telefone: formatPhone(data.telefone ?? ""),
                    biografia: "",
                    cidade: data.endere_o?.cidade ?? "",
                    estado: "",
                    bairro: data.endere_o?.bairro ?? "",
                    rua: data.endere_o?.rua ?? "",
                    cep: data.endere_o?.cep ?? "",
                    numero: data.endere_o?.numero ?? "",
                    apartamento: data.endere_o?.apartamento ?? "",
                    tipoUsuario: userType,
                };
                setProfile(parsedProfile);
                setDraft(parsedProfile);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Erro inesperado.",
                );
            } finally {
                setIsLoading(false);
            }
        }
        void carregarPerfil();
    }, []);

    useEffect(() => {
        if (!saved) return;
        const timer = setTimeout(() => setSaved(false), 3000);
        return () => clearTimeout(timer);
    }, [saved]);

    const initials = profile.nome
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        const formatted = name === "telefone" ? formatPhone(value) : value;
        setDraft((prev) => ({ ...prev, [name]: formatted }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function handleEdit() {
        setDraft(profile);
        setErrors({});
        setError(null);
        setIsEditing(true);
        setSaved(false);
    }

    function handleCancel() {
        setDraft(profile); // Restaura o rascunho para o estado original
        setErrors({});
        setError(null);
        setIsEditing(false);
    }

    function handleSave(e: React.FormEvent) {
        e.preventDefault();

        const errs = validateProfile(draft);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        startTransition(async () => {
            setError(null);

            const formData = new FormData();
            formData.append("nome", draft.nome);
            formData.append("email", draft.email);
            formData.append("telefone", draft.telefone.replace(/\D/g, ""));
            formData.append("biografia", draft.biografia || "");
            formData.append("cidade", draft.cidade || "");
            formData.append("estado", draft.estado || "");
            formData.append("bairro", draft.bairro || "");
            formData.append("cep", draft.cep || "");
            formData.append("rua", draft.rua || "");
            formData.append("numero", draft.numero || "");

            formData.append("tipoUsuario", draft.tipoUsuario);

            const result = await updateProfile(formData);

            if (result?.error) {
                setError(result.error);
            } else {
                setProfile(draft); // Efetiva as alterações
                setIsEditing(false);
                setSaved(true);
            }
        });
    }

    return {
        initials,
        isEditing,
        isLoading,
        isSaving: isPending,
        saved,
        error,
        errors,
        profile,
        draft,
        handleChange,
        handleEdit,
        handleCancel,
        handleSave,
    };
}
