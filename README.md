## Instalação

- npm install
## Configuração inicial
- Crie um arquivo **.env** com as seguinte variáveis: 
  - **DATABASE_URL = "postgresql://postgres:senha123@localhost:5432/dev?schema=public"**
  - **SECRET** = suaChaveSecretaSuperSegura123!@#
  - **PORT** = 3000
- Crie um arquivo **.env.test.local** com as seguinte variáveis: 
  - **DATABASE_URL = postgresql://postgres:senha123@localhost:5432/testdb?schema=public**
  - **SECRET** = suaChaveSecretaSuperSegura123!@#
  - **PORT** = 3001

## Rodando a aplicação
- npm run migrate:dev
- npm run dev

## Rodando os teste
- npm run migrate:teste
- npm run teste