"use client";

import { useEffect, useState } from "react";

export type UserProfile = {
  nome: string;
  email: string;
  bio: string;
  telefone: string;
  cidade: string;
  eventsCreated: number;
  eventsAttended: number;
};

type UsuarioApiResponse = {
  tipoUsuario: "voluntario" | "organizador";
  nome: string;
  email: string;
  telefone?: string | null;
  endere_o?: {
    cidade?: string | null;
  } | null;
};

type Errors = Partial<Record<keyof UserProfile, string>>;

const initialProfile: UserProfile = {
  nome: "Nome",
  email: "email@dominio.com",
  bio: "Bio.",
  telefone: "(00) 00000-0000",
  cidade: "Cidade, Estado",
  eventsCreated: 0,
  eventsAttended: 0,
};

function validateProfile(data: UserProfile): Errors {
  const errors: Errors = {};
  if (!data.nome.trim()) errors.nome = "Nome é obrigatório.";
  if (!data.email.trim()) errors.email = "E-mail é obrigatório.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "E-mail inválido.";
  if (data.bio.length > 200) errors.bio = "Bio deve ter no máximo 200 caracteres.";

  return errors;
}

export function useUserProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [draft, setDraft] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<Errors>({});

  const initials = profile.nome
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    let isMounted = true;

    async function carregarPerfil() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/usuario", { method: "GET" });
        const data = (await res.json()) as UsuarioApiResponse & { error?: string };

        if (!res.ok) {
          if (!isMounted) return;
          setError(data?.error ?? "Erro ao carregar o perfil.");
          return;
        }

        if (!isMounted) return;

        const nextProfile: UserProfile = {
          ...initialProfile,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone ?? initialProfile.telefone,
          cidade: data.endere_o?.cidade ?? initialProfile.cidade,
        };

        setProfile(nextProfile);
        setDraft(nextProfile);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Erro inesperado.");
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    }

    void carregarPerfil();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleEdit() {
    setDraft(profile);
    setErrors({});
    setIsEditing(true);
    setSaved(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setErrors({});
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateProfile(draft);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setProfile(draft);
    setIsSaving(false);
    setIsEditing(false);
    setSaved(true);
  }

  return {
    initials,
    isEditing,
    isSaving,
    saved,
    isLoading,
    error,
    profile,
    draft,
    errors,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
  };
}
