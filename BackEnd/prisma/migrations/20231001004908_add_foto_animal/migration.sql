/*
  Warnings:

  - Added the required column `adotado` to the `animal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "foto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arquivo" BLOB NOT NULL,
    "animal_id" TEXT NOT NULL,
    CONSTRAINT "foto_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,
    "adotado" BOOLEAN NOT NULL
);
INSERT INTO "new_animal" ("descricao", "especie", "id", "idade", "personalidade", "raca", "sexo", "tamanho") SELECT "descricao", "especie", "id", "idade", "personalidade", "raca", "sexo", "tamanho" FROM "animal";
DROP TABLE "animal";
ALTER TABLE "new_animal" RENAME TO "animal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "foto_id_key" ON "foto"("id");
