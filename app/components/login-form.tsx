"use client";

import { useLoginForm } from "../login/logic";

export default function LoginForm() {
    const {
        form,
        error,
        errors,
        success,
        isSaving,
        handleChange,
        handleUserKind,
        handleSubmit,
    } = useLoginForm();

    return (
        <div className="flex-1 bg-gray-bg flex items-center justify-center p-6">
            <div className="items-center w-full max-w-md bg-white rounded-2xl border border-card-border shadow-sm px-8 py-10 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-text-main">
                        Bem-vindo de volta
                    </h1>
                    <p className="text-sm text-text-muted">
                        Entre com sua conta para continuar
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4"
                >
                    <Selector
                        fieldName="tipoUsuario"
                        labelText="Tipo de Usuário"
                        value={form.tipoUsuario}
                        onChange={handleUserKind}
                        options={[
                            { value: "voluntario", label: "Voluntário" },
                            { value: "organizador", label: "Organizador" },
                        ]}
                    />

                    <FormField
                        fieldName="email"
                        labelText="E-mail"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <FormField
                        fieldName="senha"
                        labelText="Senha"
                        type="password"
                        value={form.senha}
                        onChange={handleChange}
                        error={errors.senha}
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
                        {isSaving ? "Entrando..." : "Entrar"}
                    </button>

                    <p>
                        Não tem uma conta?{" "}
                        <span className="font-semibold text-purple hover:text-purple-light transition-colors duration-200">
                            <a href="/registrar">Registre-se</a>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

function Selector({
    fieldName,
    labelText,
    value,
    onChange,
    options,
}: {
    fieldName: string;
    labelText: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={fieldName}
                className="text-sm font-medium text-text-main"
            >
                {labelText}
            </label>
            <select
                id={fieldName}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-card-border bg-white text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function FormField({
    fieldName,
    labelText,
    type,
    value,
    onChange,
    error,
}: {
    fieldName: string;
    labelText: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={fieldName}
                className="text-sm font-medium text-text-main"
            >
                {labelText}
            </label>
            <input
                id={fieldName}
                name={fieldName}
                type={type}
                value={value}
                onChange={onChange}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-card-border bg-white text-text-main text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition"
            />
            {error && <p>{error}</p>}
        </div>
    );
}
