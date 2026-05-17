'use client';

import { type FormEvent, useState } from 'react';

type TipoUsuario = 'voluntario' | 'organizador';
type Feedback = { type: 'success' | 'error'; message: string } | null;

export default function LoginPage() {
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

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="tipoUsuario">Tipo de usuário</label>
          <br />
          <select
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(event) => setTipoUsuario(event.target.value as TipoUsuario)}
          >
            <option value="voluntario">Voluntário</option>
            <option value="organizador">Organizador</option>
          </select>
        </p>

        <p>
          <label htmlFor="email">E-mail</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </p>

        <p>
          <label htmlFor="senha">Senha</label>
          <br />
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </p>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {feedback && <p>{feedback.message}</p>}
    </main>
  );
}
