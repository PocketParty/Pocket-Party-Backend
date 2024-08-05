-- CreateTable
CREATE TABLE "Empresas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Catalogos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "Catalogos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catalogoId" INTEGER NOT NULL,
    "imagem" BLOB,
    "preco" REAL NOT NULL,
    "notaAvaliacao" REAL,
    "descricao" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    CONSTRAINT "Produtos_catalogoId_fkey" FOREIGN KEY ("catalogoId") REFERENCES "Catalogos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_cnpj_key" ON "Empresas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_email_key" ON "Empresas"("email");
