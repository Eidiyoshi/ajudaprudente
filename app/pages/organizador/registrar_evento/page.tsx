"use client";

import { useState } from 'react';
import { divLayout } from './layout';
import { NavBar } from '@/app/components/navBar';

type Event = {
    nome: string;
    descricao: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    local: string;
    vagasDisponiveis: number;
    status: string;
};

const STATUS_OPTIONS = ['Ativo', 'Cancelado', 'Encerrado', 'Rascunho'];
type formErrors = Partial<Record<keyof Event, string>>;

export default function EventForm() {
    const [formData, setFormData] = useState<Event>({
        nome: '',
        descricao: '',
        data: '',
        horarioInicio: '',
        horarioFim: '',
        local: '',
        vagasDisponiveis: 0,
        status: 'Rascunho',
    });

    const [errors, setErrors] = useState<formErrors>({});

    const validate = (): boolean => {
        const newErrors: formErrors = {};
        
        if (!formData.nome.trim()) newErrors.nome = 'O nome do evento é obrigatório.';
        if (!formData.descricao.trim()) newErrors.descricao = 'A descrição do evento é obrigatória.';
        if (!formData.data) newErrors.data = 'A data do evento é obrigatória.';
        if (!formData.horarioInicio) newErrors.horarioInicio = 'O horário de início é obrigatório.';
        if (!formData.horarioFim) newErrors.horarioFim = 'O horário de fim é obrigatório.';
        if (!formData.local.trim()) newErrors.local = 'O local do evento é obrigatório.';
        if (formData.vagasDisponiveis < 0) newErrors.vagasDisponiveis = 'As vagas disponíveis não podem ser negativas.';
        if (!STATUS_OPTIONS.includes(formData.status)) newErrors.status = 'Status inválido.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === 'vagasDisponiveis' ? Number(value) : value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        
        const response = await fetch('/api/registrar_evento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                organizador: 1,
            }),
        });

        if (!response.ok) {
            const errorBody = (await response.json()) as { error?: string };
            throw new Error(errorBody.error ?? 'Falha ao registrar evento.');
        }

        const created = await response.json();
        console.log('Evento criado:', created);
    };

    const inputClass = "w-full mt-1 px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
    const labelClass = "block text-sm font-medium text-zinc-300";
    const errorClass = "text-red-400 text-xs mt-1";

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5">
                {divLayout('nome', labelClass, 'Nome do Evento', 'text', formData.nome, handleChange, inputClass, errorClass, errors.nome)}
                {divLayout('descricao', labelClass, 'Descrição do Evento', 'textarea', formData.descricao, handleChange, inputClass, errorClass, errors.descricao)}

            {divLayout('data', labelClass, 'Data do Evento', 'date', formData.data, handleChange, inputClass, errorClass, errors.data)}

            {divLayout('horarioInicio', labelClass, 'Horário de Início', 'time', formData.horarioInicio, handleChange, inputClass, errorClass, errors.horarioInicio)}

            {divLayout('horarioFim', labelClass, 'Horário do Fim', 'time', formData.horarioFim, handleChange, inputClass, errorClass, errors.horarioFim)}

            {divLayout('local', labelClass, 'Local do Evento', 'text', formData.local, handleChange, inputClass, errorClass, errors.local)}

            {divLayout('vagasDisponiveis', labelClass, 'Vagas Disponíveis', 'number', formData.vagasDisponiveis.toString(), handleChange, inputClass, errorClass, errors.vagasDisponiveis)}

            {divLayout('status', labelClass, 'Status', 'select', formData.status, handleChange, inputClass, errorClass, errors.status, STATUS_OPTIONS)}

            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition">Criar Evento</button>
        </form>
        </div>
    );
}
