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

```bash
docker compose up -d
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

## Rodando a aplicação via docker 

1. Rodar o container do PostgreSQL

   ```bash
	docker run -d --name pocketpartydb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=senha123 -e POSTGRES_DB=postgres -v postgres_data:/var/lib/postgresql/data -p 5432:5432 postgres:latest

   ```

2. Rodar o container do authentication-service

   ```bash
   docker run -d --name authentication-service -e DB_USER=postgres -e DB_NAME=devdb -e DB_PASSWORD=senha123 -e DB_HOST=pocketpartydb -e DB_PORT=5432 -e DB_SSLMODE=disable -p 8080:8080 --link pocketpartydb:db fabioviniciusfsiqueira/authentication-service:latest

   ```
3. Rodar o container do backend

   ```bash
	docker run -d --name api-pocketparty -e DATABASE_URL="postgresql://postgres:senha123@pocketpartydb:5432/devdb?schema=public" -e SECRET="suaChaveSecretaSuperSegura123" -e PORT=3000 -e DB_NAME=devdb -p 3000:3000 --link pocketpartydb:db fabioviniciusfsiqueira/pocketparty-backend:latest sh -c "npm run migrate:dev && npm run dev"

   ```
