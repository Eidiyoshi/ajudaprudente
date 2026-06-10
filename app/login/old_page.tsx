"use client";
import useLoginForm from "./old_logic";
import { formattedInput, Selector } from "./old_layout";
import { TipoUsuario } from "./old_logic";

export default function LoginPage() {
    const {
        tipoUsuario,
        email,
        senha,
        feedback,
        isSubmitting,
        handleSubmit,
        setTipoUsuario,
        setEmail,
        setSenha,
    } = useLoginForm();

    return (
        <main>
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5"
                >
                    <h1 className="text-3xl font-bold text-zinc-100 text-center">
                        Login
                    </h1>
                    <Selector
                        fieldName="tipoUsuario"
                        labelText="Tipo de Usuário"
                        options={["voluntario", "organizador"]}
                        value={tipoUsuario}
                        onChange={(value) =>
                            setTipoUsuario(value as TipoUsuario)
                        }
                    />

                    {formattedInput("email", "E-mail", "email", email, (e) =>
                        setEmail(e.target.value),
                    )}

                    {formattedInput("senha", "Senha", "password", senha, (e) =>
                        setSenha(e.target.value),
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                    {feedback && <p>{feedback.message}</p>}
                    <a
                        href="/registrar"
                        className="text-indigo-400 hover:text-indigo-300 transition"
                    >
                        Não tem uma conta? Registre-se
                    </a>
                </form>
            </div>
        </main>
    );
}
