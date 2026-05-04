"use client";

import { useState, ChangeEvent } from 'react';
import { divLayout } from './layout';
import { Evento } from '@/app/lib/Evento'
import { Status } from '@/app/lib/Status'

const STATUS_OPTIONS = Object.values(Status);

type formErrors = Partial<Record<keyof Evento, string>>;

export default function CriarEvento() {
    const [formData, setFormData] = useState<Evento>(() => new Evento (
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        Status.Rascunho
    ));

    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!STATUS_OPTIONS.map(String).includes(String(formData.status))) newErrors.status = 'Status inválido.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((previous) => {
            const updatedValue = name === 'vagasDisponiveis' ? Number(value) : value;
            const updatedData = { ...previous, [name]: updatedValue };
            return new Evento(
                updatedData.nome,
                updatedData.descricao,
                updatedData.data,
                updatedData.horarioInicio,
                updatedData.horarioFim,
                updatedData.local,
                updatedData.vagasDisponiveis,
                updatedData.status as Status
            );
        });
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const payload = new Evento(
            formData.nome,
            formData.descricao,
            formData.data,
            formData.horarioInicio,
            formData.horarioFim,
            formData.local,
            formData.vagasDisponiveis,
            formData.status
        );

        const endpoint = '/api/evento';

        setIsSubmitting(true);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get('content-type') ?? '';
            const responseBody = contentType.includes('application/json')
            ? await response.json() 
            : await response.text();

            if (!response.ok) {
                const message = typeof responseBody === 'object' && responseBody !== null && 'error' in responseBody && typeof responseBody.error === 'string' 
                ? responseBody.error
                : 'Não foi possível criar o evento.';

                return alert(message);
            }

            console.log('Evento criado com sucesso:', responseBody);
            alert('Evento criado com sucesso!');
            setFormData(new Evento(
                '',
                '',
                '',
                '',
                '',
                '',
                0,
                Status.Rascunho
            ));
        } catch {
            alert('Ocorreu um erro ao criar o evento. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full mt-1 px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
    const labelClass = "block text-sm font-medium text-zinc-300";
    const errorClass = "text-red-400 text-xs mt-1";

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5">
            {divLayout('nome', labelClass, 'Nome do Evento', 'text', formData.nome, handleInputChange, inputClass, errorClass, errors.nome)}
            {divLayout('descricao', labelClass, 'Descrição do Evento', 'textarea', formData.descricao, handleInputChange, inputClass, errorClass, errors.descricao)}

            {divLayout('data', labelClass, 'Data do Evento', 'date', formData.data, handleInputChange, inputClass, errorClass, errors.data)}

            {divLayout('horarioInicio', labelClass, 'Horário de Início', 'time', formData.horarioInicio, handleInputChange, inputClass, errorClass, errors.horarioInicio)}

            {divLayout('horarioFim', labelClass, 'Horário do Fim', 'time', formData.horarioFim, handleInputChange, inputClass, errorClass, errors.horarioFim)}

            {divLayout('local', labelClass, 'Local do Evento', 'text', formData.local, handleInputChange, inputClass, errorClass, errors.local)}

            {divLayout('vagasDisponiveis', labelClass, 'Vagas Disponíveis', 'number', formData.vagasDisponiveis.toString(), handleInputChange, inputClass, errorClass, errors.vagasDisponiveis)}

            {divLayout('status', labelClass, 'Status', 'select', String(formData.status), handleInputChange, inputClass, errorClass, errors.status, STATUS_OPTIONS.map(String))}

            <button type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition">{isSubmitting ? 'Criando...' : 'Criar Evento'}</button>
        </form>
        </div>
    );
}