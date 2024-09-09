## Instalação

- npm install
## Configuração inicial
- Crie um arquivo **.env** com as seguinte variáveis: 
  - **DATABASE_URL = file:./dev.db**
  - **SECRET** = suaChaveSecretaSuperSegura123!@#
  - **PORT** = 3000
- Crie um arquivo **.env.test.local** com as seguinte variáveis: 
  - **DATABASE_URL = file:./teste.db**
  - **SECRET** = suaChaveSecretaSuperSegura123!@#
  - **PORT** = 3001
- Ou copie os arquivos
  ```shell
  cp .env.example .env
  cp .env.test.local.example .env.test.local
  ```


## Rodando a aplicação
- npm run migrate:dev
- npm run dev

## Rodando os teste
- npm run migrate:teste
- npm run teste
