# Ajuda Prudente

## Nomes de branch

Existem dois tipos de branch, feature/ e fix/. Branch feature/ resolvem tasks individuais, e branchs fix/ que resolvem bugs diversos

## Commits

Quando estiver desenvolvendo o projeto, tente separar os commits baseado nas coisas que você desenvolveu. Uma função ou rota, por exemplo, por commit

## Como rodar o sistema

1) Crie um arquivo .env com as seguintes credenciais:

    ```env
    DATABASE_URL="mysql://ajudaprudente:password@localhost:3306/ajudaprudente"
    DATABASE_USER="ajudaprudente"
    DATABASE_PASSWORD="password"
    DATABASE_NAME="ajudaprudente"
    DATABASE_HOST="localhost"
    DATABASE_PORT=3306
    SESSION_SECRET="troque-por-uma-chave-segura"
    # Compatibilidade (opcional): também funciona se usar JWT_SECRET
    JWT_SECRET="troque-por-uma-chave-segura"
    ```

2) tenha uma instância do mysql ou mariadb, com os atributos especificados no arquivo .env
3) ``npm install`` Instala as depedências do projeto
4) ``npx prisma db push`` Coloca o schema do prisma na database local
5) ``npx prisma generate`` Gera a conexão do prisma e código
6) ``npm run dev`` Roda o projeto

## Autenticação (Stateless Session)

O login cria uma sessão stateless no cookie `session` (HttpOnly), no padrão recomendado da documentação do Next.js.

- `POST /api/login`: valida credenciais e cria a sessão.
- `GET /api/session`: retorna o usuário autenticado atual.
- `POST /api/logout`: encerra a sessão removendo o cookie.

### Como acessar o usuário logado

No client, basta chamar `GET /api/session`:

```ts
const response = await fetch("/api/session");
const data = await response.json();

if (!response.ok) {
  // usuário não autenticado
} else {
  // data => { id, nome, email, tipoUsuario }
}
```

No server (Route Handlers/Server Components), use o helper `getSessionUser()` de `lib/session.ts`.
