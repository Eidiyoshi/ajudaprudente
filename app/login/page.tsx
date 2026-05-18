"use client";

import  useLoginForm from './logic';
import { divLayout } from './layout';

export default function Login() {
    const { formData, errors, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5">
                {divLayout('email', 'Email', 'email', formData.email, handleChange, errors.email)}
                {divLayout('senha', 'Senha', 'password', formData.senha, handleChange, errors.senha)}
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition">Entrar</button>
            </form>
        </div>
    );
}