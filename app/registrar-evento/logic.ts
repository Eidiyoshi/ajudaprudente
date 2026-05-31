import { useState, ChangeEvent } from 'react';

import { Evento } from '@/app/lib/Evento';
import { Status } from '@/app/lib/Status';

type EventFormData = {
    nome: string;
    descricao: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    local: string;
    vagasDisponiveis: number;
}

type FormErrors = Partial<Record<keyof EventFormData, string>>;

const emptyEvento = () => Evento.empty();

export function useEventoForm() {
    const [formData, setFormData] = useState<Evento>(emptyEvento);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.getNome().trim()) newErrors.nome = 'O nome do evento é obrigatório.';
        if (!formData.getDescricao().trim()) newErrors.descricao = 'A descrição do evento é obrigatória.';
        if (!formData.getData()) newErrors.data = 'A data do evento é obrigatória.';
        if (!formData.getHorarioInicio()) newErrors.horarioInicio = 'O horário de início é obrigatório.';
        if (!formData.getHorarioFim()) newErrors.horarioFim = 'O horário de fim é obrigatório.';
        if (!formData.getLocal().trim()) newErrors.local = 'O local do evento é obrigatório.';
        if (formData.getVagasDisponiveis() < 0) newErrors.vagasDisponiveis = 'As vagas disponíveis não podem ser negativas.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((previous) => {
            const updatedValue = name === 'vagasDisponiveis' ? Number(value) : value;

            const updatedData = {
                nome: previous.getNome(),
                descricao: previous.getDescricao(),
                data: previous.getData(),
                horarioInicio: previous.getHorarioInicio(),
                horarioFim: previous.getHorarioFim(),
                local: previous.getLocal(),
                vagasDisponiveis: previous.getVagasDisponiveis(),
                status: previous.getStatus(),
                [name]: updatedValue,
            };

            return Evento.create(
                updatedData.nome,
                updatedData.data,
                updatedData.descricao,
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
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const payload = Evento.create(
                formData.getNome(),
                formData.getData(),
                formData.getDescricao(),
                formData.getHorarioInicio(),
                formData.getHorarioFim(),
                formData.getLocal(),
                formData.getVagasDisponiveis(),
                Status.Ativo
            );

            console.log('Evento criado com sucesso:', payload);
            alert('Evento criado com sucesso!');
            setFormData(emptyEvento());
            setErrors({});
        } catch {
            alert('Ocorreu um erro ao criar o evento. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return { formData, errors, isSubmitting, handleInputChange, handleSubmit };
}