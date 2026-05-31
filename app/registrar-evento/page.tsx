"use client";

import { useEventoForm } from './logic';
import { divLayout } from './layout';

export default function EventForm() {
    const { formData, errors, isSubmitting, handleInputChange, handleSubmit } = useEventoForm();

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5">
                {divLayout('nome', 'Nome do Evento', 'text', formData.getNome(), handleInputChange, errors.nome)}
                {divLayout('descricao', 'Descrição do Evento', 'textarea', formData.getDescricao(), handleInputChange, errors.descricao)}

                {divLayout('data', 'Data do Evento', 'date', formData.getData().toString(), handleInputChange, errors.data)}

                {divLayout('horarioInicio', 'Horário de Início', 'time', formData.getHorarioInicio().toString(), handleInputChange, errors.horarioInicio)}

                {divLayout('horarioFim', 'Horário do Fim', 'time', formData.getHorarioFim().toString(), handleInputChange, errors.horarioFim)}

                {divLayout('local', 'Local do Evento', 'text', formData.getLocal(), handleInputChange, errors.local)}

                {divLayout('vagasDisponiveis', 'Vagas Disponíveis', 'number', formData.getVagasDisponiveis().toString(), handleInputChange, errors.vagasDisponiveis)}

                <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition">
                    {isSubmitting ? "Criando..." : "Criar Evento"}
                </button>
            </form>
        </div>
    );
}
