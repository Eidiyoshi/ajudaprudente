'use client';

import { type FormEvent, useState } from 'react';

export type TipoUsuario = 'voluntario' | 'organizador';
type Feedback = { type: 'success' | 'error'; message: string } | null;

export default function useLoginForm() {
    const [email, setEmail] = useState('');
      const [senha, setSenha] = useState('');
      const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>('voluntario');
      const [feedback, setFeedback] = useState<Feedback>(null);
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFeedback(null);
        setIsSubmitting(true);
    
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha, tipoUsuario }),
          });
    
          const contentType = response.headers.get('content-type') ?? '';
          const body = contentType.includes('application/json')
            ? await response.json()
            : await response.text();
    
          if (!response.ok) {
            const message =
              typeof body === 'object' &&
              body !== null &&
              'error' in body &&
              typeof body.error === 'string'
                ? body.error
                : 'Não foi possível fazer login.';
    
            setFeedback({ type: 'error', message });
            return;
          }
    
          if (typeof body === 'object' && body !== null && 'nome' in body) {
            setFeedback({
              type: 'success',
              message: `Login realizado com sucesso. Bem-vindo(a), ${String(body.nome)}.`,
            });
          } else {
            setFeedback({ type: 'success', message: 'Login realizado com sucesso.' });
          }
        } catch {
          setFeedback({
            type: 'error',
            message: 'Erro de conexão ao tentar fazer login.',
          });
        } finally {
          setIsSubmitting(false);
        }
      };
    
    return ({ email, senha, tipoUsuario, feedback, isSubmitting, handleSubmit, setEmail, setSenha, setTipoUsuario });
}