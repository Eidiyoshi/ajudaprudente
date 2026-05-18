"use client";

import { useState } from 'react';

type loginData = {
    email: string;
    senha: string;
};

type formErrors = Partial<Record<keyof loginData, string>>;

export default function useLoginForm() {
    const [formData, setFormData] = useState<loginData>({
        email: '',
        senha: '',
    });

    const [errors, setErrors] = useState<formErrors>({});

    const validate = (): boolean => {
        const newErrors: formErrors = {};
        
        if (!formData.email.trim()) newErrors.email = 'O email é obrigatório.';
        if (!formData.senha.trim()) newErrors.senha = 'A senha é obrigatória.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        console.log('Tentativa de login:', formData);
    };

    return (
       { formData, errors, handleChange, handleSubmit } 
    );
}