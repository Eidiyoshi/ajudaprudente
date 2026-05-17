'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

type TipoRegistro = 'voluntario' | 'organizador' | null;
type Feedback = { type: 'success' | 'error'; message: string } | null;

type RegistroFormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone: string;
  rg: string;
  cpf: string;
  empresa: string;
  cnpj: string;
  cidade: string;
  bairro: string;
  rua: string;
  cep: string;
  apartamento: string;
  numero: string;
};

const initialFormData: RegistroFormData = {
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  telefone: '',
  rg: '',
  cpf: '',
  empresa: '',
  cnpj: '',
  cidade: '',
  bairro: '',
  rua: '',
  cep: '',
  apartamento: '',
  numero: '',
};

export default function Registrar() {
  const [showTipoModal, setShowTipoModal] = useState(false);
  const [tipoRegistro, setTipoRegistro] = useState<TipoRegistro>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [formData, setFormData] = useState<RegistroFormData>(initialFormData);
  const [isEmpresaOrganizador, setIsEmpresaOrganizador] = useState(false);

  const tituloRegistro =
    tipoRegistro === 'voluntario'
      ? 'Registro de voluntário'
      : 'Registro de organizador';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSelectTipo = (tipo: Exclude<TipoRegistro, null>) => {
    setFeedback(null);
    setIsEmpresaOrganizador(false);
    setTipoRegistro(tipo);
    setShowTipoModal(false);
  };

  const parseNumber = (value: string): number | null => {
    const onlyDigits = value.replace(/\D/g, '');
    if (onlyDigits.length === 0) {
      return null;
    }
    const parsed = Number(onlyDigits);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const normalizeDigits = (value: string): string => value.replace(/\D/g, '');

  const handleRegistro = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tipoRegistro) {
      setFeedback({
        type: 'error',
        message: 'Selecione o tipo de conta antes de registrar.',
      });
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setFeedback({
        type: 'error',
        message: 'Senha e confirmação de senha não coincidem.',
      });
      return;
    }

    const telefone = parseNumber(formData.telefone);
    const cnpjNormalizado =
      tipoRegistro === 'organizador' && isEmpresaOrganizador
        ? normalizeDigits(formData.cnpj)
        : '';

    if (telefone === null || formData.rua.trim().length === 0) {
      setFeedback({
        type: 'error',
        message: 'Telefone precisa ser numérico e rua deve ser preenchida.',
      });
      return;
    }

    if (
      tipoRegistro === 'organizador' &&
      isEmpresaOrganizador &&
      (formData.empresa.trim().length === 0 || cnpjNormalizado.length === 0)
    ) {
      setFeedback({
        type: 'error',
        message: 'Informe nome da empresa e CNPJ para organizador empresa.',
      });
      return;
    }

    const payload =
      tipoRegistro === 'voluntario'
        ? {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            telefone,
            rg: formData.rg,
            cpf: formData.cpf,
            endereco: {
              cidade: formData.cidade,
              bairro: formData.bairro,
              rua: formData.rua.trim(),
              cep: formData.cep,
              apartamento: formData.apartamento || undefined,
              numero: formData.numero || undefined,
            },
          }
        : {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            telefone,
            rg: formData.rg,
            cpf: formData.cpf,
            isEmpresa: isEmpresaOrganizador,
            empresa: isEmpresaOrganizador ? formData.empresa.trim() : undefined,
            cnpj: isEmpresaOrganizador ? cnpjNormalizado : undefined,
            endereco: {
              cidade: formData.cidade,
              bairro: formData.bairro,
              rua: formData.rua.trim(),
              cep: formData.cep,
              apartamento: formData.apartamento || undefined,
              numero: formData.numero || undefined,
            },
          };

    const endpoint =
      tipoRegistro === 'voluntario' ? '/api/voluntario' : '/api/organizador';

    setIsSubmitting(true);
    setFeedback(null);

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
        const message =
          typeof responseBody === 'object' &&
          responseBody !== null &&
          'error' in responseBody &&
          typeof responseBody.error === 'string'
            ? responseBody.error
            : 'Não foi possível concluir o registro.';

        setFeedback({ type: 'error', message });
        return;
      }

      setFeedback({ type: 'success', message: 'Registro realizado com sucesso.' });
      setFormData(initialFormData);
      setIsEmpresaOrganizador(false);
    } catch {
      setFeedback({
        type: 'error',
        message: 'Erro de conexão ao enviar o registro.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Ajuda Prudente
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Escolha como deseja entrar.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Logar
          </button>
          <button
            type="button"
            onClick={() => setShowTipoModal(true)}
            className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Registrar
          </button>
        </div>
      </div>

      {showTipoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Você é voluntário ou organizador?
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Selecione o tipo de conta para continuar o registro.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleSelectTipo('voluntario')}
                className="rounded-lg border border-zinc-300 px-4 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                Sou voluntário
              </button>
              <button
                type="button"
                onClick={() => handleSelectTipo('organizador')}
                className="rounded-lg bg-zinc-900 px-4 py-3 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Sou organizador
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowTipoModal(false)}
              className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {tipoRegistro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-4 shadow-xl dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {tituloRegistro}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Preencha seus dados para criar a conta.
            </p>

            <form className="mt-4 space-y-2.5" onSubmit={handleRegistro}>
              {tipoRegistro === 'organizador' && (
                <>
                  <label className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                    <input
                      type="checkbox"
                      checked={isEmpresaOrganizador}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setIsEmpresaOrganizador(checked);
                        if (!checked) {
                          setFormData((previous) => ({
                            ...previous,
                            empresa: '',
                            cnpj: '',
                          }));
                        }
                      }}
                      className="h-4 w-4"
                    />
                    Organizador é empresa
                  </label>

                  {isEmpresaOrganizador && (
                    <>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Nome da empresa"
                        required
                        className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                      <input
                        type="tel"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        placeholder="CNPJ"
                        required
                        className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                    </>
                  )}
                </>
              )}

              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome completo"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Senha"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleInputChange}
                placeholder="Confirmar senha"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="Telefone"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleInputChange}
                placeholder="RG"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="CPF"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />

              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Cidade"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleInputChange}
                placeholder="Bairro"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleInputChange}
                placeholder="Rua"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="CEP"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="text"
                name="apartamento"
                value={formData.apartamento}
                onChange={handleInputChange}
                placeholder="Apartamento (opcional)"
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                placeholder="Número (opcional)"
                className="w-full rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />

              {feedback && (
                <p
                  className={
                    feedback.type === 'success'
                      ? 'text-sm text-emerald-600 dark:text-emerald-400'
                      : 'text-sm text-red-600 dark:text-red-400'
                  }
                >
                  {feedback.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                {isSubmitting ? 'Enviando...' : 'Criar conta'}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setTipoRegistro(null)}
              className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
