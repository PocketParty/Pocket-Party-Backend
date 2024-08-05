/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

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
    "imagem" BLOB NOT NULL,
    "preco" REAL NOT NULL,
    "notaAvaliacao" REAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    CONSTRAINT "Produtos_catalogoId_fkey" FOREIGN KEY ("catalogoId") REFERENCES "Catalogos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_email_key" ON "Empresas"("email");
