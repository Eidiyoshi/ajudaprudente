"use client";

import { useState } from 'react';


export type UserProfile = {
    nome: string;
    email: string;
    bio: string;
    telefone: string;
    cidade: string;
    eventsCreated: number;
    eventsAttended: number;
};

type Errors = Partial<Record<keyof UserProfile, string>>;

function validateProfile(data: UserProfile): Errors {
    const errors: Errors = {};
    if (!data.nome.trim()) errors.nome = "Nome é obrigatório.";
    if (!data.email.trim()) errors.email = "E-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "E-mail inválido.";
    if (data.bio.length > 200) errors.bio = "Bio deve ter no máximo 200 caracteres.";

    return errors;
}

export function useUserProfileForm() {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState<UserProfile>({
        nome: "Nome",
        email: "email@dominio.com",
        bio: "Bio.",
        telefone: "(00) 00000-0000",
        cidade: "Cidade, Estado",
        eventsCreated: 0,
        eventsAttended: 0
    });

    const [draft, setDraft] = useState<UserProfile>(profile);
    const [errors, setErrors] = useState<Errors>({});

    const initials = profile.nome.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    
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

  return { initials, isEditing, isSaving, saved, profile, draft, errors, handleChange, handleEdit, handleCancel, handleSave };

}
