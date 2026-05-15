## Nomes de branch
Existem dois tipos de branch, feature/ e fix/. Branch feature/ resolvem tasks individuais, e branchs fix/ que resolvem bugs diversos

## Commits
Quando estiver desenvolvendo o projeto, tente separar os commits baseado nas coisas que você desenvolveu. Uma função ou rota, por exemplo, por commit

## Como rodar o sistema
Primeiro, crie um arquivo .env com as seguintes credenciais:
```env
DATABASE_URL="mysql://ajudaprudente:password@localhost:3306/ajudaprudente"
DATABASE_USER="ajudaprudente"
DATABASE_PASSWORD="password"
DATABASE_NAME="ajudaprudente"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```
Segundo, tenha uma instância do mysql ou mariadb, com os atributos especificados no arquivo .env
Com o mysql rodando, instale as depedências do projeto com ``npm install``, e use ``npx prisma generate`` para gerar a conexão com a database baseado no prisma.
Para rodar o sistema, apenas faça ``npm run dev``