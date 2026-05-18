import { UserProfile } from './logic';

const labelClass = "block text-sm font-medium text-zinc-300";
const inputClass = "w-full mt-1 px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
const errorClass = "text-red-400 text-xs mt-1";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export function Avatar({ initials }: {initials: string }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-zinc-700">
                {initials}
            </div>
        {/* <button
            type="button"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition underline underline-offset-2">Alterar foto</button> */}
        </div>
    )
}
export function StatCard({ label, value }: {label: string; value: string | number }) {
    return (
       <div className="flex flex-col items-center gap-0.5 bg-zinc-900 rounded-lg px-3 border-zinc-700">
        <span className="text-lg font-bold text-zinc-100">{value}</span>
        <span className="text-xs text-zinc-400">{label}</span>
       </div>
    )
}
export function Field({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    maxLength
 }: {
    id: keyof UserProfile;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
    error?: string;
    placeholder?: string;
    maxLength?: number;
 }) {
    return (
        <div>
            <label htmlFor={id} className={labelClass}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    rows={3}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={`${inputClass} resize-none`}
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={inputClass}
                />
            )}
            {error && <p className={errorClass}>{error}</p>}
        </div>
    )
}

export function HeaderCard({
    initials,
    profile
}: {
    initials: string;
    profile: UserProfile;
}) {
    return (
        <div className="flex flex-col items-center gap-4">
            <Avatar initials={initials} />
            <div className="text-center">
                <h1 className="text-xl font-semibold text-zinc-100">{profile.nome}</h1>
                <p className="text-sm text-zinc-400 mt-0.5">{profile.email}</p>
                {profile.cidade && (
                <p className="text-xs text-zinc-500 mt-0.5">📍 {profile.cidade}</p>
                )}
            </div>
            {profile.bio && (
                <p className="text-sm text-zinc-300 text-center max-w-xs leading-relaxed">
                {profile.bio}
                </p>
            )}
            <Stats eventsCreated={profile.eventsCreated} eventsAttended={profile.eventsAttended} />
        </div>
    )
}

export function Stats({
    eventsCreated,
    eventsAttended
}: {
    eventsCreated: number;
    eventsAttended: number;
}) {
    return (
        <div className="flex gap-3 mt-1">
            <StatCard label="Eventos" value={eventsCreated} />
            <StatCard label="Inscrições" value={eventsAttended} />
        </div>
    )
}

export function EditForm({
    draft,
    isSaving,
    errors,
    handleSave,
    handleChange,
    handleCancel,
    }: {
        draft: UserProfile;
        isSaving: boolean;
        errors: Partial<Record<keyof UserProfile, string>>;
        handleSave: (e: React.FormEvent<Element>) => void;
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        handleCancel: () => void;
    }) {
    return (
        <div>
            <form onSubmit={handleSave} noValidate className="flex flex-col gap-5">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Editar Perfil</h2>

                <Field
                    id="nome"
                    label="Nome completo"
                    value={draft.nome}
                    onChange={handleChange}
                    error={errors.nome}
                    placeholder="Seu nome"
                />
                <Field
                    id="email"
                    label="E-mail"
                    type="email"
                    value={draft.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="seu@email.com"
                />
                <Field
                    id="bio"
                    label="Bio"
                    type="textarea"
                    value={draft.bio}
                    onChange={handleChange}
                    error={errors.bio}
                    placeholder="Conte um pouco sobre você..."
                    maxLength={200}
                />
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
                    id="cidade"
                    label="Cidade"
                    value={draft.cidade}
                    onChange={handleChange}
                    error={errors.cidade}
                    placeholder="Cidade, Estado"
                />
    
                <div className="flex gap-3 mt-1">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 py-2 px-4 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-semibold rounded-md transition"
                    >Cancelar</button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition disabled:opacity-60"
                    >{isSaving ? "Salvando..." : "Salvar"}</button>
                </div>
            </form>
        </div>
    )
}

export function ProfileData({
    profile,
    saved,
    handleEdit,
} : {
    profile: UserProfile;
    saved: boolean;
    handleEdit: () => void;
}) {
    return (
        <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                Informações
              </h2>
              {[
                { label: "Nome completo", value: profile.nome },
                { label: "E-mail", value: profile.email },
                { label: "Telefone", value: profile.telefone || "—" },
                { label: "Cidade", value: profile.cidade || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-zinc-500">{label}</span>
                  <span className="text-sm text-zinc-100">{value}</span>
                </div>
              ))}
 
              {saved && (
                <p className="text-green-400 text-xs mt-1">
                  ✓ Perfil atualizado com sucesso.
                </p>
              )}
 
              <button
                type="button"
                onClick={handleEdit}
                className="w-full mt-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition"
              >
                Editar Perfil
              </button>
            </div>
    )
}