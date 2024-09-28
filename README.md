## Instalação

```bash
npm install
```
## Configuração inicial
Crie um arquivo **.env** com as seguinte variáveis: 
```bash
DATABASE_URL = "postgresql://postgres:senha123@localhost:5432/devdb?schema=public"
SECRET = suaChaveSecretaSuperSegura123!@#
PORT = 3000
DB_NAME=devdb
```
Crie um arquivo **.env.test.local** com as seguinte variáveis: 
```bash
DATABASE_URL = "postgresql://postgres:senha123@localhost:5432/testdb?schema=public"
SECRET = suaChaveSecretaSuperSegura123!@#
PORT = 3001
DB_NAME=testdb
```
Comando docker compose para subir o serviços

Para o ambiente de teste
```bash
docker compose --env-file .env.test.local up -d
```
Para o ambiente de desenvolvimento
```bash
docker compose --env-file .env up -d
```
## Rodando as migrations do prisma
Para o ambiente de desenvolvimento
```bash
npm run migrate:dev
```
Para o ambiente de teste
```bash
npm run migrate:teste
```

## Teste 

Rodando os teste

```bash
npm run teste
```
## Aplicaçao

Rodando a aplicação
```bash
npm run dev
```	