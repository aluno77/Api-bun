# bun dev
# bun generate --> toda vez que criamos uma tabela
# bun migrate  --> para criar no banco posgress
#  bun seed   

# bun i pg -D
# bun i zod
# bun i chalk -D  -> MENSAGEM COLORIDAS
# bun install @faker-js/faker -D
# bun i -D eslint @rocketseat/eslint-config
#  bun install eslint-plugin-simple-import-sort@latest -D
# bun i -D typescript         --> removemos o que vem instalado por default e e instalar de novo como dependence de dev
# bun add eslint-plugin-drizzle -D
docu -> https://orm.drizzle.team/docs/eslint-plugin

# Typagem no ElysiaJS
# ---> Usaremos a TypeBox  ele traz dentro do sistema do Elysia js
https://github.com/sinclairzx81/typebox


obj:
# -->   "strictNullChecks": true, | agregar essa linha de código no (tsconfig.json)
 
# lINKS DE SITES  API ---> para envio de e-mail
#  https://resend.com/
#  https://mailtrap.io/

/------------------Authentication 
# JWT e Cookie no Elysia
#  https://elysiajs.com/plugins/jwt
# https://github.com/elysiajs/elysia-jwt

# bun add @elysiajs/jwt
# bun add @elysiajs/cookie
/-------Datas  =  Day.js
# https://day.js.org/
# bun install dayjs

# bun add nodemailer  --> para trabalhar com envio de e-mail
# bun add -D @types/nodemailer
https://orm.drizzle.team/docs/typebox
# bun add drizzle-typebox

/------------------------------------------------
# ----> trabalhando com ERRORS
#  ------>Error Handling
tratamento de erros no Elysia

/----------
# Seed de Produtos e Pedidos
Nesta aula, vamos criar um seed para pré-popular o banco de dados com dados fictícios.

/---------------------------------------
# Seed de Produtos e Pedidos

Nesta aula, vamos criar um seed para pré-popular o banco de dados com dados fictícios.

/------------------------------

Olá, tive o mesmo erro é a solução foi realmente roda em um ambiente que tinha o node, mas usando o mesmo comando com o bun.
Ja no arquivo de configurações do drizzle notei uma leve diferença na documentação quando temos que lidar com multiplos arquivos, onde podemos passa cada arquivo como um array, ou podemos apenas passa o nome do arquivo com um ./src/db/schema/* no final que ele vai entender que todos os arquivos contidos dentro são schema do banco.

/-----------
Dentro do framework Elijia, temos um sistema de tipagem de dados de entrada e saída integrado. Isso significa que não é necessário utilizar ferramentas externas como Zod, Joy ou Yup para fazer a validação dos dados recebidos no corpo da requisição.

/-------------
Schema de Links de Autenticação
Commit: Schema de Links de Autenticação

Nesta aula, vamos iniciar o processo de autenticação em nossa aplicação. Em vez de usar a autenticação convencional por e-mail e senha, vamos implementar uma estratégia chamada "password-less". Essa estratégia permite que os usuários façam login sem a necessidade de uma senha. Vamos utilizar a estratégia do "Magic Link", onde o usuário insere seu e-mail e recebe um link de autenticação por e-mail. Ao clicar no link, o usuário é redirecionado para nossa aplicação já autenticado. Essa abordagem é mais segura, pois não precisamos armazenar senhas sensíveis em nosso banco de dados. Vamos começar criando uma tabela para armazenar os links de autenticação e em seguida, implementar as rotas de login e callback.

/------------

# Rota: Listagem de pedidos

Nesta aula, vamos criar uma rota de listagem de pedidos com paginação e filtros. Começamos criando a rota "Orders" e verificando se o usuário possui um ID de restaurante. Em seguida, definimos os parâmetros de filtro, como nome do cliente, ID do pedido e status. Utilizamos o módulo Drizzle Typebox para validar o filtro de status. Em seguida, criamos uma query base para aplicar os filtros e executamos duas queries: uma para contar o total de pedidos e outra para retornar os pedidos paginados. Por fim, retornamos os dados dos pedidos e o total de pedidos na resposta da API.

/-------------------------------------------

 schema: ["./src/user/schema.ts", "./src/posts/schema.ts"]
or
schema: "./src/db/schema/*",

/---------------
"plugins": [
    "simple-import-sort"
  ],
  "rules": {
    "simple-import-sort/sort": "error"
  }

  /-----------------------