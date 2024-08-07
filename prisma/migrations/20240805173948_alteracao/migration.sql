-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catalogoId" INTEGER NOT NULL,
    "imagem" BLOB,
    "preco" TEXT NOT NULL,
    "notaAvaliacao" TEXT,
    "descricao" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    CONSTRAINT "Produtos_catalogoId_fkey" FOREIGN KEY ("catalogoId") REFERENCES "Catalogos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produtos" ("catalogoId", "createdAt", "descricao", "id", "imagem", "notaAvaliacao", "preco", "tags") SELECT "catalogoId", "createdAt", "descricao", "id", "imagem", "notaAvaliacao", "preco", "tags" FROM "Produtos";
DROP TABLE "Produtos";
ALTER TABLE "new_Produtos" RENAME TO "Produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
