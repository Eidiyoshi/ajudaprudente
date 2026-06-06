import { useState, ChangeEvent } from 'react';

import { Status } from '@/generated/prisma/enums';

type EventFormData = {
    nome: string;
    descricao: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    local: string;
    vagasDisponiveis: number;
    status: Status;
}

type FormErrors = Partial<Record<keyof EventFormData, string>>;

const emptyForm = (): EventFormData => ({
    nome: '',
    descricao: '',
    data: '',
    horarioInicio: '',
    horarioFim: '',
    local: '',
    vagasDisponiveis: 0,
    status: Status.Rascunho,
});

export function useEventoForm() {
    const [formData, setFormData] = useState<EventFormData>(emptyForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.nome.trim()) newErrors.nome = 'O nome do evento é obrigatório.';
        if (!formData.descricao.trim()) newErrors.descricao = 'A descrição do evento é obrigatória.';
        if (!formData.data) newErrors.data = 'A data do evento é obrigatória.';
        if (!formData.horarioInicio) newErrors.horarioInicio = 'O horário de início é obrigatório.';
        if (!formData.horarioFim) newErrors.horarioFim = 'O horário de fim é obrigatório.';
        if (!formData.local.trim()) newErrors.local = 'O local do evento é obrigatório.';
        if (formData.vagasDisponiveis < 0) newErrors.vagasDisponiveis = 'As vagas disponíveis não podem ser negativas.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
    
        setFormData((previous) => ({
            ...previous,
            [name]: name === 'vagasDisponiveis' ? Number(value) : value,
        }));
    
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...formData, status: Status.Ativo }),
            });

            if (!response.ok) throw new Error('Erro na requisição');
            
            alert('Evento criado com sucesso!');
            setFormData(emptyForm());
            setErrors({});
        } catch {
            alert('Ocorreu um erro ao criar o evento. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return { formData, errors, isSubmitting, handleInputChange, handleSubmit };
}