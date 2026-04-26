"use client";

import { useState } from 'react';

type newEvent = {
    nome: string;
    descricao: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    local: string;
    vagasDisponiveis: number;
    status: string;
};

type formErrors = Partial<Record<keyof newEvent, string>>;

const STATUS_OPTIONS = ['Ativo', 'Cancelado', 'Encerrado', 'Rascunho'];

export default function NewEventForm() {
    const [formData, setFormData] = useState<newEvent>({
        nome: '',
        descricao: '',
        data: '',
        horarioInicio: '',
        horarioFim: '',
        local: '',
        vagasDisponiveis: 0,
        status: 'Ativo',
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        console.log('Novo evento:', formData);
        // TODO: sendToDataBase
    };

    const inputClass = "w-full mt-1 px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
    const labelClass = "block text-sm font-medium text-zinc-300";
    const errorClass = "text-red-400 text-xs mt-1";

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8 flex flex-col gap-5">
            <div>
                <label htmlFor='nome' className={labelClass}>Nome do Evento</label>
                <input id="nome" name="nome" type="text" value={formData.nome} onChange={handleChange} className={inputClass} placeholder="Ex: Workshop de React"/>
                {errors.nome && <span className={errorClass}>{errors.nome}</span>}
            </div>

            <div>
                <label htmlFor='descricao' className={labelClass}>Descrição do Evento</label>
                <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} className={inputClass} placeholder="Descreva o evento..."/>
                {errors.descricao && <span className={errorClass}>{errors.descricao}</span>}
            </div>

            <div>
                <label htmlFor='data' className={labelClass}>Data do Evento</label>
                <input id="data" name="data" type="date" value={formData.data} onChange={handleChange} className={inputClass}/>
                {errors.data && <span className={errorClass}>{errors.data}</span>}
            </div>

            <div>
                <label htmlFor='horarioInicio' className={labelClass}>Horário de Início</label>
                <input id="horarioInicio" name="horarioInicio" type="time" value={formData.horarioInicio} onChange={handleChange} className={inputClass}/>
                {errors.horarioInicio && <span className={errorClass}>{errors.horarioInicio}</span>}
            </div>

            <div>
                <label htmlFor='horarioFim' className={labelClass}>Horário de Fim</label>
                <input id="horarioFim" name="horarioFim" type="time" value={formData.horarioFim} onChange={handleChange} className={inputClass}/>
                {errors.horarioFim && <span className={errorClass}>{errors.horarioFim}</span>}
            </div>

            <div>
                <label htmlFor='local' className={labelClass}>Local do Evento</label>
                <input id="local" name="local" type="text" value={formData.local} onChange={handleChange} className={inputClass} placeholder="Ex: Auditório 1"/>
                {errors.local && <span className={errorClass}>{errors.local}</span>}
            </div>
            <div>
                <label htmlFor='vagasDisponiveis' className={labelClass}>Vagas Disponíveis</label>
                <input id="vagasDisponiveis" name="vagasDisponiveis" type="number" value={formData.vagasDisponiveis} onChange={handleChange} className={inputClass}/>
                {errors.vagasDisponiveis && <span className={errorClass}>{errors.vagasDisponiveis}</span>}
            </div>
            <div>
                <label htmlFor='status' className={labelClass}>Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>))}
                </select>
                {errors.status && <span className={errorClass}>{errors.status}</span>}
            </div>

            <button type="submit">Criar Evento</button>
        </form>
        </div>
    );
}