/*
  Warnings:

  - You are about to alter the column `notaAvaliacao` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `preco` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - Made the column `imagem` on table `Produtos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notaAvaliacao` on table `Produtos` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catalogoId" INTEGER NOT NULL,
    "imagem" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "notaAvaliacao" REAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    CONSTRAINT "Produtos_catalogoId_fkey" FOREIGN KEY ("catalogoId") REFERENCES "Catalogos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produtos" ("catalogoId", "createdAt", "descricao", "id", "imagem", "notaAvaliacao", "preco", "tags") SELECT "catalogoId", "createdAt", "descricao", "id", "imagem", "notaAvaliacao", "preco", "tags" FROM "Produtos";
DROP TABLE "Produtos";
ALTER TABLE "new_Produtos" RENAME TO "Produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
