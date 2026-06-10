"use client";

import { useEventoForm } from './logic';
import { divLayout } from './layout';

export default function EventForm() {
    const { formData, errors, isSubmitting, handleInputChange, handleSubmit } = useEventoForm();

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5">
                {divLayout('nome', 'Nome do Evento', 'text', formData.nome, handleInputChange, errors.nome)}
                {divLayout('descricao', 'Descrição do Evento', 'textarea', formData.descricao, handleInputChange, errors.descricao)}

                {divLayout('data', 'Data do Evento', 'date', formData.data.toString(), handleInputChange, errors.data)}

                {divLayout('horarioInicio', 'Horário de Início', 'time', formData.horarioInicio.toString(), handleInputChange, errors.horarioInicio)}

                {divLayout('horarioFim', 'Horário do Fim', 'time', formData.horarioFim.toString(), handleInputChange, errors.horarioFim)}

                {divLayout('local', 'Local do Evento', 'text', formData.local, handleInputChange, errors.local)}

                {divLayout('cidade', 'Cidade', 'text', formData.cidade, handleInputChange, errors.cidade)}

                {divLayout('bairro', 'Bairro', 'text', formData.bairro, handleInputChange, errors.bairro)}

                {divLayout('rua', 'Rua', 'text', formData.rua, handleInputChange, errors.rua)}

                {divLayout('cep', 'CEP', 'text', formData.cep, handleInputChange, errors.cep)}

                {divLayout('apartamento', 'Apartamento', 'text', formData.apartamento, handleInputChange, errors.apartamento)}

                {divLayout('numero', 'Número', 'text', formData.numero, handleInputChange, errors.numero)}

                {divLayout('vagasDisponiveis', 'Vagas Disponíveis', 'number', formData.vagasDisponiveis.toString(), handleInputChange, errors.vagasDisponiveis)}

                <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition">
                    {isSubmitting ? "Criando..." : "Criar Evento"}
                </button>
            </form>
        </div>
    );
}
