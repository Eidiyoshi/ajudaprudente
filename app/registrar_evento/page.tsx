"use client";

import { divLayout } from './layout';
import { useEventoForm } from './eventCreationLogic';

export default function CriarEvento() {
    const { formData, errors, isSubmitting, handleInputChange, handleSubmit } = useEventoForm();

    const inputClass = "w-full mt-1 px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
    const labelClass = "block text-sm font-medium text-zinc-300";
    const errorClass = "text-red-400 text-xs mt-1";

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5">
                {divLayout('nome', labelClass, 'Nome do Evento', 'text', formData.getNome(), handleInputChange, inputClass, errorClass, errors.nome)}
                {divLayout('descricao', labelClass, 'Descrição do Evento', 'textarea', formData.getDescricao(), handleInputChange, inputClass, errorClass, errors.descricao)}
                {divLayout('data', labelClass, 'Data do Evento', 'date', formData.getData(), handleInputChange, inputClass, errorClass, errors.data)}
                {divLayout('horarioInicio', labelClass, 'Horário de Início', 'time', formData.getHorarioInicio(), handleInputChange, inputClass, errorClass, errors.horarioInicio)}
                {divLayout('horarioFim', labelClass, 'Horário do Fim', 'time', formData.getHorarioFim(), handleInputChange, inputClass, errorClass, errors.horarioFim)}
                {divLayout('local', labelClass, 'Local do Evento', 'text', formData.getLocal(), handleInputChange, inputClass, errorClass, errors.local)}
                {divLayout('vagasDisponiveis', labelClass, 'Vagas Disponíveis', 'number', formData.getVagasDisponiveis().toString(), handleInputChange, inputClass, errorClass, errors.vagasDisponiveis)}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition"
                >
                    {isSubmitting ? 'Criando...' : 'Criar Evento'}
                </button>
            </form>
        </div>
    );
}