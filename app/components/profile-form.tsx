"use client";

import { useUserProfileForm } from "@/app/perfil/logic";
import Image from "next/image";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

function getAvatarColor(name: string): string {
    const colors = [
        "#7c3aed", // purple
        "#2563eb", // blue
        "#059669", // green
        "#d97706", // amber
        "#dc2626", // red
        "#7c3aed", // violet
        "#0891b2", // cyan
        "#65a30d", // lime
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

export default function ProfileForm() {
    const {
        initials,
        isEditing,
        isSaving,
        isLoading,
        error,
        errors,
        profile,
        draft,
        handleChange,
        handleEdit,
        handleCancel,
        handleSave,
    } = useUserProfileForm();

    const avatarColor = useMemo(
        () => getAvatarColor(profile.nome || "?"),
        [profile.nome],
    );

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 font-semibold">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-2">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-sm border border-gray-200">
                {/* Cabeçalho do Perfil (Imagem ou Iniciais) */}
                {!isEditing && (
                    <div className="relative bg-white px-5 pt-12 pb-5 flex flex-col items-center gap-2 border-gray-100">
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={handleEdit}
                                title="Editar perfil"
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center shadow-sm transition-transform duration-200 hover:-translate-y-1"
                            >
                                {/* Pencil SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 text-black"
                                >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </button>
                        )}

                        {profile.imagem ? (
                            <Image
                                src={profile.imagem}
                                alt={profile.nome}
                                width={88}
                                height={88}
                                className="rounded-full object-cover ring-4 ring-gray-100"
                            />
                        ) : (
                            <div
                                className="w-22 h-22 rounded-full flex items-center justify-center text-white text-2xl font-black ring-4 ring-gray-100"
                                style={{
                                    backgroundColor: avatarColor,
                                    width: 88,
                                    height: 88,
                                }}
                            >
                                {initials}
                            </div>
                        )}

                        <div className="text-center mt-1">
                            <h1 className="text-lg font-black text-gray-900">
                                {profile.nome}
                            </h1>
                            <p className="text-sm text-gray-400 mt-0.5">
                                {profile.email}
                                {" | "}
                                {profile.telefone}
                            </p>
                            {(profile.cidade || profile.estado) && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                    📍{" "}
                                    {[profile.cidade, profile.estado]
                                        .filter(Boolean)
                                        .join(" — ")}
                                </p>
                            )}
                        </div>
                        <div className="text-sm text-gray-500 text-center max-w-xs leading-relaxed mt-1">
                            <ReactMarkdown>
                                {profile.biografia?.trim()
                                    ? profile.biografia
                                    : "*Esta pessoa ainda não adicionou uma biografia.*"}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

                <div className="px-10 py-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-semibold">
                            {error}
                        </div>
                    )}

                    {isEditing && (
                        <form
                            onSubmit={handleSave}
                            className="flex flex-col gap-4"
                        >
                            <Field
                                id="nome"
                                label="Nome completo"
                                value={draft.nome}
                                onChange={handleChange}
                                error={errors.nome}
                                placeholder="Seu nome"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Field
                                    id="cidade"
                                    label="Cidade"
                                    value={draft.cidade}
                                    onChange={handleChange}
                                    error={errors.cidade}
                                    placeholder="Cidade"
                                />
                                <Field
                                    id="estado"
                                    label="UF"
                                    value={draft.estado}
                                    onChange={handleChange}
                                    error={errors.estado}
                                    placeholder="UF"
                                    maxLength={2}
                                />
                            </div>
                            <Field
                                id="telefone"
                                label="Telefone"
                                type="tel"
                                value={draft.telefone}
                                onChange={handleChange}
                                error={errors.telefone}
                                placeholder="(00) 00000-0000"
                            />
                            <Field
                                id="biografia"
                                label="Biografia"
                                type="textarea"
                                value={draft.biografia}
                                onChange={handleChange}
                                error={errors.biografia}
                                placeholder="Conte um pouco sobre você..."
                            />

                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="py-2.5 bg-[#6b21a8] hover:bg-purple-800 text-white font-bold rounded-lg transition disabled:opacity-50 text-sm"
                                >
                                    {isSaving ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

function Field({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    maxLength,
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    error?: string;
    placeholder?: string;
    maxLength?: number;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={id}
                className="text-xs font-bold text-gray-500 uppercase tracking-wide"
            >
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    rows={3}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6b21a8] focus:border-transparent transition resize-none text-sm"
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6b21a8] focus:border-transparent transition text-sm"
                />
            )}
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
}
