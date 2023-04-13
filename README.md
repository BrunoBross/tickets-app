# Tickets App

Seja bem-vindo ao Tickets App

# Como executar o projeto

## Clonagem do projeto

Faça um clone do projeto

```
git clone git@github.com:BrunoBross/tickets-app.git
```

## Banco de dados

Suba um banco de dados postgres (recomendado utilizar docker)

```
docker run --name tickets -e POSTGRES_USER=tickets  -e POSTGRES_PASSWORD=tickets -p 5433:5432 -d postgres
```

É possível alterar o nome, usuário, senha e porta, mas você deve lembrar pois será necessário mais a frente

Pronto, o banco postgres já está rodando na sua maquina local

Caso você reinicie o computador, verifique se o container está rodando

```
docker ps
```

Caso nao esteja rodando

```
docker start tickets
```

(ou o nome que você definiu para o seu banco)

## Back-end

Entre na pasta back-end `cd back-end` e inicialize o projeto com o comando

```
yarn OU npm install
```

Crie um arquivo `.env` no diretório base conforme o `.reference.env` e defina as propriedades (o .reference.env já tem a DATABASE_URL correta, caso você suba o banco com o comando citado, caso você tenha alterado alguma propriedade, será necessário alterar no DATABASE_URL do seu .env)

Execute a migraçao do prisma para o seu banco postgres

```
npx prisma db push
```

Agora você já está apto a executar o projeto

```
yarn dev
```

## Mobile

Entre na pasta mobile `cd mobile` e inicialize o projeto com o comando

```
yarn OU npm install
```

Crie um arquivo `env` no diretório base conforme o `.reference.env` e defina as propriedades, no API_URL troque a parte do localhost pelo seu IP local para poder acessar o sistema no seu app expo, a porta está conforme a padrão do .env do back-end, altere caso necessário

Agora você já está apto a executar o projeto

```
yarn dev
```

## Web

Entre na pasta web `cd web` e inicialize o projeto

```
yarn OU npm install
```

OBS: no momento a parte web ainda não tem um .env configurado, por isso é necessário configurar a URL da api nos seguintes arquivos:

`src/lib/api.ts`

`src/components/EventCard/EventCard.tsx` (alterar a URL no src da Imagem que é renderizada)

Egora você já está apto a executar o projeto

```
yarn start
```
