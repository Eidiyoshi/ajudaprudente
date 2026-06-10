"use client";

import { useSignupForm } from "../registrar/logic";

export default function SignUpForm() {
    const {
        form,
        error,
        errors,
        success,
        isSaving,
        handleChange,
        handleUserKind,
        handleIsEmpresa,
        handleSubmit,
    } = useSignupForm();

    return (
        <div className="bg-gray-bg flex flex-col items-center justify-center flex-1 p-6">
            <div className="w-md max-h-screen overflow-y-auto space-y-3 items-center flex flex-col gap-2 bg-white rounded-2xl border border-card-border shadow-sm px-8 py-10">
                <div className="flex flex-col text-center gap-1">
                    <h1 className="text-2xl font-black text-text-main">
                        Criar conta
                    </h1>
                    <p className="text-sm text-text-muted">
                        Preencha seus dados para se registrar.
                    </p>
                </div>

                <UserKindSelector
                    value={form.tipoUsuario}
                    onChange={handleUserKind}
                />

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-2 w-full"
                >
                    {form.tipoUsuario === "organizador" && (
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 text-sm text-zinc-700">
                                <input
                                    type="checkbox"
                                    checked={form.isEmpresa}
                                    onChange={(e) =>
                                        handleIsEmpresa(e.target.checked)
                                    }
                                    className="h-4 w-4 rounded"
                                />
                                Organizador é empresa
                            </label>

                            {form.isEmpresa && (
                                <>
                                    <FormField
                                        fieldName="empresa"
                                        placeholderText="Nome da empresa"
                                        type="text"
                                        value={form.empresa}
                                        onChange={handleChange}
                                        error={errors.empresa}
                                    />
                                    <FormField
                                        fieldName="cnpj"
                                        placeholderText="CNPJ"
                                        type="tel"
                                        value={form.cnpj}
                                        onChange={handleChange}
                                        error={errors.cnpj}
                                    />
                                </>
                            )}
                        </div>
                    )}

                    <FormField
                        fieldName="nome"
                        placeholderText="Nome completo"
                        type="text"
                        value={form.nome}
                        onChange={handleChange}
                        error={errors.nome}
                    />
                    <FormField
                        fieldName="email"
                        placeholderText="E-mail"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FormField
                        fieldName="senha"
                        placeholderText="Senha"
                        type="password"
                        value={form.senha}
                        onChange={handleChange}
                        error={errors.senha}
                    />
                    <FormField
                        fieldName="confirmarSenha"
                        placeholderText="Confirmar senha"
                        type="password"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                        error={errors.confirmarSenha}
                    />
                    <FormField
                        fieldName="telefone"
                        placeholderText="Telefone"
                        type="tel"
                        value={form.telefone}
                        onChange={handleChange}
                        error={errors.telefone}
                    />

                    {success && (
                        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3">
                            <p className="text-sm text-green-600">{success}</p>
                        </div>
                    )}

                    {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full mt-2 py-2.5 px-4 rounded-xl bg-purple text-white font-bold text-sm tracking-wide cursor-pointer hover:bg-purple-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isSaving ? "Enviando..." : "Criar conta"}
                    </button>

                    <p>
                        Já tem uma conta?{" "}
                        <span className="font-semibold text-purple hover:text-purple-light transition-colors duration-200">
                            <a href="/login">Entrar</a>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

function UserKindSelector({
    value,
    onChange,
}: {
    value: "voluntario" | "organizador";
    onChange: (value: "voluntario" | "organizador") => void;
}) {
    return (
        <div className="flex rounded-lg border border-card-border p-2">
            {(["voluntario", "organizador"] as const).map((kind) => (
                <button
                    key={kind}
                    type="button"
                    onClick={() => onChange(kind)}
                    className={`flex-1 rounded-md p-2 text-sm font-medium transition-colors duration-200 ${
                        value === kind
                            ? "bg-zinc-100 text-zinc-900"
                            : "text-zinc-500 hover:text-zinc-90"
                    }`}
                >
                    {kind === "voluntario" ? "Voluntário" : "Organizador"}
                </button>
            ))}
        </div>
    );
}

function FormField({
    fieldName,
    placeholderText,
    type,
    value,
    onChange,
    error,
}: {
    fieldName: string;
    placeholderText: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <input
                id={fieldName}
                name={fieldName}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholderText}
                className="w-full px-3 py-2.5 rounded-xl border border-card-border bg-white text-text-main text-sm placeholderText:text-text-muted focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
