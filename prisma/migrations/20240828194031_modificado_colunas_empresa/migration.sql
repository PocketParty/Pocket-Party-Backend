/*
  Warnings:

  - You are about to drop the column `contato` on the `Empresas` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Empresas` table. All the data in the column will be lost.
  - Added the required column `cep` to the `Empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Empresas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empresas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Empresas" ("cnpj", "createdAt", "email", "endereco", "id", "nome") SELECT "cnpj", "createdAt", "email", "endereco", "id", "nome" FROM "Empresas";
DROP TABLE "Empresas";
ALTER TABLE "new_Empresas" RENAME TO "Empresas";
CREATE UNIQUE INDEX "Empresas_cnpj_key" ON "Empresas"("cnpj");
CREATE UNIQUE INDEX "Empresas_email_key" ON "Empresas"("email");
CREATE UNIQUE INDEX "Empresas_username_key" ON "Empresas"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
